export const mockLabRecords = [
  {
    id: "LAB-2026-771",
    testName: "Comprehensive Thyroid Profile (FT3, FT4, Ultrasensitive TSH)",
    category: "Endocrine / Biochemical",
    testDate: "18 August 2026",
    doctor: "Dr. Shashank Pandey",
    labName: "MHC Central Pathology & Diagnostics Lab",
    status: "Normal",
    resultSummary: "All thyroid hormone parameters within normal clinical ranges. Secondary somatic anxiety rule-out confirmed.",
    parameters: [
      { name: "Free Triiodothyronine (FT3)", value: "3.1 pg/mL", normalRange: "2.0 - 4.4 pg/mL", status: "Normal" },
      { name: "Free Thyroxine (FT4)", value: "1.25 ng/dL", normalRange: "0.8 - 1.8 ng/dL", status: "Normal" },
      { name: "Thyroid Stimulating Hormone (TSH)", value: "2.18 µIU/mL", normalRange: "0.4 - 4.2 µIU/mL", status: "Normal" }
    ],
    verifiedBy: "Dr. K. N. Swamy, MD (Pathology)",
    remarks: "Euthyroid state. No organic thyroid etiology contributing to hyperarousal or anxiety symptoms."
  },
  {
    id: "LAB-2026-614",
    testName: "Serum Vitamin B12 & 25-Hydroxy Vitamin D",
    category: "Nutritional / Neuro-Metabolic",
    testDate: "15 May 2026",
    doctor: "Dr. Shashank Pandey",
    labName: "MHC Central Pathology & Diagnostics Lab",
    status: "Attention Needed",
    resultSummary: "Mild Vitamin D insufficiency (19.4 ng/mL). Serum B12 optimal.",
    parameters: [
      { name: "Serum Vitamin B12", value: "482 pg/mL", normalRange: "211 - 911 pg/mL", status: "Normal" },
      { name: "25-OH Vitamin D Total", value: "19.4 ng/mL", normalRange: "30.0 - 100.0 ng/mL", status: "Low" },
      { name: "Serum Calcium Total", value: "9.2 mg/dL", normalRange: "8.5 - 10.5 mg/dL", status: "Normal" }
    ],
    verifiedBy: "Dr. K. N. Swamy, MD (Pathology)",
    remarks: "Supplementation with oral Cholecalciferol 60,000 IU/week prescribed. Recheck recommended in 3 months."
  },
  {
    id: "LAB-2026-490",
    testName: "PHQ-9 (Patient Health Questionnaire - Depression Scale)",
    category: "Psychometric Assessment",
    testDate: "15 July 2026",
    doctor: "Dr. Rajesh Verma",
    labName: "MHC Clinical Neuro-Psychometry Unit",
    status: "Improved",
    resultSummary: "Total Score: 4/27 (Minimal / No Depression symptoms). Marked reduction from baseline score of 12/27 in May 2026.",
    parameters: [
      { name: "Anhedonia / Little interest", value: "0 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Depressed / Hopeless feeling", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Sleep disturbance", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Energy levels / Fatigue", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Appetite / Eating changes", value: "0 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Feelings of failure / Guilt", value: "1 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Concentration / Focus", value: "0 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Psychomotor slowing / restlessness", value: "0 / 3", normalRange: "0 - 1", status: "Normal" },
      { name: "Suicidal ideation", value: "0 / 3", normalRange: "0", status: "Normal" }
    ],
    verifiedBy: "Dr. Rajesh Verma, Ph.D. Clinical Psychology",
    remarks: "Remission criteria fulfilled. Cognitive coping strategies proven effective."
  },
  {
    id: "LAB-2026-302",
    testName: "Complete Blood Count (CBC) with ESR",
    category: "Hematology",
    testDate: "12 May 2026",
    doctor: "Dr. Shashank Pandey",
    labName: "MHC Central Pathology & Diagnostics Lab",
    status: "Normal",
    resultSummary: "Hemoglobin 14.8 g/dL. Total leukocyte count and platelets within reference bounds.",
    parameters: [
      { name: "Hemoglobin", value: "14.8 g/dL", normalRange: "13.0 - 17.0 g/dL", status: "Normal" },
      { name: "Total RBC Count", value: "4.92 mil/µL", normalRange: "4.5 - 5.5 mil/µL", status: "Normal" },
      { name: "WBC Count", value: "6,800 /µL", normalRange: "4,000 - 11,000 /µL", status: "Normal" },
      { name: "Platelet Count", value: "245,000 /µL", normalRange: "150,000 - 450,000 /µL", status: "Normal" },
      { name: "ESR (Westergren)", value: "8 mm/hr", normalRange: "0 - 15 mm/hr", status: "Normal" }
    ],
    verifiedBy: "Dr. K. N. Swamy, MD (Pathology)",
    remarks: "Normocytic normochromic red cell picture. No underlying chronic inflammation."
  }
];
