// Prescriptions issued by Dr. Shashank Pandey for Patient 1 (Aaryan Kumar) & Patient 2 (Agniva Samaddar)

export const mockPrescriptions = [
  {
    id: "RX-2026-089",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    doctor: "Dr. Shashank Pandey",
    doctorSpeciality: "Chief Consultant Psychiatrist",
    date: "20 August 2026",
    diagnosis: "Generalized Anxiety Disorder (Mild, Stabilized)",
    validUntil: "20 October 2026",
    status: "Active",
    instructionsGeneral: "Take medications post breakfast with a full glass of water. Avoid sudden cessation without consulting the physician. Maintain a daily sleep-wake log.",
    medicines: [
      {
        name: "Tab. Escitalopram Oxalate",
        strength: "10 mg",
        dosage: "1 Tablet",
        frequency: "Once Daily (Morning post breakfast)",
        duration: "30 Days",
        instructions: "Do not crush. Take at the same time each morning.",
        refillsRemaining: 1
      },
      {
        name: "Tab. Clonazepam (SOS)",
        strength: "0.25 mg",
        dosage: "0.5 Tablet",
        frequency: "SOS (Only if acute severe panic attack arises)",
        duration: "As Needed (Max 5 doses)",
        instructions: "Dissolve under tongue. Strictly avoid driving after intake.",
        refillsRemaining: 0
      },
      {
        name: "Cap. Magnesium Glycinate + L-Theanine",
        strength: "200 mg / 100 mg",
        dosage: "1 Capsule",
        frequency: "Once Daily (30 mins before sleep)",
        duration: "60 Days",
        instructions: "Supports neurological relaxation and restorative slow-wave sleep.",
        refillsRemaining: 2
      }
    ]
  },
  {
    id: "RX-2026-092",
    patientId: "PT-88205",
    patientName: "Agniva Samaddar",
    doctor: "Dr. Shashank Pandey",
    doctorSpeciality: "Chief Consultant Psychiatrist",
    date: "05 September 2026",
    diagnosis: "ADHD (Inattentive Type) & Delayed Sleep Phase",
    validUntil: "05 November 2026",
    status: "Active",
    instructionsGeneral: "Take morning medication with a protein-rich breakfast. Evening melatonin at least 45 minutes before sleep in a dimly lit room.",
    medicines: [
      {
        name: "Tab. Methylphenidate Hydrochloride ER",
        strength: "10 mg",
        dosage: "1 Tablet",
        frequency: "Once Daily (Morning at 08:30 AM)",
        duration: "30 Days",
        instructions: "Swallow whole with plenty of water. Supports sustained daytime executive focus.",
        refillsRemaining: 1
      },
      {
        name: "Tab. Melatonin Fast-Dissolve",
        strength: "3 mg",
        dosage: "1 Tablet",
        frequency: "Once Daily (Night at 10:30 PM)",
        duration: "30 Days",
        instructions: "Circadian phase advance protocol. Avoid blue-light devices after intake.",
        refillsRemaining: 2
      }
    ]
  },
  {
    id: "RX-2026-054",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    doctor: "Dr. Shashank Pandey",
    doctorSpeciality: "Chief Consultant Psychiatrist",
    date: "12 May 2026",
    diagnosis: "Acute Anxiety & Sleep Disturbance",
    validUntil: "12 July 2026",
    status: "Completed",
    instructionsGeneral: "Gradual titration regimen as initiated in clinic. Report any gastrointestinal sensitivity.",
    medicines: [
      {
        name: "Tab. Escitalopram Oxalate",
        strength: "5 mg",
        dosage: "1 Tablet",
        frequency: "Once Daily (Morning)",
        duration: "14 Days (Starter Dose)",
        instructions: "Titration starter dose before increasing to 10mg.",
        refillsRemaining: 0
      }
    ]
  }
];
