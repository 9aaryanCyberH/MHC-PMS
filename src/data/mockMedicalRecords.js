// Confidential psychiatric records for MHC-PMS
// Patient 1: Aaryan Kumar (PT-88204)
// Patient 2: Agniva Samaddar (PT-88205)

export const mockPatients = {
  "PT-88204": {
    id: "PT-88204",
    fullName: "Aaryan Kumar",
    dob: "2005-04-14",
    displayDob: "14 April 2005 (Age: 21)",
    age: 21,
    gender: "Male",
    bloodGroup: "A+",
    email: "aaryan.kumar@example.com",
    phone: "+91 98765 43210",
    emergencyContact: {
      name: "Sunita Kumar",
      relationship: "Parent / Guardian",
      phone: "+91 98765 12345"
    },
    address: "Flat 402, Greenfield Residences, Indiranagar, Bengaluru, KA 560038",
    insurance: {
      provider: "Star Health Care Medical Insurance",
      policyNo: "SHC-MH-9941029",
      validTill: "31 Dec 2027"
    },
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    registeredSince: "12 May 2025",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Generalized Anxiety Disorder (GAD)",
    severity: "Mild to Moderate",
    clinicNode: "Central Hospital OPD",
    activeStatus: "Active Outpatient",
    vitals: {
      bloodPressure: "118/76 mmHg",
      heartRate: "72 bpm",
      bmi: "21.8 kg/m²",
      weight: "65 kg",
      lastRecorded: "20 August 2026",
      recordedBy: "Nurse Preeti (OPD Triage)"
    },
    diagnoses: [
      {
        code: "ICD-10 F41.1",
        title: "Generalized Anxiety Disorder (GAD)",
        diagnosedDate: "15 July 2025",
        diagnosedBy: "Dr. Shashank Pandey",
        status: "Active - Mild Improvement",
        severity: "Mild to Moderate",
        summary: "Persistent academic and performance rumination with somatic tension. Significant coping improvements noted through cognitive restructuring and lifestyle regulation."
      },
      {
        code: "ICD-10 G47.0",
        title: "Psychophysiological Insomnia (Sleep Disturbance)",
        diagnosedDate: "20 August 2025",
        diagnosedBy: "Dr. Shashank Pandey",
        status: "Well Controlled",
        severity: "Mild",
        summary: "Intermittent difficulty with sleep onset triggered by late-night screen exposure. Sleep latency reduced to under 25 minutes with sleep hygiene protocol."
      }
    ],
    allergies: [
      {
        substance: "Penicillin",
        type: "Medication",
        reaction: "Urticaria / Cutaneous Erythema",
        severity: "Severe"
      },
      {
        substance: "Caffeine (>200mg/day)",
        type: "Dietary / Stimulant",
        reaction: "Heart Palpitations & Tremors",
        severity: "Moderate"
      }
    ],
    consultations: [
      {
        date: "20 August 2026",
        doctor: "Dr. Shashank Pandey",
        department: "Psychiatry OPD Suite 204",
        clinicalNotes: "Patient reported stability over past 4 weeks. No acute panic episodes reported. Sleep quality 7/10. Maintained Escitalopram 10mg morning.",
        followUp: "Follow-up recommended in 4 weeks."
      },
      {
        date: "15 July 2026",
        doctor: "Dr. Shashank Pandey",
        department: "Psychiatry OPD Suite 204",
        clinicalNotes: "Conducted GAD-7 evaluation. Score improved from 14 to 9. Practiced guided diaphragmatic breathing and cognitive reframing.",
        followUp: "Schedule bi-weekly review."
      },
      {
        date: "12 May 2026",
        doctor: "Dr. Shashank Pandey",
        department: "Psychiatry OPD Suite 204",
        clinicalNotes: "Comprehensive initial mental health intake. Baseline lab investigations ordered (TSH, Vit D, B12). Initiated pharmacotherapy and sleep hygiene adjustments.",
        followUp: "Review after blood work results."
      }
    ],
    treatments: [
      {
        phase: "Phase 3 (Current)",
        name: "Maintenance & Relapse Prevention",
        startDate: "August 2026",
        endDate: "Present",
        goals: "Sustain low baseline anxiety, maintain 7+ hours restful sleep, continue monthly supportive consultations.",
        progress: "85% Target Met"
      },
      {
        phase: "Phase 2",
        name: "Cognitive Restructuring & Sleep Hygiene",
        startDate: "July 2026",
        endDate: "August 2026",
        goals: "Reduce GAD-7 score under 10, establish evening wind-down routine without digital stimulants.",
        progress: "Completed"
      },
      {
        phase: "Phase 1",
        name: "Acute Stabilization & Pharmacotherapy Initiation",
        startDate: "May 2026",
        endDate: "June 2026",
        goals: "Titrate Escitalopram to therapeutic 10mg, alleviate acute somatic tension and palpitation distress.",
        progress: "Completed"
      }
    ]
  },

  "PT-88205": {
    id: "PT-88205",
    fullName: "Agniva Samaddar",
    dob: "2004-10-18",
    displayDob: "18 October 2004 (Age: 22)",
    age: 22,
    gender: "Male",
    bloodGroup: "B+",
    email: "agniva.samaddar@example.com",
    phone: "+91 98301 55678",
    emergencyContact: {
      name: "Subrata Samaddar",
      relationship: "Parent / Guardian",
      phone: "+91 98301 55670"
    },
    address: "Tower 3, Lakeview Enclave, Salt Lake Sector V, Kolkata, WB 700091",
    insurance: {
      provider: "HDFC ERGO Health Suraksha",
      policyNo: "HDFC-MH-8812903",
      validTill: "15 Oct 2027"
    },
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    registeredSince: "18 June 2025",
    assignedDoctor: "Dr. Shashank Pandey",
    primaryDiagnosis: "Adult Attention & Sleep Phase Dysregulation",
    severity: "Mild",
    clinicNode: "Central Hospital OPD",
    activeStatus: "Active Outpatient",
    vitals: {
      bloodPressure: "120/80 mmHg",
      heartRate: "76 bpm",
      bmi: "22.4 kg/m²",
      weight: "68 kg",
      lastRecorded: "05 September 2026",
      recordedBy: "Nurse Preeti (OPD Triage)"
    },
    diagnoses: [
      {
        code: "ICD-10 F90.0",
        title: "Attention Deficit Hyperactivity Disorder (Predominantly Inattentive)",
        diagnosedDate: "18 June 2025",
        diagnosedBy: "Dr. Shashank Pandey",
        status: "Active - Under Treatment",
        severity: "Mild to Moderate",
        summary: "Executive dysfunction with difficulty initiating complex multi-step academic tasks. Responding well to structured time-blocking and low-dose stimulant therapy."
      },
      {
        code: "ICD-10 G47.21",
        title: "Delayed Sleep Phase Syndrome",
        diagnosedDate: "20 July 2025",
        diagnosedBy: "Dr. Shashank Pandey",
        status: "Managing with Chronotherapy",
        severity: "Mild",
        summary: "Circadian rhythm phase delay. Evening blue light filtering and low-dose melatonin 3mg showing positive sleep-phase advance."
      }
    ],
    allergies: [
      {
        substance: "Sulfa Antibiotics",
        type: "Medication",
        reaction: "Skin Rash & Pruritus",
        severity: "Moderate"
      }
    ],
    consultations: [
      {
        date: "05 September 2026",
        doctor: "Dr. Shashank Pandey",
        department: "Psychiatry OPD Suite 204",
        clinicalNotes: "Evaluated study task completion and focus stamina. Patient noted 70% improvement during 2-hour deep work blocks. Sleep onset normalized around 11:30 PM.",
        followUp: "Follow-up in 4 weeks."
      },
      {
        date: "10 August 2026",
        doctor: "Dr. Shashank Pandey",
        department: "Psychiatry OPD Suite 204",
        clinicalNotes: "Adjusted morning pharmacotherapy dose. EEG telemetry reviewed and within normal neuro-physiological variations.",
        followUp: "Review after 30 days."
      }
    ],
    treatments: [
      {
        phase: "Phase 2 (Current)",
        name: "Executive Function Enhancement & Circadian Regulation",
        startDate: "August 2026",
        endDate: "Present",
        goals: "Strengthen sustained focus during complex coursework; stabilize circadian sleep cycle before midnight.",
        progress: "75% Target Met"
      },
      {
        phase: "Phase 1",
        name: "Diagnostic Assessment & Medication Titration",
        startDate: "June 2026",
        endDate: "July 2026",
        goals: "Complete neuropsychological evaluation and titrate initial treatment plan.",
        progress: "Completed"
      }
    ]
  }
};

// Default backwards compatibility exports
export const mockPatientProfile = mockPatients["PT-88204"];
export const mockMedicalRecords = {
  vitals: mockPatients["PT-88204"].vitals,
  diagnoses: mockPatients["PT-88204"].diagnoses,
  allergies: mockPatients["PT-88204"].allergies,
  consultations: mockPatients["PT-88204"].consultations,
  treatments: mockPatients["PT-88204"].treatments
};
