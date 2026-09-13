import React, { useState, useRef, useEffect } from "react";
import {
  Upload,
  Camera,
  Sparkles,
  AlertCircle,
  FileImage,
  RefreshCw,
  Zap,
  Info,
  Layers,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Eye,
  EyeOff,
  Sliders,
  Send,
  Building2,
  MapPin,
  Clock,
  FileCheck2,
} from "lucide-react";
import { SAMPLE_ROAD_IMAGES } from "../data/mockData";
import { AnalysisResult, SeverityLevel, VerificationStatus } from "../types";

interface DetectDamageProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  externalImageToAnalyze?: { imageUrl: string; hint: string } | null;
  initialResult?: AnalysisResult | null;
}

export const DetectDamage: React.FC<DetectDamageProps> = ({
  onAnalysisComplete,
  externalImageToAnalyze,
  initialResult,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(
    externalImageToAnalyze?.imageUrl || SAMPLE_ROAD_IMAGES[0].svgUrl
  );
  const [imageName, setImageName] = useState<string>(
    externalImageToAnalyze?.hint || SAMPLE_ROAD_IMAGES[0].name
  );
  const [imageHint, setImageHint] = useState<string>(
    externalImageToAnalyze?.hint || SAMPLE_ROAD_IMAGES[0].hint
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active result state for the two-column view
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(
    initialResult || null
  );

  // Overlays and human verification state
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [reviewerName, setReviewerName] = useState("Inspector R. Verma (Field Unit 2)");
  const [adjustedSeverity, setAdjustedSeverity] = useState<SeverityLevel>("High");
  const [reviewNotes, setReviewNotes] = useState(
    "Visual pavement cavity confirmed during field triage. Work order authorized for asphalt crew dispatch."
  );
  const [actionChoice, setActionChoice] = useState<VerificationStatus>(
    "Pending Human Verification"
  );
  const [submittedToDashboard, setSubmittedToDashboard] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sync if external image is passed from Field Evidence or other tab
  useEffect(() => {
    if (externalImageToAnalyze) {
      setSelectedImage(externalImageToAnalyze.imageUrl);
      setImageName(externalImageToAnalyze.hint || "Field Observation Photograph");
      setImageHint(externalImageToAnalyze.hint || "");
      setCurrentResult(null);
      setSubmittedToDashboard(false);
    }
  }, [externalImageToAnalyze]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match(/image\/(jpeg|png|jpg)/)) {
      setErrorMsg("Please upload an image in JPG, JPEG, or PNG format.");
      return;
    }
    setErrorMsg(null);
    setImageName(file.name);
    setImageHint(file.name);
    setCurrentResult(null);
    setSubmittedToDashboard(false);

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSelectSample = (sample: (typeof SAMPLE_ROAD_IMAGES)[0]) => {
    setSelectedImage(sample.svgUrl);
    setImageName(sample.name);
    setImageHint(sample.hint);
    setErrorMsg(null);
    setCurrentResult(null);
    setSubmittedToDashboard(false);
  };

  const handleRunAnalysis = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setErrorMsg(null);
    setSubmittedToDashboard(false);

    // Visual pipeline steps
    setAnalysisStep("Image Preprocessing: Normalization & edge feature extraction...");
    await new Promise((r) => setTimeout(r, 600));
    setAnalysisStep("Proposed YOLO Vision Engine: Scanning pavement distress coordinates...");
    await new Promise((r) => setTimeout(r, 800));
    setAnalysisStep("Computing prototype severity classification and priority index...");

    try {
      const response = await fetch("/api/analyze-damage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: selectedImage,
          mimeType: selectedImage.startsWith("data:image/png")
            ? "image/png"
            : "image/jpeg",
          hint: imageHint || imageName,
        }),
      });

      const data = await response.json();

      const result: AnalysisResult = {
        id: `REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        damageType: data.damageType || "Pothole",
        severity: data.severity || "High",
        confidencePercent: data.confidencePercent || 84,
        priorityScore: data.priorityScore || 82,
        potentialSafetyImpact:
          data.potentialSafetyImpact ||
          "Cavity poses sudden suspension shock for passenger vehicles and high destabilization risk for two-wheelers.",
        roadConditionRating: data.roadConditionRating || "Poor",
        identifiedIssues: data.identifiedIssues || [
          {
            name: "Pavement Surface Cavity",
            description: "Deep bowl-shaped depression with exposed aggregate",
            approximateLocation: "Driving lane wheelpath",
            box2d: [350, 250, 750, 750],
          },
        ],
        decisionFactors: data.decisionFactors || {
          damageSeverityWeight: 82,
          roadConditionWeight: 75,
          trafficSafetyImpactWeight: 84,
        },
        aiAssessmentSummary:
          data.aiAssessmentSummary ||
          "AI vision scan identified localized asphalt disintegration with exposed road subgrade. Meets prompt maintenance criteria.",
        recommendedAction:
          data.recommendedAction ||
          "Dispatch asphalt maintenance crew for cold/hot patch repair within 48 hours pending human engineer sign-off.",
        location: "Arterial Transit Corridor - Field Sector 4",
        timestamp: new Date().toISOString(),
        verificationStatus: "Pending Human Verification",
        imageUrl: selectedImage,
        isSimulated: true,
        note: "Prototype Demo Result • Prototype AI Assessment",
      };

      setCurrentResult(result);
      setAdjustedSeverity(result.severity);
      setActionChoice("Pending Human Verification");
      onAnalysisComplete(result);
    } catch (err: any) {
      console.error("Analysis request failed:", err);
      setErrorMsg("Network error contacting analysis engine. Please try again.");
    } finally {
      setIsAnalyzing(false);
      setAnalysisStep("");
    }
  };

  const handleApplyVerification = () => {
    if (!currentResult) return;
    const updated: AnalysisResult = {
      ...currentResult,
      severity: adjustedSeverity,
      verificationStatus: actionChoice,
      verifiedBy: reviewerName,
      verificationNotes: reviewNotes,
    };
    setCurrentResult(updated);
    onAnalysisComplete(updated);
    setSubmittedToDashboard(true);
  };

  const getSeverityBadgeColor = (sev: SeverityLevel) => {
    switch (sev) {
      case "Critical":
        return "bg-red-600 text-white border-red-700";
      case "High":
        return "bg-rose-500 text-white border-rose-600";
      case "Medium":
        return "bg-amber-500 text-white border-amber-600";
      case "Low":
        return "bg-emerald-600 text-white border-emerald-700";
    }
  };

  return (
    <section className="py-10 bg-slate-50 min-h-[850px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>AI Road Damage Detection</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Road Surface Damage Inspection
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Upload road photography to evaluate defect type, severity classification, priority index, and engineer verification.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold shadow-2xs">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Human-in-the-Loop Verification Required</span>
            </span>
          </div>
        </div>

        {/* Honest Academic Prototype Banner */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <p className="font-bold text-blue-900">
              Prototype Demo Result Notice
            </p>
            <p className="text-blue-800 text-xs">
              All detection scores and priority indices are displayed as a <strong className="font-semibold text-blue-950">Prototype Demo Result</strong> for this Design Thinking prototype. AI assists human municipal authorities in triaging road damage, but cannot independently approve public expenditure or repair orders.
            </p>
          </div>
        </div>

        {/* Benchmark Sample Picker */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-blue-600" />
              Quick Test: Select Benchmark Road Sample
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Click to load instantly</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {SAMPLE_ROAD_IMAGES.map((sample) => (
              <button
                key={sample.id}
                id={`sample-select-${sample.id}`}
                onClick={() => handleSelectSample(sample)}
                className={`p-2 rounded-lg border text-left flex items-center gap-2 transition-all cursor-pointer ${
                  selectedImage === sample.svgUrl
                    ? "border-blue-600 bg-blue-50/70 text-blue-900 shadow-xs"
                    : "border-slate-200 hover:border-slate-300 bg-slate-50/50 text-slate-700"
                }`}
              >
                <div className="w-10 h-8 rounded overflow-hidden bg-slate-900 shrink-0">
                  <img src={sample.svgUrl} alt={sample.name} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-bold block truncate">{sample.name}</span>
                  <span className="text-[10px] text-slate-500 block truncate">{sample.caption}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upload & Image Preview Bar */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer border border-slate-300/80"
              >
                <Upload className="w-4 h-4 text-blue-600" />
                <span>Upload Custom Image</span>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/jpg"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <span className="text-xs text-slate-500 truncate max-w-xs sm:max-w-md">
                Active Source: <strong className="text-slate-800">{imageName}</strong>
              </span>
            </div>

            <button
              id="start-analyze-action-btn"
              disabled={!selectedImage || isAnalyzing}
              onClick={handleRunAnalysis}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-blue-600/20 active:scale-98 transition-all cursor-pointer"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Scanning Pavement Surface...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Road Damage</span>
                </>
              )}
            </button>
          </div>

          {/* Running Analysis Progress Box */}
          {isAnalyzing && (
            <div className="p-4 rounded-xl bg-slate-900 text-white space-y-2.5 animate-in fade-in">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-blue-400 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  AI Vision Inference in Progress
                </span>
                <span className="text-slate-400 text-[10px] font-mono">Proposed YOLO Pipeline</span>
              </div>
              <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full animate-pulse w-3/4" />
              </div>
              <p className="text-xs font-mono text-slate-300">{analysisStep}</p>
            </div>
          )}

          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>

        {/* THE MAIN TWO-COLUMN LAYOUT: Left = Road Image, Right = AI Analysis Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Uploaded Road Image & Detection Overlays */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
              
              {/* Header inside viewport */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-blue-400" />
                  <span className="font-mono text-[11px] text-slate-300">
                    Viewport // {currentResult ? currentResult.id : "Frame Preview"}
                  </span>
                </div>
                {currentResult && (
                  <button
                    onClick={() => setShowBoundingBoxes(!showBoundingBoxes)}
                    className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors cursor-pointer"
                  >
                    {showBoundingBoxes ? (
                      <>
                        <EyeOff className="w-3 h-3 text-slate-400" />
                        <span>Hide Overlay</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3 h-3 text-blue-400" />
                        <span>Show Overlay</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Road Photo Container */}
              <div className="relative aspect-[16/11] bg-slate-950 overflow-hidden flex items-center justify-center">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Road surface"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-slate-500 text-xs">No road image selected</div>
                )}

                {/* Subtle HUD coordinates */}
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-slate-900/80 backdrop-blur-xs text-[10px] font-mono text-slate-300 border border-slate-700">
                  Target: Asphalt Wearing Course | Frame Mode: Surface Inspection
                </div>

                {/* Prototype Bounding Box Overlays */}
                {currentResult && showBoundingBoxes && (
                  <>
                    <div
                      className="absolute border-2 border-rose-500 bg-rose-500/15 rounded-sm pointer-events-none"
                      style={{ top: "35%", left: "28%", width: "48%", height: "48%" }}
                    >
                      <div className="absolute -top-6 left-0 flex items-center gap-1 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-mono font-bold rounded-t shadow-md">
                        <span>[Prototype Box] {currentResult.damageType}</span>
                      </div>
                      {/* Reticles */}
                      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-400" />
                      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-rose-400" />
                      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-rose-400" />
                      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-400" />
                    </div>

                    <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-xs border border-slate-700 rounded-lg p-2 text-white text-[11px] font-mono shadow-md">
                      <span className="text-amber-400 font-bold block">
                        Prototype AI Assessment: {currentResult.severity} Severity
                      </span>
                      <span className="text-slate-400 text-[10px]">
                        Prototype Demo Result • Not certified field measurement
                      </span>
                    </div>
                  </>
                )}

                {/* Top Prototype Badge */}
                <div className="absolute top-2.5 right-2.5 bg-blue-600 text-white px-2 py-0.5 rounded text-[10px] font-mono font-bold shadow-sm">
                  {currentResult ? "PROTOTYPE RESULT" : "PREVIEW MODE"}
                </div>
              </div>

              {/* Viewport Footer Info */}
              <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-slate-950 border-t border-slate-800 text-[10px] font-mono text-slate-400 gap-2">
                <span>Proposed Pipeline: YOLO Object Detection Architecture</span>
                <span>Visual Decision-Support Aid</span>
              </div>
            </div>

            {/* Quick helper note under image */}
            <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-blue-600" />
                <span>Need to test different damage types? Switch samples above or upload your own.</span>
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: AI Analysis Result Card */}
          <div className="lg:col-span-6 space-y-6">
            {currentResult ? (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-6">
                
                {/* 1. Header: Report ID & Honest Prototype Badge */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Inspection Record
                    </span>
                    <span className="text-sm font-extrabold text-slate-900 font-mono">
                      {currentResult.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200">
                      Prototype AI Assessment
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                      Prototype Demo Result
                    </span>
                  </div>
                </div>

                {/* 2. Damage Type & Severity */}
                <div className="grid grid-cols-2 gap-4">
                  
                  {/* Damage Type */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Damage Type
                    </span>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-blue-600" />
                      <span className="text-base font-extrabold text-slate-900">
                        {currentResult.damageType}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      Surface defect categorization
                    </span>
                  </div>

                  {/* Severity */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                      Severity Level
                    </span>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-md text-xs font-bold border shadow-2xs ${getSeverityBadgeColor(
                          currentResult.severity
                        )}`}
                      >
                        {currentResult.severity} Severity
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 block">
                      Depth & spatial spread criteria
                    </span>
                  </div>
                </div>

                {/* 3. Prototype Assessment Narrative */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Prototype Assessment
                    </span>
                    <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-semibold">
                      Prototype Demo Result
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    {currentResult.aiAssessmentSummary}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed pl-1">
                    <strong className="text-slate-800">Safety Hazard Context:</strong> {currentResult.potentialSafetyImpact}
                  </p>
                </div>

                {/* 4. Priority Scoring */}
                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-blue-950 uppercase tracking-wider block">
                        Repair Priority Index
                      </span>
                      <span className="text-[10px] text-blue-700">
                        Prototype Demo Result (0–100 Advisory Scale)
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-extrabold text-blue-600 font-mono">
                        {currentResult.priorityScore}
                      </span>
                      <span className="text-xs text-slate-400 font-mono"> / 100</span>
                    </div>
                  </div>

                  {/* Priority Bar */}
                  <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${currentResult.priorityScore}%` }}
                    />
                  </div>

                  {/* Decision Weights Breakdown */}
                  <div className="grid grid-cols-3 gap-2 pt-1 text-center text-[10px] font-mono">
                    <div className="bg-white p-2 rounded-lg border border-blue-100">
                      <span className="text-slate-500 block">Severity (40%)</span>
                      <span className="font-bold text-slate-800">High Tier</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-blue-100">
                      <span className="text-slate-500 block">Road Type (25%)</span>
                      <span className="font-bold text-slate-800">Arterial Corridor</span>
                    </div>
                    <div className="bg-white p-2 rounded-lg border border-blue-100">
                      <span className="text-slate-500 block">Safety Risk (35%)</span>
                      <span className="font-bold text-slate-800">Elevated</span>
                    </div>
                  </div>
                </div>

                {/* 5. Human Verification Section */}
                <div className="pt-2 border-t border-slate-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                        <Building2 className="w-4 h-4 text-blue-600" />
                        Human Verification & Sign-off
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Municipal civil engineers must validate or adjust AI recommendation
                      </p>
                    </div>

                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                      {currentResult.verificationStatus}
                    </span>
                  </div>

                  {/* Verification Input Controls */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Reviewing Civil Engineer ID
                        </label>
                        <input
                          type="text"
                          value={reviewerName}
                          onChange={(e) => setReviewerName(e.target.value)}
                          className="w-full p-2 rounded-lg border border-slate-300 text-slate-800 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Adjust / Confirm Severity
                        </label>
                        <select
                          value={adjustedSeverity}
                          onChange={(e) =>
                            setAdjustedSeverity(e.target.value as SeverityLevel)
                          }
                          className="w-full p-2 rounded-lg border border-slate-300 text-slate-800 bg-white font-semibold"
                        >
                          <option value="Critical">Critical (Immediate Repair)</option>
                          <option value="High">High (Repair within 48h)</option>
                          <option value="Medium">Medium (Routine Patch)</option>
                          <option value="Low">Low (Scheduled Monitoring)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Engineering Review Notes
                      </label>
                      <textarea
                        rows={2}
                        value={reviewNotes}
                        onChange={(e) => setReviewNotes(e.target.value)}
                        className="w-full p-2 rounded-lg border border-slate-300 text-slate-800 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Action Determination
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        <button
                          type="button"
                          onClick={() => setActionChoice("Verified & Approved")}
                          className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                            actionChoice === "Verified & Approved"
                              ? "bg-emerald-600 text-white shadow-xs"
                              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          Approve Work
                        </button>
                        <button
                          type="button"
                          onClick={() => setActionChoice("Verified & Adjusted")}
                          className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                            actionChoice === "Verified & Adjusted"
                              ? "bg-blue-600 text-white shadow-xs"
                              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          Adjust Severity
                        </button>
                        <button
                          type="button"
                          onClick={() => setActionChoice("Rejected / False Positive")}
                          className={`p-2 rounded-lg text-center font-bold transition-all cursor-pointer ${
                            actionChoice === "Rejected / False Positive"
                              ? "bg-rose-600 text-white shadow-xs"
                              : "bg-white border border-slate-300 text-slate-700 hover:bg-slate-100"
                          }`}
                        >
                          Reject Defect
                        </button>
                      </div>
                    </div>

                    <button
                      id="save-verification-btn"
                      onClick={handleApplyVerification}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Engineer Sign-off & Update Central Dashboard</span>
                    </button>

                    {submittedToDashboard && (
                      <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>
                          Verified report submitted to Central Dashboard & GIS monitoring map!
                        </span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            ) : (
              /* Empty state before running analysis */
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-8 text-center space-y-4 flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Camera className="w-7 h-7" />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <h3 className="text-base font-bold text-slate-900">
                    Awaiting Image Analysis
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Click <strong>“Analyze Road Damage”</strong> above to run prototype defect detection, severity assessment, and priority scoring on the selected photograph.
                  </p>
                </div>
                <button
                  onClick={handleRunAnalysis}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Run Analysis Now</span>
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
