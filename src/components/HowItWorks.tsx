import React, { useState } from "react";
import {
  Workflow,
  Camera,
  Layers,
  Cpu,
  Sliders,
  LayoutDashboard,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  ChevronRight,
  Activity,
  UserCheck,
} from "lucide-react";

export const HowItWorks: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(3); // Default to AI/ML Engine

  const stages = [
    {
      id: "source",
      number: "1",
      title: "Real-World Source",
      shortDesc: "Dashcams & mobile cameras",
      icon: Camera,
      tag: "Input Layer",
      color: "blue",
      details:
        "Highways, urban transit arterials, and municipal roads captured through vehicular dashcams, mounted civic inspection cameras, or student/surveyor mobile phones under variable daylight and surface dampness.",
      specs: [
        "Vehicular dashcam feeds and fixed pole inspection rigs",
        "Mobile smartphone cameras during on-foot pavement audits",
        "Variable lighting, rain shadows, and surface texture diversity",
      ],
    },
    {
      id: "acquisition",
      number: "2",
      title: "Data Acquisition",
      shortDesc: "Capture & telemetry ingestion",
      icon: Activity,
      tag: "Ingestion Layer",
      color: "indigo",
      details:
        "Systematic recording and spatial tagging of road pavement visual frames. Images are packaged with telemetry including rough location tags, road class (expressway vs. secondary), and capture timestamp.",
      specs: [
        "Continuous photographic frame sampling or spot snapshots",
        "Attachment of GPS coordinates, transit sector, and audit date metadata",
        "Local buffering and upload queuing for intermittent connectivity",
      ],
    },
    {
      id: "preprocessing",
      number: "3",
      title: "Pre-Processing",
      shortDesc: "Resize, normalize & contrast",
      icon: Layers,
      tag: "Data Pipeline",
      color: "amber",
      details:
        "Standardizes raw imagery into uniform dimensional inputs suitable for deep neural vision networks. Filters sensor noise and enhances pavement texture contrast.",
      specs: [
        "Resizing to standard tensor dimension (640×640 or 1024×1024)",
        "RGB channel normalization across 0.0–1.0 floating point ranges",
        "Contrast equalization to mitigate harsh asphalt shadows and sun glare",
      ],
    },
    {
      id: "engine",
      number: "4",
      title: "AI/ML Engine",
      subLabel: "Proposed YOLO-based Computer Vision",
      shortDesc: "Object detection & classification",
      icon: Cpu,
      tag: "Inference Model",
      color: "rose",
      details:
        "Proposed deep learning object detection model (YOLO architecture) to infer 2D bounding boxes and semantic classifications across potholes, transverse cracks, alligator fatigue networks, and shoulder drop-offs.",
      specs: [
        "Single-shot convolutional feature extraction across pavement tensors",
        "Bounding box coordinate regression [ymin, xmin, ymax, xmax]",
        "Prototype class probability distribution and confidence estimation",
      ],
    },
    {
      id: "decision",
      number: "5",
      title: "Decision Logic",
      shortDesc: "Severity & repair priority index",
      icon: Sliders,
      tag: "Heuristic Core",
      color: "purple",
      details:
        "Evaluates the structural cavity depth and surface area against the functional hierarchy of the road to compute a weighted 0–100 repair urgency priority score.",
      specs: [
        "Severity tiering: Low, Medium, High, and Critical thresholds",
        "Contextual weighting: Expressway vs. arterial vs. residential streets",
        "Safety risk impact: Two-wheeler instability and vehicle swerving hazards",
      ],
    },
    {
      id: "ui",
      number: "6",
      title: "User Interface",
      shortDesc: "Dashboard, map & reports",
      icon: LayoutDashboard,
      tag: "Presentation",
      color: "emerald",
      details:
        "Consolidates inference findings into intuitive Smart City monitoring views: interactive detection viewports, priority ranking tables, and GIS spatial damage maps.",
      specs: [
        "Real-time visual bounding box overlays with prototype metrics",
        "Centralized municipal dashboard with sortable audit records",
        "Spatial GIS sector map visualizing localized cluster hotspots",
      ],
    },
  ];

  return (
    <section className="py-12 bg-slate-50 min-h-[850px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
            <Workflow className="w-3.5 h-3.5 text-blue-600" />
            <span>Design Thinking Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Technical Architecture & Workflow
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            The end-to-end technical pipeline connects physical roadside data acquisition with deep learning computer vision and human-governed municipal decision support.
          </p>
        </div>

        {/* VISUAL ARCHITECTURE FLOWCHART DIAGRAM */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-wider block">
                System Block Architecture
              </span>
              <h3 className="text-lg font-extrabold text-slate-900">
                End-to-End Road Surface Analysis Pipeline
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-semibold">
                6 Sequential Stages
              </span>
              <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                Human-in-the-Loop
              </span>
            </div>
          </div>

          {/* Sequential 6 Nodes Grid with Connecting Arrows */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3 relative">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              const isSelected = activeStep === idx;

              return (
                <div key={stage.id} className="flex flex-col">
                  <button
                    id={`architecture-node-${stage.id}`}
                    onClick={() => setActiveStep(idx)}
                    className={`p-4 rounded-xl text-left border transition-all h-full flex flex-col justify-between cursor-pointer group ${
                      isSelected
                        ? "bg-blue-50/70 border-blue-600 shadow-md ring-2 ring-blue-200"
                        : "bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-white shadow-2xs"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2.5">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {stage.number}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                          {stage.tag}
                        </span>
                      </div>

                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 ${
                          isSelected
                            ? "bg-blue-600 text-white"
                            : "bg-white text-slate-700 shadow-2xs"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <h4 className="text-xs font-extrabold text-slate-900 leading-snug">
                        {stage.title}
                      </h4>
                      {stage.subLabel && (
                        <p className="text-[10px] font-bold text-rose-600 mt-0.5 leading-tight">
                          {stage.subLabel}
                        </p>
                      )}
                      <p className="text-[11px] text-slate-500 font-medium mt-1 leading-snug">
                        {stage.shortDesc}
                      </p>
                    </div>

                    <div className="pt-2 mt-3 border-t border-slate-200/80 flex items-center justify-between text-[10px] text-blue-600 font-bold">
                      <span>{isSelected ? "Inspecting" : "Click to view"}</span>
                      {idx < 5 && (
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 hidden lg:block" />
                      )}
                    </div>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Architecture Stage */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                  STAGE {stages[activeStep].number} OF 6
                </span>
                <h4 className="text-base font-extrabold text-slate-900">
                  {stages[activeStep].title} {stages[activeStep].subLabel ? `— ${stages[activeStep].subLabel}` : ""}
                </h4>
              </div>
              <span className="text-xs text-slate-500 font-mono">
                {stages[activeStep].tag}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-4xl">
              {stages[activeStep].details}
            </p>

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Technical Specifications & Protocols:
              </span>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs text-slate-600">
                {stages[activeStep].specs.map((spec, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 bg-white p-3 rounded-xl border border-slate-200 shadow-2xs"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* HUMAN VERIFICATION & FEEDBACK LOOP ARCHITECTURE BLOCK */}
          <div className="rounded-2xl bg-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 mb-1.5">
                  GOVERNANCE & SUPERVISED RETRAINING
                </span>
                <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span>Human Verification</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                  <span className="text-blue-400">Feedback Loop</span>
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Closed-Loop Quality Control
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Block 1: Human Verification */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Human Verification Gate</h4>
                    <span className="text-xs text-slate-400">Certified Civil Authority Review</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Before repair crews or procurement budgets are dispatched, municipal civil engineers inspect the visual frame, calibrate severity estimates, adjust the priority index, and formally approve work orders. AI does not independently approve repairs.
                </p>
                <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Mandatory stop-gate before municipal resource disbursement</span>
                </div>
              </div>

              {/* Block 2: Feedback Loop */}
              <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Feedback Loop to AI Engine</h4>
                    <span className="text-xs text-slate-400">Continuous Model Refinement</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineer overrides, confirmed labels, and rejected false alarms are archived into a curated evaluation dataset. This supervised loop feeds back into Stage 4 (“Proposed YOLO-based Computer Vision”) to improve accuracy on regional asphalt edge cases.
                </p>
                <div className="text-[11px] font-mono text-blue-400 flex items-center gap-1.5 pt-1">
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Iterative fine-tuning on local pavement failure patterns</span>
                </div>
              </div>

            </div>

            {/* Architecture Feedback Loop Connection Bar */}
            <div className="p-3.5 rounded-xl bg-blue-950/60 border border-blue-800/80 text-xs text-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-[11px] flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Supervised Loop: Stage 6 (UI) → Human Gate → Retraining Repository → Stage 4 (AI/ML Engine)</span>
              </span>
              <span className="text-[10px] font-mono bg-blue-900 px-2 py-0.5 rounded text-blue-300 shrink-0">
                Active Closed Loop
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
