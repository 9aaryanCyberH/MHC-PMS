// Real doctor registry - NO dummy doctors (Chief Consultant: Dr. Shashank Pandey)

export const mockDoctors = [
  {
    id: "DOC-001",
    name: "Dr. Shashank Pandey",
    title: "Chief Consultant Psychiatrist & Clinical Director",
    speciality: "Psychiatrist",
    qualification: "MBBS, MD (Psychiatry - NIMHANS), DNB, FIPS",
    experience: "14 Years Clinical Practice",
    rating: 4.9,
    reviewCount: 142,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    languages: ["English", "Hindi"],
    consultationFee: 1200,
    roomNumber: "OPD Suite 204, East Wing",
    availableDays: ["Monday", "Wednesday", "Friday"],
    timings: "09:00 AM - 04:00 PM",
    bio: "Dr. Shashank Pandey is the attending Senior Consultant Psychiatrist specializing in adult mood disorders, clinical depression, Generalized Anxiety Disorder (GAD), and panic disorders. He emphasizes evidence-based psychopharmacology, clinical psychotherapy, and comprehensive psychiatric rehabilitation.",
    education: [
      "MD in Psychiatry - National Institute of Mental Health & Neurosciences (NIMHANS), Bengaluru",
      "MBBS - King George's Medical University (KGMU), Lucknow",
      "Fellowship in Clinical Neuropsychiatry (UK)"
    ],
    expertise: [
      "Clinical Depression",
      "Generalized Anxiety Disorder",
      "Bipolar Spectrum",
      "Sleep & Insomnia Disorders",
      "Psychopharmacology"
    ],
    slots: {
      "Morning": ["09:30 AM", "10:00 AM", "10:30 AM", "11:30 AM"],
      "Afternoon": ["02:00 PM", "02:45 PM", "03:30 PM", "04:30 PM"],
      "Evening": ["05:00 PM", "05:45 PM"]
    }
  }
];

export const specialitiesList = [
  "All Specialities",
  "Psychiatrist"
];
