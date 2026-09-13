import React from "react";
import {
  ArrowRight,
  LayoutDashboard,
  ShieldCheck,
  Search,
  Sliders,
  AlertTriangle,
  Sparkles,
  Camera,
  CheckCircle2,
} from "lucide-react";
import { SAMPLE_ROAD_IMAGES } from "../data/mockData";

interface HeroProps {
  onNavigate: (tabId: string) => void;
  activeImage?: string;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, activeImage }) => {
  const displayImage = activeImage || SAMPLE_ROAD_IMAGES[0].svgUrl;

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-linear-to-b from-blue-50/60 via-white to-slate-50">
      {/* Background Subtle Line Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f01f_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f01f_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Heading & Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-semibold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>College Design Thinking Project Prototype</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Smarter Roads. <br />
              <span className="text-blue-600">Faster Detection.</span> <br />
              Better Priorities.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              AI-assisted road surface damage detection and repair prioritization for safer and more efficient road maintenance.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                id="hero-detect-btn"
                onClick={() => onNavigate("detect")}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-600/25 transition-all cursor-pointer"
              >
                <span>Detect Road Damage</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-dashboard-btn"
                onClick={() => onNavigate("dashboard")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200/90 shadow-2xs active:scale-98 transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4 text-slate-500" />
                <span>View Dashboard</span>
              </button>
            </div>

            {/* Academic Notice Pill */}
            <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200/80 text-xs text-slate-600 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <p className="leading-snug">
                <strong className="text-slate-800">Academic Prototype Notice:</strong> AI assists human decision-making; it does not independently approve road repairs. All detection outputs represent a <span className="font-semibold text-blue-700">Prototype Demo Result</span>.
              </p>
            </div>
          </div>

          {/* Right Column: Realistic Road-Image Analysis Interface */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden">
              
              {/* Engineering Workstation Window Header */}
              <div className="flex items-center justify-between px-4 py-2.5 bg-slate-950 border-b border-slate-800 text-xs">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 ml-1.5">
                    RoadAI Workstation // Image Inspection Viewport
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800">
                    <Camera className="w-3 h-3 text-blue-400" />
                    SURFACE FRAME: KM 14.2
                  </span>
                </div>
              </div>

              {/* Realistic Road Display with Clean Prototype Detection Overlay */}
              <div className="relative overflow-hidden aspect-[16/10] bg-slate-950">
                <img
                  src={displayImage}
                  alt="Road surface photograph showing asphalt damage"
                  className="w-full h-full object-cover"
                />

                {/* Subtle Coordinate Overlay (Realistic inspection tool) */}
                <div className="absolute top-2.5 left-2.5 px-2 py-1 rounded bg-slate-900/85 backdrop-blur-xs text-[10px] font-mono text-slate-300 border border-slate-700/70">
                  Sector: Arterial Corridor | Resolution: 1920×1080 | Pavement: Bituminous Asphalt
                </div>

                {/* Prototype Bounding Box 1: Pothole Cavity */}
                <div
                  className="absolute border-2 border-rose-500 bg-rose-500/10 rounded-sm pointer-events-none"
                  style={{ top: "42%", left: "38%", width: "42%", height: "40%" }}
                >
                  {/* Clean Inspection Tag */}
                  <div className="absolute -top-6 left-0 flex items-center gap-1.5 px-2 py-0.5 bg-rose-600 text-white text-[10px] font-mono font-bold rounded-t shadow-sm">
                    <span>[Prototype Box] Pothole Cavity</span>
                  </div>
                  {/* Corner Reticles */}
                  <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-rose-400" />
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-rose-400" />
                  <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-rose-400" />
                  <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-rose-400" />
                </div>

                {/* Prototype Bounding Box 2: Surface Fissure */}
                <div
                  className="absolute border border-amber-400/90 border-dashed bg-amber-400/10 rounded-sm pointer-events-none"
                  style={{ top: "24%", left: "62%", width: "26%", height: "22%" }}
                >
                  <div className="absolute -top-5 left-0 px-1.5 py-0.5 bg-amber-500 text-slate-950 text-[9px] font-mono font-bold rounded-t">
                    <span>[Prototype Box] Micro-Crack</span>
                  </div>
                </div>

                {/* Realistic Analysis Result Overlay Card */}
                <div className="absolute bottom-3 left-3 right-3 sm:right-auto bg-slate-900/95 backdrop-blur-md border border-slate-700/90 rounded-xl p-3 text-white text-xs max-w-sm space-y-1.5 shadow-xl">
                  <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      Prototype AI Assessment:
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-300 text-[10px] font-mono font-bold border border-blue-700/60">
                      Prototype Demo Result
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-0.5 text-center">
                    <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50">
                      <span className="text-[9px] text-slate-400 block uppercase font-mono">Defect</span>
                      <span className="font-bold text-rose-400 text-xs">Pothole</span>
                    </div>
                    <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50">
                      <span className="text-[9px] text-slate-400 block uppercase font-mono">Severity</span>
                      <span className="font-bold text-amber-300 text-xs">High</span>
                    </div>
                    <div className="bg-slate-800/80 p-1.5 rounded-lg border border-slate-700/50">
                      <span className="text-[9px] text-slate-400 block uppercase font-mono">Priority</span>
                      <span className="font-bold text-blue-400 text-xs font-mono">82 / 100</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400 pt-0.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span>Awaiting municipal engineer verification & work order approval</span>
                  </div>
                </div>

                {/* Top Prototype Badge */}
                <div className="absolute top-2.5 right-2.5 bg-slate-900/90 border border-slate-700 text-slate-200 px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <span>Prototype Visualization</span>
                </div>
              </div>

              {/* Workstation Footer Status */}
              <div className="flex flex-wrap items-center justify-between px-4 py-2 text-[11px] font-mono text-slate-400 bg-slate-950 border-t border-slate-800 gap-2">
                <span>Proposed Pipeline: YOLO Object Detection Architecture</span>
                <span className="text-slate-500">Evaluation Prototype for Academic Research</span>
              </div>
            </div>
          </div>

        </div>

        {/* Four Feature Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Search className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              1. AI-Assisted Detection
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Assists in the identification of road defects including potholes, fatigue cracks, uneven surfaces, and shoulder deterioration.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              2. Severity Assessment
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Categorizes surface degradation into Low, Medium, High, or Critical tiers based on visible structural cavity depth and spatial spread.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Sliders className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              3. Priority Scoring
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Computes an advisory 0–100 repair urgency index combining damage severity, road classification, and commuter safety risk.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-11 h-11 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              4. Human Verification
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Certified civil engineers review recommendations, adjust severity levels, and formally approve municipal repair work orders.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
