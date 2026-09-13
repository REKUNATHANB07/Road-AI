import React, { useState } from "react";
import {
  Sliders,
  ShieldCheck,
  AlertTriangle,
  Scale,
  MapPin,
  CheckCircle2,
  Info,
  Car,
  Activity,
  Calculator,
  UserCheck,
} from "lucide-react";
import { SeverityLevel } from "../types";

export const RepairPriority: React.FC = () => {
  // Interactive Simulator State for College Design Thinking Demonstration
  const [severity, setSeverity] = useState<SeverityLevel>("High");
  const [roadClass, setRoadClass] = useState<"Expressway" | "Major Arterial" | "Collector" | "Residential">(
    "Major Arterial"
  );
  const [roadCondition, setRoadCondition] = useState<"Severe" | "Poor" | "Fair" | "Good">("Poor");
  const [trafficVolume, setTrafficVolume] = useState<"Heavy Commercial" | "Moderate Transit" | "Low Local">(
    "Heavy Commercial"
  );
  const [isVerified, setIsVerified] = useState<boolean>(false);

  // Prototype Calculation Formula (Transparent Decision Logic)
  const calculatePrototypeScore = () => {
    let score = 0;

    // Severity factor (0-40 pts)
    if (severity === "Critical") score += 40;
    else if (severity === "High") score += 30;
    else if (severity === "Medium") score += 20;
    else score += 10;

    // Road Condition factor (0-25 pts)
    if (roadCondition === "Severe") score += 25;
    else if (roadCondition === "Poor") score += 18;
    else if (roadCondition === "Fair") score += 10;
    else score += 4;

    // Road Location & Traffic (0-25 pts)
    if (roadClass === "Expressway") score += 25;
    else if (roadClass === "Major Arterial") score += 20;
    else if (roadClass === "Collector") score += 14;
    else score += 8;

    // Traffic volume modifier
    if (trafficVolume === "Heavy Commercial") score += 8;
    else if (trafficVolume === "Moderate Transit") score += 4;

    // Verification factor (0-5 pts confidence modifier)
    if (isVerified) score += 2;

    return Math.min(100, Math.max(10, score));
  };

  const calculatedScore = calculatePrototypeScore();

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header & Core Thesis */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Design Thinking Decision Logic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Repair Priority
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A structured decision-support scoring model that balances damage physical severity with road traffic context to optimize municipal repair scheduling.
          </p>

          {/* Mandatory Academic Disclaimer */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed font-medium">
              “The priority score is a prototype decision-support mechanism and should be validated with real maintenance criteria before deployment.”
            </p>
          </div>
        </div>

        {/* Five Factor Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-slate-900">
              Evaluation Factors
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Multivariate Decision Model
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            
            {/* Factor 1 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-9 h-9 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">1. Damage Severity</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Depth, cavity width, aggregate disintegration, and fracture expansion rate.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">Weight: 40%</span>
            </div>

            {/* Factor 2 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
                  <Activity className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">2. Road Condition</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Surrounding pavement wear, drainage cross-slope, and subgrade firmness.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">Weight: 25%</span>
            </div>

            {/* Factor 3 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">3. Location</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Expressway vs arterial vs residential street, speed limits, and traffic density.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">Weight: 20%</span>
            </div>

            {/* Factor 4 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
                  <Car className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">4. Safety Impact</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Sudden swerving risk, two-wheeler skidding risk, and proximity to junctions.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">Weight: 15%</span>
            </div>

            {/* Factor 5 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200/90 flex flex-col justify-between space-y-3">
              <div>
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                  <UserCheck className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">5. Verification Status</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Mandatory human authority review and confirmation prior to work dispatch.
                </p>
              </div>
              <span className="text-[11px] font-mono font-bold text-slate-400">Human Sign-off</span>
            </div>

          </div>
        </div>

        {/* Interactive Priority Scoring Simulator Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold">
                  Interactive Prototype Priority Calculator
                </h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Simulate how multivariate factors determine the 0–100 repair urgency score
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400">Final Decision:</span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Human Authority
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Interactive Inputs */}
            <div className="lg:col-span-8 space-y-4 text-xs">
              
              {/* Severity Selection */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">
                  Factor 1: Damage Severity Level
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Low", "Medium", "High", "Critical"] as SeverityLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setSeverity(lvl)}
                      className={`py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                        severity === lvl
                          ? "bg-blue-600 text-white font-bold shadow-xs"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Road Class */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">
                  Factor 2 & 3: Road Hierarchy & Location Classification
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {(["Expressway", "Major Arterial", "Collector", "Residential"] as const).map((rc) => (
                    <button
                      key={rc}
                      type="button"
                      onClick={() => setRoadClass(rc)}
                      className={`py-2 px-2 rounded-lg font-semibold transition-all cursor-pointer truncate ${
                        roadClass === rc
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {rc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Road Condition */}
              <div>
                <label className="text-slate-300 font-semibold block mb-1.5">
                  Factor 4: Surrounding Pavement Condition
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {(["Good", "Fair", "Poor", "Severe"] as const).map((cond) => (
                    <button
                      key={cond}
                      type="button"
                      onClick={() => setRoadCondition(cond)}
                      className={`py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                        roadCondition === cond
                          ? "bg-blue-600 text-white font-bold"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verification Toggle */}
              <div className="pt-2 flex items-center justify-between p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-200">Municipal Engineer Field Verification Sign-off</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsVerified(!isVerified)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                    isVerified ? "bg-emerald-600 text-white" : "bg-slate-700 text-slate-400"
                  }`}
                >
                  {isVerified ? "Verified (Active)" : "Pending Review"}
                </button>
              </div>

            </div>

            {/* Simulated Score Output */}
            <div className="lg:col-span-4 bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-4">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Calculated Priority Score
              </span>

              <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
                <svg className="w-28 h-28 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-slate-800 stroke-current"
                    strokeWidth="3.5"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className={
                      calculatedScore >= 75
                        ? "text-red-500 stroke-current"
                        : calculatedScore >= 50
                        ? "text-amber-400 stroke-current"
                        : "text-blue-400 stroke-current"
                    }
                    strokeDasharray={`${calculatedScore}, 100`}
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold font-mono text-white">
                    {calculatedScore}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">/ 100</span>
                </div>
              </div>

              <div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-600/30 text-blue-300 border border-blue-500/30">
                  {calculatedScore >= 75
                    ? "Tier 1: Urgent Repair Dispatch"
                    : calculatedScore >= 50
                    ? "Tier 2: Scheduled Work Order"
                    : "Tier 3: Routine Periodic Patch"}
                </span>
                <p className="text-[11px] text-slate-400 mt-2 leading-tight">
                  Prototype decision-support indicator. Human authority retains final repair jurisdiction.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
