import React from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  CalendarPlus, 
  CalendarCheck, 
  FileSpreadsheet, 
  FileText, 
  Stethoscope, 
  User, 
  LogOut, 
  HeartPulse, 
  ChevronRight, 
  PanelLeftClose,
  X,
  Users,
  ShieldCheck,
  Building,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    logout, 
    currentRole,
    currentUser,
    appointments,
    isSidebarCollapsed,
    setIsSidebarCollapsed 
  } = useApp();

  const upcomingCount = appointments.filter(a => a.status === 'Upcoming').length;

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handleCloseSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
    setIsSidebarCollapsed(true);
  };

  // Define role-specific navigation menus
  const getNavSections = () => {
    if (currentRole === 'doctor') {
      return [
        {
          title: 'CLINICAL WORKSPACE',
          items: [
            { id: 'clinical-queue', label: 'Consultation Queue & EHR', icon: Stethoscope, highlight: true }
          ]
        },
        {
          title: 'DIRECTORY',
          items: [
            { id: 'doctors', label: 'Specialist Directory', icon: Users }
          ]
        }
      ];
    }

    if (currentRole === 'receptionist') {
      return [
        {
          title: 'FRONT DESK',
          items: [
            { id: 'clinic-desk', label: 'Reception & Scheduling Desk', icon: Building, highlight: true }
          ]
        },
        {
          title: 'DIRECTORY',
          items: [
            { id: 'doctors', label: 'Specialist Directory', icon: Stethoscope }
          ]
        }
      ];
    }

    if (currentRole === 'admin') {
      return [
        {
          title: 'ADMINISTRATIVE GOVERNANCE',
          items: [
            { id: 'system-overview', label: 'System Overview & Governance', icon: ShieldCheck, highlight: true }
          ]
        },
        {
          title: 'DIRECTORY',
          items: [
            { id: 'doctors', label: 'Specialist Directory', icon: Stethoscope }
          ]
        }
      ];
    }

    // Default: Patient
    return [
      {
        title: null,
        items: [
          { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
        ]
      },
      {
        title: 'APPOINTMENTS',
        items: [
          { 
            id: 'availability', 
            label: 'Check Doctor Availability', 
            icon: CalendarClock,
            highlight: true
          },
          { id: 'book-appointment', label: 'Book Appointment', icon: CalendarPlus },
          { 
            id: 'appointments', 
            label: 'My Appointments', 
            icon: CalendarCheck,
            badge: upcomingCount > 0 ? upcomingCount : null
          }
        ]
      },
      {
        title: 'MEDICAL RECORDS',
        items: [
          { id: 'records', label: 'Patient Records', icon: FileSpreadsheet },
          { id: 'prescriptions-lab', label: 'Prescriptions & Lab Records', icon: FileText }
        ]
      },
      {
        title: 'DOCTORS',
        items: [
          { id: 'doctors', label: 'Doctor Information', icon: Stethoscope }
        ]
      },
      {
        title: 'ACCOUNT',
        items: [
          { id: 'profile', label: 'Profile', icon: User }
        ]
      }
    ];
  };

  const navSections = getNavSections();

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-40 w-72 bg-slate-950 text-slate-300 flex flex-col border-r border-slate-800/80 transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}
      `}>
        {/* Brand Header with Close Sidebar Button */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-900/40">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-white">MHC-PMS</span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded border border-indigo-500/30">
                  {currentRole.toUpperCase()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Mental Health Care</p>
            </div>
          </div>

          {/* Close Sidebar Button (Desktop & Mobile) */}
          <button
            onClick={handleCloseSidebar}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition cursor-pointer"
            title="Close sidebar navigation"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="w-5 h-5 hidden lg:block" />
            <X className="w-5 h-5 lg:hidden" />
          </button>
        </div>

        {/* User Mini Card */}
        <div className="mx-4 my-3.5 p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-3 shadow-xs">
          <img 
            src={currentUser.avatar} 
            alt={currentUser.fullName} 
            className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/80 shadow-md"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{currentUser.fullName}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/60">
                {currentUser.id}
              </span>
              <span className="text-[10px] text-slate-400 capitalize">{currentUser.role || currentRole}</span>
            </div>
          </div>
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-5 scrollbar-thin">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                  {section.title}
                </p>
              )}
              <div className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`
                        w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group cursor-pointer
                        ${isActive 
                          ? 'bg-linear-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-950/50 font-semibold' 
                          : item.highlight
                          ? 'text-indigo-200 hover:bg-slate-900 hover:text-white bg-indigo-950/40 border border-indigo-900/50'
                          : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            isActive ? 'bg-white text-indigo-900' : 'bg-indigo-600 text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3 h-3 text-slate-500 group-hover:text-slate-300 transition-transform ${
                          isActive ? 'text-white translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/90">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-300 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 hover:text-rose-100 transition shadow-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout from Portal</span>
          </button>
          <div className="mt-3 text-center">
            <p className="text-[10px] text-slate-500">MHC-PMS Healthcare System • v2.4</p>
          </div>
        </div>
      </aside>
    </>
  );
};
