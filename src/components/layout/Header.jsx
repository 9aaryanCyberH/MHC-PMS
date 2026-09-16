import React, { useState } from 'react';
import { 
  Menu, 
  Search, 
  Bell, 
  CalendarPlus,
  Calendar, 
  User, 
  LogOut, 
  ChevronDown, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  PanelLeftOpen,
  Shield,
  Stethoscope,
  Building,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = ({ setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentRole,
    switchRoleWithLogout,
    currentUser,
    logout, 
    appointments, 
    broadcastNotifications,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsBookingModalOpen
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showRoleMenu, setShowRoleMenu] = useState(false);


  const pageTitles = {
    // Patient
    dashboard: 'Patient Health Dashboard',
    availability: 'Check Doctor Availability',
    'book-appointment': 'Book Appointment',
    appointments: currentRole === 'doctor' ? 'Clinical Appointments Schedule' : currentRole === 'receptionist' ? 'Master Appointments Schedule' : 'My Appointments Schedule',
    records: currentRole === 'doctor' ? 'Psychiatric Electronic Health Records (EHR)' : currentRole === 'admin' ? 'Central Database Records (EHR)' : 'Electronic Health Records (EHR)',
    'prescriptions-lab': currentRole === 'doctor' ? 'e-Prescriptions & Psychometric Lab Reports' : 'Prescriptions & Diagnostic Lab Reports',
    doctors: 'Clinical Specialists Directory',
    profile: 'Patient Profile & Settings',
    // Doctor
    'clinical-queue': 'Clinician Consultation Queue & EHR',
    // Receptionist
    'clinic-desk': 'Central Reception & Scheduling Desk',
    // Admin
    'system-overview': 'System Governance & Administrative Portal'
  };

  const roleMeta = {
    patient: { label: 'Patient Portal', icon: User, badgeClass: 'text-indigo-700 bg-indigo-50 border-indigo-200' },
    doctor: { label: 'Attending Doctor', icon: Stethoscope, badgeClass: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    receptionist: { label: 'Reception Desk', icon: Building, badgeClass: 'text-sky-700 bg-sky-50 border-sky-200' },
    admin: { label: 'System Admin', icon: Shield, badgeClass: 'text-purple-700 bg-purple-50 border-purple-200' }
  };

  const activeRoleMeta = roleMeta[currentRole] || roleMeta.patient;
  const RoleIcon = activeRoleMeta.icon;

  const currentDate = new Date('2026-09-18T10:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const handleSwitchToRole = (targetRole) => {
    setShowRoleMenu(false);
    setShowProfileMenu(false);
    // Mandatory logout of current profile and redirect to login page for credentials
    switchRoleWithLogout(targetRole);
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-xs">
      {/* Left side: Hamburger + Open Sidebar (when collapsed) + Page Title */}
      <div className="flex items-center gap-3">
        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileOpen(prev => !prev)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Desktop Open Sidebar button if collapsed */}
        {isSidebarCollapsed && (
          <button
            onClick={() => setIsSidebarCollapsed(false)}
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold transition shadow-xs cursor-pointer"
            title="Open sidebar navigation"
          >
            <PanelLeftOpen className="w-4 h-4" />
            <span>Open Sidebar</span>
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">MHC-PMS</span>
            <span className="text-xs text-slate-300 hidden sm:inline">/</span>
            <div className={`hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-bold uppercase tracking-wider ${activeRoleMeta.badgeClass}`}>
              <RoleIcon className="w-3 h-3" />
              <span>{activeRoleMeta.label}</span>
            </div>
          </div>
          <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
            {pageTitles[activeTab] || 'Healthcare Portal'}
          </h2>
        </div>
      </div>

      {/* Right side: Quick Actions + Notifications + Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Patient quick booking shortcut */}
        {currentRole === 'patient' && (
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        )}

        {/* Date Indicator */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 rounded-xl text-xs text-slate-600 font-medium">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{currentDate}</span>
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
              setShowRoleMenu(false);
            }}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative transition cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5" />
            {broadcastNotifications && broadcastNotifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">System Notifications & Broadcasts</h4>
                <span className="text-[10px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-bold">
                  {broadcastNotifications?.length || 0} Alerts
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {broadcastNotifications && broadcastNotifications.map((notif) => (
                  <div key={notif.id} className="p-3 hover:bg-slate-50 transition text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        notif.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
                      }`}>
                        {notif.priority}
                      </span>
                      <span className="text-[10px] text-slate-400">{notif.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800">{notif.title}</p>
                    <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{notif.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Switch Role / Account Menu (Requires credentials & logs out current profile) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowRoleMenu(!showRoleMenu);
              setShowNotifications(false);
              setShowProfileMenu(false);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition cursor-pointer"
            title="Switch profile role (Requires credential sign in)"
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-600" />
            <span className="hidden sm:inline">Switch Role</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3.5 py-1.5 border-b border-slate-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Switch Healthcare Role
                </span>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Switching logs you out of {currentUser?.fullName || 'current session'} and requires entering credentials for the target role.
                </p>
              </div>

              <div className="p-1.5 space-y-1">
                {[
                  { role: 'doctor', label: 'Doctor', sub: 'Clinical Consultation Queue', icon: Stethoscope, color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700' },
                  { role: 'receptionist', label: 'Receptionist', sub: 'Front Desk & Admissions', icon: Building, color: 'text-sky-600', badge: 'bg-sky-50 text-sky-700' },
                  { role: 'admin', label: 'System Admin', sub: 'IT Governance & Reports', icon: Shield, color: 'text-purple-600', badge: 'bg-purple-50 text-purple-700' },
                  { role: 'patient', label: 'Patient', sub: 'Health Portal & Prescriptions', icon: User, color: 'text-indigo-600', badge: 'bg-indigo-50 text-indigo-700' }
                ].map(r => {
                  const Icon = r.icon;
                  const isCurrent = currentRole === r.role;
                  return (
                    <button
                      key={r.role}
                      onClick={() => handleSwitchToRole(r.role)}
                      className={`w-full flex items-center justify-between p-2.5 text-xs rounded-xl font-medium text-left transition cursor-pointer ${
                        isCurrent ? 'bg-slate-100 text-slate-900 border border-slate-200' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className={`p-1.5 rounded-lg ${r.badge}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-bold block truncate">{r.label}</span>
                          <span className="text-[10px] text-slate-400 block truncate">{r.sub}</span>
                        </div>
                      </div>

                      {isCurrent ? (
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md shrink-0">
                          Active
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-indigo-600 hover:text-indigo-800 shrink-0 flex items-center gap-1">
                          Log out & Sign In →
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
              setShowRoleMenu(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            aria-label="User Menu"
          >
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'} 
              alt={currentUser?.fullName || currentUser?.name || 'User'} 
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900 truncate">
                  {currentUser?.fullName || currentUser?.name}
                </p>
                <p className="text-[11px] text-slate-500 font-mono truncate">
                  {currentUser?.email || currentUser?.id}
                </p>
                <span className="mt-1.5 inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  {currentRole} Role
                </span>
              </div>

              <div className="py-1">
                {currentRole === 'patient' && (
                  <button
                    onClick={() => {
                      setActiveTab('profile');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>My Profile & EHR Settings</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    setShowRoleMenu(true);
                  }}
                  className="w-full px-4 py-2 text-xs text-indigo-600 hover:bg-indigo-50 flex items-center gap-2 font-medium"
                >
                  <ArrowRightLeft className="w-4 h-4 text-indigo-500" />
                  <span>Switch Role / Profile</span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({currentRole.toUpperCase()})</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
