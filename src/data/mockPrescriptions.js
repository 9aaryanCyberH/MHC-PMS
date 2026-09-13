export const mockPrescriptions = [
  {
    id: "RX-2026-089",
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
    id: "RX-2026-054",
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
      },
      {
        name: "Tab. Zolpidem Tartrate",
        strength: "5 mg",
        dosage: "1 Tablet",
        frequency: "Once at bedtime (Short term only)",
        duration: "7 Days",
        instructions: "Take right before getting into bed. Discontinued after 7 days.",
        refillsRemaining: 0
      }
    ]
  },
  {
    id: "RX-2025-112",
    doctor: "Dr. Priya Nair",
    doctorSpeciality: "Neuropsychiatrist",
    date: "14 November 2025",
    diagnosis: "Neuro-Nutritional Supplementation",
    validUntil: "14 February 2026",
    status: "Completed",
    instructionsGeneral: "Nutritional neural support following cognitive workup.",
    medicines: [
      {
        name: "Cap. Methylcobalamin + Alpha Lipoic Acid",
        strength: "1500 mcg / 100 mg",
        dosage: "1 Capsule",
        frequency: "Once Daily (After lunch)",
        duration: "90 Days",
        instructions: "Aids peripheral nerve conduction and neuroprotection.",
        refillsRemaining: 0
      },
      {
        name: "Tab. Cholecalciferol (Vitamin D3)",
        strength: "60,000 IU",
        dosage: "1 Tablet",
        frequency: "Once Weekly (Sunday morning with milk)",
        duration: "8 Weeks",
        instructions: "Correction of mild vitamin D insufficiency.",
        refillsRemaining: 0
      }
    ]
  }
];
