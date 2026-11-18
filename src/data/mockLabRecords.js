// Diagnostic & Psychometric Lab Records for MHC-PMS

export const mockLabRecords = [
  {
    id: "LAB-2026-771",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
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
    verifiedBy: "Dr. Shashank Pandey, MD (Psychiatry)",
    remarks: "Euthyroid state. No organic thyroid etiology contributing to hyperarousal or anxiety symptoms."
  },
  {
    id: "LAB-2026-614",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
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
    verifiedBy: "Dr. Shashank Pandey, MD (Psychiatry)",
    remarks: "Supplementation with oral Cholecalciferol 60,000 IU/week prescribed. Recheck recommended in 3 months."
  },
  {
    id: "LAB-2026-490",
    patientId: "PT-88204",
    patientName: "Aaryan Kumar",
    testName: "PHQ-9 (Patient Health Questionnaire - Depression Scale)",
    category: "Psychometric Assessment",
    testDate: "15 July 2026",
    doctor: "Dr. Shashank Pandey",
    labName: "MHC Clinical Neuro-Psychometry Unit",
    status: "Improved",
    resultSummary: "Total Score: 4/27 (Minimal / Subclinical). Marked reduction from baseline score of 12/27 in May 2026.",
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
    verifiedBy: "Dr. Shashank Pandey, MD (Psychiatry)",
    remarks: "Remission criteria fulfilled. Cognitive coping strategies proven effective."
  },
  {
    id: "LAB-2026-805",
    patientId: "PT-88205",
    patientName: "Agniva Samaddar",
    testName: "Adult ASRS-v1.1 (ADHD Self-Report Screener) & GAD-7",
    category: "Psychometric Assessment",
    testDate: "05 September 2026",
    doctor: "Dr. Shashank Pandey",
    labName: "MHC Clinical Neuro-Psychometry Unit",
    status: "Mild / Manageable",
    resultSummary: "ASRS Inattention Score: 4/6 (Mild Clinical Significance). GAD-7 Score: 5/21 (Mild anxiety).",
    parameters: [
      { name: "Careless mistakes in work", value: "Often (Score 1)", normalRange: "Never / Rarely", status: "Attention Needed" },
      { name: "Difficulty sustaining focus", value: "Sometimes (Score 1)", normalRange: "Never / Rarely", status: "Normal" },
      { name: "Disorganization in planning", value: "Often (Score 1)", normalRange: "Never / Rarely", status: "Attention Needed" },
      { name: "Procrastination on complex tasks", value: "Often (Score 1)", normalRange: "Never / Rarely", status: "Attention Needed" },
      { name: "Fidgeting / restlessness", value: "Rarely (Score 0)", normalRange: "Never / Rarely", status: "Normal" },
      { name: "GAD-7 Generalized Anxiety", value: "5 / 21", normalRange: "0 - 4 (Minimal)", status: "Mild" }
    ],
    verifiedBy: "Dr. Shashank Pandey, MD (Psychiatry)",
    remarks: "Executive dysfunction predominant. High response to task-chunking and morning stimulant protocol."
  }
];
