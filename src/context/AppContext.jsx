import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDoctors } from '../data/mockDoctors';
import { initialAppointments } from '../data/mockAppointments';
import { mockPatientProfile, mockMedicalRecords } from '../data/mockMedicalRecords';
import { mockPrescriptions } from '../data/mockPrescriptions';
import { mockLabRecords } from '../data/mockLabRecords';
import { 
  mockStaffProfiles, 
  initialUserAccounts, 
  initialClinicNodes, 
  mockAdminReports, 
  initialBillingInvoices, 
  initialWaitingVisitors, 
  initialBroadcastNotifications 
} from '../data/mockSystemData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current active role: 'patient' | 'doctor' | 'receptionist' | 'admin'
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('mhc_current_role');
    return saved || 'patient';
  });

  // Auth state - always starts unauthenticated on fresh open so login screen is presented first
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Patient profile
  const [patientProfile, setPatientProfile] = useState(() => {
    const saved = localStorage.getItem('mhc_patient_profile');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.fullName === 'Rahul Mehta' || !parsed.fullName) {
        return mockPatientProfile;
      }
      return { ...mockPatientProfile, ...parsed };
    }
    return mockPatientProfile;
  });

  // Staff profiles (Doctor, Receptionist, Admin)
  const [staffProfiles, setStaffProfiles] = useState(() => {
    const saved = localStorage.getItem('mhc_staff_profiles');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.doctor?.fullName === 'Dr. Ananya Sharma' || parsed.admin?.fullName === 'Vikram Deshmukh' || parsed.receptionist?.fullName === 'Priya Nair') {
        return mockStaffProfiles;
      }
      return { ...mockStaffProfiles, ...parsed };
    }
    return mockStaffProfiles;
  });

  // User accounts registry for Admin management
  const [userAccounts, setUserAccounts] = useState(() => {
    const saved = localStorage.getItem('mhc_user_accounts');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.some(a => a.name === 'Rahul Mehta' || a.name === 'Dr. Ananya Sharma')) {
        return initialUserAccounts;
      }
      return parsed;
    }
    return initialUserAccounts;
  });

  // Cross-clinic synchronization nodes
  const [clinicNodes, setClinicNodes] = useState(() => {
    const saved = localStorage.getItem('mhc_clinic_nodes');
    return saved ? JSON.parse(saved) : initialClinicNodes;
  });

  // Receptionist billing invoices
  const [billingInvoices, setBillingInvoices] = useState(() => {
    const saved = localStorage.getItem('mhc_billing_invoices');
    return saved ? JSON.parse(saved) : initialBillingInvoices;
  });

  // Receptionist waiting room visitors
  const [waitingVisitors, setWaitingVisitors] = useState(() => {
    const saved = localStorage.getItem('mhc_waiting_visitors');
    return saved ? JSON.parse(saved) : initialWaitingVisitors;
  });

  // System broadcast announcements
  const [broadcastNotifications, setBroadcastNotifications] = useState(() => {
    const saved = localStorage.getItem('mhc_broadcast_notifications');
    return saved ? JSON.parse(saved) : initialBroadcastNotifications;
  });

  // Appointments
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('mhc_appointments');
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  // Prescriptions
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('mhc_prescriptions');
    return saved ? JSON.parse(saved) : mockPrescriptions;
  });

  // Doctors & records
  const [doctors, setDoctors] = useState(mockDoctors);
  const [medicalRecords] = useState(mockMedicalRecords);
  const [labRecords] = useState(mockLabRecords);
  const [adminReports] = useState(mockAdminReports);

  // Sidebar collapse toggle state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Navigation tab based on current role
  const [activeTab, setActiveTab] = useState('dashboard');

  // Specific doctor pre-selected for availability check
  const [preselectedDoctorId, setPreselectedDoctorId] = useState(null);
  const [slotToBook, setSlotToBook] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('mhc_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.removeItem('mhc_authenticated');
  }, []);

  useEffect(() => {
    localStorage.setItem('mhc_patient_profile', JSON.stringify(patientProfile));
  }, [patientProfile]);

  useEffect(() => {
    localStorage.setItem('mhc_staff_profiles', JSON.stringify(staffProfiles));
  }, [staffProfiles]);

  useEffect(() => {
    localStorage.setItem('mhc_user_accounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  useEffect(() => {
    localStorage.setItem('mhc_clinic_nodes', JSON.stringify(clinicNodes));
  }, [clinicNodes]);

  useEffect(() => {
    localStorage.setItem('mhc_billing_invoices', JSON.stringify(billingInvoices));
  }, [billingInvoices]);

  useEffect(() => {
    localStorage.setItem('mhc_waiting_visitors', JSON.stringify(waitingVisitors));
  }, [waitingVisitors]);

  useEffect(() => {
    localStorage.setItem('mhc_broadcast_notifications', JSON.stringify(broadcastNotifications));
  }, [broadcastNotifications]);

  useEffect(() => {
    localStorage.setItem('mhc_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('mhc_prescriptions', JSON.stringify(prescriptions));
  }, [prescriptions]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Role switching
  const switchRole = (newRole) => {
    setCurrentRole(newRole);
    if (newRole === 'patient') setActiveTab('dashboard');
    else if (newRole === 'doctor') setActiveTab('clinical-queue');
    else if (newRole === 'receptionist') setActiveTab('clinic-desk');
    else if (newRole === 'admin') setActiveTab('system-overview');

    const roleNames = {
      patient: `Patient Portal (${patientProfile.fullName})`,
      doctor: `Attending Psychiatrist (${staffProfiles.doctor?.fullName || 'Dr. Shashank Pandey'})`,
      receptionist: `Clinic Reception Desk (${staffProfiles.receptionist?.fullName || 'Medha Banerjee'})`,
      admin: `System Administrator (${staffProfiles.admin?.fullName || 'Shounak Sarkar'})`
    };
    showToast(`Switched active view to ${roleNames[newRole] || newRole}.`, 'info');
  };

  // Authentication
  const login = (identifier, password, targetRole = 'patient') => {
    const validCredentials = {
      patient: {
        ids: ['pt-88204', 'aaryan.kumar@example.com', 'aaryan', 'demo'],
        defaultPass: 'patient123',
        name: patientProfile.fullName
      },
      doctor: {
        ids: ['doc-001', 'shashank.pandey@mhc-pms.org', 'shashank', 'demo'],
        defaultPass: 'doctor123',
        name: staffProfiles.doctor?.fullName || 'Dr. Shashank Pandey'
      },
      receptionist: {
        ids: ['rec-104', 'medha.banerjee@mhc-pms.org', 'medha', 'demo'],
        defaultPass: 'reception123',
        name: staffProfiles.receptionist?.fullName || 'Medha Banerjee'
      },
      admin: {
        ids: ['adm-001', 'shounak.sarkar@mhc-pms.org', 'shounak', 'admin', 'demo'],
        defaultPass: 'admin123',
        name: staffProfiles.admin?.fullName || 'Shounak Sarkar'
      }
    };

    const roleRule = validCredentials[targetRole] || validCredentials.patient;
    const cleanId = identifier.trim().toLowerCase();
    const cleanPass = password.trim();

    const isIdMatch = roleRule.ids.includes(cleanId);
    const isPassMatch = cleanPass === roleRule.defaultPass || cleanPass === 'demo' || cleanPass.length >= 4;

    if (!isIdMatch || !isPassMatch) {
      return {
        success: false,
        error: `Invalid credentials for ${targetRole.toUpperCase()} role. Hint: Use ID ${roleRule.ids[0].toUpperCase()} and Password ${roleRule.defaultPass}`
      };
    }

    setIsAuthenticated(true);
    setCurrentRole(targetRole);

    if (targetRole === 'patient') {
      setActiveTab('dashboard');
      showToast(`Welcome, ${patientProfile.fullName}! Patient Portal active.`);
    } else if (targetRole === 'doctor') {
      setActiveTab('clinical-queue');
      showToast(`Welcome, ${staffProfiles.doctor?.fullName || 'Dr. Shashank Pandey'}! Clinical workspace active.`);
    } else if (targetRole === 'receptionist') {
      setActiveTab('clinic-desk');
      showToast(`Welcome, ${staffProfiles.receptionist?.fullName || 'Medha Banerjee'}! Reception desk active.`);
    } else if (targetRole === 'admin') {
      setActiveTab('system-overview');
      showToast(`Welcome, ${staffProfiles.admin?.fullName || 'Shounak Sarkar'}! System Admin console active.`);
    }
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out securely.', 'info');
  };

  // Appointments
  const bookNewAppointment = (appointmentData) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment = {
      id: newId,
      ...appointmentData,
      status: 'Upcoming',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`Appointment ${newId} confirmed successfully with ${appointmentData.doctorName}!`);
    return newAppointment;
  };

  const cancelAppointment = (appointmentId, reason = 'Cancelled by Patient') => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        return {
          ...apt,
          status: 'Cancelled',
          cancellationReason: reason,
          cancelledAt: new Date().toLocaleString()
        };
      }
      return apt;
    }));
    showToast(`Appointment ${appointmentId} has been cancelled.`, 'info');
  };

  // Patient Profile updates
  const updateProfile = (updatedData) => {
    setPatientProfile(prev => ({
      ...prev,
      ...updatedData
    }));
    showToast('Patient profile updated successfully!');
  };

  // Doctor Profile & Speciality updates
  const updateDoctorProfile = (updatedData) => {
    setStaffProfiles(prev => ({
      ...prev,
      doctor: {
        ...prev.doctor,
        ...updatedData
      }
    }));
    // Also update doctors directory
    setDoctors(prev => prev.map(doc => {
      if (doc.id === 'DOC-001') {
        return {
          ...doc,
          name: updatedData.fullName || doc.name,
          speciality: updatedData.title || doc.speciality,
          qualifications: updatedData.qualifications || doc.qualifications,
          fee: updatedData.consultationFee ? Number(updatedData.consultationFee) : doc.fee,
          timings: updatedData.schedule || doc.timings,
          bio: updatedData.bio || doc.bio
        };
      }
      return doc;
    }));
    showToast('Doctor credentials & clinical information updated successfully!');
  };

  // Doctor Prescriptions
  const addNewPrescription = (newRxData) => {
    const newId = `RX-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord = {
      id: newId,
      ...newRxData,
      doctorName: staffProfiles.doctor.fullName,
      doctorTitle: staffProfiles.doctor.title,
      date: new Date().toISOString().split('T')[0],
      displayDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active'
    };

    setPrescriptions(prev => [newRecord, ...prev]);
    showToast(`Prescription ${newId} for ${newRxData.medicineName} signed and added to patient record!`);
    return newRecord;
  };

  // Admin: User Account Management (Activate / Deactivate)
  const toggleUserAccountStatus = (userId) => {
    setUserAccounts(prev => prev.map(acc => {
      if (acc.id === userId) {
        const nextStatus = acc.status === 'Active' ? 'Deactivated' : 'Active';
        showToast(`Account ${acc.id} (${acc.name}) is now ${nextStatus}.`, nextStatus === 'Active' ? 'success' : 'warning');
        return { ...acc, status: nextStatus };
      }
      return acc;
    }));
  };

  // Admin: Synchronize Clinics
  const triggerClinicSync = (nodeId = null) => {
    setClinicNodes(prev => prev.map(node => {
      if (!nodeId || node.id === nodeId) {
        return {
          ...node,
          status: 'Online & Synchronized',
          lastSynced: 'Just now (Manual Sync)',
          pendingRecords: 0
        };
      }
      return node;
    }));
    showToast('Central and regional clinic databases synchronized successfully!');
  };

  // Admin: Broadcast Announcement
  const broadcastAnnouncement = (announcement) => {
    const newNotif = {
      id: `NOTIF-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...announcement
    };
    setBroadcastNotifications(prev => [newNotif, ...prev]);
    showToast(`System notification broadcasted to ${announcement.audience}!`);
  };

  // Receptionist: Create Billing Invoice
  const createBillingInvoice = (invoiceData) => {
    const newInvoice = {
      invoiceId: `INV-2026-${Math.floor(800 + Math.random() * 199)}`,
      receiptNumber: `REC-${Math.floor(99000 + Math.random() * 999)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      ...invoiceData
    };
    setBillingInvoices(prev => [newInvoice, ...prev]);
    showToast(`Payment of ₹${invoiceData.amount} recorded for ${invoiceData.patientName}! Receipt generated.`);
    return newInvoice;
  };

  // Receptionist: Check-in Visitor
  const checkInVisitor = (visitorData) => {
    const newVisitor = {
      id: `VIS-${Math.floor(300 + Math.random() * 99)}`,
      tokenNumber: waitingVisitors.length + 1,
      arrivalTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      status: 'In Waiting Lounge',
      ...visitorData
    };
    setWaitingVisitors(prev => [newVisitor, ...prev]);
    showToast(`Patient ${visitorData.patientName} checked into waiting lounge (Token #${newVisitor.tokenNumber}).`);
    return newVisitor;
  };

  const updateVisitorStatus = (visitorId, newStatus) => {
    setWaitingVisitors(prev => prev.map(v => {
      if (v.id === visitorId) {
        return { ...v, status: newStatus };
      }
      return v;
    }));
    showToast(`Visitor status updated to ${newStatus}.`);
  };

  const navigateToCheckAvailability = (doctorId = null) => {
    if (doctorId) {
      setPreselectedDoctorId(doctorId);
    }
    setActiveTab('availability');
  };

  const openBookingForSlot = (slotDetails) => {
    setSlotToBook(slotDetails);
    setIsBookingModalOpen(true);
  };

  // Get active profile based on current role
  const currentUser = currentRole === 'patient' 
    ? patientProfile 
    : staffProfiles[currentRole] || patientProfile;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        switchRole,
        currentUser,
        isAuthenticated,
        login,
        logout,
        patientProfile,
        updateProfile,
        staffProfiles,
        doctorProfile: staffProfiles.doctor,
        updateDoctorProfile,
        userAccounts,
        toggleUserAccountStatus,
        clinicNodes,
        triggerClinicSync,
        adminReports,
        billingInvoices,
        createBillingInvoice,
        waitingVisitors,
        checkInVisitor,
        updateVisitorStatus,
        broadcastNotifications,
        broadcastAnnouncement,
        appointments,
        bookNewAppointment,
        cancelAppointment,
        activeTab,
        setActiveTab,
        preselectedDoctorId,
        setPreselectedDoctorId,
        navigateToCheckAvailability,
        slotToBook,
        setSlotToBook,
        isBookingModalOpen,
        setIsBookingModalOpen,
        openBookingForSlot,
        doctors,
        medicalRecords,
        prescriptions,
        addNewPrescription,
        labRecords,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar: () => setIsSidebarCollapsed(prev => !prev),
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
