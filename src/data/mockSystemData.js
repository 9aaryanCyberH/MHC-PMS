// Comprehensive mock data for MHC-PMS Multi-Role Healthcare System

export const mockStaffProfiles = {
  doctor: {
    id: "DOC-001",
    fullName: "Dr. Shashank Pandey",
    role: "Doctor",
    title: "Senior Consultant Psychiatrist",
    department: "Adult Psychiatry & Neuropsychiatry",
    email: "shashank.pandey@mhc-pms.org",
    phone: "+91 98112 34567",
    opdRoom: "OPD Suite 204, East Wing",
    qualifications: "MBBS, MD (Psychiatry), DPM, FIPS",
    experience: "14 Years Clinical Practice",
    consultationFee: 1200,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    specialities: ["Generalized Anxiety Disorder", "Major Depressive Disorder", "Psychopharmacology", "Neuropsychiatric Evaluation"],
    bio: "Dr. Shashank Pandey is a senior consultant psychiatrist with extensive clinical experience in evidence-based psychopharmacology, affective mood disorders, and community psychiatric rehabilitation.",
    schedule: "Monday to Saturday, 09:00 AM - 02:00 PM"
  },
  receptionist: {
    id: "REC-104",
    fullName: "Medha Banerjee",
    role: "Receptionist",
    title: "Lead Front Desk & Patient Intake Coordinator",
    department: "Central Outpatient Reception & Admissions",
    email: "medha.banerjee@mhc-pms.org",
    phone: "+91 98450 11223",
    deskLocation: "Main Lobby Central Reception, Desk #2",
    shift: "Morning Shift (08:00 AM - 04:00 PM)",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
  },
  admin: {
    id: "ADM-001",
    fullName: "Shounak Sarkar",
    role: "System Admin",
    title: "Healthcare Informatics & Systems Administrator",
    department: "IT Systems & Health Records Governance",
    email: "shounak.sarkar@mhc-pms.org",
    phone: "+91 99201 88776",
    accessLevel: "Level 4 Super Administrator (Full RBAC)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  }
};

export const initialUserAccounts = [
  {
    id: "PT-88204",
    name: "Aaryan Kumar",
    email: "aaryan.kumar@example.com",
    role: "Patient",
    status: "Active",
    registeredDate: "2024-03-15",
    lastLogin: "Today, 10:14 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "PT-88205",
    name: "Sneha Patel",
    email: "sneha.patel@example.com",
    role: "Patient",
    status: "Active",
    registeredDate: "2024-05-10",
    lastLogin: "Yesterday, 04:30 PM",
    clinicNode: "West Community Clinic"
  },
  {
    id: "PT-88206",
    name: "Amitabh Sen",
    email: "amitabh.sen@example.com",
    role: "Patient",
    status: "Deactivated",
    registeredDate: "2023-11-20",
    lastLogin: "14 Aug 2026",
    clinicNode: "North Wing Specialty"
  },
  {
    id: "DOC-001",
    name: "Dr. Shashank Pandey",
    email: "shashank.pandey@mhc-pms.org",
    role: "Doctor",
    status: "Active",
    registeredDate: "2022-01-10",
    lastLogin: "Today, 08:45 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "DOC-002",
    name: "Dr. Rajesh Verma",
    email: "rajesh.verma@mhc-pms.org",
    role: "Doctor",
    status: "Active",
    registeredDate: "2022-04-18",
    lastLogin: "Today, 09:12 AM",
    clinicNode: "South Specialty Centre"
  },
  {
    id: "DOC-003",
    name: "Dr. Meera Nambiar",
    email: "meera.nambiar@mhc-pms.org",
    role: "Doctor",
    status: "Active",
    registeredDate: "2023-08-01",
    lastLogin: "Yesterday, 06:10 PM",
    clinicNode: "West Community Clinic"
  },
  {
    id: "DOC-004",
    name: "Dr. Kabir Sengupta",
    email: "kabir.sengupta@mhc-pms.org",
    role: "Doctor",
    status: "Active",
    registeredDate: "2023-02-14",
    lastLogin: "Today, 11:20 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "REC-104",
    name: "Medha Banerjee",
    email: "medha.banerjee@mhc-pms.org",
    role: "Receptionist",
    status: "Active",
    registeredDate: "2023-06-01",
    lastLogin: "Today, 07:55 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "REC-105",
    name: "Rohan Kulkarni",
    email: "rohan.k@mhc-pms.org",
    role: "Receptionist",
    status: "Deactivated",
    registeredDate: "2023-09-15",
    lastLogin: "01 Sep 2026",
    clinicNode: "West Community Clinic"
  },
  {
    id: "ADM-001",
    name: "Shounak Sarkar",
    email: "shounak.sarkar@mhc-pms.org",
    role: "System Admin",
    status: "Active",
    registeredDate: "2021-08-01",
    lastLogin: "Today, 07:30 AM",
    clinicNode: "Central Healthcare IT HQ"
  }
];

export const initialClinicNodes = [
  {
    id: "NODE-CENTRAL",
    name: "Central Healthcare Hub (Main DB)",
    location: "Metro Central Hospital",
    type: "Master Central Repository",
    status: "Online & Synchronized",
    lastSynced: "Just now (Automated)",
    pendingRecords: 0,
    connectionSpeed: "10 Gbps Enterprise Fiber",
    recordsCount: 48250
  },
  {
    id: "NODE-NORTH",
    name: "North Wing Specialty Clinic",
    location: "Civil Lines Medical Complex",
    type: "Regional Specialist Satellite",
    status: "Online & Synchronized",
    lastSynced: "8 mins ago",
    pendingRecords: 2,
    connectionSpeed: "500 Mbps Dedicated",
    recordsCount: 12400
  },
  {
    id: "NODE-WEST",
    name: "West Community Health Centre",
    location: "Sector 14 Community Hub",
    type: "Local Community Clinic (Offline Capable)",
    status: "Operating Locally (Sync Queued)",
    lastSynced: "32 mins ago",
    pendingRecords: 14,
    connectionSpeed: "100 Mbps Broadband",
    recordsCount: 8910
  },
  {
    id: "NODE-SOUTH",
    name: "South Suburban Neuropsychiatric Unit",
    location: "Greenwood Health Park",
    type: "Suburban Practice",
    status: "Online & Synchronized",
    lastSynced: "14 mins ago",
    pendingRecords: 0,
    connectionSpeed: "300 Mbps Fiber",
    recordsCount: 6540
  }
];

export const mockAdminReports = {
  summary: {
    totalPatientsTreated: 3840,
    admissionsThisMonth: 124,
    dischargesThisMonth: 118,
    legalMentalHealthCases: 38,
    totalPrescriptionsIssued: 9420,
    totalExpenditureYTD: "₹42,85,600",
    averageBedOccupancy: "78.4%",
    patientSatisfactionRate: "94.6%"
  },
  monthlyTrends: [
    { month: "Apr 2026", treated: 540, admissions: 18, discharges: 16, expenditure: 580000 },
    { month: "May 2026", treated: 610, admissions: 22, discharges: 20, expenditure: 640000 },
    { month: "Jun 2026", treated: 590, admissions: 19, discharges: 18, expenditure: 610000 },
    { month: "Jul 2026", treated: 680, admissions: 24, discharges: 23, expenditure: 710000 },
    { month: "Aug 2026", treated: 720, admissions: 26, discharges: 25, expenditure: 760000 },
    { month: "Sep 2026", treated: 700, admissions: 25, discharges: 24, expenditure: 740000 }
  ],
  topPrescriptions: [
    { drug: "Sertraline HCl", category: "SSRI Antidepressant", unitsDispensed: 3200, cost: "₹3,84,000" },
    { drug: "Escitalopram Oxalate", category: "SSRI Antidepressant", unitsDispensed: 2850, cost: "₹3,42,000" },
    { drug: "Clonazepam", category: "Anxiolytic / Benzodiazepine", unitsDispensed: 2100, cost: "₹1,89,000" },
    { drug: "Quetiapine Fumarate", category: "Atypical Antipsychotic", unitsDispensed: 1450, cost: "₹4,35,000" },
    { drug: "Lithium Carbonate", category: "Mood Stabilizer", unitsDispensed: 980, cost: "₹1,96,000" }
  ],
  legalCareCategories: [
    { section: "Voluntary Community Care (Section 89)", count: 24, percentage: "63.2%" },
    { section: "Supported Inpatient Admission (Section 90)", count: 9, percentage: "23.7%" },
    { section: "Emergency Psychiatric Protective Custody (Section 94)", count: 5, percentage: "13.1%" }
  ]
};

export const initialBillingInvoices = [
  {
    invoiceId: "INV-2026-881",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    doctorName: "Dr. Shashank Pandey",
    service: "Psychiatric Consultation & Progress Review",
    date: "2026-09-18",
    amount: 1200,
    tax: 0,
    status: "Paid",
    paymentMode: "UPI / Digital",
    receiptNumber: "REC-99412"
  },
  {
    invoiceId: "INV-2026-880",
    patientId: "PT-88205",
    patientName: "Sneha Patel",
    doctorName: "Dr. Rajesh Verma",
    service: "Psychotherapy & CBT Assessment",
    date: "2026-09-17",
    amount: 1000,
    tax: 0,
    status: "Paid",
    paymentMode: "Credit Card",
    receiptNumber: "REC-99411"
  },
  {
    invoiceId: "INV-2026-879",
    patientId: "PT-88207",
    patientName: "Kunal Ghosh",
    doctorName: "Dr. Kabir Sengupta",
    service: "Cognitive Behavioral Therapy (Initial Session)",
    date: "2026-09-17",
    amount: 950,
    tax: 0,
    status: "Pending",
    paymentMode: "Insurance Claim Verification",
    receiptNumber: "REC-99410"
  },
  {
    invoiceId: "INV-2026-878",
    patientId: "PT-88208",
    patientName: "Deepa Nair",
    doctorName: "Dr. Shashank Pandey",
    service: "Emergency Crisis Consultation",
    date: "2026-09-16",
    amount: 1500,
    tax: 0,
    status: "Paid",
    paymentMode: "Cash",
    receiptNumber: "REC-99409"
  }
];

export const initialWaitingVisitors = [
  {
    id: "VIS-301",
    patientName: "Aaryan Kumar",
    patientId: "PT-88204",
    assignedDoctor: "Dr. Shashank Pandey",
    arrivalTime: "09:42 AM",
    status: "In Waiting Lounge",
    accompaniedBy: "Self",
    room: "OPD Suite 204",
    tokenNumber: 4
  },
  {
    id: "VIS-302",
    patientName: "Karan Johar",
    patientId: "PT-88210",
    assignedDoctor: "Dr. Rajesh Verma",
    arrivalTime: "09:50 AM",
    status: "With Doctor",
    accompaniedBy: "Sunita Johar (Mother)",
    room: "OPD Suite 206",
    tokenNumber: 5
  },
  {
    id: "VIS-303",
    patientName: "Anita Roy",
    patientId: "PT-88212",
    assignedDoctor: "Dr. Meera Nambiar",
    arrivalTime: "10:05 AM",
    status: "Checked In",
    accompaniedBy: "Alok Roy (Spouse)",
    room: "OPD Suite 208",
    tokenNumber: 6
  }
];

export const initialBroadcastNotifications = [
  {
    id: "NOTIF-101",
    title: "Clinic Holiday Schedule: Gandhi Jayanti Observance",
    audience: "All Users",
    sender: "Shounak Sarkar (System Administrator)",
    date: "12 Sep 2026",
    content: "Please note that all Outpatient Departments across Central, North, and West clinics will remain closed on 2nd October 2026. Emergency psychiatric services and tele-triage will remain 24x7 operational.",
    priority: "Normal"
  },
  {
    id: "NOTIF-102",
    title: "Clinical Protocol: Mandatory PHQ-9 Bi-Weekly Psychometric Review",
    audience: "Doctors & Clinical Staff",
    sender: "Dr. Shashank Pandey (Senior Consultant Psychiatrist)",
    date: "08 Sep 2026",
    content: "All consulting psychiatrists are requested to review bi-weekly psychometric scores (PHQ-9 and GAD-7) before renewing SSRI/SNRI prescription courses for affective disorder outpatients.",
    priority: "High"
  },
  {
    id: "NOTIF-103",
    title: "Scheduled Database Synchronization Maintenance",
    audience: "All Users",
    sender: "Shounak Sarkar (IT Systems HQ)",
    date: "02 Sep 2026",
    content: "Central database index optimization scheduled for Saturday midnight (00:00 - 02:00 AM). Local clinic computers will temporarily transition to offline storage mode.",
    priority: "Info"
  }
];
