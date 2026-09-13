import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  FileCheck2,
  Eye,
  EyeOff,
  Sliders,
  MapPin,
  Clock,
  Send,
  Building2,
  Info,
} from "lucide-react";
import { AnalysisResult, SeverityLevel, VerificationStatus } from "../types";

interface AnalysisResultViewProps {
  result: AnalysisResult;
  onVerify: (updatedResult: AnalysisResult) => void;
  onSubmitReport: (result: AnalysisResult) => void;
  onAnalyzeAnother: () => void;
}

export const AnalysisResultView: React.FC<AnalysisResultViewProps> = ({
  result,
  onVerify,
  onSubmitReport,
  onAnalyzeAnother,
}) => {
  const [showBoxes, setShowBoxes] = useState(true);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Human verification modal states
  const [reviewerName, setReviewerName] = useState("Municipal Road Engineer #402");
  const [adjustedSeverity, setAdjustedSeverity] = useState<SeverityLevel>(result.severity);
  const [reviewNotes, setReviewNotes] = useState(
    "Visual pavement cavity confirmed. Recommend dispatching asphalt patching maintenance crew."
  );
  const [actionChoice, setActionChoice] = useState<VerificationStatus>("Verified & Approved");

  const getSeverityBadgeColor = (sev: SeverityLevel) => {
    switch (sev) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-300";
      case "High":
        return "bg-rose-100 text-rose-800 border-rose-300";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "Low":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
    }
  };

  const getPriorityGaugeColor = (score: number) => {
    if (score >= 80) return "text-red-600 stroke-red-600";
    if (score >= 60) return "text-rose-600 stroke-rose-600";
    if (score >= 40) return "text-amber-500 stroke-amber-500";
    return "text-emerald-600 stroke-emerald-600";
  };

  const handleConfirmVerification = () => {
    const updated: AnalysisResult = {
      ...result,
      severity: adjustedSeverity,
      verificationStatus: actionChoice,
      verifiedBy: reviewerName,
      verificationNotes: reviewNotes,
    };
    onVerify(updated);
    setShowVerifyModal(false);
  };

  const handleSubmit = () => {
    onSubmitReport(result);
    setSubmitted(true);
  };

  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Header & Disclaimers */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-blue-800 text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Prototype AI Analysis</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              AI Damage Analysis
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Evaluative inference result for Design Thinking road maintenance decision support
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              id="analyze-another-top-btn"
              onClick={onAnalyzeAnother}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Analyze Another Image</span>
            </button>
          </div>
        </div>

        {/* Academic Label Alert Notice */}
        <div className="p-4 rounded-xl bg-blue-50/90 border border-blue-200 text-blue-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5 leading-relaxed">
            <p className="font-bold text-blue-900">
              Academic Decision-Support Prototype Notice
            </p>
            <p className="text-blue-800 text-xs">
              This detection is a <strong className="font-semibold text-blue-950">Prototype Result</strong>. Road repair work cannot be independently authorized by AI and requires human municipal authority verification.
            </p>
          </div>
        </div>

        {/* Main Grid: Image with Detection Overlay + Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image Viewer with Detection Boxes */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-xl relative">
              
              {/* Header inside viewer */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping" />
                  <span className="font-mono text-[11px]">Detection Viewport // {result.id}</span>
                </div>
                <button
                  onClick={() => setShowBoxes(!showBoxes)}
                  className="flex items-center gap-1 text-[11px] font-mono text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800/80 cursor-pointer"
                >
                  {showBoxes ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{showBoxes ? "Hide Bounding Boxes" : "Show Bounding Boxes"}</span>
                </button>
              </div>

              {/* Viewport Canvas */}
              <div className="relative aspect-16/11 bg-slate-950 overflow-hidden">
                {result.imageUrl && (
                  <img
                    src={result.imageUrl}
                    alt="Analyzed Road Surface"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Interactive Simulated/Detected Bounding Box */}
                {showBoxes && result.identifiedIssues?.map((issue, idx) => {
                  const box = issue.box2d || [350, 240, 750, 760];
                  // box2d is [ymin, xmin, ymax, xmax] 0-1000
                  const top = `${box[0] / 10}%`;
                  const left = `${box[1] / 10}%`;
                  const height = `${(box[2] - box[0]) / 10}%`;
                  const width = `${(box[3] - box[1]) / 10}%`;

                  return (
                    <div
                      key={idx}
                      className="absolute border-2 border-rose-500 bg-rose-500/15 rounded-xs pointer-events-none"
                      style={{ top, left, width, height }}
                    >
                      <div className="absolute -top-6 left-0 bg-rose-600 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-t shadow-md whitespace-nowrap">
                        {result.damageType.toUpperCase()} // {result.confidencePercent}% Conf.
                      </div>
                    </div>
                  );
                })}

                {/* Bottom telemetry overlay */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-900/80 backdrop-blur-md text-[11px] font-mono text-slate-300 border border-slate-800">
                  <span>Class: {result.damageType}</span>
                  <span className="text-amber-400">Status: {result.verificationStatus}</span>
                </div>
              </div>
            </div>

            {/* Identified Feature Details */}
            <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Pavement Feature Breakdown
              </h4>
              {result.identifiedIssues?.map((issue, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs text-slate-900">{issue.name}</strong>
                    <span className="text-[11px] font-mono text-slate-500">{issue.approximateLocation}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{issue.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Structured AI Assessment & Priority Gauge */}
          <div className="lg:col-span-6 space-y-5">
            
            {/* Main Result Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-sm space-y-6">
              
              {/* Primary Class & Severity Banner */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                    Detected Damage Type
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
                    {result.damageType}
                  </h3>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Assessed Severity
                  </span>
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${getSeverityBadgeColor(
                      result.severity
                    )}`}
                  >
                    <AlertTriangle className="w-3.5 h-3.5 mr-1" />
                    {result.severity} Severity
                  </span>
                </div>
              </div>

              {/* Priority Gauge & Confidence Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 0-100 Priority Gauge Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center gap-4">
                  <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                    <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-slate-200 stroke-current"
                        strokeWidth="3.5"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className={getPriorityGaugeColor(result.priorityScore)}
                        strokeDasharray={`${result.priorityScore}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute font-extrabold text-sm text-slate-900 font-mono">
                      {result.priorityScore}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Repair Priority
                    </span>
                    <strong className="text-base text-slate-900 block font-mono">
                      {result.priorityScore} / 100
                    </strong>
                    <span className="text-[11px] text-slate-500">
                      {result.priorityScore >= 75 ? "High Urgency" : result.priorityScore >= 50 ? "Moderate Urgency" : "Scheduled Cycle"}
                    </span>
                  </div>
                </div>

                {/* AI Confidence Card */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                      Prototype AI Assessment
                    </span>
                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-bold">
                      Prototype Demo Result
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-extrabold text-blue-600 font-mono">
                      {result.confidencePercent}%
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      Evaluative score
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1">
                    Prototype metric — not validated model accuracy
                  </span>
                </div>

              </div>

              {/* Status & Location Meta */}
              <div className="space-y-3 text-xs bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    Verification Status:
                  </span>
                  <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    {result.verificationStatus}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    Location Sector:
                  </span>
                  <span className="font-semibold text-slate-800">
                    {result.location}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    Inspection Timestamp:
                  </span>
                  <span className="font-mono text-slate-700">
                    {new Date(result.timestamp).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Potential Safety Impact */}
              <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 space-y-1.5">
                <div className="flex items-center gap-1.5 text-amber-900 text-xs font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span>Potential Safety Impact</span>
                </div>
                <p className="text-xs text-amber-900/90 leading-relaxed">
                  {result.potentialSafetyImpact}
                </p>
              </div>

              {/* Recommended Action */}
              <div className="space-y-1 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[11px] block">
                  AI Decision Support Recommendation:
                </span>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200/80">
                  {result.recommendedAction}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                <button
                  id="verify-result-btn"
                  onClick={() => setShowVerifyModal(true)}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 active:scale-98 shadow-sm transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Verify Result (Human Authority)</span>
                </button>

                <button
                  id="submit-report-btn"
                  disabled={submitted}
                  onClick={handleSubmit}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 disabled:bg-emerald-600 disabled:opacity-90 active:scale-98 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Report Submitted to Central Log</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Report to Dashboard</span>
                    </>
                  )}
                </button>
              </div>

            </div>

          </div>

        </div>

        {/* Human Verification Modal */}
        {showVerifyModal && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-slate-900 text-emerald-400 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">
                      Human Authority Verification
                    </h3>
                    <p className="text-xs text-slate-500">
                      Civil Engineer Review & Work Order Authorization
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowVerifyModal(false)}
                  className="text-slate-400 hover:text-slate-700 text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                {/* Notice */}
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  AI predictions act as decision support. You have the ultimate authority to confirm, downgrade, upgrade, or reject this recommendation.
                </div>

                {/* Reviewer ID */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Authorizing Engineer ID / Role
                  </label>
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800 focus:outline-blue-500"
                  />
                </div>

                {/* Severity adjustment */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Adjust Assessed Severity
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["Low", "Medium", "High", "Critical"] as SeverityLevel[]).map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setAdjustedSeverity(level)}
                        className={`py-2 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                          adjustedSeverity === level
                            ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                            : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Verification Decision */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Formal Status Decision
                  </label>
                  <select
                    value={actionChoice}
                    onChange={(e) => setActionChoice(e.target.value as VerificationStatus)}
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 bg-white text-slate-800"
                  >
                    <option value="Verified & Approved">Verified & Approved for Repair</option>
                    <option value="Verified & Adjusted">Verified & Adjusted Priority</option>
                    <option value="Rejected">Rejected (Not actionable / False positive)</option>
                  </select>
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Engineering Verification Notes
                  </label>
                  <textarea
                    rows={3}
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full text-xs rounded-lg border border-slate-300 p-2.5 text-slate-800"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmVerification}
                  className="px-5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm"
                >
                  Confirm Sign-Off
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
