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

// Initial comprehensive patient registry for Receptionist & Doctor
export const initialPatientRecordsList = [
  {
    id: "PT-88204",
    fullName: "Aaryan Kumar",
    dob: "2005-04-14",
    age: 21,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 98765 43210",
    email: "aaryan.kumar@example.com",
    address: "Indiranagar, Bengaluru, KA",
    emergencyContact: "Sunita Kumar (Parent) - +91 98765 12345",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Generalized Anxiety Disorder (GAD)",
    severity: "Mild to Moderate",
    clinicNode: "Central Hospital OPD",
    registeredDate: "2025-05-12",
    insuranceProvider: "Star Health Care",
    activeStatus: "Active Outpatient"
  },
  {
    id: "PT-88205",
    fullName: "Sneha Patel",
    dob: "2000-08-22",
    age: 26,
    gender: "Female",
    bloodGroup: "B+",
    phone: "+91 98451 22334",
    email: "sneha.patel@example.com",
    address: "Whitefield, Bengaluru, KA",
    emergencyContact: "Manoj Patel (Brother) - +91 98451 22330",
    assignedDoctor: "Dr. Rajesh Verma",
    primaryDiagnosis: "Major Depressive Disorder (Moderate)",
    severity: "Moderate",
    clinicNode: "South Specialty Centre",
    registeredDate: "2025-06-18",
    insuranceProvider: "HDFC ERGO Health",
    activeStatus: "Active Outpatient"
  },
  {
    id: "PT-88207",
    fullName: "Kunal Ghosh",
    dob: "1995-11-03",
    age: 31,
    gender: "Male",
    bloodGroup: "O+",
    phone: "+91 97112 55667",
    email: "kunal.ghosh@example.com",
    address: "Koramangala, Bengaluru, KA",
    emergencyContact: "Rina Ghosh (Spouse) - +91 97112 55660",
    assignedDoctor: "Dr. Kabir Sengupta",
    primaryDiagnosis: "Bipolar Affective Disorder (Type II)",
    severity: "Guarded / Monitoring",
    clinicNode: "Central Hospital OPD",
    registeredDate: "2025-07-20",
    insuranceProvider: "ICICI Lombard",
    activeStatus: "Active Clinical Watch"
  },
  {
    id: "PT-88208",
    fullName: "Deepa Nair",
    dob: "1997-03-19",
    age: 29,
    gender: "Female",
    bloodGroup: "AB+",
    phone: "+91 96220 88990",
    email: "deepa.nair@example.com",
    address: "Sector 14, West Hub, Bengaluru",
    emergencyContact: "Gopinath Nair (Father) - +91 96220 88999",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Adult Attention Deficit Disorder (ADHD)",
    severity: "Mild",
    clinicNode: "West Community Clinic",
    registeredDate: "2025-08-14",
    insuranceProvider: "Max Bupa Health",
    activeStatus: "Active Outpatient"
  },
  {
    id: "PT-88210",
    fullName: "Karan Johar",
    dob: "2007-09-05",
    age: 19,
    gender: "Male",
    bloodGroup: "B-",
    phone: "+91 95331 44556",
    email: "karan.johar@example.com",
    address: "Jayanagar, Bengaluru, KA",
    emergencyContact: "Sunita Johar (Mother) - +91 95331 44550",
    assignedDoctor: "Dr. Rajesh Verma",
    primaryDiagnosis: "Panic Disorder with Agoraphobia",
    severity: "Moderate to Severe",
    clinicNode: "Central Hospital OPD",
    registeredDate: "2025-09-01",
    insuranceProvider: "Care Health Insurance",
    activeStatus: "In Triage / Urgent"
  },
  {
    id: "PT-88212",
    fullName: "Anita Roy",
    dob: "1992-12-30",
    age: 34,
    gender: "Female",
    bloodGroup: "A-",
    phone: "+91 94220 33445",
    email: "anita.roy@example.com",
    address: "Civil Lines, North Wing, Bengaluru",
    emergencyContact: "Alok Roy (Spouse) - +91 94220 33440",
    assignedDoctor: "Dr. Meera Nambiar",
    primaryDiagnosis: "Post-Traumatic Stress Disorder (PTSD)",
    severity: "Moderate",
    clinicNode: "North Specialty Satellite",
    registeredDate: "2025-09-10",
    insuranceProvider: "Star Health Care",
    activeStatus: "Active Psychotherapy"
  }
];

