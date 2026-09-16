import React, { useState } from 'react';
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
  Shield,
  ArrowRightLeft,
  Clock,
  Pill,
  FlaskConical,
  ShieldAlert,
  CreditCard,
  HeartHandshake,
  UserCheck,
  UserCog,
  BarChart3,
  RefreshCw,
  BellRing
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    logout, 
    currentRole,
    switchRoleWithLogout,
    currentUser,
    appointments,
    isSidebarCollapsed,
    setIsSidebarCollapsed 
  } = useApp();

  const [isSwitchModalOpen, setIsSwitchModalOpen] = useState(false);

  const upcomingCount = appointments.filter(a => a.status === 'Upcoming').length;

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handleCloseSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
    setIsSidebarCollapsed(true);
  };

  const handleSwitchRole = (targetRole) => {
    setIsSwitchModalOpen(false);
    if (setIsMobileOpen) setIsMobileOpen(false);
    switchRoleWithLogout(targetRole);
  };

  // Define role-specific navigation menus with explicit use case features
  const getNavSections = () => {
    if (currentRole === 'doctor') {
      return [
        {
          title: 'CLINICAL USE CASES',
          items: [
            { id: 'doc-queue', label: 'Consultation Queue', icon: Clock, badge: upcomingCount > 0 ? upcomingCount : null },
            { id: 'doc-patients', label: 'Psychiatric EHR & Summaries', icon: FileText },
            { id: 'doc-prescriptions', label: 'e-Prescribing & Treatments', icon: Pill },
            { id: 'doc-labs', label: 'Diagnostic & Lab Scales', icon: FlaskConical },
            { id: 'doc-alerts', label: 'Health Risk Alerts', icon: ShieldAlert, highlight: true },
            { id: 'doc-speciality', label: 'My Speciality Profile', icon: Stethoscope }
          ]
        },
        {
          title: 'HOSPITAL REGISTRIES',
          items: [
            { id: 'records', label: 'Master Patient Registry', icon: FileSpreadsheet },
            { id: 'doctors', label: 'Specialist Directory', icon: Users }
          ]
        }
      ];
    }

    if (currentRole === 'receptionist') {
      return [
        {
          title: 'FRONT DESK USE CASES',
          items: [
            { id: 'rec-schedule', label: 'Book & Cancel Appointments', icon: CalendarPlus, badge: upcomingCount > 0 ? upcomingCount : null },
            { id: 'rec-patients', label: 'Create & Add Patient Records', icon: Users },
            { id: 'rec-visitors', label: 'Visitor Details & Lounge', icon: UserCheck },
            { id: 'rec-billing', label: 'Process Patient Payments', icon: CreditCard },
            { id: 'rec-counselling', label: 'Allot Counselling Sessions', icon: HeartHandshake }
          ]
        },
        {
          title: 'CLINIC RESOURCES',
          items: [
            { id: 'records', label: 'Master Patient Registry', icon: FileSpreadsheet },
            { id: 'doctors', label: 'Specialist Directory', icon: Stethoscope }
          ]
        }
      ];
    }

    if (currentRole === 'admin') {
      return [
        {
          title: 'ADMIN GOVERNANCE USE CASES',
          items: [
            { id: 'adm-accounts', label: 'User Account Governance', icon: UserCog },
            { id: 'adm-reports', label: 'Clinical & Legal Reports (MHA)', icon: BarChart3 },
            { id: 'adm-sync', label: 'Cross-Clinic Data Sync', icon: RefreshCw },
            { id: 'adm-audit', label: 'Security & Audit Trail', icon: ShieldAlert, highlight: true },
            { id: 'adm-broadcasts', label: 'Broadcast Announcements', icon: BellRing }
          ]
        },
        {
          title: 'CENTRAL REGISTRIES',
          items: [
            { id: 'records', label: 'Central EHR Records', icon: FileSpreadsheet },
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
          { id: 'records', label: 'Patient Records (EHR)', icon: FileSpreadsheet },
          { id: 'prescriptions-lab', label: 'Prescriptions & Lab Records', icon: FileText }
        ]
      },
      {
        title: 'SPECIALISTS',
        items: [
          { id: 'doctors', label: 'Doctor Information', icon: Stethoscope }
        ]
      },
      {
        title: 'ACCOUNT',
        items: [
          { id: 'profile', label: 'Profile & Settings', icon: User }
        ]
      }
    ];
  };

  const navSections = getNavSections();

  const getRoleHeaderMeta = () => {
    switch (currentRole) {
      case 'admin':
        return { tag: 'SYSTEM ADMIN', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'doctor':
        return { tag: 'DOCTOR PORTAL', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'receptionist':
        return { tag: 'FRONT DESK', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' };
      default:
        return { tag: 'PATIENT PORTAL', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
    }
  };

  const roleHeaderMeta = getRoleHeaderMeta();

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
                <span className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${roleHeaderMeta.color}`}>
                  {roleHeaderMeta.tag}
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
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
            alt={currentUser?.fullName || currentUser?.name || 'User'} 
            className="w-11 h-11 rounded-full object-cover border-2 border-indigo-500/80 shadow-md shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-white truncate">{currentUser?.fullName || currentUser?.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-indigo-300 font-mono bg-indigo-950/80 px-1.5 py-0.5 rounded border border-indigo-800/60 shrink-0">
                {currentUser?.id}
              </span>
              <span className="text-[10px] text-indigo-400 font-semibold truncate capitalize">
                {currentRole} Role
              </span>
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

        {/* Footer: Switch Role Modal Trigger & Logout */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 space-y-2">
          <button
            onClick={() => setIsSwitchModalOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-indigo-950/50 border border-indigo-900/40 transition cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <ArrowRightLeft className="w-4 h-4 text-indigo-400" />
              <span>Switch Role (Sign In)</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-950/30 transition cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Switch Role Modal */}
      {isSwitchModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-xs p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-white shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold">Switch User Profile</h3>
              </div>
              <button 
                onClick={() => setIsSwitchModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Switching roles will <strong>sign you out</strong> of the active <strong>{currentRole.toUpperCase()}</strong> session. You must authenticate with the target role credentials.
            </p>

            <div className="mt-4 space-y-2">
              {[
                { role: 'doctor', title: 'Doctor (Dr. Shashank Pandey)', icon: Stethoscope, desc: 'Consultation queue, e-Rx, psychometric scales' },
                { role: 'receptionist', title: 'Receptionist (Medha Banerjee)', icon: Building, desc: 'Appointments, visitors, payments, counselling' },
                { role: 'admin', title: 'System Admin (Shounak Sarkar)', icon: ShieldCheck, desc: 'Account governance, legal reports, cross-clinic sync' },
                { role: 'patient', title: 'Patient (Aaryan Kumar)', icon: User, desc: 'Personal EHR, doctor availability, appointment booking' }
              ].map(r => {
                const Icon = r.icon;
                const isCurrent = currentRole === r.role;
                return (
                  <button
                    key={r.role}
                    disabled={isCurrent}
                    onClick={() => handleSwitchRole(r.role)}
                    className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between cursor-pointer ${
                      isCurrent 
                        ? 'bg-slate-800/40 border-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-slate-800/80 hover:bg-indigo-950/60 border-slate-700/80 hover:border-indigo-500/50 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Icon className="w-4 h-4 text-indigo-400" />
                      <div>
                        <p className="text-xs font-bold">{r.title}</p>
                        <p className="text-[10px] text-slate-400">{r.desc}</p>
                      </div>
                    </div>
                    {isCurrent ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700 text-slate-400">Current</span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
