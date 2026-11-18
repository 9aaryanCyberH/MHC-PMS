// Comprehensive real system data for MHC-PMS Multi-Role Healthcare System
// Universal Admin: Shounak Sarkar | Receptionist: Medha Banerjee | Doctor: Dr. Shashank Pandey
// Patient 1: Aaryan Kumar | Patient 2: Agniva Samaddar

export const mockStaffProfiles = {
  doctor: {
    id: "DOC-001",
    fullName: "Dr. Shashank Pandey",
    role: "Doctor",
    title: "Chief Consultant Psychiatrist & Clinical Director",
    department: "Adult Psychiatry & Neuropsychiatry",
    email: "shashank.pandey@mhc-pms.org",
    phone: "+91 98112 34567",
    opdRoom: "OPD Suite 204, East Wing",
    qualifications: "MBBS, MD (Psychiatry - NIMHANS), DNB, FIPS",
    experience: "14 Years Clinical Practice",
    consultationFee: 1200,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    specialities: [
      "Generalized Anxiety Disorder",
      "Major Depressive Disorder",
      "Psychopharmacology",
      "Neuropsychiatric Evaluation"
    ],
    bio: "Dr. Shashank Pandey is the attending Chief Consultant Psychiatrist with extensive clinical experience in evidence-based psychopharmacology, affective mood disorders, and community psychiatric rehabilitation.",
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
    accessLevel: "Super Administrator (Universal Authority)",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300"
  }
};

export const initialUserAccounts = [
  {
    id: "ADM-001",
    name: "Shounak Sarkar",
    email: "shounak.sarkar@mhc-pms.org",
    role: "System Admin",
    status: "Active",
    registeredDate: "2021-08-01",
    lastLogin: "Today, 10:14 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "REC-104",
    name: "Medha Banerjee",
    email: "medha.banerjee@mhc-pms.org",
    role: "Receptionist",
    status: "Active",
    registeredDate: "2022-03-10",
    lastLogin: "Today, 08:30 AM",
    clinicNode: "Central Hospital OPD"
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
    id: "PT-88204",
    name: "Aaryan Kumar",
    email: "aaryan.kumar@example.com",
    role: "Patient",
    status: "Active",
    registeredDate: "2025-05-12",
    lastLogin: "Today, 09:30 AM",
    clinicNode: "Central Hospital OPD"
  },
  {
    id: "PT-88205",
    name: "Agniva Samaddar",
    email: "agniva.samaddar@example.com",
    role: "Patient",
    status: "Active",
    registeredDate: "2025-06-18",
    lastLogin: "Yesterday, 04:15 PM",
    clinicNode: "Central Hospital OPD"
  }
];

export const initialClinicNodes = [
  {
    id: "NODE-01",
    name: "Central Hospital OPD Hub",
    location: "Indiranagar, Bengaluru",
    role: "Central Master Database",
    status: "Online & Synchronized",
    lastSynced: "Just now (Continuous)",
    pendingRecords: 0,
    recordsInNode: 14820,
    latency: "12 ms",
    ipAddress: "10.0.1.25"
  },
  {
    id: "NODE-02",
    name: "Kolkata Satellite Psychiatric Clinic",
    location: "Salt Lake Sector V, Kolkata",
    role: "Regional Satellite Hub",
    status: "Online & Synchronized",
    lastSynced: "4 mins ago",
    pendingRecords: 0,
    recordsInNode: 4210,
    latency: "38 ms",
    ipAddress: "10.0.2.14"
  },
  {
    id: "NODE-03",
    name: "South Suburban Outreach Clinic",
    location: "Electronic City, Bengaluru",
    role: "Local Edge Node (Store-and-Forward)",
    status: "Online & Synchronized",
    lastSynced: "12 mins ago",
    pendingRecords: 0,
    recordsInNode: 1840,
    latency: "24 ms",
    ipAddress: "10.0.3.50"
  }
];

