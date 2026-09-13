import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { FieldObservation } from "./components/FieldObservation";
import { DetectDamage } from "./components/DetectDamage";
import { AnalysisResultView } from "./components/AnalysisResultView";
import { RepairPriority } from "./components/RepairPriority";
import { Dashboard } from "./components/Dashboard";
import { DamageMap } from "./components/DamageMap";
import { HowItWorks } from "./components/HowItWorks";
import { AiTechnology } from "./components/AiTechnology";
import { ResponsibleAi } from "./components/ResponsibleAi";
import { Footer } from "./components/Footer";

import {
  AnalysisResult,
  DamageReportItem,
  MapMarker,
  VerificationStatus,
} from "./types";
import {
  INITIAL_DASHBOARD_REPORTS,
  DEMO_MAP_MARKERS,
  SAMPLE_ROAD_IMAGES,
} from "./data/mockData";
import { CheckCircle2, AlertCircle, Info, Sparkles, X } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("home");
  const [reports, setReports] = useState<DamageReportItem[]>(INITIAL_DASHBOARD_REPORTS);
  const [markers, setMarkers] = useState<MapMarker[]>(DEMO_MAP_MARKERS);

  // Selected or active analysis result
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(null);

  // External image payload sent from Field Observation into Detector
  const [externalImagePayload, setExternalImagePayload] = useState<{
    imageUrl: string;
    hint: string;
  } | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Callback when an observation in Page 2 is sent to AI detection
  const handleAnalyzeObservation = (imageUrl: string, hint: string) => {
    setExternalImagePayload({ imageUrl, hint });
    setActiveTab("detect");
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast(`Loaded field photograph for computer vision analysis.`);
  };

  // Callback when AI analysis finishes in Page 3
  const handleAnalysisComplete = (result: AnalysisResult) => {
    setCurrentResult(result);
    showToast(`AI Damage Analysis computed for ${result.damageType} (${result.severity} severity).`);
  };

  // Callback when human engineer verifies the result
  const handleVerifyResult = (updated: AnalysisResult) => {
    setCurrentResult(updated);

    // Update in reports if it exists
    setReports((prev) =>
      prev.map((rep) =>
        rep.id === updated.id
          ? {
              ...rep,
              severity: updated.severity,
              status: updated.verificationStatus,
              verifiedBy: updated.verifiedBy,
              notes: updated.verificationNotes,
            }
          : rep
      )
    );

    showToast(`Human verification confirmed: ${updated.verificationStatus}`);
  };

  // Callback when user submits report to central dashboard
  const handleSubmitReport = (result: AnalysisResult) => {
    const newReport: DamageReportItem = {
      id: result.id,
      damageType: result.damageType,
      severity: result.severity,
      priorityScore: result.priorityScore,
      location: result.location,
      status: result.verificationStatus,
      date: new Date().toISOString().split("T")[0],
      imageUrl: result.imageUrl,
      verifiedBy: result.verifiedBy,
      notes: result.aiAssessmentSummary,
    };

    // Add to dashboard reports (avoid duplicate ID)
    setReports((prev) => [
      newReport,
      ...prev.filter((r) => r.id !== newReport.id),
    ]);

    // Add to map markers
    const newMarker: MapMarker = {
      id: `mark-${Date.now()}`,
      title: `${result.damageType} Inspection Point`,
      damageType: result.damageType,
      severity: result.severity,
      priorityScore: result.priorityScore,
      location: result.location,
      roadName: result.location,
      xPercent: 35 + Math.floor(Math.random() * 40),
      yPercent: 30 + Math.floor(Math.random() * 40),
      status: result.verificationStatus,
      reportedDate: new Date().toISOString().split("T")[0],
    };

    setMarkers((prev) => [newMarker, ...prev]);

    showToast(`Report ${result.id} successfully added to central monitoring records & GIS map!`);
  };

  // Update status directly from dashboard
  const handleUpdateStatus = (id: string, newStatus: VerificationStatus) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
    showToast(`Report ${id} status updated to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Academic Disclaimer & Navigation Header */}
      <Navbar activeTab={activeTab} onNavigate={handleNavigate} />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {/* TAB 1: HOME */}
        {activeTab === "home" && (
          <>
            <Hero onNavigate={handleNavigate} />
            {/* Quick preview of field evidence & priority */}
            <div className="border-t border-slate-200">
              <HowItWorks />
            </div>
            <div className="border-t border-slate-200">
              <ResponsibleAi />
            </div>
          </>
        )}

        {/* TAB 2: FIELD OBSERVATION */}
        {activeTab === "field-observation" && (
          <FieldObservation onAnalyzeObservation={handleAnalyzeObservation} />
        )}

        {/* TAB 3: DETECT DAMAGE */}
        {activeTab === "detect" && (
          <DetectDamage
            onAnalysisComplete={handleAnalysisComplete}
            externalImageToAnalyze={externalImagePayload}
          />
        )}

        {/* TAB 4: ANALYSIS RESULT */}
        {activeTab === "result" && (
          <>
            {currentResult ? (
              <AnalysisResultView
                result={currentResult}
                onVerify={handleVerifyResult}
                onSubmitReport={handleSubmitReport}
                onAnalyzeAnother={() => {
                  setExternalImagePayload(null);
                  setActiveTab("detect");
                }}
              />
            ) : (
              <div className="py-24 text-center max-w-lg mx-auto px-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  No Active Analysis Result Yet
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Upload a road surface photograph or select a benchmark sample in the Detect Damage module to view AI-assisted predictions.
                </p>
                <button
                  onClick={() => setActiveTab("detect")}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold shadow-sm hover:bg-blue-700 cursor-pointer"
                >
                  Go to Detect Damage
                </button>
              </div>
            )}
          </>
        )}

        {/* TAB 5: REPAIR PRIORITY */}
        {activeTab === "priority" && <RepairPriority />}

        {/* TAB 6: DASHBOARD */}
        {activeTab === "dashboard" && (
          <Dashboard
            reports={reports}
            onInspectReport={(report) => {
              // Optionally populate analysis result
              if (report.imageUrl) {
                setCurrentResult({
                  id: report.id,
                  damageType: report.damageType,
                  severity: report.severity,
                  confidencePercent: 86,
                  priorityScore: report.priorityScore,
                  potentialSafetyImpact:
                    "Pavement cavity identified in municipal roadway report file.",
                  roadConditionRating: "Poor",
                  identifiedIssues: [
                    {
                      name: "Recorded Pavement Defect",
                      description: report.notes || "Inspected road damage",
                      approximateLocation: report.location,
                      box2d: [300, 250, 700, 750],
                    },
                  ],
                  decisionFactors: {
                    damageSeverityWeight: 80,
                    roadConditionWeight: 70,
                    trafficSafetyImpactWeight: 80,
                  },
                  aiAssessmentSummary: report.notes || "Prototype defect analysis",
                  recommendedAction: "Schedule bituminous asphalt patch maintenance",
                  location: report.location,
                  timestamp: report.date,
                  verificationStatus: report.status,
                  imageUrl: report.imageUrl,
                  isSimulated: true,
                  note: "Prototype AI Analysis",
                });
                setActiveTab("result");
              }
            }}
            onUpdateStatus={handleUpdateStatus}
          />
        )}

        {/* TAB 7: MAP */}
        {activeTab === "map" && <DamageMap markers={markers} />}

        {/* TAB 8: HOW IT WORKS */}
        {activeTab === "how-it-works" && <HowItWorks />}

        {/* TAB 9: AI TECHNOLOGY */}
        {activeTab === "technology" && <AiTechnology />}

        {/* TAB 10: RESPONSIBLE AI */}
        {activeTab === "responsible-ai" && <ResponsibleAi />}
      </main>

      {/* Floating Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center justify-between gap-3 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="leading-snug">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Footer & Call to Action */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
