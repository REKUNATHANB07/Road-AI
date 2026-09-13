import React, { useState } from "react";
import {
  Camera,
  Upload,
  Calendar,
  MapPin,
  Sparkles,
  Plus,
  ArrowRight,
  Eye,
  X,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Info,
} from "lucide-react";
import { FieldObservationItem } from "../types";
import { INITIAL_FIELD_OBSERVATIONS } from "../data/mockData";

interface FieldObservationProps {
  onAnalyzeObservation: (imageUrl: string, hint: string) => void;
}

export const FieldObservation: React.FC<FieldObservationProps> = ({
  onAnalyzeObservation,
}) => {
  const [observations, setObservations] = useState<FieldObservationItem[]>(
    INITIAL_FIELD_OBSERVATIONS
  );
  const [selectedObs, setSelectedObs] = useState<FieldObservationItem | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New observation upload form state
  const [newCaption, setNewCaption] = useState<string>("Observed road surface damage");
  const [newLocation, setNewLocation] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [newSurfaceType, setNewSurfaceType] = useState<string>("Flexible Asphalt");
  const [newWeather, setNewWeather] = useState<string>("Dry");
  const [newImagePreview, setNewImagePreview] = useState<string | null>(null);

  const captionOptions = [
    "Observed road surface damage",
    "Uneven/damaged road area",
    "Road damage and water accumulation",
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddObservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImagePreview) return;

    const newItem: FieldObservationItem = {
      id: `field-${Date.now()}`,
      caption: newCaption,
      description:
        newDescription ||
        "Visual field observation documented during physical site inspection.",
      observedDate: new Date().toISOString().split("T")[0],
      locationTag: newLocation || "Field Observation Point - Sector Survey",
      imageUrl: newImagePreview,
      surfaceType: newSurfaceType,
      weatherCondition: newWeather,
    };

    setObservations([newItem, ...observations]);
    setShowUploadModal(false);
    // Reset form
    setNewImagePreview(null);
    setNewDescription("");
    setNewLocation("");
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[850px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Exact Requested Labels */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span>Field Evidence</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Observed Road Surface Damage
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Road surface damage such as potholes, cracks, and uneven surfaces can be difficult to systematically identify, document, and prioritize through manual observation and reporting alone.
            </p>
          </div>

          <div className="shrink-0">
            <button
              id="add-observation-btn"
              onClick={() => setShowUploadModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Field Observation</span>
            </button>
          </div>
        </div>

        {/* Mandatory Student Attribution & Academic Integrity Banner */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-950 text-xs sm:text-sm flex items-start gap-3 shadow-2xs">
          <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <div className="space-y-1 leading-relaxed">
            <p className="font-bold text-blue-900">
              Student Field Documentation & Empathy Phase
            </p>
            <p className="text-blue-800 text-xs">
              These records represent <strong className="font-semibold text-blue-950">actual field observations supplied by the student</strong> during physical site audits for the college Design Thinking project. They document real-world asphalt degradation patterns including structural cavities, fatigue fractures, and stormwater pooling.
            </p>
          </div>
        </div>

        {/* Observations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {observations.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo Viewer Container */}
                <div className="relative aspect-[16/10] bg-slate-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.caption}
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />

                  {/* Caption Badge - Exact Label */}
                  <div className="absolute top-2.5 left-2.5 bg-slate-900/90 backdrop-blur-xs text-white px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-400" />
                    <span>{item.caption}</span>
                  </div>

                  {/* Zoom Inspect Button */}
                  <button
                    onClick={() => setSelectedObs(item)}
                    className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-900 text-slate-200 hover:text-white transition-colors cursor-pointer"
                    title="Inspect Photo Fullscreen"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                {/* Card Content Body */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 border-b border-slate-100 pb-2.5">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium truncate max-w-[180px]">{item.locationTag}</span>
                    </span>
                    <span className="flex items-center gap-1 font-mono text-[11px]">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.observedDate}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed min-h-[44px]">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      Pavement: {item.surfaceType}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      Condition: {item.weatherCondition}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-100">
                      Field Evidence
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Action: Test in AI Detection */}
              <div className="p-4 bg-slate-50 border-t border-slate-100">
                <button
                  id={`analyze-obs-btn-${item.id}`}
                  onClick={() => onAnalyzeObservation(item.imageUrl, item.caption)}
                  className="w-full py-2.5 px-3 rounded-xl bg-white hover:bg-blue-600 text-slate-800 hover:text-white border border-slate-200 hover:border-blue-600 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-2xs cursor-pointer group/btn"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-600 group-hover/btn:text-white" />
                  <span>Analyze in Detection Module</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal: Fullscreen Photo Inspection */}
        {selectedObs && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-800 overflow-hidden shadow-2xl space-y-4">
              <div className="flex items-center justify-between px-5 py-3.5 bg-slate-950 border-b border-slate-800 text-white">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-400" />
                  <span className="text-xs font-bold font-mono">
                    Field Evidence Inspection // {selectedObs.caption}
                  </span>
                </div>
                <button
                  onClick={() => setSelectedObs(null)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="px-5">
                <div className="rounded-xl overflow-hidden aspect-[16/10] bg-slate-950">
                  <img
                    src={selectedObs.imageUrl}
                    alt={selectedObs.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="px-5 pb-5 space-y-3 text-slate-300 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">Location</span>
                    <span className="text-white font-bold truncate block">{selectedObs.locationTag}</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">Audit Date</span>
                    <span className="text-white font-bold block">{selectedObs.observedDate}</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">Surface</span>
                    <span className="text-white font-bold block">{selectedObs.surfaceType}</span>
                  </div>
                  <div className="bg-slate-800 p-2 rounded-lg">
                    <span className="text-slate-400 block text-[9px]">Weather</span>
                    <span className="text-white font-bold block">{selectedObs.weatherCondition}</span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed bg-slate-800/60 p-3 rounded-lg border border-slate-800">
                  {selectedObs.description}
                </p>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedObs(null)}
                    className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      onAnalyzeObservation(selectedObs.imageUrl, selectedObs.caption);
                      setSelectedObs(null);
                    }}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Run AI Damage Analysis</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Upload New Field Observation */}
        {showUploadModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full border border-slate-200 overflow-hidden shadow-2xl space-y-4">
              <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Add Field Observation Evidence
                  </h3>
                </div>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddObservation} className="px-6 pb-6 space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Damage Label (Required format)
                  </label>
                  <select
                    value={newCaption}
                    onChange={(e) => setNewCaption(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800 bg-white"
                  >
                    {captionOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Upload Road Surface Photograph (JPG/PNG)
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="w-full p-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700"
                    required
                  />
                  {newImagePreview && (
                    <div className="mt-2 rounded-lg overflow-hidden h-32 bg-slate-900">
                      <img
                        src={newImagePreview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Location / Road Sector
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ring Road KM 12"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                      required
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">
                      Pavement Surface Type
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Flexible Bituminous"
                      value={newSurfaceType}
                      onChange={(e) => setNewSurfaceType(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Field Description & Visual Observations
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Document cavity depth, loose aggregate, tire impact hazards, or moisture pooling..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-slate-300 text-slate-800"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(false)}
                    className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    Save Field Evidence
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
