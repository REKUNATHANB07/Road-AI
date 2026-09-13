import React, { useState } from "react";
import {
  ShieldAlert,
  Compass,
  Camera,
  LayoutDashboard,
  MapPin,
  Sliders,
  Workflow,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

interface NavbarProps {
  activeTab: string;
  onNavigate: (tabId: string) => void;
  onStartDetection?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onStartDetection,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home", icon: Compass },
    { id: "detect", label: "Detect Damage", icon: Camera },
    { id: "field-observation", label: "Field Evidence", icon: Camera },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "map", label: "Road Damage Map", icon: MapPin },
    { id: "priority", label: "Repair Priority", icon: Sliders },
    { id: "how-it-works", label: "How It Works", icon: Workflow },
    { id: "responsible-ai", label: "Responsible AI", icon: ShieldCheck },
  ];

  const handleSelectTab = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStartDetectionClick = () => {
    if (onStartDetection) {
      onStartDetection();
    } else {
      onNavigate("detect");
    }
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      {/* Top Academic Disclaimer Ribbon */}
      <div className="bg-slate-900 text-slate-200 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-600/30 text-blue-300 border border-blue-500/30">
              ACADEMIC PROTOTYPE
            </span>
            <span className="hidden sm:inline text-slate-300">
              College Design Thinking Project: AI-Based Road Surface Damage Detection & Repair Priority
            </span>
            <span className="sm:hidden text-slate-300">Design Thinking Prototype</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>Human-in-the-loop Decision Support</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            id="brand-logo-btn"
            onClick={() => handleSelectTab("home")}
            className="flex items-center gap-2.5 text-left focus:outline-none group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs shadow-blue-500/30 group-hover:bg-blue-700 transition-colors">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-tight text-slate-900">
                  Road<span className="text-blue-600">AI</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Prototype
                </span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none">
                Smart Road Monitoring
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold shadow-2xs border border-blue-100"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              id="nav-start-detection-btn"
              onClick={handleStartDetectionClick}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-98 shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Detection</span>
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 shadow-lg space-y-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleSelectTab(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium w-full text-left transition-colors cursor-pointer ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-bold border border-blue-100"
                      : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-center">
            <button
              onClick={handleStartDetectionClick}
              className="w-full py-2.5 rounded-lg text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 text-center cursor-pointer"
            >
              Start Road Damage Detection
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
