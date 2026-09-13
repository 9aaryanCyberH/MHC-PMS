export const mockPatientProfile = {
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
  registeredSince: "12 May 2025"
};

export const mockMedicalRecords = {
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
      summary: "Persistent academic and performance rumination with somatic tension. Significant coping improvements noted through cognitive restructuring."
    },
    {
      code: "ICD-10 G47.0",
      title: "Psychophysiological Insomnia (Sleep Disturbance)",
      diagnosedDate: "20 August 2025",
      diagnosedBy: "Dr. Shashank Pandey",
      status: "Well Controlled",
      severity: "Mild",
      summary: "Intermittent difficulty with sleep onset triggered by screen exposure. Sleep latency reduced to under 25 minutes with sleep hygiene protocol."
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
      department: "Psychiatry OPD",
      clinicalNotes: "Patient reported stability over past 4 weeks. No panic episodes reported. Sleep quality 7/10. Continued Escitalopram 10mg morning.",
      followUp: "Follow-up recommended in 4 weeks."
    },
    {
      date: "15 July 2026",
      doctor: "Dr. Rajesh Verma",
      department: "Clinical Psychology",
      clinicalNotes: "Conducted GAD-7 evaluation. Score improved from 14 to 9. Practiced guided diaphragmatic breathing and cognitive reframing.",
      followUp: "Schedule bi-weekly therapy session."
    },
    {
      date: "12 May 2026",
      doctor: "Dr. Shashank Pandey",
      department: "Psychiatry OPD",
      clinicalNotes: "Comprehensive initial mental health intake. Baseline lab investigations ordered (TSH, Vit D, B12). Initiated pharmacotherapy and lifestyle adjustments.",
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
      name: "Cognitive Restructuring & Behavioral Therapy",
      startDate: "May 2026",
      endDate: "July 2026",
      goals: "Address cognitive distortions, implement stimulus control for bedtime, reduce somatic tension.",
      progress: "Completed"
    },
    {
      phase: "Phase 1",
      name: "Acute Symptom Stabilization",
      startDate: "May 2026",
      endDate: "June 2026",
      goals: "Alleviate acute distress, regulate sleep-wake cycle, establish therapeutic alliance.",
      progress: "Completed"
    }
  ]
};
