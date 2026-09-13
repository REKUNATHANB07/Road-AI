import React, { useState } from "react";
import {
  LayoutDashboard,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  FileText,
  Eye,
  SlidersHorizontal,
  ArrowUpDown,
  Download,
} from "lucide-react";
import { DamageReportItem, SeverityLevel, VerificationStatus } from "../types";

interface DashboardProps {
  reports: DamageReportItem[];
  onInspectReport: (report: DamageReportItem) => void;
  onUpdateStatus: (id: string, newStatus: VerificationStatus) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  reports,
  onInspectReport,
  onUpdateStatus,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedReport, setSelectedReport] = useState<DamageReportItem | null>(null);

  // Filter calculations
  const totalReportsCount = reports.length;
  const highPriorityCount = reports.filter((r) => r.priorityScore >= 75).length;
  const mediumPriorityCount = reports.filter(
    (r) => r.priorityScore >= 45 && r.priorityScore < 75
  ).length;
  const verifiedCount = reports.filter((r) =>
    r.status.startsWith("Verified")
  ).length;

  const filteredReports = reports.filter((item) => {
    // Search query
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.damageType.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    // Filter categories
    if (activeFilter === "All") return true;
    if (activeFilter === "Pothole") return item.damageType === "Pothole";
    if (activeFilter === "Crack") return item.damageType === "Crack";
    if (activeFilter === "Uneven Surface") return item.damageType === "Uneven Surface";
    if (activeFilter === "High Priority") return item.priorityScore >= 75;
    if (activeFilter === "Verified") return item.status.startsWith("Verified");

    return true;
  });

  const getSeverityBadge = (sev: SeverityLevel) => {
    switch (sev) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-rose-100 text-rose-800 border-rose-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }
  };

  const getStatusBadge = (status: VerificationStatus) => {
    if (status.includes("Approved")) {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    if (status.includes("Adjusted")) {
      return "bg-blue-50 text-blue-700 border-blue-200";
    }
    if (status.includes("Rejected")) {
      return "bg-slate-100 text-slate-600 border-slate-200";
    }
    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <section className="py-12 bg-slate-50 min-h-[800px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header with Title and Clear Academic Disclaimer */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100/70 text-blue-800 text-xs font-bold mb-2">
              <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
              <span>Smart City Road Maintenance Oversight</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Road Damage Monitoring Dashboard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Centralized inspection records, priority tracking, and engineer verification logs
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>All values labeled as: Demo Data</span>
          </div>
        </div>

        {/* Top 4 Summary Cards (Clearly labeled Demo Data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Total Reports */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Total Reports
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold">
                Demo Data
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-slate-900 font-mono">
                {totalReportsCount}
              </span>
              <span className="text-xs text-slate-500 font-medium">Recorded Pavements</span>
            </div>
          </div>

          {/* High Priority */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                High Priority
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold">
                Demo Data
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-rose-600 font-mono">
                {highPriorityCount}
              </span>
              <span className="text-xs text-rose-600/80 font-medium">Urgent Attention</span>
            </div>
          </div>

          {/* Medium Priority */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Medium Priority
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-bold">
                Demo Data
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-amber-600 font-mono">
                {mediumPriorityCount}
              </span>
              <span className="text-xs text-amber-600/80 font-medium">Scheduled Work</span>
            </div>
          </div>

          {/* Verified Reports */}
          <div className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Verified Reports
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-bold">
                Demo Data
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="text-3xl font-extrabold text-emerald-600 font-mono">
                {verifiedCount}
              </span>
              <span className="text-xs text-emerald-600/80 font-medium">Human Authority Sign-off</span>
            </div>
          </div>

        </div>

        {/* Filter and Search Bar Controls */}
        <div className="bg-white rounded-xl p-4 border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by Report ID, damage type, or roadway..."
                className="w-full text-xs rounded-lg border border-slate-300 pl-9 pr-4 py-2.5 text-slate-800 focus:outline-blue-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
              <span className="text-xs text-slate-500 mr-1 flex items-center gap-1 font-semibold">
                <Filter className="w-3.5 h-3.5" />
                Filter:
              </span>
              {["All", "Pothole", "Crack", "Uneven Surface", "High Priority", "Verified"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      activeFilter === filter
                        ? "bg-blue-600 text-white shadow-2xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200/80"
                    }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>

          </div>
        </div>

        {/* Reports Table */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="p-3.5 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <span>Road Damage Inspection Log</span>
              <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
                Demo Data
              </span>
            </span>
            <span className="text-[11px] text-slate-500 font-medium">
              Showing {filteredReports.length} of {reports.length} records
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Report ID</th>
                  <th className="py-3.5 px-4">Damage Type</th>
                  <th className="py-3.5 px-4">Severity</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4">Location</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-500">
                      No road reports match your search or filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((report) => (
                    <tr
                      key={report.id}
                      className="hover:bg-slate-50/80 transition-colors"
                    >
                      {/* Report ID */}
                      <td className="py-3 px-4 font-mono font-bold text-slate-900">
                        {report.id}
                      </td>

                      {/* Damage Type */}
                      <td className="py-3 px-4 font-semibold text-slate-800">
                        {report.damageType}
                      </td>

                      {/* Severity */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold border ${getSeverityBadge(
                            report.severity
                          )}`}
                        >
                          {report.severity}
                        </span>
                      </td>

                      {/* Priority Score */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`font-mono font-bold ${
                              report.priorityScore >= 75
                                ? "text-red-600"
                                : report.priorityScore >= 50
                                ? "text-amber-600"
                                : "text-blue-600"
                            }`}
                          >
                            {report.priorityScore}
                          </span>
                          <div className="w-12 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                report.priorityScore >= 75
                                  ? "bg-red-500"
                                  : report.priorityScore >= 50
                                  ? "bg-amber-500"
                                  : "bg-blue-500"
                              }`}
                              style={{ width: `${report.priorityScore}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Location */}
                      <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                        {report.location}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                            report.status
                          )}`}
                        >
                          {report.status.startsWith("Verified") ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-600" />
                          )}
                          <span>{report.status}</span>
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">
                        {report.date}
                      </td>

                      {/* Action */}
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedReport(report)}
                          className="px-2.5 py-1 rounded border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Eye className="w-3 h-3 text-slate-500" />
                          <span>View</span>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Report Inspection Modal */}
        {selectedReport && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[11px] font-mono text-blue-600 font-bold uppercase">
                    Monitoring File Detail
                  </span>
                  <h3 className="text-base font-bold text-slate-900">
                    {selectedReport.id} — {selectedReport.damageType}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedReport(null)}
                  className="text-slate-400 hover:text-slate-700 text-lg p-1"
                >
                  ✕
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block">Severity Level:</span>
                  <strong className="text-slate-800">{selectedReport.severity}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Priority Urgency:</span>
                  <strong className="text-slate-800">{selectedReport.priorityScore} / 100</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Location:</span>
                  <strong className="text-slate-800">{selectedReport.location}</strong>
                </div>
                <div>
                  <span className="text-slate-500 block">Recorded Date:</span>
                  <strong className="text-slate-800">{selectedReport.date}</strong>
                </div>
              </div>

              {selectedReport.notes && (
                <div className="text-xs space-y-1">
                  <span className="font-bold text-slate-700">Engineering Notes:</span>
                  <p className="text-slate-600 bg-slate-50 p-2.5 rounded-lg border border-slate-200/80">
                    {selectedReport.notes}
                  </p>
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Update Human Verification Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      onUpdateStatus(selectedReport.id, "Verified & Approved");
                      setSelectedReport({
                        ...selectedReport,
                        status: "Verified & Approved",
                        verifiedBy: "Inspector Sign-off",
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors"
                  >
                    Mark Verified & Approved
                  </button>
                  <button
                    onClick={() => {
                      onUpdateStatus(selectedReport.id, "Verified & Adjusted");
                      setSelectedReport({
                        ...selectedReport,
                        status: "Verified & Adjusted",
                      });
                    }}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-colors"
                  >
                    Mark Adjusted
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setSelectedReport(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
