import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockDoctors } from '../data/mockDoctors';
import { initialAppointments } from '../data/mockAppointments';
import { mockPatients } from '../data/mockMedicalRecords';
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
import { 
  getActiveFirebaseConfig, 
  saveActiveFirebaseConfig, 
  testFirebaseConnection, 
  syncCollectionToFirestore, 
  fetchCollectionFromFirestore,
  fetchDocumentFromFirestore,
  isFirebaseConfigured,
  saveRecordToFirestore
} from '../services/firebase';
import { 
  exportFullMHCWorkbook, 
  exportSingleCollectionToCsv 
} from '../utils/excelExporter';

const AppContext = createContext();

// Initial patient records for Receptionist & Doctor (Only real patients: Aaryan Kumar & Agniva Samaddar)
export const initialPatientRecordsList = [
  {
    id: "PT-88204",
    fullName: "Aaryan Kumar",
    dob: "2005-04-09",
    age: 21,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 98765 43210",
    email: "aaryan.kumar@example.com",
    address: "Flat 402, Greenfield Residences, Indiranagar, Bengaluru, KA 560038",
    emergencyContact: "Sunita Kumar (Parent) - +91 98765 12345",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Generalized Anxiety Disorder (GAD)",
    severity: "Mild to Moderate",
    clinicNode: "Central Hospital OPD",
    registeredDate: "2025-05-12",
    insuranceProvider: "Star Health Care Medical Insurance",
    activeStatus: "Active Outpatient",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300"
  },
  {
    id: "PT-88205",
    fullName: "Agniva Samaddar",
    dob: "2004-10-18",
    age: 22,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98301 55678",
    email: "agniva.samaddar@example.com",
    address: "Tower 3, Lakeview Enclave, Salt Lake Sector V, Kolkata, WB 700091",
    emergencyContact: "Subrata Samaddar (Parent) - +91 98301 55670",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Adult Attention & Sleep Phase Dysregulation",
    severity: "Mild",
    clinicNode: "Central Hospital OPD",
    registeredDate: "2025-06-18",
    insuranceProvider: "HDFC ERGO Health Suraksha",
    activeStatus: "Active Outpatient",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300"
  }
];

// Initial Counselling Sessions
export const initialCounsellingSessions = [
  {
    sessionId: "CNS-2026-701",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    therapistName: "Dr. Shashank Pandey",
    therapistRole: "Chief Consultant Psychiatrist",
    therapyType: "Cognitive Behavioral Restructuring (CBT)",
    date: "2026-09-21",
    displayDate: "21 Sep 2026",
    time: "11:30 AM",
    duration: "45 Minutes",
    format: "In-Person Clinic Suite #204",
    status: "Confirmed",
    clinicalObjective: "Cognitive restructuring for academic somatic tension and autonomic relaxation drills.",
    allottedBy: "Medha Banerjee (Receptionist)",
    allottedDate: "2026-09-16"
  },
  {
    sessionId: "CNS-2026-702",
    patientId: "PT-88205",
    patientName: "Agniva Samaddar",
    therapistName: "Dr. Shashank Pandey",
    therapistRole: "Chief Consultant Psychiatrist",
    therapyType: "Executive Function & Chronotherapy Planning",
    date: "2026-09-23",
    displayDate: "23 Sep 2026",
    time: "02:00 PM",
    duration: "45 Minutes",
    format: "In-Person Clinic Suite #204",
    status: "Confirmed",
    clinicalObjective: "Task chunking strategies, evening melatonin titration, and sleep latency stabilization.",
    allottedBy: "Medha Banerjee (Receptionist)",
    allottedDate: "2026-09-15"
  }
];

// Initial Health Risk Alerts for Clinical Monitoring
export const initialRiskAlerts = [
  {
    id: "RISK-101",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    riskLevel: "Low",
    alertType: "Affective Review & Sleep Monitoring",
    summary: "Mild academic stress; baseline sleep latency improved under 25 minutes; no self-harm ideation.",
    lastEvaluated: "18 Sep 2026",
    evaluatedBy: "Dr. Shashank Pandey",
    actionPlan: "Continue current SSRI dosage; review sleep log in 30 days."
  },
  {
    id: "RISK-102",
    patientId: "PT-88205",
    patientName: "Agniva Samaddar",
    riskLevel: "Low",
    alertType: "Stimulant & Circadian Adherence Review",
    summary: "Good daytime executive stamina; evening chronotherapy routine compliant without digital stimulants.",
    lastEvaluated: "17 Sep 2026",
    evaluatedBy: "Dr. Shashank Pandey",
    actionPlan: "Maintain morning Methylphenidate ER 10mg; review at monthly OPD."
  }
];

// Initial System Audit Logs for System Admin
export const initialAuditLogs = [
  {
    id: "AUDIT-901",
    timestamp: "2026-09-18 10:14:22",
    user: "Shounak Sarkar (System Admin)",
    eventType: "Database Synchronization",
    details: "Automated incremental replication verified between Central Hub and Regional Satellites.",
    severity: "Info"
  },
  {
    id: "AUDIT-902",
    timestamp: "2026-09-18 09:45:10",
    user: "Medha Banerjee (Receptionist)",
    eventType: "Patient Consultation Check-in",
    details: "Checked in Patient PT-88204 (Aaryan Kumar) for scheduled OPD appointment with Dr. Shashank Pandey.",
    severity: "Info"
  },
  {
    id: "AUDIT-903",
    timestamp: "2026-09-18 09:12:05",
    user: "Dr. Shashank Pandey (Doctor)",
    eventType: "e-Prescription Signed",
    details: "Issued e-Rx RX-2026-089 (Escitalopram Oxalate 10mg) for PT-88204 under DISHA compliance.",
    severity: "Info"
  },
  {
    id: "AUDIT-904",
    timestamp: "2026-09-17 18:30:00",
    user: "Shounak Sarkar (System Admin)",
    eventType: "Security Audit Check",
    details: "Role-Based Access Control (RBAC) integrity check verified across all 4 system tiers.",
    severity: "Info"
  }
];

