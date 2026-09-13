import React, { useState } from "react";
import {
  MapPin,
  AlertTriangle,
  Layers,
  Info,
  Navigation,
  CheckCircle2,
  Clock,
  Compass,
  Maximize2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { MapMarker, SeverityLevel } from "../types";
import { DEMO_MAP_MARKERS } from "../data/mockData";

interface DamageMapProps {
  markers?: MapMarker[];
}

export const DamageMap: React.FC<DamageMapProps> = ({
  markers = DEMO_MAP_MARKERS,
}) => {
  const [selectedMarker, setSelectedMarker] = useState<MapMarker | null>(null);
  const [filterSeverity, setFilterSeverity] = useState<string>("All");
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  const filteredMarkers = markers.filter((m) => {
    if (filterSeverity === "All") return true;
    return m.severity === filterSeverity;
  });

  const getMarkerColor = (sev: SeverityLevel) => {
    switch (sev) {
      case "Critical":
        return {
          bg: "bg-red-500",
          ring: "ring-red-300",
          border: "border-red-600",
          text: "text-red-700",
          pulse: "bg-red-400",
        };
      case "High":
        return {
          bg: "bg-rose-500",
          ring: "ring-rose-300",
          border: "border-rose-600",
          text: "text-rose-700",
          pulse: "bg-rose-400",
        };
      case "Medium":
        return {
          bg: "bg-amber-500",
          ring: "ring-amber-300",
          border: "border-amber-600",
          text: "text-amber-700",
          pulse: "bg-amber-400",
        };
      case "Low":
        return {
          bg: "bg-emerald-500",
          ring: "ring-emerald-300",
          border: "border-emerald-600",
          text: "text-emerald-700",
          pulse: "bg-emerald-400",
        };
    }
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header & Explicit Prototype Disclaimer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold mb-2 border border-blue-100">
              <Compass className="w-3.5 h-3.5" />
              <span>GIS Spatial Visualization</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Road Damage Map
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Spatial overview of detected road defects across simulated municipal transportation sectors
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Demo Map — Prototype</span>
          </div>
        </div>

        {/* Mandatory Location Disclaimer */}
        <div className="p-3.5 rounded-xl bg-slate-100/90 border border-slate-200 text-slate-700 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-900">Academic Prototype Notice:</strong> “Demo Map — Prototype. Do not imply these are actual GPS locations unless real location data is supplied.” Coordinates represent a simulated geometric road network for design demonstration.
          </p>
        </div>

        {/* Map Controls & Severity Filter */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200/80">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              Filter Severity Layer:
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {["All", "Critical", "High", "Medium", "Low"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setFilterSeverity(sev)}
                  className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    filterSeverity === sev
                      ? "bg-slate-900 text-white shadow-2xs"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              Critical
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" />
              High
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
              Low
            </span>
          </div>
        </div>

        {/* Realistic GIS Map Canvas Viewport */}
        <div className="relative rounded-2xl overflow-hidden border border-slate-300 shadow-lg bg-slate-950 aspect-[16/9] min-h-[460px]">
          
          {/* SVG Map Base with Realistic Highway Vectors, Sectors, and Arteries */}
          <svg
            className="w-full h-full object-cover select-none pointer-events-none"
            viewBox="0 0 1000 600"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern id="gis-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1e293b" strokeWidth="0.75" />
              </pattern>
            </defs>

            {/* Landmass Background */}
            <rect width="1000" height="600" fill="#090d16" />
            <rect width="1000" height="600" fill="url(#gis-grid)" />

            {/* River / Water Channel */}
            <path
              d="M 120 0 C 240 160, 210 320, 360 420 C 440 480, 520 540, 580 600"
              fill="none"
              stroke="#0f2942"
              strokeWidth="38"
              strokeLinecap="round"
            />
            <path
              d="M 120 0 C 240 160, 210 320, 360 420 C 440 480, 520 540, 580 600"
              fill="none"
              stroke="#194569"
              strokeWidth="24"
              strokeLinecap="round"
            />

            {/* Secondary Residential Road Grids */}
            <g stroke="#1e293b" strokeWidth="2.5" fill="none">
              <line x1="50" y1="120" x2="450" y2="120" />
              <line x1="50" y1="190" x2="400" y2="190" />
              <line x1="600" y1="150" x2="950" y2="150" />
              <line x1="650" y1="230" x2="950" y2="230" />
              <line x1="120" y1="480" x2="480" y2="480" />
              <line x1="550" y1="460" x2="920" y2="460" />
              <line x1="550" y1="520" x2="920" y2="520" />

              <line x1="180" y1="60" x2="180" y2="340" />
              <line x1="280" y1="80" x2="280" y2="340" />
              <line x1="720" y1="80" x2="720" y2="420" />
              <line x1="840" y1="80" x2="840" y2="420" />
              <line x1="680" y1="420" x2="680" y2="580" />
              <line x1="800" y1="420" x2="800" y2="580" />
            </g>

            {/* Major Arterial Highway (Curved Spine) */}
            <path
              d="M 20 280 C 280 260, 480 340, 980 200"
              fill="none"
              stroke="#2c3c54"
              strokeWidth="16"
              strokeLinecap="round"
            />
            <path
              d="M 20 280 C 280 260, 480 340, 980 200"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="14 10"
            />

            {/* Radial Ring Expressway */}
            <ellipse
              cx="500"
              cy="300"
              rx="340"
              ry="210"
              fill="none"
              stroke="#334155"
              strokeWidth="14"
            />
            <ellipse
              cx="500"
              cy="300"
              rx="340"
              ry="210"
              fill="none"
              stroke="#60a5fa"
              strokeWidth="3"
              strokeDasharray="20 12"
            />

            {/* Bridge Over Water Channel */}
            <rect x="235" y="270" width="30" height="24" fill="#64748b" rx="2" />

            {/* Sector Zones Text */}
            <text x="60" y="80" fill="#475569" fontSize="11" fontFamily="monospace">
              SECTOR 1: NORTH COMMERCIAL
            </text>
            <text x="660" y="90" fill="#475569" fontSize="11" fontFamily="monospace">
              SECTOR 2: EAST ARTERIAL CORRIDOR
            </text>
            <text x="70" y="550" fill="#475569" fontSize="11" fontFamily="monospace">
              SECTOR 3: CIVIC TRANSIT HUB
            </text>
            <text x="620" y="560" fill="#475569" fontSize="11" fontFamily="monospace">
              SECTOR 4: INDUSTRIAL LOGISTICS
            </text>
          </svg>

          {/* Interactive GIS Markers */}
          {filteredMarkers.map((marker) => {
            const colors = getMarkerColor(marker.severity);
            const isSelected = selectedMarker?.id === marker.id;

            return (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
                style={{ top: `${marker.yPercent}%`, left: `${marker.xPercent}%` }}
                onClick={() => setSelectedMarker(marker)}
              >
                {/* Ping animation for high / critical */}
                {(marker.severity === "Critical" || marker.severity === "High") && (
                  <span
                    className={`absolute inset-0 rounded-full animate-ping opacity-75 ${colors.pulse}`}
                  />
                )}

                {/* Marker Pin */}
                <div
                  className={`w-7 h-7 rounded-full ${colors.bg} text-white flex items-center justify-center shadow-lg border-2 border-white ring-2 ${colors.ring} group-hover:scale-125 transition-transform`}
                >
                  <MapPin className="w-3.5 h-3.5 fill-white" />
                </div>

                {/* Hover Tooltip */}
                <div className="hidden group-hover:block absolute bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/95 text-white text-[10px] font-mono py-1 px-2 rounded shadow-lg border border-slate-700 pointer-events-none z-30">
                  {marker.damageType} ({marker.severity}) — Priority {marker.priorityScore}
                </div>
              </div>
            );
          })}

          {/* Selected Marker Flyout Detail Card */}
          {selectedMarker && (
            <div className="absolute top-4 right-4 z-30 max-w-xs w-full bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-slate-200 animate-in fade-in space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                  <span className="text-[11px] font-mono font-bold text-slate-900">
                    {selectedMarker.id}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedMarker(null)}
                  className="text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ✕
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {selectedMarker.title}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">{selectedMarker.roadName}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Damage Type
                  </span>
                  <strong className="text-slate-800 text-xs">{selectedMarker.damageType}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Assessed Severity
                  </span>
                  <strong className="text-rose-600 text-xs">{selectedMarker.severity}</strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Priority Urgency
                  </span>
                  <strong className="text-slate-900 text-xs font-mono">
                    {selectedMarker.priorityScore} / 100
                  </strong>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold block">
                    Verification
                  </span>
                  <span className="text-emerald-700 font-semibold text-[11px]">
                    {selectedMarker.status}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 font-mono flex items-center justify-between pt-1">
                <span>Report Date:</span>
                <span>{selectedMarker.reportedDate}</span>
              </div>
            </div>
          )}

          {/* Compass Rose and Map Telemetry HUD */}
          <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 text-[10px] font-mono flex items-center gap-3">
            <span className="flex items-center gap-1 text-slate-200">
              <Navigation className="w-3 h-3 text-blue-400" />
              GIS Grid: 28.6139° N, 77.2090° E (Demo Origin)
            </span>
            <span>Scale: 1:25,000</span>
          </div>

          <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-blue-400 border border-slate-800">
            RADIAL TRANSIT SECTOR MAP
          </div>
        </div>

      </div>
    </section>
  );
};
