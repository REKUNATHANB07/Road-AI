import React from "react";
import {
  ShieldAlert,
  ArrowUp,
  Sparkles,
  GraduationCap,
  Scale,
  MapPin,
  CheckCircle2,
} from "lucide-react";

interface FooterProps {
  onNavigate: (tabId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Call-to-Action Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-slate-900 to-indigo-950/60 rounded-3xl p-8 sm:p-10 border border-blue-500/20 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Ready to Test Computer Vision Detection?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Test Road Damage Detection Prototype
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Upload road surface photographs or select benchmark pavement samples to evaluate computer vision defect classification, severity indexing, and repair priority scoring.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate("detect")}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 transition-all cursor-pointer flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch Damage Detector</span>
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors cursor-pointer"
            >
              <span>View Monitoring Dashboard</span>
            </button>
          </div>
        </div>

        {/* Main Footer Links & Info */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-6 border-t border-slate-800/80 text-xs">
          
          {/* Brand & Mission */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4 text-white" />
              </div>
              <span className="font-extrabold text-sm tracking-tight">
                AI Road Damage Detection & Repair Priority System
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              College Design Thinking Capstone Prototype exploring how computer vision and multivariable decision logic can assist municipal engineers in identifying pavement deterioration and organizing repair priorities.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-blue-400 font-mono">
              <GraduationCap className="w-4 h-4" />
              <span>Academic Prototype // Design Thinking Project</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              System Modules
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate("field-observation")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Field Observation Evidence
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("detect")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Damage Detection
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("priority")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Repair Priority Logic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Monitoring Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("map")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Spatial GIS Damage Map
                </button>
              </li>
            </ul>
          </div>

          {/* Methodology & Ethics */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Technical & Ethics
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate("how-it-works")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Architecture & Pipeline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("technology")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  YOLO Computer Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("responsible-ai")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Responsible AI Principles
                </button>
              </li>
              <li>
                <span className="text-slate-500">Human-in-the-Loop Governance</span>
              </li>
              <li>
                <span className="text-slate-500">Demo Data & Simulated Records</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Integrity Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p className="text-center sm:text-left leading-relaxed">
            AI assists human decision-making; it does not independently authorize or execute road repairs. No real-world field statistics or claims are fabricated.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