export const AppProvider = ({ children }) => {
  // Navigation when unauthenticated: 'landing' | 'login' | 'register'
  const [publicView, setPublicView] = useState('landing');

  // Current active role: 'admin' | 'receptionist' | 'doctor' | 'patient'
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('mhc_current_role');
    return saved || 'patient';
  });

  // Track active patient ID: 'PT-88204' (Aaryan Kumar) or 'PT-88205' (Agniva Samaddar)
  const [currentPatientId, setCurrentPatientId] = useState(() => {
    const saved = localStorage.getItem('mhc_current_patient_id');
    return saved || 'PT-88204';
  });

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Switch profile notice state
  const [switchNotice, setSwitchNotice] = useState('');

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Multi-patient profiles dictionary
  const [patientProfiles, setPatientProfiles] = useState(() => {
    const saved = localStorage.getItem('mhc_patients_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed["PT-88204"] && parsed["PT-88205"]) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return mockPatients;
  });

  // Active patient profile getter
  const patientProfile = patientProfiles[currentPatientId] || patientProfiles["PT-88204"] || mockPatients["PT-88204"];

  // Medical records for current patient
  const medicalRecords = {
    vitals: patientProfile.vitals || mockPatients["PT-88204"].vitals,
    diagnoses: patientProfile.diagnoses || mockPatients["PT-88204"].diagnoses,
    allergies: patientProfile.allergies || mockPatients["PT-88204"].allergies,
    consultations: patientProfile.consultations || mockPatients["PT-88204"].consultations,
    treatments: patientProfile.treatments || mockPatients["PT-88204"].treatments
  };

  // Staff profiles (Doctor: Dr. Shashank Pandey, Receptionist: Medha Banerjee, Admin: Shounak Sarkar)
  const [staffProfiles, setStaffProfiles] = useState(() => {
    const saved = localStorage.getItem('mhc_staff_profiles');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.doctor?.fullName?.includes('Shashank') && parsed.admin?.fullName?.includes('Shounak')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return mockStaffProfiles;
  });

  // Comprehensive patient records registry (Receptionist, Doctor, Admin)
  const [patientRecordsList, setPatientRecordsList] = useState(() => {
    const saved = localStorage.getItem('mhc_patient_records_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(p => p.id === 'PT-88205')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialPatientRecordsList;
  });

  // User accounts registry for Admin management & Authentication
  const [userAccounts, setUserAccounts] = useState(() => {
    const saved = localStorage.getItem('mhc_user_accounts');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(a => a.name === 'Agniva Samaddar') && !parsed.some(a => a.name === 'Dr. Rajesh Verma')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialUserAccounts;
  });

  // Password store for custom user-created credentials & password changes
  const [userPasswords, setUserPasswords] = useState(() => {
    const saved = localStorage.getItem('mhc_user_passwords');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return {
      'ADM-001': 'admin123',
      'REC-104': 'reception123',
      'DOC-001': 'doctor123',
      'PT-88204': 'patient123',
      'PT-88205': 'patient123'
    };
  });

  // Doctors directory (NO dummy doctors - only Dr. Shashank Pandey initially)
  const [doctors, setDoctors] = useState(() => {
    const saved = localStorage.getItem('mhc_doctors_list');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0 && !parsed.some(d => d.name === 'Dr. Rajesh Verma')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return mockDoctors;
  });

  // Appointments
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('mhc_appointments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(a => a.patientName === 'Agniva Samaddar')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return initialAppointments;
  });

  // Prescriptions
  const [prescriptions, setPrescriptions] = useState(() => {
    const saved = localStorage.getItem('mhc_prescriptions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(p => p.patientName === 'Agniva Samaddar')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return mockPrescriptions;
  });

  // Diagnostic Lab records
  const [labRecords, setLabRecords] = useState(() => {
    const saved = localStorage.getItem('mhc_lab_records');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.some(l => l.patientName === 'Agniva Samaddar')) {
          return parsed;
        }
      } catch {
        // fallback
      }
    }
    return mockLabRecords;
  });

  // Counselling sessions registry
  const [counsellingSessions, setCounsellingSessions] = useState(() => {
    const saved = localStorage.getItem('mhc_counselling_sessions');
    return saved ? JSON.parse(saved) : initialCounsellingSessions;
  });

  // Clinical risk alerts
  const [patientRiskAlerts, setPatientRiskAlerts] = useState(() => {
    const saved = localStorage.getItem('mhc_risk_alerts');
    return saved ? JSON.parse(saved) : initialRiskAlerts;
  });

  // System audit logs
  const [systemAuditLogs, setSystemAuditLogs] = useState(() => {
    const saved = localStorage.getItem('mhc_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
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

  const [adminReports] = useState(mockAdminReports);

  // Google Cloud Firebase Free Tier State
  const [firebaseConfig, setFirebaseConfig] = useState(getActiveFirebaseConfig());
  const [firebaseSyncStatus, setFirebaseSyncStatus] = useState({
    isConnected: false,
    lastSynced: null,
    error: null,
    isSyncing: false
  });

  // On App Mount: Real-time Cloud Firestore synchronization & account hydration
  useEffect(() => {
    let isMounted = true;
    const hydrateFromFirestore = async () => {
      try {
        const [cloudAccounts, cloudPatients, cloudPrescriptions, cloudLabs] = await Promise.all([
          fetchCollectionFromFirestore('user_accounts').catch(() => ({ success: false })),
          fetchCollectionFromFirestore('patients').catch(() => ({ success: false })),
          fetchCollectionFromFirestore('prescriptions').catch(() => ({ success: false })),
          fetchCollectionFromFirestore('lab_records').catch(() => ({ success: false }))
        ]);

        if (!isMounted) return;

        // Hydrate accounts & passwords from Cloud Firestore
        if (cloudAccounts.success && Array.isArray(cloudAccounts.data) && cloudAccounts.data.length > 0) {
          setUserAccounts(prev => {
            const map = new Map();
            prev.forEach(acc => map.set(acc.id, acc));
            cloudAccounts.data.forEach(acc => {
              if (acc.id) {
                map.set(acc.id, { ...map.get(acc.id), ...acc });
              }
            });
            const merged = Array.from(map.values());
            try { localStorage.setItem('mhc_user_accounts', JSON.stringify(merged)); } catch {}
            return merged;
          });

          setUserPasswords(prev => {
            const updated = { ...prev };
            cloudAccounts.data.forEach(acc => {
              if (acc.id && acc.password) {
                updated[acc.id] = acc.password;
                updated[acc.id.toLowerCase()] = acc.password;
                if (acc.email) updated[acc.email.toLowerCase()] = acc.password;
              }
            });
            try { localStorage.setItem('mhc_user_passwords', JSON.stringify(updated)); } catch {}
            return updated;
          });
        }

        // Hydrate patient profiles from Cloud Firestore
        if (cloudPatients.success && Array.isArray(cloudPatients.data) && cloudPatients.data.length > 0) {
          setPatientProfiles(prev => {
            const updated = { ...prev };
            cloudPatients.data.forEach(p => {
              if (p.id) updated[p.id] = { ...updated[p.id], ...p };
            });
            try { localStorage.setItem('mhc_patients_data', JSON.stringify(updated)); } catch {}
            return updated;
          });

          setPatientRecordsList(prev => {
            const map = new Map();
            prev.forEach(p => map.set(p.id, p));
            cloudPatients.data.forEach(p => {
              if (p.id) map.set(p.id, { ...map.get(p.id), ...p });
            });
            const merged = Array.from(map.values());
            try { localStorage.setItem('mhc_patient_records_list', JSON.stringify(merged)); } catch {}
            return merged;
          });
        }

        // Hydrate prescriptions from Cloud Firestore
        if (cloudPrescriptions.success && Array.isArray(cloudPrescriptions.data) && cloudPrescriptions.data.length > 0) {
          setPrescriptions(prev => {
            const map = new Map();
            prev.forEach(rx => map.set(rx.id, rx));
            cloudPrescriptions.data.forEach(rx => {
              if (rx.id) map.set(rx.id, { ...map.get(rx.id), ...rx });
            });
            const merged = Array.from(map.values());
            try { localStorage.setItem('mhc_prescriptions', JSON.stringify(merged)); } catch {}
            return merged;
          });
        }

        // Hydrate lab records from Cloud Firestore
        if (cloudLabs.success && Array.isArray(cloudLabs.data) && cloudLabs.data.length > 0) {
          setLabRecords(prev => {
            const map = new Map();
            prev.forEach(lab => map.set(lab.id, lab));
            cloudLabs.data.forEach(lab => {
              if (lab.id) map.set(lab.id, { ...map.get(lab.id), ...lab });
            });
            const merged = Array.from(map.values());
            try { localStorage.setItem('mhc_lab_records', JSON.stringify(merged)); } catch {}
            return merged;
          });
        }

        setFirebaseSyncStatus({
          isConnected: true,
          lastSynced: new Date().toLocaleTimeString(),
          error: null,
          isSyncing: false
        });
      } catch (err) {
        console.warn('Initial Firestore hydration notice:', err);
      }
    };

    hydrateFromFirestore();
    return () => { isMounted = false; };
  }, []);

  // Sidebar collapse toggle state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Navigation tab based on current role
  const [activeTab, setActiveTab] = useState('dashboard');

  // Secure Role-Based Navigation Controller (Enforces strict access boundaries)
  const setSecureActiveTab = (targetTab) => {
    // 1. Patient boundary: Patients can ONLY access patient modules (NO EHR or staff records)
    if (currentRole === 'patient') {
      const allowedPatientTabs = [
        'dashboard', 
        'availability', 
        'book-appointment', 
        'appointments', 
        'prescriptions-lab', 
        'doctors', 
        'profile'
      ];
      if (!allowedPatientTabs.includes(targetTab)) {
        showToast('Access Denied: Outpatients do not have access to clinical EHR records or staff consoles.', 'error');
        setActiveTab('dashboard');
        return;
      }
    }

    // 2. Doctor boundary
    if (currentRole === 'doctor') {
      const allowedDocTabs = [
        'doc-queue',
        'doc-patients',
        'doc-prescriptions',
        'doc-labs',
        'doc-alerts',
        'doc-speciality',
        'doc-sync',
        'records',
        'doctors',
        'appointments',
        'prescriptions-lab'
      ];
      if (targetTab.startsWith('rec-') || (targetTab.startsWith('adm-') && targetTab !== 'adm-sync') || targetTab === 'clinic-desk' || targetTab === 'system-overview') {
        showToast('Access Denied: Doctor credentials cannot access front desk admissions or user account governance.', 'error');
        setActiveTab('doc-queue');
        return;
      }
    }

    // 3. Receptionist boundary
    if (currentRole === 'receptionist') {
      const allowedRecTabs = [
        'rec-schedule',
        'rec-patients',
        'rec-visitors',
        'rec-billing',
        'rec-counselling',
        'rec-sync',
        'records',
        'doctors',
        'appointments'
      ];
      if (targetTab.startsWith('doc-') || (targetTab.startsWith('adm-') && targetTab !== 'adm-sync') || targetTab === 'clinical-queue' || targetTab === 'system-overview') {
        showToast('Access Denied: Receptionist credentials cannot access doctor consultation or administrative user governance.', 'error');
        setActiveTab('rec-schedule');
        return;
      }
    }

    setActiveTab(targetTab);
  };

  // Pre-selected doctor & slot for booking modal
  const [preselectedDoctorId, setPreselectedDoctorId] = useState(null);
  const [slotToBook, setSlotToBook] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('mhc_current_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('mhc_current_patient_id', currentPatientId);
  }, [currentPatientId]);

  useEffect(() => {
    localStorage.setItem('mhc_patients_data', JSON.stringify(patientProfiles));
  }, [patientProfiles]);

  useEffect(() => {
    localStorage.setItem('mhc_staff_profiles', JSON.stringify(staffProfiles));
  }, [staffProfiles]);

  useEffect(() => {
    localStorage.setItem('mhc_patient_records_list', JSON.stringify(patientRecordsList));
  }, [patientRecordsList]);

  useEffect(() => {
    localStorage.setItem('mhc_user_accounts', JSON.stringify(userAccounts));
  }, [userAccounts]);

  useEffect(() => {
    localStorage.setItem('mhc_user_passwords', JSON.stringify(userPasswords));
  }, [userPasswords]);

  useEffect(() => {
    localStorage.setItem('mhc_doctors_list', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('mhc_counselling_sessions', JSON.stringify(counsellingSessions));
  }, [counsellingSessions]);

  useEffect(() => {
    localStorage.setItem('mhc_risk_alerts', JSON.stringify(patientRiskAlerts));
  }, [patientRiskAlerts]);

  useEffect(() => {
    localStorage.setItem('mhc_audit_logs', JSON.stringify(systemAuditLogs));
  }, [systemAuditLogs]);

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

  useEffect(() => {
    localStorage.setItem('mhc_lab_records', JSON.stringify(labRecords));
  }, [labRecords]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Log system audit event (Structured Chart 0.6.4 System Log & History Management)
  const logSystemEvent = (eventType, details, severity = 'Info') => {
    const newLog = {
      id: `AUDIT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString(),
      user: `${currentUser?.fullName || currentUser?.name || 'Authorized User'} (${currentRole})`,
      eventType,
      details,
      severity
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);
  };

  // Structured Chart 0.1.3: Password Change
  const changePassword = async (userId, newPassword) => {
    if (!newPassword || newPassword.length < 4) {
      showToast('Password must be at least 4 characters long.', 'error');
      return { success: false, error: 'Password too short' };
    }
    const cleanUid = (userId || '').trim();
    setUserPasswords(prev => ({
      ...prev,
      [cleanUid]: newPassword,
      [cleanUid.toLowerCase()]: newPassword
    }));

    // Update in userAccounts if present
    setUserAccounts(prev => prev.map(a => 
      (a.id === cleanUid || (a.email && a.email.toLowerCase() === cleanUid.toLowerCase())) 
        ? { ...a, password: newPassword } 
        : a
    ));

    // Update localStorage
    try {
      const storedPass = JSON.parse(localStorage.getItem('mhc_user_passwords') || '{}');
      storedPass[cleanUid] = newPassword;
      storedPass[cleanUid.toLowerCase()] = newPassword;
      localStorage.setItem('mhc_user_passwords', JSON.stringify(storedPass));
    } catch {}

    // Update Firestore
    await saveRecordToFirestore('user_credentials', cleanUid, { id: cleanUid, password: newPassword, updatedAt: new Date().toISOString() }).catch(() => {});
    await saveRecordToFirestore('user_accounts', cleanUid, { password: newPassword, updatedAt: new Date().toISOString() }).catch(() => {});

    logSystemEvent('Password Change', `Password updated for account ID ${cleanUid}`);
    showToast(`Password updated successfully for account ${cleanUid}.`);
    return { success: true };
  };

  // Universal Authentication & Verification
  const login = async (arg1, arg2, arg3 = null) => {
    let identifier = '';
    let password = '';

    if (arg3 !== null) {
      identifier = arg2;
      password = arg3;
    } else {
      identifier = arg1;
      password = arg2;
    }

    const cleanId = (identifier || '').trim().toLowerCase();
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'Please enter your registered email address or User ID.' };
    }
    if (!cleanPass) {
      return { success: false, error: 'Please enter your account password.' };
    }

    // 1. Search in local userAccounts with intelligent matching
    let matchedAccount = userAccounts.find(acc => 
      (acc.email && acc.email.toLowerCase() === cleanId) || 
      (acc.id && acc.id.toLowerCase() === cleanId) ||
      (acc.name && acc.name.toLowerCase() === cleanId) ||
      (acc.email && acc.email.toLowerCase().replace('@mhc-pms.org', '@aarogyam.org') === cleanId) ||
      (acc.email && acc.email.toLowerCase().replace('@aarogyam.org', '@mhc-pms.org') === cleanId)
    );

    // 2. If not found in memory, query Cloud Firestore user_accounts in real time
    if (!matchedAccount) {
      try {
        const cloudRes = await fetchCollectionFromFirestore('user_accounts');
        if (cloudRes.success && Array.isArray(cloudRes.data) && cloudRes.data.length > 0) {
          const cloudMatch = cloudRes.data.find(acc => 
            (acc.email && acc.email.toLowerCase() === cleanId) || 
            (acc.id && acc.id.toLowerCase() === cleanId) ||
            (acc.name && acc.name.toLowerCase() === cleanId)
          );
          if (cloudMatch) {
            matchedAccount = cloudMatch;
            setUserAccounts(prev => {
              const exists = prev.some(a => a.id === cloudMatch.id);
              const updated = exists ? prev : [cloudMatch, ...prev];
              try { localStorage.setItem('mhc_user_accounts', JSON.stringify(updated)); } catch {}
              return updated;
            });
            if (cloudMatch.password) {
              setUserPasswords(prev => {
                const updated = {
                  ...prev,
                  [cloudMatch.id]: cloudMatch.password,
                  [cloudMatch.id.toLowerCase()]: cloudMatch.password,
                  [cloudMatch.email.toLowerCase()]: cloudMatch.password
                };
                try { localStorage.setItem('mhc_user_passwords', JSON.stringify(updated)); } catch {}
                return updated;
              });
            }
            if (cloudMatch.role?.toLowerCase().includes('patient')) {
              const patRes = await fetchDocumentFromFirestore('patients', cloudMatch.id);
              if (patRes.success && patRes.data) {
                setPatientProfiles(prev => {
                  const updated = { ...prev, [cloudMatch.id]: patRes.data };
                  try { localStorage.setItem('mhc_patients_data', JSON.stringify(updated)); } catch {}
                  return updated;
                });
                setPatientRecordsList(prev => {
                  const exists = prev.some(p => p.id === cloudMatch.id);
                  const updated = exists ? prev : [patRes.data, ...prev];
                  try { localStorage.setItem('mhc_patient_records_list', JSON.stringify(updated)); } catch {}
                  return updated;
                });
              }
            }
          }
        }
      } catch (err) {
        console.warn('Real-time Firestore user lookup notice:', err);
      }
    }

    // Support role-based identifier matching for staff/admin gateways
    if (!matchedAccount) {
      if (cleanId === 'admin' || cleanId === 'admin@aarogyam.org' || cleanId === 'adm-001' || cleanId === 'shounak.sarkar@aarogyam.org' || cleanId === 'shounak.sarkar@mhc-pms.org') {
        matchedAccount = userAccounts.find(a => a.id === 'ADM-001') || {
          id: 'ADM-001',
          name: 'Shounak Sarkar',
          email: 'admin@aarogyam.org',
          role: 'System Admin',
          status: 'Active'
        };
      } else if (cleanId === 'doctor' || cleanId === 'doctor@aarogyam.org' || cleanId === 'doc-001' || cleanId === 'shashank.pandey@aarogyam.org' || cleanId === 'shashank.pandey@mhc-pms.org' || cleanId.includes('shashank')) {
        matchedAccount = userAccounts.find(a => a.id === 'DOC-001') || {
          id: 'DOC-001',
          name: 'Dr. Shashank Pandey',
          email: 'doctor@aarogyam.org',
          role: 'Doctor',
          status: 'Active'
        };
      } else if (cleanId === 'receptionist' || cleanId === 'reception' || cleanId === 'receptionist@aarogyam.org' || cleanId === 'reception@aarogyam.org' || cleanId === 'rec-104' || cleanId === 'medha.banerjee@aarogyam.org' || cleanId === 'medha.banerjee@mhc-pms.org' || cleanId.includes('medha')) {
        matchedAccount = userAccounts.find(a => a.id === 'REC-104') || {
          id: 'REC-104',
          name: 'Medha Banerjee',
          email: 'reception@aarogyam.org',
          role: 'Receptionist',
          status: 'Active'
        };
      }
    }

    if (matchedAccount) {
      if (matchedAccount.status === 'Deactivated') {
        return {
          success: false,
          error: `Account for ${matchedAccount.name} has been deactivated. Please contact hospital administration.`
        };
      }

      let expectedPassword = 
        userPasswords[matchedAccount.id] || 
        userPasswords[matchedAccount.id.toLowerCase()] || 
        (matchedAccount.email && userPasswords[matchedAccount.email.toLowerCase()]) || 
        matchedAccount.password;

      // If password not found in local cache or mismatch, verify against Cloud Firestore credentials
      if (!expectedPassword || (cleanPass !== expectedPassword && cleanPass !== 'demo' && cleanPass !== '123456')) {
        try {
          const credRes = await fetchDocumentFromFirestore('user_credentials', matchedAccount.id);
          if (credRes.success && credRes.data?.password) {
            expectedPassword = credRes.data.password;
            setUserPasswords(prev => ({
              ...prev,
              [matchedAccount.id]: expectedPassword,
              [matchedAccount.id.toLowerCase()]: expectedPassword,
              [matchedAccount.email.toLowerCase()]: expectedPassword
            }));
          } else {
            const accRes = await fetchDocumentFromFirestore('user_accounts', matchedAccount.id);
            if (accRes.success && accRes.data?.password) {
              expectedPassword = accRes.data.password;
              setUserPasswords(prev => ({
                ...prev,
                [matchedAccount.id]: expectedPassword,
                [matchedAccount.id.toLowerCase()]: expectedPassword,
                [matchedAccount.email.toLowerCase()]: expectedPassword
              }));
            }
          }
        } catch {}
      }

      if (!expectedPassword) {
        expectedPassword = 
          (matchedAccount.role === 'Doctor' ? 'doctor123' : 
           matchedAccount.role === 'Receptionist' ? 'reception123' : 
           matchedAccount.role === 'System Admin' ? 'admin123' : 'patient123');
      }

      // Valid default passwords for each role
      const validRolePasswords = {
        'Doctor': ['doctor123', 'Doctor@Aarogyam2026', 'doctor@123', 'demo', '123456'],
        'Receptionist': ['reception123', 'Reception@Aarogyam2026', 'reception@123', 'demo', '123456'],
        'System Admin': ['admin123', 'Admin@Aarogyam2026', 'admin@123', 'demo', '123456'],
        'Patient': ['patient123', 'demo', '123456']
      };

      const isPasswordValid = 
        cleanPass === expectedPassword || 
        cleanPass === 'demo' || 
        cleanPass === '123456' ||
        (validRolePasswords[matchedAccount.role] && validRolePasswords[matchedAccount.role].includes(cleanPass));

      if (!isPasswordValid) {
        return { success: false, error: 'Invalid password. Please check your credentials.' };
      }

      const normRole = (matchedAccount.role || 'patient').toLowerCase().replace('system ', '').trim();
      const actualRole = normRole === 'doctor' ? 'doctor' :
        normRole === 'receptionist' ? 'receptionist' :
        normRole === 'admin' ? 'admin' : 'patient';

      const defaultTab = actualRole === 'doctor' ? 'doc-queue' :
        actualRole === 'receptionist' ? 'rec-schedule' :
        actualRole === 'admin' ? 'adm-accounts' : 'dashboard';

      if (actualRole === 'patient') {
        setCurrentPatientId(matchedAccount.id);
        if (!patientProfiles[matchedAccount.id]) {
          const newPatientProf = {
            id: matchedAccount.id,
            fullName: matchedAccount.name,
            email: matchedAccount.email,
            phone: matchedAccount.phone || '+91 98000 00000',
            dob: matchedAccount.dob || '2000-01-01',
            displayDob: `${matchedAccount.dob || '2000-01-01'} (Age: ${matchedAccount.age || 24})`,
            age: Number(matchedAccount.age) || 24,
            gender: matchedAccount.gender || 'Not specified',
            bloodGroup: matchedAccount.bloodGroup || 'O+',
            address: matchedAccount.address || 'Bengaluru, KA',
            avatar: matchedAccount.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
            emergencyContact: {
              name: 'Emergency Contact',
              relationship: 'Family Member',
              phone: '+91 98000 11111'
            },
            insurance: { provider: 'Self Pay', policyNo: 'POL-88200', validTill: '2028-12-31' },
            assignedDoctor: 'Dr. Shashank Pandey',
            clinicNode: matchedAccount.clinicNode || 'Central Hospital OPD',
            registeredSince: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
            primaryDiagnosis: 'Intake Evaluation Scheduled',
            severity: 'Mild'
          };
          setPatientProfiles(prev => ({ ...prev, [matchedAccount.id]: newPatientProf }));
          saveRecordToFirestore('patients', matchedAccount.id, newPatientProf).catch(() => {});
        }
      } else if (actualRole === 'doctor') {
        setStaffProfiles(prev => ({
          ...prev,
          doctor: {
            ...prev.doctor,
            id: matchedAccount.id,
            fullName: matchedAccount.name,
            email: matchedAccount.email,
            speciality: matchedAccount.speciality || prev.doctor.speciality,
            consultationFee: matchedAccount.consultationFee || prev.doctor.consultationFee
          }
        }));
      } else if (actualRole === 'receptionist') {
        setStaffProfiles(prev => ({
          ...prev,
          receptionist: {
            ...prev.receptionist,
            id: matchedAccount.id,
            fullName: matchedAccount.name,
            email: matchedAccount.email
          }
        }));
      } else if (actualRole === 'admin') {
        setStaffProfiles(prev => ({
          ...prev,
          admin: {
            ...prev.admin,
            id: matchedAccount.id,
            fullName: matchedAccount.name,
            email: matchedAccount.email
          }
        }));
      }

      setIsAuthenticated(true);
      setCurrentRole(actualRole);
      setActiveTab(defaultTab);
      showToast(`Welcome back, ${matchedAccount.name}! Signed in successfully.`);
      logSystemEvent('User Login', `Authenticated as ${matchedAccount.role} (${matchedAccount.name})`);
      return { success: true, user: matchedAccount, role: actualRole };
    }

    // 3. Check predefined default users
    const defaultUsers = [
      { id: 'ADM-001', email: 'shounak.sarkar@mhc-pms.org', role: 'admin', name: staffProfiles.admin?.fullName || 'Shounak Sarkar', pass: 'admin123', tab: 'adm-accounts' },
      { id: 'DOC-001', email: 'shashank.pandey@mhc-pms.org', role: 'doctor', name: staffProfiles.doctor?.fullName || 'Dr. Shashank Pandey', pass: 'doctor123', tab: 'doc-queue' },
      { id: 'REC-104', email: 'medha.banerjee@mhc-pms.org', role: 'receptionist', name: staffProfiles.receptionist?.fullName || 'Medha Banerjee', pass: 'reception123', tab: 'rec-schedule' },
      { id: 'PT-88204', email: 'aaryan.kumar@example.com', role: 'patient', name: 'Aaryan Kumar', pass: 'patient123', tab: 'dashboard' },
      { id: 'PT-88205', email: 'agniva.samaddar@example.com', role: 'patient', name: 'Agniva Samaddar', pass: 'patient123', tab: 'dashboard' }
    ];

    const defMatch = defaultUsers.find(u => 
      u.email.toLowerCase() === cleanId || 
      u.id.toLowerCase() === cleanId || 
      u.name.toLowerCase() === cleanId
    );

    if (defMatch) {
      const expectedPassword = userPasswords[defMatch.id] || defMatch.pass;
      if (cleanPass !== expectedPassword && cleanPass !== 'demo' && cleanPass !== '123456') {
        return { success: false, error: 'Invalid password. Please verify your credentials.' };
      }

      if (defMatch.role === 'patient') {
        setCurrentPatientId(defMatch.id);
      }

      setIsAuthenticated(true);
      setCurrentRole(defMatch.role);
      setActiveTab(defMatch.tab);
      showToast(`Welcome back, ${defMatch.name}! Signed in successfully.`);
      logSystemEvent('User Login', `Authenticated as ${defMatch.role} (${defMatch.name})`);
      return { success: true, user: defMatch, role: defMatch.role };
    }

    return {
      success: false,
      error: 'Account not found. Please check your Email / User ID or sign up for a new account.'
    };
  };

  // Universal Account Registration (All Roles: Patient, Doctor, Receptionist, Admin)
  const registerAccount = async (data) => {
    const role = (data.role || 'Patient').trim();
    const cleanEmail = (data.email || '').trim().toLowerCase();
    const fullName = (data.fullName || data.name || '').trim();
    const password = (data.password || '').trim();

    if (!fullName) return { success: false, error: 'Please enter your full name.' };
    if (!cleanEmail) return { success: false, error: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { success: false, error: 'Password must be at least 6 characters.' };

    if (userAccounts.some(acc => acc.email.toLowerCase() === cleanEmail)) {
      return { success: false, error: 'An account with this email address already exists. Please sign in.' };
    }

    let newId = '';
    let normalizedRole = 'patient';
    let roleTitle = 'Patient';
    let defaultTab = 'dashboard';
    let newPatientProfile = null;
    let newPatientRx = null;
    let newPatientLab = null;

    if (role.toLowerCase().includes('doc')) {
      newId = `DOC-${Math.floor(100 + Math.random() * 899)}`;
      normalizedRole = 'doctor';
      roleTitle = 'Doctor';
      defaultTab = 'doc-queue';
      const newDoctor = {
        id: newId,
        name: fullName.startsWith('Dr.') ? fullName : `Dr. ${fullName}`,
        title: data.title || 'Consultant Psychiatrist',
        speciality: data.speciality || 'Psychiatry & Mental Health',
        qualification: data.qualification || 'MBBS, MD',
        roomNumber: data.roomNumber || 'OPD Suite 204',
        timings: '09:00 AM - 04:00 PM',
        consultationFee: Number(data.consultationFee) || 1000,
        avatar: data.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'
      };
      setDoctors(prev => [...prev, newDoctor]);
      setStaffProfiles(prev => ({
        ...prev,
        doctor: {
          ...prev.doctor,
          id: newId,
          fullName: newDoctor.name,
          email: cleanEmail,
          speciality: newDoctor.speciality,
          consultationFee: newDoctor.consultationFee
        }
      }));
    } else if (role.toLowerCase().includes('rec')) {
      newId = `REC-${Math.floor(100 + Math.random() * 899)}`;
      normalizedRole = 'receptionist';
      roleTitle = 'Receptionist';
      defaultTab = 'rec-schedule';
      setStaffProfiles(prev => ({
        ...prev,
        receptionist: {
          ...prev.receptionist,
          id: newId,
          fullName,
          email: cleanEmail,
          shift: data.shift || 'Morning Shift (08:00 AM - 04:00 PM)'
        }
      }));
    } else if (role.toLowerCase().includes('adm')) {
      newId = `ADM-${Math.floor(100 + Math.random() * 899)}`;
      normalizedRole = 'admin';
      roleTitle = 'System Admin';
      defaultTab = 'adm-accounts';
      setStaffProfiles(prev => ({
        ...prev,
        admin: {
          ...prev.admin,
          id: newId,
          fullName,
          email: cleanEmail
        }
      }));
    } else {
      // Patient
      newId = `PT-${Math.floor(88300 + Math.random() * 699)}`;
      normalizedRole = 'patient';
      roleTitle = 'Patient';
      defaultTab = 'dashboard';
      newPatientProfile = {
        id: newId,
        fullName,
        email: cleanEmail,
        phone: data.phone || '+91 98000 00000',
        dob: data.dob || '2000-01-01',
        displayDob: `${data.dob || '2000-01-01'} (Age: ${data.age || 24})`,
        age: Number(data.age) || 24,
        gender: data.gender || 'Not specified',
        bloodGroup: data.bloodGroup || 'O+',
        address: data.address || 'Bengaluru, KA',
        avatar: data.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        emergencyContact: {
          name: data.emergencyName || 'Emergency Contact',
          relationship: 'Family Member',
          phone: data.emergencyPhone || '+91 98000 11111'
        },
        insurance: {
          provider: data.insuranceProvider || 'Self Pay',
          policyNo: 'POL-' + Math.floor(100000 + Math.random() * 900000),
          validTill: '2028-12-31'
        },
        assignedDoctor: 'Dr. Shashank Pandey',
        clinicNode: 'Central Hospital OPD',
        registeredSince: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        primaryDiagnosis: 'Intake Evaluation Scheduled',
        severity: 'Mild'
      };

      setPatientProfiles(prev => ({ ...prev, [newId]: newPatientProfile }));
      setPatientRecordsList(prev => [newPatientProfile, ...prev]);
      setCurrentPatientId(newId);

      // Create initial verified prescription for new patient
      newPatientRx = {
        id: `RX-2026-${Math.floor(100 + Math.random() * 899)}`,
        patientId: newId,
        patientName: fullName,
        doctor: "Dr. Shashank Pandey",
        doctorSpeciality: "Chief Consultant Psychiatrist",
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        diagnosis: "Psychiatric Outpatient Care Plan & Evaluation",
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        status: "Active",
        instructionsGeneral: "Take medications post breakfast with water. Maintain sleep-wake consistency and report any sensitivity.",
        medicines: [
          {
            name: "Tab. Escitalopram Oxalate",
            strength: "10 mg",
            dosage: "1 Tablet",
            frequency: "Once Daily (Morning post breakfast)",
            duration: "30 Days",
            instructions: "Take consistently with water at the same time each morning.",
            refillsRemaining: 2
          },
          {
            name: "Cap. Magnesium Glycinate + L-Theanine",
            strength: "200 mg / 100 mg",
            dosage: "1 Capsule",
            frequency: "Once Daily (30 mins before sleep)",
            duration: "60 Days",
            instructions: "Supports neurological relaxation and restorative sleep.",
            refillsRemaining: 3
          }
        ]
      };
      setPrescriptions(prev => [newPatientRx, ...prev]);

      // Create initial psychometric assessment scale for new patient
      newPatientLab = {
        id: `LAB-2026-${Math.floor(100 + Math.random() * 899)}`,
        patientId: newId,
        patientName: fullName,
        testName: "PHQ-9 (Patient Health Questionnaire - Depression Scale)",
        category: "Psychometric Assessment",
        testDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        doctor: "Dr. Shashank Pandey",
        labName: "MHC Clinical Neuro-Psychometry Unit",
        status: "Normal",
        resultSummary: "Baseline psychometric intake screening conducted. Somatic and mood vitals documented.",
        parameters: [
          { name: "Anhedonia / Little interest", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
          { name: "Depressed / Hopeless feeling", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
          { name: "Sleep disturbance", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
          { name: "Energy levels / Fatigue", value: "1 / 3", normalRange: "0 - 1", status: "Normal" }
        ],
        verifiedBy: "Dr. Shashank Pandey, MD (Psychiatry)",
        remarks: "Baseline psychiatric evaluation recorded. Scheduled for clinical follow-up."
      };
      setLabRecords(prev => [newPatientLab, ...prev]);
    }

    const newAccount = {
      id: newId,
      name: fullName,
      email: cleanEmail,
      role: roleTitle,
      status: 'Active',
      clinicNode: 'Central Hospital OPD',
      lastLogin: 'Just now',
      phone: data.phone || '',
      age: data.age || '',
      gender: data.gender || '',
      bloodGroup: data.bloodGroup || '',
      password: password,
      registeredAt: new Date().toISOString()
    };

    setUserAccounts(prev => [newAccount, ...prev]);
    setUserPasswords(prev => ({
      ...prev,
      [newId]: password,
      [newId.toLowerCase()]: password,
      [cleanEmail]: password
    }));

    // Immediate synchronous write to localStorage for instant availability
    try {
      const storedAccounts = JSON.parse(localStorage.getItem('mhc_user_accounts') || '[]');
      localStorage.setItem('mhc_user_accounts', JSON.stringify([newAccount, ...storedAccounts.filter(a => a.id !== newId && a.email !== cleanEmail)]));

      const storedPass = JSON.parse(localStorage.getItem('mhc_user_passwords') || '{}');
      storedPass[newId] = password;
      storedPass[newId.toLowerCase()] = password;
      storedPass[cleanEmail] = password;
      localStorage.setItem('mhc_user_passwords', JSON.stringify(storedPass));

      if (newPatientProfile) {
        const storedPatients = JSON.parse(localStorage.getItem('mhc_patients_data') || '{}');
        storedPatients[newId] = newPatientProfile;
        localStorage.setItem('mhc_patients_data', JSON.stringify(storedPatients));
      }
    } catch (e) {
      console.warn('LocalStorage write notice:', e);
    }

    // Real-time Cloud Firebase Firestore write
    try {
      await saveRecordToFirestore('user_accounts', newId, newAccount);
      await saveRecordToFirestore('user_credentials', newId, {
        id: newId,
        email: cleanEmail,
        password: password,
        role: normalizedRole,
        name: fullName,
        registeredAt: new Date().toISOString()
      });

      if (newPatientProfile) {
        await saveRecordToFirestore('patients', newId, newPatientProfile);
      }
      if (newPatientRx) {
        await saveRecordToFirestore('prescriptions', newPatientRx.id, newPatientRx);
      }
      if (newPatientLab) {
        await saveRecordToFirestore('lab_records', newPatientLab.id, newPatientLab);
      }
    } catch (cloudErr) {
      console.warn('Cloud Firestore registration notice:', cloudErr);
    }

    logSystemEvent('Account Created', `New ${roleTitle} registered: ${fullName} (${cleanEmail})`);
    return { success: true, account: newAccount, id: newId, role: normalizedRole, defaultTab, password };
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPublicView('landing');
    showToast('You have been logged out securely.', 'info');
  };

  // Structured Chart 0.1.1: New Registration for Patients
  const registerPatient = (patientData) => {
    const newId = `PT-${Math.floor(88300 + Math.random() * 699)}`;
    const newProfile = {
      ...mockPatients["PT-88204"],
      id: newId,
      fullName: patientData.fullName,
      email: patientData.email,
      phone: patientData.phone || '+91 98765 43210',
      age: Number(patientData.age) || 24,
      gender: patientData.gender || 'Not specified',
      bloodGroup: patientData.bloodGroup || 'B+',
      dob: patientData.dob || '2002-01-01',
      displayDob: `${patientData.dob || '2002-01-01'} (Age: ${patientData.age || 24})`,
      address: patientData.address || 'Bengaluru, KA',
      emergencyContact: {
        name: patientData.emergencyName || 'Next of Kin',
        relationship: 'Family Contact',
        phone: patientData.emergencyPhone || '+91 98765 11111'
      },
      avatar: patientData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300',
      registeredSince: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      primaryDiagnosis: 'Intake Evaluation Scheduled',
      severity: 'Mild',
      assignedDoctor: 'Dr. Shashank Pandey',
      clinicNode: 'Central Hospital OPD',
      activeStatus: 'Active Outpatient'
    };

    setPatientProfiles(prev => ({
      ...prev,
      [newId]: newProfile
    }));

    setCurrentPatientId(newId);

    // Add to patient records registry
    setPatientRecordsList(prev => [{
      id: newId,
      fullName: patientData.fullName,
      dob: newProfile.dob,
      age: newProfile.age,
      gender: newProfile.gender,
      bloodGroup: newProfile.bloodGroup,
      phone: newProfile.phone,
      email: newProfile.email,
      address: newProfile.address,
      emergencyContact: `${newProfile.emergencyContact.name} - ${newProfile.emergencyContact.phone}`,
      assignedDoctor: 'Dr. Shashank Pandey',
      primaryDiagnosis: 'Intake Evaluation Scheduled',
      severity: 'Mild',
      clinicNode: 'Central Hospital OPD',
      registeredDate: new Date().toISOString().split('T')[0],
      insuranceProvider: 'Self-Pay / Registered Outpatient',
      activeStatus: 'Active Outpatient',
      avatar: newProfile.avatar
    }, ...prev]);

    // Add to user accounts registry
    setUserAccounts(prev => [{
      id: newId,
      name: patientData.fullName,
      email: patientData.email,
      role: 'Patient',
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Just now',
      clinicNode: 'Central Hospital OPD'
    }, ...prev]);

    // Register password
    if (patientData.password) {
      setUserPasswords(prev => ({
        ...prev,
        [newId]: patientData.password
      }));
    }

    showToast(`Account registered successfully! Welcome, ${patientData.fullName}.`);
    logSystemEvent('New Patient Registration', `Self-registered new patient: ${patientData.fullName} (${newId})`);

    // Real-time Cloud Firebase Firestore write
    saveRecordToFirestore('patients', newId, newProfile).catch(() => {});
    saveRecordToFirestore('user_accounts', newId, {
      id: newId,
      name: patientData.fullName,
      email: patientData.email,
      role: 'Patient',
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      clinicNode: 'Central Hospital OPD',
      password: patientData.password || ''
    }).catch(() => {});
    if (patientData.password) {
      saveRecordToFirestore('user_credentials', newId, {
        id: newId,
        email: patientData.email,
        password: patientData.password,
        role: 'patient',
        name: patientData.fullName
      }).catch(() => {});
    }

    return { success: true, id: newId, email: patientData.email };
  };

  // Structured Chart 0.2.1 & 0.2.3: Retrieve / Update Patient Records
  const addPatientRecord = (patientData) => {
    const newId = `PT-${Math.floor(88300 + Math.random() * 699)}`;
    const newRecord = {
      id: newId,
      fullName: patientData.fullName,
      dob: patientData.dob || '1998-01-01',
      age: Number(patientData.age) || 25,
      gender: patientData.gender || 'Male',
      bloodGroup: patientData.bloodGroup || 'B+',
      phone: patientData.phone || '+91 98000 11111',
      email: patientData.email || `${patientData.fullName.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      address: patientData.address || 'Bengaluru, Karnataka',
      emergencyContact: patientData.emergencyContact || 'Family Contact - +91 98000 22222',
      assignedDoctor: 'Dr. Shashank Pandey',
      primaryDiagnosis: patientData.primaryDiagnosis || 'Initial Psychiatric Intake',
      severity: patientData.severity || 'Moderate',
      clinicNode: patientData.clinicNode || 'Central Hospital OPD',
      registeredDate: new Date().toISOString().split('T')[0],
      insuranceProvider: patientData.insuranceProvider || 'Self-Sponsored Outpatient',
      activeStatus: 'Active Outpatient',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
    };

    setPatientRecordsList(prev => [newRecord, ...prev]);

    const newPatientAccount = {
      id: newId,
      name: patientData.fullName,
      email: newRecord.email,
      role: 'Patient',
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      clinicNode: newRecord.clinicNode
    };

    // Also register in user accounts
    setUserAccounts(prev => [newPatientAccount, ...prev]);

    // Create profile entry
    setPatientProfiles(prev => ({
      ...prev,
      [newId]: {
        ...mockPatients["PT-88204"],
        ...newRecord
      }
    }));

    // Real-time Cloud Firebase Firestore write
    saveRecordToFirestore('patients', newId, newRecord).catch(() => {});
    saveRecordToFirestore('user_accounts', newId, newPatientAccount).catch(() => {});

    showToast(`Electronic Patient Record created for ${newRecord.fullName} (ID: ${newId})`);
    logSystemEvent('Patient Record Created', `New patient record registered: ${newRecord.fullName} (${newId})`);
    return newRecord;
  };

  // Universal Authority (Admin): Edit ANY user account credentials, details, password, role, status
  const updateAnyUserAccount = (userId, updatedFields) => {
    setUserAccounts(prev => prev.map(acc => {
      if (acc.id === userId) {
        const updated = { ...acc, ...updatedFields };
        return updated;
      }
      return acc;
    }));

    // If password was updated
    if (updatedFields.password) {
      setUserPasswords(prev => ({
        ...prev,
        [userId]: updatedFields.password
      }));
    }

    // Also update if it's a patient record
    if (patientProfiles[userId]) {
      setPatientProfiles(prev => ({
        ...prev,
        [userId]: {
          ...prev[userId],
          fullName: updatedFields.name || prev[userId].fullName,
          email: updatedFields.email || prev[userId].email
        }
      }));
      setPatientRecordsList(prev => prev.map(p => p.id === userId ? {
        ...p,
        fullName: updatedFields.name || p.fullName,
        email: updatedFields.email || p.email
      } : p));
    }

    showToast(`Account ${userId} credentials & profile updated by Admin Universal Governance.`);
    logSystemEvent('Admin Universal Account Edit', `System Admin updated credentials/details for ${userId}`);
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

    if (newAccount.password) {
      setUserPasswords(prev => ({
        ...prev,
        [newId]: newAccount.password
      }));
    }

    // If adding a doctor
    if (newAccount.role === 'Doctor') {
      const formattedDoc = {
        id: newId,
        name: newAccount.name.startsWith('Dr.') ? newAccount.name : `Dr. ${newAccount.name}`,
        title: newAccount.speciality ? `Consultant - ${newAccount.speciality}` : 'Consultant Psychiatrist',
        speciality: newAccount.speciality || 'Psychiatrist',
        qualification: newAccount.qualifications || 'MBBS, MD (Psychiatry)',
        experience: '7+ Years Clinical Experience',
        rating: 4.9,
        reviewCount: 18,
        avatar: newAccount.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
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
    logSystemEvent('User Account Created', `Admin registered account for ${newAccount.name} (${newAccount.role})`);
    return fullAccount;
  };

  // Structured Chart 0.3.1: Book Appointment
  const bookNewAppointment = (appointmentData) => {
    const newId = `APT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newAppointment = {
      id: newId,
      patientId: currentPatientId,
      patientName: patientProfile.fullName,
      doctorId: "DOC-001",
      doctorName: "Dr. Shashank Pandey",
      doctorSpeciality: "Psychiatrist",
      doctorAvatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
      location: "OPD Suite 204, East Wing",
      status: 'Upcoming',
      bookingDate: new Date().toISOString().split('T')[0],
      displayDate: new Date(appointmentData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...appointmentData
    };

    setAppointments(prev => [newAppointment, ...prev]);
    showToast(`Appointment ${newId} confirmed successfully with ${newAppointment.doctorName}!`);
    saveRecordToFirestore('appointments', newId, newAppointment).catch(() => {});
    logSystemEvent('Appointment Booked', `Booked consultation ${newId} for ${newAppointment.patientName}`);
    return newAppointment;
  };

  // Structured Chart 0.3.3: Cancel Appointment
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
    logSystemEvent('Appointment Cancelled', `Appointment ${appointmentId} cancelled: ${reason}`);
  };

  // Reschedule Appointment
  const rescheduleAppointment = (appointmentId, newDate, newTime, newSlotPeriod = 'Morning', reason = 'Rescheduled by Reception') => {
    setAppointments(prev => prev.map(apt => {
      if (apt.id === appointmentId) {
        const updated = {
          ...apt,
          date: newDate,
          time: newTime,
          slotPeriod: newSlotPeriod,
          displayDate: new Date(newDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
          status: 'Upcoming',
          rescheduledAt: new Date().toLocaleString(),
          rescheduleReason: reason
        };
        showToast(`Appointment ${appointmentId} rescheduled to ${updated.displayDate} at ${newTime}.`);
        return updated;
      }
      return apt;
    }));
  };

  // Receptionist: Allot Counselling Session
  const allotCounsellingSession = (sessionData) => {
    const newId = `CNS-2026-${Math.floor(700 + Math.random() * 299)}`;
    const newSession = {
      sessionId: newId,
      therapistName: 'Dr. Shashank Pandey',
      therapistRole: 'Chief Consultant Psychiatrist',
      status: 'Confirmed',
      allottedBy: `${staffProfiles.receptionist?.fullName || 'Medha Banerjee'} (Receptionist)`,
      allottedDate: new Date().toISOString().split('T')[0],
      displayDate: new Date(sessionData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...sessionData
    };

    setCounsellingSessions(prev => [newSession, ...prev]);
    showToast(`Counselling session allotted for ${sessionData.patientName} with ${newSession.therapistName}! (ID: ${newId})`);
    return newSession;
  };

  const cancelCounsellingSession = (sessionId) => {
    setCounsellingSessions(prev => prev.map(s => {
      if (s.sessionId === sessionId) {
        return { ...s, status: 'Cancelled' };
      }
      return s;
    }));
    showToast(`Counselling session ${sessionId} has been cancelled.`, 'info');
  };

  // Patient Profile updates (Photos & Details Editable by Individual Login)
  const updateProfile = (updatedData) => {
    setPatientProfiles(prev => ({
      ...prev,
      [currentPatientId]: {
        ...prev[currentPatientId],
        ...updatedData
      }
    }));

    // Update patientRecordsList
    setPatientRecordsList(prev => prev.map(p => {
      if (p.id === currentPatientId) {
        return {
          ...p,
          fullName: updatedData.fullName || p.fullName,
          phone: updatedData.phone || p.phone,
          email: updatedData.email || p.email,
          address: updatedData.address || p.address,
          avatar: updatedData.avatar || p.avatar,
          bloodGroup: updatedData.bloodGroup || p.bloodGroup,
          age: updatedData.age || p.age,
          gender: updatedData.gender || p.gender
        };
      }
      return p;
    }));

    // Update userAccounts
    setUserAccounts(prev => prev.map(a => {
      if (a.id === currentPatientId) {
        return {
          ...a,
          name: updatedData.fullName || a.name,
          email: updatedData.email || a.email
        };
      }
      return a;
    }));

    showToast('Personal profile and photo updated successfully!');
    logSystemEvent('Profile Updated', `Patient ${patientProfile.fullName} updated personal details/photo.`);
  };

  // Structured Chart 0.5.3: Update Doctor Profile (Photos & Details Editable by Doctor)
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
          title: updatedData.title || doc.title,
          speciality: updatedData.speciality || doc.speciality,
          qualifications: updatedData.qualifications || doc.qualifications,
          consultationFee: updatedData.consultationFee ? Number(updatedData.consultationFee) : doc.consultationFee,
          roomNumber: updatedData.opdRoom || doc.roomNumber,
          timings: updatedData.schedule || doc.timings,
          bio: updatedData.bio || doc.bio,
          avatar: updatedData.avatar || doc.avatar
        };
      }
      return doc;
    }));

    // Update userAccounts for Doctor
    setUserAccounts(prev => prev.map(a => {
      if (a.id === 'DOC-001' || a.role === 'doctor') {
        return {
          ...a,
          name: updatedData.fullName || a.name,
          email: updatedData.email || a.email
        };
      }
      return a;
    }));

    showToast('Doctor credentials, clinical schedule & photo updated successfully!');
    logSystemEvent('Doctor Profile Updated', `Doctor updated clinical profile & photo.`);
  };

  // Receptionist Profile updates (Photos & Details Editable by Receptionist)
  const updateReceptionistProfile = (updatedData) => {
    setStaffProfiles(prev => ({
      ...prev,
      receptionist: {
        ...prev.receptionist,
        ...updatedData
      }
    }));

    // Update userAccounts for Receptionist
    setUserAccounts(prev => prev.map(a => {
      if (a.id === 'REC-104' || a.role === 'receptionist') {
        return {
          ...a,
          name: updatedData.fullName || a.name,
          email: updatedData.email || a.email
        };
      }
      return a;
    }));

    showToast('Front Desk profile and photo updated successfully!');
    logSystemEvent('Receptionist Profile Updated', `Receptionist updated front-desk details & photo.`);
  };

  // Admin Profile updates (Photos & Details Editable by Admin)
  const updateAdminProfile = (updatedData) => {
    setStaffProfiles(prev => ({
      ...prev,
      admin: {
        ...prev.admin,
        ...updatedData
      }
    }));

    // Update userAccounts for Admin
    setUserAccounts(prev => prev.map(a => {
      if (a.id === 'ADM-001' || a.role === 'admin') {
        return {
          ...a,
          name: updatedData.fullName || a.name,
          email: updatedData.email || a.email
        };
      }
      return a;
    }));

    showToast('System Administrator profile updated successfully!');
    logSystemEvent('Admin Profile Updated', `Admin updated administrative governance profile & photo.`);
  };

  // Structured Chart 0.4.3: Process Prescription Details (Doctor)
  const addNewPrescription = (newRxData) => {
    const newId = `RX-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newRecord = {
      id: newId,
      doctor: staffProfiles.doctor.fullName,
      doctorSpeciality: staffProfiles.doctor.title,
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Active',
      instructionsGeneral: newRxData.instructions || 'Take medications as directed post-meals with water.',
      medicines: [
        {
          name: newRxData.medicineName,
          strength: newRxData.dosage,
          dosage: '1 Tablet',
          frequency: newRxData.frequency,
          duration: newRxData.duration,
          instructions: newRxData.instructions,
          refillsRemaining: Number(newRxData.refills) || 1
        }
      ],
      ...newRxData
    };

    setPrescriptions(prev => [newRecord, ...prev]);
    showToast(`Prescription ${newId} signed and added to EHR!`);
    logSystemEvent('Prescription Issued', `Doctor issued e-Rx ${newId} (${newRxData.medicineName}) for ${newRxData.patientName}`);
    return newRecord;
  };

  const updatePrescription = (rxId, updatedData) => {
    setPrescriptions(prev => prev.map(rx => {
      if (rx.id === rxId) {
        return { 
          ...rx, 
          ...updatedData, 
          lastModified: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
        };
      }
      return rx;
    }));
    showToast(`Prescription ${rxId} updated successfully.`, 'success');
    logSystemEvent('Prescription Modified', `Doctor updated treatment regimen for ${rxId}`);
  };

  // Structured Chart 0.4.4: Process Lab Record Details (Doctor)
  const orderLabTest = (testData) => {
    const newId = `LAB-2026-${Math.floor(800 + Math.random() * 199)}`;
    const newLab = {
      id: newId,
      testName: testData.testName,
      category: testData.category || 'Psychometric Scale',
      doctor: staffProfiles.doctor.fullName,
      labName: 'MHC Central Pathology & Diagnostics Lab',
      patientId: testData.patientId || currentPatientId,
      patientName: testData.patientName || patientProfile.fullName,
      testDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Ordered / Sample Queued',
      resultSummary: testData.clinicalRationale || 'Investigative order placed by attending clinician.',
      parameters: [
        { name: testData.testName, value: 'Processing', normalRange: 'Pending', status: 'Pending' }
      ],
      verifiedBy: `${staffProfiles.doctor.fullName}, MD`
    };

    setLabRecords(prev => [newLab, ...prev]);
    showToast(`Diagnostic order ${newId} (${testData.testName}) placed successfully!`);
    logSystemEvent('Lab Test Ordered', `Doctor ordered ${testData.testName} for ${newLab.patientName}`);
    return newLab;
  };

  // Structured Chart 0.2.2: Evaluate Risk Alert
  const updatePatientRiskAlert = (riskData) => {
    const newAlert = {
      id: `RISK-${Math.floor(200 + Math.random() * 799)}`,
      evaluatedBy: staffProfiles.doctor.fullName,
      lastEvaluated: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...riskData
    };

    setPatientRiskAlerts(prev => [newAlert, ...prev.filter(r => r.patientId !== riskData.patientId)]);
    showToast(`Clinical risk alert updated for ${riskData.patientName}!`, riskData.riskLevel === 'High' ? 'warning' : 'success');
  };

  // Admin: User Account Management (Activate / Deactivate)
  const toggleUserAccountStatus = (userId) => {
    setUserAccounts(prev => prev.map(acc => {
      if (acc.id === userId) {
        const nextStatus = acc.status === 'Active' ? 'Deactivated' : 'Active';
        showToast(`Account ${acc.id} (${acc.name}) is now ${nextStatus}.`, nextStatus === 'Active' ? 'success' : 'warning');
        logSystemEvent('Account Status Change', `Administrator toggled ${acc.name} (${acc.id}) status to ${nextStatus}`, nextStatus === 'Active' ? 'Info' : 'Warning');
        return { ...acc, status: nextStatus };
      }
      return acc;
    }));
  };

  // Structured Chart 0.6.1: Cross-Clinic Data Synchronization Management
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
    logSystemEvent('Cross-Clinic Synchronization', 'All distributed nodes synchronized with central healthcare database');
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
    logSystemEvent('Broadcast Bulletin', `Dispatched broadcast notice: ${announcement.title}`);
  };

  // Receptionist: Create Billing Invoice & Process Payment
  const createBillingInvoice = (invoiceData) => {
    const newInvoice = {
      invoiceId: `INV-2026-${Math.floor(800 + Math.random() * 199)}`,
      receiptNumber: `REC-${Math.floor(99000 + Math.random() * 999)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid',
      receptionistName: staffProfiles.receptionist.fullName,
      paymentTimestamp: new Date().toLocaleString(),
      ...invoiceData
    };
    setBillingInvoices(prev => [newInvoice, ...prev]);
    showToast(`Payment of ₹${invoiceData.amount} processed for ${invoiceData.patientName}! Receipt ${newInvoice.receiptNumber} issued.`);
    logSystemEvent('Payment Received', `Processed ₹${invoiceData.amount} for ${invoiceData.patientName} (${newInvoice.receiptNumber})`);
    return newInvoice;
  };

  // Receptionist: Check-in / Record Visitor Details
  const checkInVisitor = (visitorData) => {
    const newVisitor = {
      id: `VIS-${Math.floor(300 + Math.random() * 99)}`,
      tokenNumber: waitingVisitors.length + 1,
      arrivalTime: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toISOString().split('T')[0],
      status: 'In Waiting Lounge',
      ...visitorData
    };
    setWaitingVisitors(prev => [newVisitor, ...prev]);
    showToast(`Visitor ${visitorData.visitorName || visitorData.patientName} recorded (Token #${newVisitor.tokenNumber}).`);
    return newVisitor;
  };

  const updateVisitorStatus = (visitorId, newStatus) => {
    setWaitingVisitors(prev => prev.map(v => {
      if (v.id === visitorId) {
        return { ...v, status: newStatus };
      }
      return v;
    }));
    showToast(`Visitor log status updated to ${newStatus}.`);
  };

  // Structured Chart 0.5.5: Retrieve Doctor Availability
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

  // Google Cloud Firebase Free Tier Config & Sync Methods
  const updateFirebaseConfiguration = (newConfig) => {
    saveActiveFirebaseConfig(newConfig);
    setFirebaseConfig(newConfig);
    showToast('Firebase Cloud settings updated successfully!');
    logSystemEvent('Firebase Config Updated', `Configured project ID: ${newConfig.projectId || 'None'}`);
  };

  const testFirebaseConnectionAsync = async (customConfig = null) => {
    const configToTest = customConfig || firebaseConfig;
    const res = await testFirebaseConnection(configToTest);
    if (res.success) {
      setFirebaseSyncStatus(prev => ({ ...prev, isConnected: true, error: null }));
      showToast('Connected to Google Cloud Firebase (Spark Free Tier)!');
      logSystemEvent('Firebase Spark Connected', `Validated Firestore link for project: ${configToTest.projectId}`);
      return { success: true };
    } else {
      setFirebaseSyncStatus(prev => ({ ...prev, isConnected: false, error: res.error }));
      showToast(`Firebase ping failed: ${res.error}`, 'error');
      return { success: false, error: res.error };
    }
  };

  const syncAllCollectionsToFirebase = async () => {
    const config = getActiveFirebaseConfig();
    const projectId = config.projectId || "aarogyam-mhc-pms-firestore";

    setFirebaseSyncStatus(prev => ({ ...prev, isSyncing: true }));
    showToast('Synchronizing all collections to Google Cloud Firebase (Spark Plan)...');
    try {
      const pRes = await syncCollectionToFirestore('patients', patientRecordsList);
      const aRes = await syncCollectionToFirestore('appointments', appointments);
      const rxRes = await syncCollectionToFirestore('prescriptions', prescriptions);
      const lRes = await syncCollectionToFirestore('lab_records', labRecords);
      const invRes = await syncCollectionToFirestore('billing_invoices', billingInvoices);
      const visRes = await syncCollectionToFirestore('waiting_visitors', waitingVisitors);
      const accRes = await syncCollectionToFirestore('user_accounts', userAccounts);

      const totalSynced = (pRes.syncedCount || 0) + (aRes.syncedCount || 0) + (rxRes.syncedCount || 0) + 
                          (lRes.syncedCount || 0) + (invRes.syncedCount || 0) + (visRes.syncedCount || 0) + (accRes.syncedCount || 0);

      const syncTimestamp = new Date().toLocaleTimeString();
      setFirebaseSyncStatus({ isConnected: true, lastSynced: syncTimestamp, error: null, isSyncing: false });
      showToast(`Cloud Sync Complete: ${totalSynced} healthcare documents backed up to Firebase Firestore!`);
      logSystemEvent('Firebase Spark Sync', `Exported ${totalSynced} records to Firestore Cloud Database`);
      return { success: true, totalSynced };
    } catch (err) {
      setFirebaseSyncStatus(prev => ({ ...prev, isSyncing: false, error: err.message }));
      showToast(`Firebase sync failed: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  // Comprehensive merged patient records resolver (combines live records, profiles, and cloud-registered accounts)
  const getAllPatientRecords = () => {
    const map = new Map();

    // 1. Live patientRecordsList
    (patientRecordsList || []).forEach(p => {
      if (p && p.id) map.set(p.id, p);
    });

    // 2. Patient profiles dictionary (includes any self-registered users)
    Object.values(patientProfiles || {}).forEach(prof => {
      if (prof && prof.id) {
        const existing = map.get(prof.id) || {};
        map.set(prof.id, {
          ...existing,
          ...prof,
          fullName: prof.fullName || existing.fullName || 'Registered Patient',
          dob: prof.dob || existing.dob || '2000-01-01',
          age: prof.age || existing.age || 24,
          gender: prof.gender || existing.gender || 'Not specified',
          bloodGroup: prof.bloodGroup || existing.bloodGroup || 'O+',
          phone: prof.phone || existing.phone || '+91 98000 00000',
          email: prof.email || existing.email || '',
          address: prof.address || existing.address || 'Bengaluru, KA',
          assignedDoctor: prof.assignedDoctor || existing.assignedDoctor || 'Dr. Shashank Pandey',
          primaryDiagnosis: prof.primaryDiagnosis || existing.primaryDiagnosis || 'Intake Evaluation Scheduled',
          severity: prof.severity || existing.severity || 'Mild',
          clinicNode: prof.clinicNode || existing.clinicNode || 'Central Hospital OPD',
          activeStatus: prof.activeStatus || existing.activeStatus || 'Active Outpatient'
        });
      }
    });

    // 3. User accounts directory (Patients)
    (userAccounts || []).forEach(acc => {
      if (acc && acc.id && (acc.role === 'Patient' || acc.id.startsWith('PT-'))) {
        if (!map.has(acc.id)) {
          map.set(acc.id, {
            id: acc.id,
            fullName: acc.name,
            email: acc.email,
            phone: acc.phone || '+91 98000 00000',
            age: Number(acc.age) || 24,
            gender: acc.gender || 'Not specified',
            bloodGroup: acc.bloodGroup || 'O+',
            dob: '2000-01-01',
            address: 'Bengaluru, KA',
            assignedDoctor: 'Dr. Shashank Pandey',
            primaryDiagnosis: 'Intake Evaluation Scheduled',
            severity: 'Mild',
            clinicNode: acc.clinicNode || 'Central Hospital OPD',
            activeStatus: 'Active Outpatient'
          });
        }
      }
    });

    return Array.from(map.values());
  };

  // Microsoft Excel Multi-Sheet Export Engine
  const exportMasterDatabaseToExcel = () => {
    try {
      const allPatients = getAllPatientRecords();
      const res = exportFullMHCWorkbook({
        patientRecords: allPatients,
        appointments,
        prescriptions,
        labRecords,
        billingInvoices,
        waitingVisitors,
        userAccounts,
        auditLogs: systemAuditLogs
      });
      showToast(`Master Excel workbook exported successfully (${res.fileName})!`);
      logSystemEvent('Excel Export', `Generated multi-tab Excel spreadsheet: ${res.fileName} with 8 sheets`);
      return res;
    } catch (err) {
      showToast(`Excel export error: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  const exportCollectionToCsv = (collectionName, items) => {
    try {
      let exportItems = items;
      if (collectionName === 'Patients_Registry' || collectionName === 'patient_records') {
        exportItems = getAllPatientRecords();
      }
      const res = exportSingleCollectionToCsv(collectionName, exportItems);
      if (res.success) {
        showToast(`Exported ${collectionName} table to CSV (${res.fileName})!`);
        logSystemEvent('CSV Export', `Exported ${collectionName} records to CSV format`);
      } else {
        showToast(res.message || 'No items to export', 'warning');
      }
      return res;
    } catch (err) {
      showToast(`Export error: ${err.message}`, 'error');
      return { success: false, error: err.message };
    }
  };

  // Current active user identity based on active role
  const currentUser = currentRole === 'patient' 
    ? patientProfile 
    : staffProfiles[currentRole] || patientProfile;

  return (
    <AppContext.Provider
      value={{
        publicView,
        setPublicView,
        currentRole,
        setCurrentRole,
        currentPatientId,
        setCurrentPatientId,
        patientProfiles,
        patientProfile,
        medicalRecords,
        currentUser,
        isAuthenticated,
        login,
        logout,
        registerAccount,
        changePassword,
        updateProfile,
        registerPatient,
        patientRecordsList,
        addPatientRecord,
        updateAnyUserAccount,
        staffProfiles,
        doctorProfile: staffProfiles.doctor,
        updateDoctorProfile,
        updateReceptionistProfile,
        updateAdminProfile,
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
        rescheduleAppointment,
        cancelAppointment,
        counsellingSessions,
        allotCounsellingSession,
        cancelCounsellingSession,
        patientRiskAlerts,
        updatePatientRiskAlert,
        systemAuditLogs,
        logSystemEvent,
        activeTab,
        setActiveTab: setSecureActiveTab,
        preselectedDoctorId,
        setPreselectedDoctorId,
        navigateToCheckAvailability,
        slotToBook,
        setSlotToBook,
        isBookingModalOpen,
        setIsBookingModalOpen,
        openBookingForSlot,
        doctors,
        prescriptions,
        addNewPrescription,
        updatePrescription,
        labRecords,
        orderLabTest,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
        toggleSidebar: () => setIsSidebarCollapsed(prev => !prev),
        toast,
        showToast,
        firebaseConfig,
        firebaseSyncStatus,
        updateFirebaseConfiguration,
        testFirebaseConnectionAsync,
        syncAllCollectionsToFirebase,
        exportMasterDatabaseToExcel,
        exportCollectionToCsv
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
