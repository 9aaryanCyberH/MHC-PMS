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
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Header = ({ setIsMobileOpen }) => {
  const { 
    activeTab, 
    setActiveTab, 
    currentUser,
    logout, 
    appointments, 
    isSidebarCollapsed,
    setIsSidebarCollapsed,
    setIsBookingModalOpen
  } = useApp();
  
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');

  const pageTitles = {
    dashboard: 'Patient Health Dashboard',
    availability: 'Check Doctor Availability',
    'book-appointment': 'Book Appointment',
    appointments: 'My Appointments Schedule',
    records: 'Electronic Health Records (EHR)',
    'prescriptions-lab': 'Prescriptions & Diagnostic Lab Reports',
    doctors: 'Clinical Specialists Directory',
    profile: 'Patient Profile & Settings'
  };

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
            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {pageTitles[activeTab] || 'Clinical Management Portal'}
            </h1>
          </div>
        </div>
      </div>

      {/* Right side: Book Quick Button + Patient Portal Indicator + Emergency helpline + Date + Notifications + User chip */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Book Button */}
        <button
          onClick={() => setIsBookingModalOpen(true)}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition shadow-xs hover:shadow-indigo-500/20 active:scale-95 cursor-pointer"
        >
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>Book Visit</span>
        </button>

        {/* Dedicated Patient Portal Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold shadow-2xs">
          <User className="w-3.5 h-3.5 text-indigo-600" />
          <span>Patient Portal</span>
        </div>

        {/* Helpline Pill */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/80 rounded-full text-xs text-emerald-900 font-medium">
          <PhoneCall className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Helpline: <strong>14416</strong></span>
        </div>

        {/* Date pill */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium text-slate-600 border border-slate-200/60">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{currentDate}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition cursor-pointer"
            title="System Notifications"
          >
            <Bell className="w-5 h-5" />
            {upcomingAppointments.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 px-2">
                <span className="text-xs font-bold text-slate-900">Notifications</span>
                <span className="text-[10px] text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full font-semibold">
                  {upcomingAppointments.length} Active
                </span>
              </div>
              <div className="py-2 space-y-2 max-h-60 overflow-y-auto">
                {upcomingAppointments.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-3">No new notifications</p>
                ) : (
                  upcomingAppointments.slice(0, 3).map(apt => (
                    <div 
                      key={apt.id} 
                      onClick={() => {
                        setActiveTab('appointments');
                        setShowNotifications(false);
                      }}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-indigo-50/60 transition cursor-pointer border border-slate-100"
                    >
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-indigo-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-slate-800">
                            Upcoming Consultation with {apt.doctorName}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {apt.date} at {apt.time} ({apt.type})
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition border border-transparent hover:border-slate-200 cursor-pointer"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.fullName}
              className="w-9 h-9 rounded-full object-cover border-2 border-indigo-500/80 shadow-xs"
            />
            <div className="hidden sm:block text-left">
              <span className="block text-xs font-bold text-slate-800 leading-tight">
                {currentUser.fullName}
              </span>
              <span className="block text-[10px] text-indigo-600 font-mono font-semibold leading-none mt-0.5">
                {currentUser.id}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-1.5 z-50 animate-in fade-in zoom-in-95">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-900">{currentUser.fullName}</p>
                <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded-md border border-indigo-100">
                  Patient Portal
                </span>
              </div>
              <button
                onClick={() => {
                  setActiveTab('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-700 transition cursor-pointer"
              >
                <User className="w-4 h-4" />
                <span>My Profile</span>
              </button>
              <div className="border-t border-slate-100 my-1" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  logout();
                }}
                className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition font-medium cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