export const mockAdminReports = {
  summary: {
    totalPatientsTreated: 1428,
    activeAdmissions: 28,
    routineDischarges: 42,
    patientsUnderSectionCare: 7,
    totalMedicationDispensedValue: "₹4,89,200",
    totalConsultationTurnover: "₹17,13,600",
    syncUptimePercentage: "99.98%",
    averageBedOccupancy: "82.4%"
  },
  summaryMetrics: {
    totalPatientsTreatedQuarter: 1428,
    activeAdmissions: 28,
    routineDischarges: 42,
    patientsUnderSectionCare: 7,
    totalMedicationDispensedValue: 489200,
    totalConsultationTurnover: 1713600,
    syncUptimePercentage: "99.98%"
  },
  monthlyTrends: [
    { month: "Apr 2026", treated: 380, admissions: 7, discharges: 10, underSection: 1, totalRevenue: 456000 },
    { month: "May 2026", treated: 410, admissions: 8, discharges: 11, underSection: 2, totalRevenue: 492000 },
    { month: "Jun 2026", treated: 445, admissions: 10, discharges: 14, underSection: 3, totalRevenue: 534000 },
    { month: "Jul 2026", treated: 480, admissions: 9, discharges: 15, underSection: 2, totalRevenue: 576000 },
    { month: "Aug 2026", treated: 520, admissions: 12, discharges: 18, underSection: 4, totalRevenue: 624000 },
    { month: "Sep 2026", treated: 540, admissions: 11, discharges: 19, underSection: 3, totalRevenue: 648000 }
  ],
  legalCareCategories: [
    { section: "Section 89 (Supported Admission for Acute Care)", count: 4, percentage: "57.1%" },
    { section: "Section 90 (High-Support Community Order)", count: 2, percentage: "28.6%" },
    { section: "Section 94 (Emergency Psychiatric Stabilization)", count: 1, percentage: "14.3%" }
  ],
  topPrescriptions: [
    { drug: "Tab. Escitalopram Oxalate 10mg", category: "SSRI Antidepressant", unitsDispensed: 1240, cost: "₹1,48,800" },
    { drug: "Tab. Methylphenidate ER 10mg", category: "CNS Stimulant / ADHD", unitsDispensed: 860, cost: "₹1,29,000" },
    { drug: "Tab. Melatonin 3mg", category: "Chronobiological Sleep Regulant", unitsDispensed: 950, cost: "₹76,000" }
  ],
  topPrescribedMolecules: [
    { molecule: "Escitalopram Oxalate", count: 342, category: "SSRI Antidepressant", trend: "+12%" },
    { molecule: "Methylphenidate ER", count: 215, category: "CNS Stimulant / ADHD", trend: "+8%" },
    { molecule: "Melatonin Fast-Dissolve", count: 289, category: "Chronobiological Sleep Aid", trend: "+15%" },
    { molecule: "Clonazepam (SOS)", count: 94, category: "Anxiolytic / SOS", trend: "-5%" }
  ],
  mhaCompliance: {
    statutoryFilingDate: "31 August 2026",
    auditedBy: "State Mental Health Authority Review Commission",
    status: "100% Fully Compliant",
    patientRightsNoticeDisplayed: true,
    informedConsentAuditPassed: true
  }
};

export const initialBillingInvoices = [
  {
    invoiceId: "INV-2026-801",
    receiptNumber: "REC-99412",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    appointmentId: "APT-9401",
    doctorName: "Dr. Shashank Pandey",
    serviceDescription: "Comprehensive Psychiatric OPD Consultation",
    amount: 1200,
    paymentMode: "UPI / Google Pay",
    paymentReference: "UPI-481204899120",
    date: "2026-09-18",
    status: "Paid",
    receptionistName: "Medha Banerjee",
    paymentTimestamp: "18 Sep 2026, 09:45 AM"
  },
  {
    invoiceId: "INV-2026-802",
    receiptNumber: "REC-99415",
    patientId: "PT-88205",
    patientName: "Agniva Samaddar",
    appointmentId: "APT-9402",
    doctorName: "Dr. Shashank Pandey",
    serviceDescription: "ADHD Follow-up & Treatment Regimen Review",
    amount: 1200,
    paymentMode: "Credit Card (HDFC Visa)",
    paymentReference: "CC-TXN-904128",
    date: "2026-09-12",
    status: "Paid",
    receptionistName: "Medha Banerjee",
    paymentTimestamp: "12 Sep 2026, 02:15 PM"
  }
];

export const initialWaitingVisitors = [
  {
    id: "VIS-301",
    tokenNumber: 1,
    patientName: "Aaryan Kumar",
    patientId: "PT-88204",
    visitorName: "Sunita Kumar (Parent)",
    purpose: "Scheduled Consultation with Dr. Shashank Pandey",
    doctorName: "Dr. Shashank Pandey",
    arrivalTime: "09:35 AM",
    status: "With Clinician",
    date: "2026-09-18"
  },
  {
    id: "VIS-302",
    tokenNumber: 2,
    patientName: "Agniva Samaddar",
    patientId: "PT-88205",
    visitorName: "Subrata Samaddar (Parent)",
    purpose: "Prescription Refill & Lab Review",
    doctorName: "Dr. Shashank Pandey",
    arrivalTime: "10:10 AM",
    status: "In Waiting Lounge",
    date: "2026-09-18"
  }
];

export const initialBroadcastNotifications = [
  {
    id: "NOTIF-101",
    title: "Regional Clinic Replication Status",
    sender: "Shounak Sarkar (System Admin)",
    date: "18 Sep 2026",
    priority: "Normal",
    audience: "All Healthcare Staff",
    content: "Scheduled central sync cycle completed across Kolkata Satellite and Central Hospital Hub. All 14,820 records up to date."
  },
  {
    id: "NOTIF-102",
    title: "Outpatient Clinic Schedule Confirmation",
    sender: "Dr. Shashank Pandey (Chief Psychiatrist)",
    date: "17 Sep 2026",
    priority: "High",
    audience: "All Users",
    content: "OPD Suite 204 active for all scheduled in-person psychiatric consultations. Please arrive 10 minutes prior to token time."
  }
];