// Initial Counselling Sessions
export const initialCounsellingSessions = [
  {
    sessionId: "CNS-2026-701",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    therapistName: "Dr. Kabir Sengupta",
    therapistRole: "Clinical Psychologist & CBT Specialist",
    therapyType: "Cognitive Behavioral Therapy (CBT)",
    date: "2026-09-21",
    displayDate: "21 Sep 2026",
    time: "11:30 AM",
    duration: "45 Minutes",
    format: "In-Person Clinic Suite #4",
    status: "Confirmed",
    clinicalObjective: "Cognitive restructuring for academic somatic tension and cognitive thought records.",
    allottedBy: "Medha Banerjee (Receptionist)",
    allottedDate: "2026-09-16"
  },
  {
    sessionId: "CNS-2026-702",
    patientId: "PT-88205",
    patientName: "Sneha Patel",
    therapistName: "Dr. Rajesh Verma",
    therapistRole: "Consultant Psychotherapist",
    therapyType: "Behavioral Activation Therapy (BAT)",
    date: "2026-09-23",
    displayDate: "23 Sep 2026",
    time: "02:00 PM",
    duration: "60 Minutes",
    format: "Tele-Therapy Secure Room #2",
    status: "Confirmed",
    clinicalObjective: "Graded activity scheduling and pleasure/mastery ratings for depressive inertia.",
    allottedBy: "Medha Banerjee (Receptionist)",
    allottedDate: "2026-09-15"
  },
  {
    sessionId: "CNS-2026-703",
    patientId: "PT-88212",
    patientName: "Anita Roy",
    therapistName: "Dr. Meera Nambiar",
    therapistRole: "Trauma Specialist & EMDR Clinician",
    therapyType: "Trauma-Informed Psychotherapy & EMDR",
    date: "2026-09-25",
    displayDate: "25 Sep 2026",
    time: "04:15 PM",
    duration: "60 Minutes",
    format: "In-Person Calm Suite #1",
    status: "Scheduled",
    clinicalObjective: "Grounding techniques, dual-attention bilateral stimulation, resource installation.",
    allottedBy: "Medha Banerjee (Receptionist)",
    allottedDate: "2026-09-16"
  }
];

// Initial Health Risk Alerts for Clinical Monitoring
export const initialRiskAlerts = [
  {
    id: "RISK-101",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    riskLevel: "Low",
    alertType: "Routine Affective Review",
    summary: "Mild somatic tension; no active or passive self-harm ideation reported.",
    lastEvaluated: "18 Sep 2026",
    evaluatedBy: "Dr. Shashank Pandey",
    actionPlan: "Continue current SSRI dosage; review sleep log in 14 days."
  },
  {
    id: "RISK-102",
    patientId: "PT-88207",
    patientName: "Kunal Ghosh",
    riskLevel: "High",
    alertType: "Medication Non-Adherence & Hypomanic Shift",
    summary: "Patient missed 4 consecutive lithium carbonate doses; family reports elevated psychomotor agitation.",
    lastEvaluated: "17 Sep 2026",
    evaluatedBy: "Dr. Kabir Sengupta",
    actionPlan: "Mandatory urgent serum lithium toxicology assay; caregiver contact initiated."
  },
  {
    id: "RISK-103",
    patientId: "PT-88210",
    patientName: "Karan Johar",
    riskLevel: "Moderate",
    alertType: "Acute Panic Exacerbation",
    summary: "Severe anticipatory panic attacks requiring emergency OPD stabilization.",
    lastEvaluated: "16 Sep 2026",
    evaluatedBy: "Dr. Rajesh Verma",
    actionPlan: "Short-course low-dose clonazepam bridging with CBT exposure therapy."
  }
];

// Initial System Audit Logs for System Admin
export const initialAuditLogs = [
  {
    id: "AUDIT-901",
    timestamp: "2026-09-18 10:14:22",
    user: "Shounak Sarkar (System Admin)",
    eventType: "Database Synchronization",
    details: "Automated incremental replication triggered between Central Hub and North Satellite.",
    severity: "Info"
  },
  {
    id: "AUDIT-902",
    timestamp: "2026-09-18 09:45:10",
    user: "Medha Banerjee (Receptionist)",
    eventType: "Patient Record Creation",
    details: "Registered new patient profile PT-88212 (Anita Roy) into Outpatient Registry.",
    severity: "Info"
  },
  {
    id: "AUDIT-903",
    timestamp: "2026-09-18 09:12:05",
    user: "Dr. Shashank Pandey (Doctor)",
    eventType: "e-Prescription Signed",
    details: "Issued e-Rx RX-2026-441 (Sertraline HCl 50mg) for PT-88204 under DISHA compliance.",
    severity: "Info"
  },
  {
    id: "AUDIT-904",
    timestamp: "2026-09-17 18:30:00",
    user: "Shounak Sarkar (System Admin)",
    eventType: "Account Lifecycle Event",
    details: "Deactivated dormant account REC-105 (Rohan Kulkarni) following security review.",
    severity: "Warning"
  }
];

