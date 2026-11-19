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
  BellRing,
  Edit3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AarogyamLogo } from '../common/AarogyamLogo';

export const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    logout, 
    currentRole,
    currentUser,
    patientProfile,
    appointments,
    isSidebarCollapsed,
    setIsSidebarCollapsed 
  } = useApp();

  // Strict role & patient data isolation for upcoming appointments badge
  const userUpcomingAppointments = React.useMemo(() => {
    if (currentRole === 'patient') {
      const activeId = patientProfile?.id || currentUser?.id;
      const activeName = patientProfile?.fullName || currentUser?.fullName || currentUser?.name;
      if (!activeId && !activeName) return [];
      return appointments.filter(a => 
        a.status === 'Upcoming' && 
        ((activeId && a.patientId === activeId) || (activeName && a.patientName === activeName))
      );
    }
    if (currentRole === 'doctor') {
      return appointments.filter(a => a.status === 'Upcoming');
    }
    return appointments.filter(a => a.status === 'Upcoming');
  }, [appointments, currentRole, currentUser, patientProfile]);

  // Hide badge if the user is actively viewing their appointments
  const upcomingCount = activeTab === 'appointments' ? 0 : userUpcomingAppointments.length;

  const handleNav = (tabId) => {
    setActiveTab(tabId);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  const handleCloseSidebar = () => {
    if (setIsMobileOpen) setIsMobileOpen(false);
    setIsSidebarCollapsed(true);
  };

  // Define role-specific navigation menus with explicit use case features
  const getNavSections = () => {
    if (currentRole === 'doctor') {
      return [
        {
          title: 'CLINICAL USE CASES',
          items: [
            { id: 'doc-queue', label: 'Consultation Queue', icon: Clock, badge: upcomingCount > 0 ? upcomingCount : null },
            { id: 'doc-patients', label: 'Psychiatric EHR Dossiers', icon: FileText },
            { id: 'doc-prescriptions', label: 'e-Prescribing & Treatments', icon: Pill },
            { id: 'doc-labs', label: 'Diagnostic & Lab Scales', icon: FlaskConical },
            { id: 'doc-alerts', label: 'Health Risk Alerts', icon: ShieldAlert, highlight: true },
            { id: 'doc-speciality', label: 'My Speciality Profile', icon: Stethoscope }
          ]
        },
        {
          title: 'HOSPITAL EHR & DATABASE',
          items: [
            { id: 'records', label: 'EHR Records (Excel Database)', icon: FileSpreadsheet, highlight: true },
            { id: 'doc-sync', label: 'Cloud & Database Sync', icon: RefreshCw },
            { id: 'doctors', label: 'Specialist Directory', icon: Users }
          ]
        },
        {
          title: 'ACCOUNT & IDENTITY',
          items: [
            { id: 'profile', label: 'Doctor Profile & Photo', icon: User }
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
          title: 'HOSPITAL EHR & DATABASE',
          items: [
            { id: 'records', label: 'EHR Records (Excel Database)', icon: FileSpreadsheet, highlight: true },
            { id: 'rec-sync', label: 'Cloud & Database Sync', icon: RefreshCw },
            { id: 'doctors', label: 'Specialist Directory', icon: Stethoscope }
          ]
        },
        {
          title: 'ACCOUNT & IDENTITY',
          items: [
            { id: 'profile', label: 'Front Desk Profile & Photo', icon: User }
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
            { id: 'adm-sync', label: 'Cloud & Database Sync', icon: RefreshCw },
            { id: 'adm-audit', label: 'Security & Audit Trail', icon: ShieldAlert, highlight: true },
            { id: 'adm-broadcasts', label: 'Broadcast Announcements', icon: BellRing }
          ]
        },
        {
          title: 'HOSPITAL EHR & DATABASE',
          items: [
            { id: 'records', label: 'EHR Records (Excel Database)', icon: FileSpreadsheet, highlight: true },
            { id: 'doctors', label: 'Specialist Directory', icon: Stethoscope }
          ]
        },
        {
          title: 'ACCOUNT & IDENTITY',
          items: [
            { id: 'profile', label: 'Admin Profile & Photo', icon: User }
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
        title: 'CARE & PRESCRIPTIONS',
        items: [
          { id: 'prescriptions-lab', label: 'Prescriptions & Lab Reports', icon: FileText }
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
        return { tag: 'PATIENT PORTAL', color: 'bg-amber-100 text-amber-900 border-amber-300 font-bold' };
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
        fixed top-0 bottom-0 left-0 z-40 w-72 bg-white text-slate-800 flex flex-col border-r border-slate-200/90 shadow-sm transition-all duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : isSidebarCollapsed ? '-translate-x-full' : 'translate-x-0'}
      `}>
        {/* Brand Header with Close Sidebar Button */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-100 bg-white">
          <AarogyamLogo size="sm" subtitle={roleHeaderMeta.tag} />

          {/* Close Sidebar Button (Desktop & Mobile) */}
          <button
            onClick={handleCloseSidebar}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer"
            title="Close sidebar navigation"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="w-5 h-5 hidden lg:block" />
            <X className="w-5 h-5 lg:hidden" />
          </button>
        </div>

        {/* User Mini Card */}
        <div 
          onClick={() => handleNav('profile')}
          className="mx-4 my-3.5 p-3 rounded-2xl bg-amber-50/60 hover:bg-amber-100/70 border border-amber-200/80 flex items-center gap-3 shadow-2xs cursor-pointer group transition"
          title="Click to view and edit your profile & photo"
        >
          <img 
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
            alt={currentUser?.fullName || currentUser?.name || 'User'} 
            className="w-11 h-11 rounded-full object-cover border-2 border-amber-400 shadow-xs shrink-0 group-hover:scale-105 transition"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-950 transition">{currentUser?.fullName || currentUser?.name}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[10px] text-slate-600 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 shrink-0">
                {currentUser?.id}
              </span>
              <span className="text-[10px] text-amber-700 font-bold truncate capitalize">
                {currentRole} Portal
              </span>
            </div>
          </div>
          <Edit3 className="w-3.5 h-3.5 text-amber-700 opacity-60 group-hover:opacity-100 transition shrink-0" />
        </div>

        {/* Navigation List */}
        <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-5 scrollbar-thin">
          {navSections.map((section, idx) => (
            <div key={idx}>
              {section.title && (
                <p className="px-3 text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-1.5">
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
                          ? 'bg-amber-400 text-slate-950 shadow-sm shadow-amber-400/20 font-bold' 
                          : item.highlight
                          ? 'text-amber-900 hover:bg-amber-50 bg-amber-50/50 border border-amber-200/60 font-semibold'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 font-medium'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 transition-transform group-hover:scale-110 ${
                          isActive ? 'text-slate-950' : item.highlight ? 'text-amber-600' : 'text-slate-400'
                        }`} />
                        <span className="truncate">{item.label}</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                            isActive ? 'bg-slate-950 text-amber-300' : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className={`w-3 h-3 text-slate-400 group-hover:text-slate-600 transition-transform ${
                          isActive ? 'text-slate-950 translate-x-0.5' : 'opacity-0 group-hover:opacity-100'
                        }`} />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer: Secure Logout */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70">
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 transition cursor-pointer shadow-2xs"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
