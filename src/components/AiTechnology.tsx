import React from "react";
import {
  Cpu,
  Layers,
  Box,
  Binary,
  Sliders,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Code2,
  Network,
  GitBranch,
} from "lucide-react";

export const AiTechnology: React.FC = () => {
  const steps = [
    {
      title: "1. Image Acquisition",
      desc: "Capturing road surface optical imagery using vehicular dashcam setups or mobile smartphone cameras under natural road lighting.",
    },
    {
      title: "2. Image Preprocessing",
      desc: "Color channel normalization, aspect ratio preserving resizing (640×640), and contrast enhancement to reduce glare and tree shadows.",
    },
    {
      title: "3. YOLO-Based Object Detection",
      desc: "Proposed single-pass convolutional neural network applying multi-scale feature pyramids to infer spatial grid anchors and objectness probabilities.",
    },
    {
      title: "4. Road Damage Identification",
      desc: "Bounding box localization and multi-class classification across potholes, longitudinal/alligator cracks, uneven rutting, and shoulder edges.",
    },
    {
      title: "5. Severity Assessment",
      desc: "Geometric cavity area estimation and pixel aspect ratios to estimate damage depth and class into Low, Medium, High, or Critical tiers.",
    },
    {
      title: "6. Priority Scoring",
      desc: "Mathematical weighting algorithm combining damage severity, road functional classification (expressway vs local), and safety hazard indices.",
    },
    {
      title: "7. Human Verification",
      desc: "Human-in-the-loop decision interface ensuring civil engineers validate inferences before municipal repair work orders are dispatched.",
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
            <span>Proposed Computer Vision Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            AI-Powered Computer Vision
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Technical specification of the proposed YOLO (You Only Look Once) deep learning computer vision model designed for real-time road surface defect identification.
          </p>

          {/* Academic Honesty Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="font-bold text-amber-950">
                Academic Project Implementation Scope:
              </p>
              <p className="text-amber-800 leading-relaxed text-xs">
                “IMPORTANT: Do not claim the YOLO model is trained or tested unless an actual model is connected.” The YOLO architecture represents the proposed target edge model in this college Design Thinking conceptual study; the interactive demonstration on this platform utilizes multimodal vision evaluation as a functional proxy.
              </p>
            </div>
          </div>
        </div>

        {/* Proposed Project Approach: 7 Sequential Stages */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-900">
            Proposed Project Methodology
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((st, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-slate-50 border border-slate-200/90 space-y-2 hover:bg-white hover:shadow-xs transition-all"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-mono font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{st.title.split(". ")[1]}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Architecture Diagram */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Network className="w-5 h-5 text-blue-400" />
                Technical Neural Network Pipeline Diagram
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Schematic of Convolutional Feature Extractor, Neck FPN, and Detection Head
              </p>
            </div>
            <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-slate-300">
              YOLOv8 / YOLO-NAS Proposed Topology
            </span>
          </div>

          {/* Graphical Pipeline Stages */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            
            {/* Stage 1: Input Tensor */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>INPUT TENSOR</span>
                <span className="text-blue-400">3 × 640 × 640</span>
              </div>
              <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-400">
                <Layers className="w-8 h-8 text-blue-500 mb-1" />
                <span className="font-mono text-[11px] text-slate-200">Normalized RGB</span>
                <span className="text-[10px] text-slate-500">Pavement Surface Frame</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Standardized input matrix filtered for illumination variances.
              </p>
            </div>

            {/* Stage 2: Backbone Network */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>BACKBONE</span>
                <span className="text-indigo-400">DarkNet / CSP</span>
              </div>
              <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-400">
                <GitBranch className="w-8 h-8 text-indigo-400 mb-1" />
                <span className="font-mono text-[11px] text-slate-200">Conv + C2f Blocks</span>
                <span className="text-[10px] text-slate-500">Spatial Feature Extraction</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Extracts edges, rough asphalt textures, and cavity boundaries.
              </p>
            </div>

            {/* Stage 3: Neck Feature Pyramid */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>NECK (FPN + PAN)</span>
                <span className="text-amber-400">Multi-Scale</span>
              </div>
              <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-400">
                <Binary className="w-8 h-8 text-amber-400 mb-1" />
                <span className="font-mono text-[11px] text-slate-200">Feature Pyramids</span>
                <span className="text-[10px] text-slate-500">Small Cracks to Large Holes</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Fuses high-level semantic data with fine low-level hairline crack features.
              </p>
            </div>

            {/* Stage 4: Detection Head */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>HEAD & NMS</span>
                <span className="text-emerald-400">Decoupled Head</span>
              </div>
              <div className="h-28 rounded-lg bg-slate-900 border border-slate-800 flex flex-col items-center justify-center p-2 text-center text-slate-400">
                <Box className="w-8 h-8 text-emerald-400 mb-1" />
                <span className="font-mono text-[11px] text-slate-200">Bounding Box + Class</span>
                <span className="text-[10px] text-slate-500">Pothole / Crack / Uneven</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                Outputs regression vectors and confidence scores passed to decision logic.
              </p>
            </div>

          </div>

          <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-slate-400 text-xs flex items-center justify-between">
            <span className="font-mono">Inference Output: Class + Bounding Coordinates + Severity Tier</span>
            <span className="text-blue-400 font-mono">Target Embedded Platform: Edge GPU / Jetson</span>
          </div>
        </div>

      </div>
    </section>
  );
};
