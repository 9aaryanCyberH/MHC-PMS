import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Toast } from './components/common/Toast';
import { LoginView } from './components/modules/LoginView';
import { DashboardView } from './components/modules/DashboardView';
import { AvailabilityView } from './components/modules/AvailabilityView';
import { AppointmentsView } from './components/modules/AppointmentsView';
import { PatientRecordsView } from './components/modules/PatientRecordsView';
import { PrescriptionsLabView } from './components/modules/PrescriptionsLabView';
import { DoctorsView } from './components/modules/DoctorsView';
import { PatientProfileView } from './components/modules/PatientProfileView';
import { BookAppointmentModal } from './components/modules/BookAppointmentModal';
import { DoctorClinicalView } from './components/modules/DoctorClinicalView';
import { ReceptionistDeskView } from './components/modules/ReceptionistDeskView';
import { AdminGovernanceView } from './components/modules/AdminGovernanceView';

const MainLayout = () => {
  const { 
    isAuthenticated, 
    currentRole,
    activeTab, 
    isBookingModalOpen, 
    setIsBookingModalOpen,
    slotToBook,
    setSlotToBook,
    isSidebarCollapsed 
  } = useApp();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // If unauthenticated, show the multi-role login screen
  if (!isAuthenticated) {
    return (
      <>
        <LoginView />
        <Toast />
      </>
    );
  }

  const renderActiveModule = () => {
    // Role-specific routing
    if (currentRole === 'doctor') {
      if (activeTab === 'doctors') return <DoctorsView />;
      return <DoctorClinicalView />;
    }

    if (currentRole === 'receptionist') {
      if (activeTab === 'doctors') return <DoctorsView />;
      return <ReceptionistDeskView />;
    }

    if (currentRole === 'admin') {
      if (activeTab === 'doctors') return <DoctorsView />;
      return <AdminGovernanceView />;
    }

    // Default: Patient Role
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'availability':
        return <AvailabilityView />;
      case 'book-appointment':
        return <AvailabilityView />;
      case 'appointments':
        return <AppointmentsView />;
      case 'records':
        return <PatientRecordsView />;
      case 'prescriptions-lab':
        return <PrescriptionsLabView />;
      case 'doctors':
        return <DoctorsView />;
      case 'profile':
        return <PatientProfileView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-indigo-600 selection:text-white">
      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

        {/* Main Application Area (expands full width when sidebar is collapsed) */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'lg:pl-0' : 'lg:pl-72'
        }`}>
          {/* Top Bar / Header */}
          <Header setIsMobileOpen={setIsMobileOpen} />

          {/* Primary View Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderActiveModule()}
          </main>

          {/* Footer */}
          <footer className="border-t border-slate-200/80 bg-white py-4 px-6 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>
              <strong>MHC-PMS</strong> — Mental Health Care Patient Management System
            </p>
            <p className="text-[11px] text-slate-400">
              Multi-Role Healthcare Management Portal • Confidential & Secure
            </p>
          </footer>
        </div>
      </div>

      {/* Global Booking Modal */}
      <BookAppointmentModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSlotToBook(null);
        }}
        initialData={slotToBook}
      />

      {/* Global Toast */}
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
