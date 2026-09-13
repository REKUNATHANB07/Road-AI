import React from "react";
import {
  ShieldCheck,
  UserCheck,
  Lock,
  Eye,
  AlertTriangle,
  RefreshCw,
  Scale,
  CheckCircle2,
  FileCheck2,
  Sparkles,
} from "lucide-react";

export const ResponsibleAi: React.FC = () => {
  const principles = [
    {
      id: "human-verification",
      number: "01",
      title: "Human Verification",
      subtitle: "Mandatory Civil Authority Sign-off",
      icon: UserCheck,
      color: "blue",
      description:
        "Certified municipal civil engineers and road maintenance authorities evaluate every AI recommendation, inspect visual evidence, and authorize all physical work orders. The AI does not autonomously dispatch contractors or approve repair expenditures.",
      keyPoints: [
        "Human engineers hold sole authorization to schedule repair crews",
        "AI output serves as a preliminary prioritization and triage guide",
        "Discrepancies can be overridden directly in the monitoring interface",
      ],
    },
    {
      id: "privacy-protection",
      number: "02",
      title: "Privacy Protection",
      subtitle: "Public Corridor Anonymization",
      icon: Lock,
      color: "emerald",
      description:
        "Road inspection imagery focuses strictly on asphalt pavement surface condition. Proposed real-world pipelines incorporate privacy-preserving blurring filters to automatically mask license plates, vehicle occupants, and pedestrian faces before cloud storage.",
      keyPoints: [
        "Automated bounding box redaction for private vehicle registration plates",
        "Facial anonymization on incidental pedestrian captures in camera frames",
        "No storage of personally identifiable commuter location traces",
      ],
    },
    {
      id: "transparent-ai-results",
      number: "03",
      title: "Transparent AI Results",
      subtitle: "Explainable Urgency & Scoring Logic",
      icon: Eye,
      color: "indigo",
      description:
        "Avoids opaque black-box decisions by providing clear bounding box overlays, physical severity criteria (cavity depth, surface fracture extent), and weighted mathematical formulas for the advisory 0–100 priority score.",
      keyPoints: [
        "Clear demarcation of detected defect bounding boxes and visual indicators",
        "Transparent weighting formula (Severity 40%, Road Type 25%, Safety Risk 35%)",
        "All predictions are openly labeled as 'Prototype Demo Result'",
      ],
    },
    {
      id: "model-limitations",
      number: "04",
      title: "Model Limitations",
      subtitle: "Honest Environmental Boundaries",
      icon: AlertTriangle,
      color: "amber",
      description:
        "Transparently acknowledges challenging field conditions that affect computer vision models, including heavy rain puddles, nocturnal shadows, oil slicks, leaves, and overhanging tree foliage that can generate false positives or obscure cracks.",
      keyPoints: [
        "Identifies edge-case vulnerability to wet road reflections and glare",
        "Acknowledges shadow confusion between tar sealant strips and genuine cracks",
        "Emphasizes that prototype results require field inspection corroboration",
      ],
    },
    {
      id: "continuous-improvement",
      number: "05",
      title: "Continuous Improvement",
      subtitle: "Active Human Feedback Loop",
      icon: RefreshCw,
      color: "purple",
      description:
        "Engineer corrections, adjusted severity levels, and rejected false alarms feed back into an archived evaluation dataset. This supervised loop allows iterative fine-tuning of the proposed YOLO detection engine on difficult local pavement conditions.",
      keyPoints: [
        "Municipal engineer feedback continuously refines model training data",
        "Periodic retraining on region-specific asphalt mixes and climate wear",
        "Ensures long-term algorithmic accountability and operational reliability",
      ],
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          iconBg: "bg-blue-50 text-blue-600",
          border: "border-blue-200/80",
          badge: "bg-blue-100 text-blue-800",
        };
      case "emerald":
        return {
          iconBg: "bg-emerald-50 text-emerald-600",
          border: "border-emerald-200/80",
          badge: "bg-emerald-100 text-emerald-800",
        };
      case "indigo":
        return {
          iconBg: "bg-indigo-50 text-indigo-600",
          border: "border-indigo-200/80",
          badge: "bg-indigo-100 text-indigo-800",
        };
      case "amber":
        return {
          iconBg: "bg-amber-50 text-amber-600",
          border: "border-amber-200/80",
          badge: "bg-amber-100 text-amber-800",
        };
      case "purple":
        return {
          iconBg: "bg-purple-50 text-purple-600",
          border: "border-purple-200/80",
          badge: "bg-purple-100 text-purple-800",
        };
      default:
        return {
          iconBg: "bg-slate-100 text-slate-700",
          border: "border-slate-200",
          badge: "bg-slate-100 text-slate-800",
        };
    }
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[850px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
            <Scale className="w-3.5 h-3.5 text-emerald-600" />
            <span>Ethical AI Framework</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Responsible & Safe AI
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Ethical guidelines governing the human-centered design, operational limitations, and safety-critical oversight of AI in municipal road management.
          </p>
        </div>

        {/* Visually Prominent Banner with Exact Requested Statement */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-blue-800/60">
          <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-400/30">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>CORE DESIGN PRINCIPLE</span>
            </div>

            {/* EXACT STATEMENT REQUESTED */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
              “AI supports decisions; humans make the final repair decision.”
            </h3>

            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              In safety-critical civic infrastructure, automated algorithms must never operate as autonomous decision-makers. The RoadAI system is architected as an augmentative co-pilot: it flags distress coordinates and suggests priority indices, but human municipal engineers retain total control, accountability, and authority over public repair disbursements.
            </p>
          </div>
        </div>

        {/* Five Principle Cards Grid (The 5 requested topics) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((principle) => {
            const Icon = principle.icon;
            const theme = getColorClasses(principle.color);

            return (
              <div
                key={principle.id}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {principle.number}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${theme.badge}`}
                    >
                      {principle.title}
                    </span>
                  </div>

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${theme.iconBg}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1">
                    {principle.title}
                  </h4>
                  <p className="text-xs text-blue-600 font-semibold mb-3">
                    {principle.subtitle}
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {principle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Key Safeguards:
                  </span>
                  <ul className="space-y-1.5 text-[11px] text-slate-600">
                    {principle.keyPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Academic Integrity & Prototype Notice Summary Card */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono font-bold text-blue-400">NOTE</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-900/60 text-blue-300 font-bold">
                  College Project Prototype
                </span>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5" />
              </div>

              <h4 className="text-base font-bold text-white mb-2">
                Design Thinking Honesty
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                This project does not claim measured production model accuracy, trained YOLO field benchmarks, or municipal deployment. All demonstration values represent simulated prototype assessments to validate the human-in-the-loop interaction concept.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
              Prototype Version: Academic Release 1.0
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