export const AppProvider = ({ children }) => {
  // Current active role: 'admin' | 'receptionist' | 'doctor' | 'patient'
  const [currentRole, setCurrentRole] = useState(() => {
    const saved = localStorage.getItem('mhc_current_role');
    return saved || 'patient';
  });

  // Auth state - starts unauthenticated on fresh open so login screen is presented first
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Switch profile notice state
  const [switchNotice, setSwitchNotice] = useState('');

  // Toast notification
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // Patient profile (for patient portal)
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

  // Comprehensive patient records registry (Receptionist & Doctor)
  const [patientRecordsList, setPatientRecordsList] = useState(() => {
    const saved = localStorage.getItem('mhc_patient_records_list');
    return saved ? JSON.parse(saved) : initialPatientRecordsList;
  });

  // Counselling sessions registry (Receptionist Allotment & Doctor Therapy)
  const [counsellingSessions, setCounsellingSessions] = useState(() => {
    const saved = localStorage.getItem('mhc_counselling_sessions');
    return saved ? JSON.parse(saved) : initialCounsellingSessions;
  });

  // Clinical risk alerts (Continuous Patient Monitoring)
  const [patientRiskAlerts, setPatientRiskAlerts] = useState(() => {
    const saved = localStorage.getItem('mhc_risk_alerts');
    return saved ? JSON.parse(saved) : initialRiskAlerts;
  });

  // System audit logs (System Admin)
  const [systemAuditLogs, setSystemAuditLogs] = useState(() => {
    const saved = localStorage.getItem('mhc_audit_logs');
    return saved ? JSON.parse(saved) : initialAuditLogs;
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

  // Diagnostic Lab records
  const [labRecords, setLabRecords] = useState(() => {
    const saved = localStorage.getItem('mhc_lab_records');
    return saved ? JSON.parse(saved) : mockLabRecords;
  });

  // Doctors & records
  const [doctors, setDoctors] = useState(mockDoctors);
  const [medicalRecords] = useState(mockMedicalRecords);
  const [adminReports] = useState(mockAdminReports);

  // Sidebar collapse toggle state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Navigation tab based on current role
  const [activeTab, setActiveTab] = useState('dashboard');

  // Specific doctor pre-selected for availability check
  const [preselectedDoctorId, setPreselectedDoctorId] = useState(null);
  const [slotToBook, setSlotToBook] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

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
    localStorage.setItem('mhc_patient_records_list', JSON.stringify(patientRecordsList));
  }, [patientRecordsList]);

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

  useEffect(() => {
    localStorage.setItem('mhc_lab_records', JSON.stringify(labRecords));
  }, [labRecords]);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Log system audit event
  const logSystemEvent = (eventType, details, severity = 'Info') => {
    const newLog = {
      id: `AUDIT-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toLocaleString(),
      user: `${currentUser?.fullName || currentUser?.name || 'System User'} (${currentRole})`,
      eventType,
      details,
      severity
    };
    setSystemAuditLogs(prev => [newLog, ...prev]);
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

  // Role Switcher without logout (internal utility)
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
    logSystemEvent('User Login', `User authenticated as ${targetRule.title} (${welcomeName})`);
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

    // Add to patient records registry
    setPatientRecordsList(prev => [{
      id: newId,
      fullName: patientData.fullName,
      dob: '2002-01-01',
      age: Number(patientData.age) || 24,
      gender: patientData.gender || 'Not specified',
      bloodGroup: patientData.bloodGroup || 'B+',
      phone: patientData.phone || '+91 98765 43210',
      email: patientData.email,
      address: 'Bengaluru, KA',
      emergencyContact: 'Self / Next of Kin',
      assignedDoctor: 'Dr. Shashank Pandey',
      primaryDiagnosis: 'Intake Evaluation Pending',
      severity: 'Mild',
      clinicNode: 'Central Hospital OPD',
      registeredDate: new Date().toISOString().split('T')[0],
      insuranceProvider: 'Self Pay / General Outpatient',
      activeStatus: 'Active Outpatient'
    }, ...prev]);

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

  // Receptionist & Doctor: Create and Add Patient Record
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
      assignedDoctor: patientData.assignedDoctor || 'Dr. Shashank Pandey',
      primaryDiagnosis: patientData.primaryDiagnosis || 'Initial Psychiatric Intake',
      severity: patientData.severity || 'Moderate',
      clinicNode: patientData.clinicNode || 'Central Hospital OPD',
      registeredDate: new Date().toISOString().split('T')[0],
      insuranceProvider: patientData.insuranceProvider || 'Self-Sponsored Outpatient',
      activeStatus: 'Active Outpatient'
    };

    setPatientRecordsList(prev => [newRecord, ...prev]);

    // Also register in user accounts
    setUserAccounts(prev => [{
      id: newId,
      name: patientData.fullName,
      email: newRecord.email,
      role: 'Patient',
      status: 'Active',
      registeredDate: new Date().toISOString().split('T')[0],
      lastLogin: 'Never',
      clinicNode: newRecord.clinicNode
    }, ...prev]);

    showToast(`Electronic Patient Record created for ${newRecord.fullName} (ID: ${newId})`);
    logSystemEvent('Patient Record Created', `New patient record registered: ${newRecord.fullName} (${newId})`);
    return newRecord;
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
    logSystemEvent('User Account Created', `Admin registered account for ${newAccount.name} (${newAccount.role})`);
    return fullAccount;
  };

  // Appointments - Book
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

  // Appointments - Reschedule
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

  // Appointments - Cancel
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

  // Receptionist: Allot Counselling Session
  const allotCounsellingSession = (sessionData) => {
    const newId = `CNS-2026-${Math.floor(700 + Math.random() * 299)}`;
    const newSession = {
      sessionId: newId,
      status: 'Confirmed',
      allottedBy: `${staffProfiles.receptionist?.fullName || 'Medha Banerjee'} (Receptionist)`,
      allottedDate: new Date().toISOString().split('T')[0],
      displayDate: new Date(sessionData.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...sessionData
    };

    setCounsellingSessions(prev => [newSession, ...prev]);
    showToast(`Counselling session allotted for ${sessionData.patientName} with ${sessionData.therapistName}! (ID: ${newId})`);
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

  // Doctor: Prescriptions
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

  // Doctor: Order Lab / Psychometric Test
  const orderLabTest = (testData) => {
    const newId = `LAB-2026-${Math.floor(800 + Math.random() * 199)}`;
    const newLab = {
      id: newId,
      testName: testData.testName,
      category: testData.category || 'Psychometric Scale',
      orderedBy: staffProfiles.doctor.fullName,
      patientId: testData.patientId || 'PT-88204',
      patientName: testData.patientName || 'Aaryan Kumar',
      date: new Date().toISOString().split('T')[0],
      displayDate: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'Ordered / Sample Queued',
      score: 'Pending Clinical Execution',
      severity: testData.urgency || 'Routine',
      interpretation: testData.clinicalRationale || 'Investigative order placed by attending clinician.'
    };

    setLabRecords(prev => [newLab, ...prev]);
    showToast(`Diagnostic order ${newId} (${testData.testName}) placed successfully!`);
    return newLab;
  };

  // Doctor: Update Patient Risk Alert
  const updatePatientRiskAlert = (riskData) => {
    const newAlert = {
      id: `RISK-${Math.floor(200 + Math.random() * 799)}`,
      evaluatedBy: staffProfiles.doctor.fullName,
      lastEvaluated: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      ...riskData
    };

    setPatientRiskAlerts(prev => [newAlert, ...prev.filter(r => r.patientId !== riskData.patientId)]);
    showToast(`Clinical risk alert updated for ${riskData.patientName} (${riskData.riskLevel} Risk)!`, riskData.riskLevel === 'High' ? 'warning' : 'success');
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
      paymentTimestamp: new Date().toLocaleString(),
      ...invoiceData
    };
    setBillingInvoices(prev => [newInvoice, ...prev]);
    showToast(`Payment of ₹${invoiceData.amount} processed for ${invoiceData.patientName}! Receipt ${newInvoice.receiptNumber} issued.`);
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
        patientRecordsList,
        addPatientRecord,
        counsellingSessions,
        allotCounsellingSession,
        cancelCounsellingSession,
        patientRiskAlerts,
        updatePatientRiskAlert,
        systemAuditLogs,
        logSystemEvent,
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
        rescheduleAppointment,
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
        orderLabTest,
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
