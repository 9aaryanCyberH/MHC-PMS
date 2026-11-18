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
  ArrowRightLeft,
  Home,
  RefreshCw,
  Cloud,
  FileSpreadsheet
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = ({ setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentRole,
    currentUser,
    logout, 
    appointments, 
    broadcastNotifications,
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsBookingModalOpen,
    setPublicView,
    syncAllCollectionsToFirebase,
    firebaseSyncStatus
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isHeaderSyncing, setIsHeaderSyncing] = useState(false);

  const handleHeaderSync = async () => {
    setIsHeaderSyncing(true);
    try {
      await syncAllCollectionsToFirebase();
    } finally {
      setTimeout(() => setIsHeaderSyncing(false), 700);
    }
  };

  const pageTitles = {
    // Patient
    dashboard: 'Patient Health Dashboard',
    availability: 'Check Doctor Availability',
    'book-appointment': 'Book Appointment',
    appointments: currentRole === 'doctor' ? 'Clinical Appointments Schedule' : currentRole === 'receptionist' ? 'Master Appointments Schedule' : 'My Appointments Schedule',
    records: 'Electronic Health Records (EHR) — Excel Spreadsheet Database',
    'prescriptions-lab': currentRole === 'doctor' ? 'e-Prescriptions & Psychometric Lab Reports' : 'Prescriptions & Diagnostic Lab Reports',
    doctors: 'Clinical Specialists Directory',
    profile: currentRole === 'admin' ? 'Administrator Profile & Governance Settings' : currentRole === 'doctor' ? 'Doctor Profile & Clinical Credentials' : currentRole === 'receptionist' ? 'Front Desk Profile & Shift Settings' : 'Patient Profile & Account Settings',
    // Doctor Specific
    'doc-queue': 'Clinician Consultation Queue',
    'doc-patients': 'Psychiatric EHR Dossiers & Patient Files',
    'doc-prescriptions': 'e-Prescribing & Medication Regimens',
    'doc-labs': 'Psychometric Scales & Laboratory Diagnostics',
    'doc-alerts': 'Clinical Risk Surveillance & Monitoring Alerts',
    'doc-speciality': 'Physician Speciality Credentials & OPD Suite',
    'doc-sync': 'Hospital Cloud Firebase & Excel Data Sync',
    // Receptionist Specific
    'rec-schedule': 'Front Desk Appointment Booking & Triage',
    'rec-patients': 'Patient Intake & Master Health Registry',
    'rec-visitors': 'Visitor Lounge Details & Queue Tokens',
    'rec-billing': 'Patient Payments & Billing Invoices',
    'rec-counselling': 'Psychological Counselling & Therapy Allotments',
    'rec-sync': 'Hospital Cloud Firebase & Excel Data Sync',
    // Admin Specific
    'adm-accounts': 'User Account Governance & Role Permissions',
    'adm-reports': 'Clinical Analytics & Mental Healthcare Act Reports',
    'adm-sync': 'Hospital Cloud Firebase & Cross-Clinic Data Sync',
    'adm-audit': 'System Security & Regulatory Audit Trail',
    'adm-broadcasts': 'Hospital Broadcast Bulletins & System Alerts'
  };

  const roleMeta = {
    patient: { label: 'Patient Portal', icon: User, badgeClass: 'text-amber-900 bg-amber-50 border-amber-300 font-semibold' },
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
            className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold transition shadow-xs cursor-pointer"
            title="Open sidebar navigation"
          >
            <PanelLeftOpen className="w-4 h-4" />
            <span>Open Sidebar</span>
          </button>
        )}

        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-amber-500 font-black tracking-tight hidden sm:inline">Aarogyam</span>
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
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Back to Home Page shortcut */}
        <button
          onClick={() => {
            logout();
            setPublicView('landing');
          }}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition shadow-2xs cursor-pointer border border-slate-200/70"
          title="Return to Home Page"
        >
          <Home className="w-3.5 h-3.5 text-slate-600" />
          <span>Home Page</span>
        </button>

        {/* Staff Quick Action: Cloud Sync Button */}
        {currentRole !== 'patient' && (
          <button
            onClick={handleHeaderSync}
            disabled={isHeaderSyncing || firebaseSyncStatus.isSyncing}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/40 text-xs font-bold transition shadow-2xs cursor-pointer disabled:opacity-50"
            title="Synchronize all hospital collections to Google Cloud Firebase"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isHeaderSyncing || firebaseSyncStatus.isSyncing ? 'animate-spin text-amber-400' : 'text-amber-400'}`} />
            <span className="hidden md:inline">{isHeaderSyncing || firebaseSyncStatus.isSyncing ? 'Syncing...' : 'Cloud Sync'}</span>
          </button>
        )}

        {/* Staff Quick Action: Open Tabular EHR (when not on records) */}
        {currentRole !== 'patient' && activeTab !== 'records' && (
          <button
            onClick={() => setActiveTab('records')}
            className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition shadow-xs cursor-pointer"
            title="Open live multi-sheet Tabular EHR spreadsheet on website"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-950" />
            <span>Tabular EHR</span>
          </button>
        )}

        {/* Patient quick booking shortcut (when not on dashboard where prominent hero button exists) */}
        {currentRole === 'patient' && activeTab !== 'dashboard' && (
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-slate-950" />
            <span>Book Appointment</span>
          </button>
        )}

        {/* Date Indicator */}
        <div className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100/90 border border-slate-200/60 rounded-xl text-xs text-slate-600 font-medium">
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
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-900">System Notifications & Broadcasts</h4>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">
                  {broadcastNotifications?.length || 0} Alerts
                </span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                {broadcastNotifications && broadcastNotifications.map((notif) => (
                  <div key={notif.id} className="p-3 hover:bg-slate-50 transition text-left">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        notif.priority === 'High' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-900'
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

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
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
                <button
                  onClick={() => {
                    setActiveTab('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 cursor-pointer font-medium"
                >
                  <User className="w-4 h-4 text-amber-600" />
                  <span>
                    {currentRole === 'patient' 
                      ? 'My Profile & Account Settings' 
                      : currentRole === 'doctor'
                      ? 'Doctor Profile & Photo'
                      : currentRole === 'receptionist'
                      ? 'Front Desk Profile & Photo'
                      : 'Admin Profile & Photo'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    logout();
                    setShowProfileMenu(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
