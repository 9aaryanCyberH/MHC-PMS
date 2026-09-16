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
  // Current active role: 'admin' | 'receptionist' | 'doctor' | 'patient'
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('mhc_current_role');
    return saved || 'patient';
  });

  // Auth state - starts unauthenticated on fresh open so login screen is presented first
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

  // Switch profile notice state
  const [switchNotice, setSwitchNotice] = useState('');

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

  // Switch role with mandatory logout and credential re-prompt
  const switchRoleWithLogout = (targetRole) => {
    const normTarget = (targetRole || 'patient').toLowerCase().replace('system ', '').trim();
    const actualTarget = normTarget === 'admin' ? 'admin' 
      : normTarget === 'receptionist' ? 'receptionist' 
      : normTarget === 'doctor' ? 'doctor' 
      : 'patient';

    const previousRoleLabel = currentRole === 'admin' ? 'System Admin' 
      : currentRole === 'doctor' ? 'Doctor' 
      : currentRole === 'receptionist' ? 'Receptionist' 
      : 'Patient';

    const targetRoleLabel = actualTarget === 'admin' ? 'System Admin' 
      : actualTarget === 'doctor' ? 'Doctor' 
      : actualTarget === 'receptionist' ? 'Receptionist' 
      : 'Patient';

    // Log out current session
    setIsAuthenticated(false);
    setCurrentRole(actualTarget);
    
    const notice = `Logged out from ${previousRoleLabel} profile. Please enter credentials for ${targetRoleLabel} to proceed.`;
    setSwitchNotice(notice);
    showToast(notice, 'info');
  };

  // Role Switcher
  const switchRole = (newRole) => {
    const norm = newRole.toLowerCase().replace('system ', '').trim();
    const actualRole = norm === 'admin' ? 'admin' 
      : norm === 'receptionist' ? 'receptionist' 
      : norm === 'doctor' ? 'doctor' 
      : 'patient';

    setCurrentRole(actualRole);
    if (actualRole === 'admin') setActiveTab('system-overview');
    else if (actualRole === 'receptionist') setActiveTab('clinic-desk');
    else if (actualRole === 'doctor') setActiveTab('clinical-queue');
    else setActiveTab('dashboard');
    showToast(`Switched workspace to ${actualRole.toUpperCase()} mode`, 'info');
  };

  // Multi-Role Authentication with Role, Email/ID and Password
  const login = (roleKey, identifier, password) => {
    const normalizedRole = (roleKey || 'patient').toLowerCase().replace('system ', '').trim();
    const actualRole = normalizedRole === 'admin' ? 'admin' 
      : normalizedRole === 'receptionist' ? 'receptionist'
      : normalizedRole === 'doctor' ? 'doctor' 
      : 'patient';

    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your registered email address or ID.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your account password.' };
    }

    // Role credential configuration
    const roleRules = {
      admin: {
        roleKey: 'admin',
        title: 'System Admin',
        defaultId: 'ADM-001',
        defaultEmail: 'shounak.sarkar@mhc-pms.org',
        ids: ['adm-001', 'shounak.sarkar@mhc-pms.org', 'shounak', 'admin', 'admin@mhc-pms.org', 'demo'],
        defaultPass: 'admin123',
        defaultTab: 'system-overview',
        getName: () => staffProfiles.admin?.fullName || 'Shounak Sarkar'
      },
      receptionist: {
        roleKey: 'receptionist',
        title: 'Receptionist',
        defaultId: 'REC-104',
        defaultEmail: 'medha.banerjee@mhc-pms.org',
        ids: ['rec-104', 'medha.banerjee@mhc-pms.org', 'medha', 'reception', 'receptionist@mhc-pms.org', 'demo'],
        defaultPass: 'reception123',
        defaultTab: 'clinic-desk',
        getName: () => staffProfiles.receptionist?.fullName || 'Medha Banerjee'
      },
      doctor: {
        roleKey: 'doctor',
        title: 'Doctor',
        defaultId: 'DOC-001',
        defaultEmail: 'shashank.pandey@mhc-pms.org',
        ids: ['doc-001', 'shashank.pandey@mhc-pms.org', 'shashank', 'doctor', 'doctor@mhc-pms.org', 'demo'],
        defaultPass: 'doctor123',
        defaultTab: 'clinical-queue',
        getName: () => staffProfiles.doctor?.fullName || 'Dr. Shashank Pandey'
      },
      patient: {
        roleKey: 'patient',
        title: 'Patient',
        defaultId: 'PT-88204',
        defaultEmail: 'aaryan.kumar@example.com',
        ids: ['pt-88204', 'aaryan.kumar@example.com', 'aaryan', 'patient', 'patient@example.com', 'demo'],
        defaultPass: 'patient123',
        defaultTab: 'dashboard',
        getName: () => patientProfile.fullName || 'Aaryan Kumar'
      }
    };

    const targetRule = roleRules[actualRole];

    // Check against userAccounts registry
    const registeredAccount = userAccounts.find(acc => {
      const accRoleNorm = acc.role.toLowerCase().replace('system ', '').trim();
      const isRoleMatch = accRoleNorm === actualRole;
      const isIdMatch = acc.id.toLowerCase() === cleanId || acc.email.toLowerCase() === cleanId;
      return isRoleMatch && isIdMatch;
    });

    if (registeredAccount && registeredAccount.status === 'Deactivated') {
      return {
        success: false,
        error: `Account for ${registeredAccount.name} has been deactivated by the System Admin. Please contact IT Administration.`
      };
    }

    const isMatch = targetRule.ids.includes(cleanId) || cleanId === 'demo' || (registeredAccount !== undefined);
    const isPassValid = cleanPass === targetRule.defaultPass || cleanPass === 'demo' || cleanPass === '123456';

    if (!isMatch || !isPassValid) {
      return {
        success: false,
        error: `Invalid credentials for ${targetRule.title}. Use Email: ${targetRule.defaultEmail} and Password: ${targetRule.defaultPass}`
      };
    }

    setIsAuthenticated(true);
    setCurrentRole(actualRole);
    setActiveTab(targetRule.defaultTab);
    const welcomeName = registeredAccount ? registeredAccount.name : targetRule.getName();
    showToast(`Welcome back, ${welcomeName}! Signed in as ${targetRule.title}.`);
    return { success: true };
  };

  const logout = () => {
    setIsAuthenticated(false);
    showToast('You have been logged out securely.', 'info');
  };

  // Self-Registration for Patients
  const registerPatient = (patientData) => {
    const newId = `PT-${Math.floor(88200 + Math.random() * 800)}`;
    const newProfile = {
      ...mockPatientProfile,
      id: newId,
      fullName: patientData.fullName,
      email: patientData.email,
      phone: patientData.phone || '+91 98765 43210',
      age: Number(patientData.age) || 24,
      gender: patientData.gender || 'Not specified',
      bloodGroup: patientData.bloodGroup || 'B+',
      registeredDate: new Date().toISOString().split('T')[0]
    };
    setPatientProfile(newProfile);

    // Add to user accounts registry
    setUserAccounts(prev => [{
      id: newId,
      name: patientData.fullName,
      email: patientData.email,
      role: 'Patient',
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      clinicNode: 'Central Hospital OPD'
    }, ...prev]);

    showToast(`Account registered successfully! Welcome, ${patientData.fullName}. You can now sign in as Patient.`);
    return { success: true, id: newId, email: patientData.email };
  };

  // Add User Account (Admin)
  const addUserAccount = (newAccount) => {
    const idPrefix = newAccount.role === 'Doctor' ? 'DOC' 
      : newAccount.role === 'Receptionist' ? 'REC' 
      : newAccount.role === 'System Admin' ? 'ADM' 
      : 'PT';
    const newId = `${idPrefix}-${Math.floor(100 + Math.random() * 899)}`;
    const fullAccount = {
      id: newId,
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      clinicNode: newAccount.clinicNode || 'Central Hospital OPD',
      ...newAccount
    };

    setUserAccounts(prev => [fullAccount, ...prev]);

    // If a Doctor is added, register into the specialist directory
    if (newAccount.role === 'Doctor') {
      const formattedDoc = {
        id: newId,
        name: newAccount.name.startsWith('Dr.') ? newAccount.name : `Dr. ${newAccount.name}`,
        title: newAccount.speciality ? `Consultant - ${newAccount.speciality}` : 'Consultant Psychiatrist',
        speciality: newAccount.speciality || 'General Psychiatry',
        qualification: newAccount.qualifications || 'MBBS, MD (Psychiatry)',
        experience: '7+ Years Clinical Experience',
        rating: 4.9,
        reviewCount: 18,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300',
        languages: ['English', 'Hindi'],
        consultationFee: Number(newAccount.consultationFee) || 1200,
        roomNumber: 'OPD Suite 209',
        availableDays: ['Monday', 'Wednesday', 'Friday'],
        timings: '09:00 AM - 03:00 PM',
        bio: `${newAccount.name} is a dedicated mental health specialist with clinical focus in ${newAccount.speciality || 'mood and anxiety disorders'}.`,
        education: ['MD - Psychiatry', 'MBBS'],
        expertise: [newAccount.speciality || 'Adult Psychiatry', 'Clinical Assessment'],
        slots: {
          Morning: ['09:30 AM', '10:30 AM', '11:30 AM'],
          Afternoon: ['02:00 PM', '03:00 PM'],
          Evening: []
        }
      };
      setDoctors(prev => [...prev, formattedDoc]);
    }

    showToast(`New ${newAccount.role} account created successfully for ${newAccount.name}! (ID: ${newId})`);
    return fullAccount;
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

  // Dynamic profile based on current active role
  const currentUser = currentRole === 'patient' 
    ? patientProfile 
    : staffProfiles[currentRole] || patientProfile;

  return (
    <AppContext.Provider
      value={{
        currentRole,
        setCurrentRole,
        switchRole,
        switchRoleWithLogout,
        switchNotice,
        setSwitchNotice,
        currentUser,
        isAuthenticated,
        login,
        logout,
        patientProfile,
        updateProfile,
        registerPatient,
        staffProfiles,
        doctorProfile: staffProfiles.doctor,
        updateDoctorProfile,
        userAccounts,
        addUserAccount,
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
