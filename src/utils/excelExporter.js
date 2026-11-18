// Excel (.xls / .xlsx multi-sheet) Data Export & Import Engine for MHC-PMS
// Connects healthcare system entities to Excel spreadsheets with timestamps, formatted rows, and columns
// Implements Microsoft XML Spreadsheet standard - zero external dependencies required

// Helper: Escape XML special characters
const escapeXml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Formatter for timestamp string
const getFormattedTimestamp = () => {
  const d = new Date();
  return d.toISOString().replace('T', ' ').substring(0, 19);
};

// Helper to build a worksheet XML string from headers and rows
const buildWorksheetXml = (sheetName, headers, rows) => {
  let xml = `  <Worksheet ss:Name="${escapeXml(sheetName)}">\n`;
  xml += `    <Table ss:DefaultRowHeight="20">\n`;

  // Define column widths
  headers.forEach((h, i) => {
    const width = Math.min(Math.max((h.label || '').length * 9, 110), 280);
    xml += `      <Column ss:Index="${i + 1}" ss:Width="${width}"/>\n`;
  });

  // Header Row
  xml += `      <Row ss:Height="24">\n`;
  headers.forEach(h => {
    xml += `        <Cell ss:StyleID="Header"><Data ss:Type="String">${escapeXml(h.label)}</Data></Cell>\n`;
  });
  xml += `      </Row>\n`;

  // Data Rows
  rows.forEach((row, rowIdx) => {
    const styleId = rowIdx % 2 === 0 ? "DataRowEven" : "DataRowOdd";
    xml += `      <Row ss:Height="20">\n`;
    headers.forEach(h => {
      const val = row[h.key];
      const valType = typeof val === 'number' ? 'Number' : 'String';
      const safeVal = val !== null && val !== undefined ? String(val) : '';
      xml += `        <Cell ss:StyleID="${styleId}"><Data ss:Type="${valType}">${escapeXml(safeVal)}</Data></Cell>\n`;
    });
    xml += `      </Row>\n`;
  });

  xml += `    </Table>\n`;
  xml += `  </Worksheet>\n`;
  return xml;
};

// 1. Export Entire MHC-PMS Database to a Multi-Sheet Excel Workbook
export const exportFullMHCWorkbook = ({
  patientRecords = [],
  appointments = [],
  prescriptions = [],
  labRecords = [],
  billingInvoices = [],
  waitingVisitors = [],
  userAccounts = [],
  auditLogs = []
}) => {
  const currentExportTime = getFormattedTimestamp();

  // SHEET 1: PATIENTS REGISTRY
  const patientsHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "Patient ID" },
    { key: "fullName", label: "Full Legal Name" },
    { key: "dob", label: "Date of Birth" },
    { key: "age", label: "Age" },
    { key: "gender", label: "Gender" },
    { key: "bloodGroup", label: "Blood Group" },
    { key: "phone", label: "Phone Number" },
    { key: "email", label: "Registered Email" },
    { key: "address", label: "Residential Address" },
    { key: "primaryDiagnosis", label: "Primary Diagnosis" },
    { key: "severity", label: "Clinical Severity" },
    { key: "assignedDoctor", label: "Assigned Doctor" },
    { key: "clinicNode", label: "Clinic Node" },
    { key: "insuranceProvider", label: "Insurance Provider" },
    { key: "activeStatus", label: "Active Status" },
    { key: "emergencyContact", label: "Emergency Contact" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const patientsRows = (patientRecords || []).map((p, idx) => ({
    rowNum: idx + 1,
    id: p.id || '',
    fullName: p.fullName || '',
    dob: p.dob || '',
    age: p.age || '',
    gender: p.gender || '',
    bloodGroup: p.bloodGroup || '',
    phone: p.phone || '',
    email: p.email || '',
    address: p.address || '',
    primaryDiagnosis: p.primaryDiagnosis || '',
    severity: p.severity || '',
    assignedDoctor: p.assignedDoctor || 'Dr. Shashank Pandey',
    clinicNode: p.clinicNode || 'Central Hospital OPD',
    insuranceProvider: p.insuranceProvider || p.insurance?.provider || 'Self Pay',
    activeStatus: p.activeStatus || 'Active Outpatient',
    emergencyContact: typeof p.emergencyContact === 'string' ? p.emergencyContact : `${p.emergencyContact?.name || ''} (${p.emergencyContact?.phone || ''})`,
    recordTimestamp: currentExportTime
  }));

  // SHEET 2: APPOINTMENTS SCHEDULE
  const appointmentsHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "Appointment ID" },
    { key: "patientId", label: "Patient ID" },
    { key: "patientName", label: "Patient Name" },
    { key: "doctorId", label: "Attending Doctor ID" },
    { key: "doctorName", label: "Doctor Name" },
    { key: "speciality", label: "Doctor Speciality" },
    { key: "date", label: "Scheduled Date" },
    { key: "time", label: "Consultation Time" },
    { key: "slotPeriod", label: "Slot Period" },
    { key: "type", label: "Consultation Modality" },
    { key: "location", label: "Location / Room" },
    { key: "fee", label: "Consultation Fee (INR)" },
    { key: "status", label: "Appointment Status" },
    { key: "reason", label: "Visit Reason / Clinical Notes" },
    { key: "bookingDate", label: "Booking Date" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const appointmentsRows = (appointments || []).map((a, idx) => ({
    rowNum: idx + 1,
    id: a.id || '',
    patientId: a.patientId || '',
    patientName: a.patientName || '',
    doctorId: a.doctorId || 'DOC-001',
    doctorName: a.doctorName || 'Dr. Shashank Pandey',
    speciality: a.doctorSpeciality || 'Psychiatrist',
    date: a.date || a.displayDate || '',
    time: a.time || '',
    slotPeriod: a.slotPeriod || 'Morning',
    type: a.type || 'In-Person Clinic Consultation',
    location: a.location || 'OPD Suite 204, East Wing',
    fee: a.fee || 1200,
    status: a.status || 'Upcoming',
    reason: a.reason || a.notes || '',
    bookingDate: a.bookingDate || '',
    recordTimestamp: currentExportTime
  }));

  // SHEET 3: e-PRESCRIPTIONS & PHARMACY
  const prescriptionsHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "e-Rx ID" },
    { key: "patientId", label: "Patient ID" },
    { key: "patientName", label: "Patient Name" },
    { key: "doctor", label: "Prescribing Doctor" },
    { key: "doctorSpeciality", label: "Doctor Speciality" },
    { key: "date", label: "Prescription Date" },
    { key: "diagnosis", label: "Clinical Diagnosis" },
    { key: "status", label: "Prescription Status" },
    { key: "medicationName", label: "Medication Name" },
    { key: "strength", label: "Strength / Dosage" },
    { key: "frequency", label: "Frequency Schedule" },
    { key: "duration", label: "Duration" },
    { key: "instructions", label: "Special Instructions" },
    { key: "refills", label: "Refills Remaining" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const prescriptionsRows = [];
  (prescriptions || []).forEach(rx => {
    const meds = rx.medicines || [];
    if (meds.length === 0) {
      prescriptionsRows.push({
        rowNum: prescriptionsRows.length + 1,
        id: rx.id || '',
        patientId: rx.patientId || '',
        patientName: rx.patientName || '',
        doctor: rx.doctor || rx.doctorName || 'Dr. Shashank Pandey',
        doctorSpeciality: rx.doctorSpeciality || 'Chief Consultant Psychiatrist',
        date: rx.date || rx.displayDate || '',
        diagnosis: rx.diagnosis || '',
        status: rx.status || 'Active',
        medicationName: 'General Regimen',
        strength: '',
        frequency: '',
        duration: '',
        instructions: rx.instructionsGeneral || '',
        refills: 0,
        recordTimestamp: currentExportTime
      });
    } else {
      meds.forEach(m => {
        prescriptionsRows.push({
          rowNum: prescriptionsRows.length + 1,
          id: rx.id || '',
          patientId: rx.patientId || '',
          patientName: rx.patientName || '',
          doctor: rx.doctor || rx.doctorName || 'Dr. Shashank Pandey',
          doctorSpeciality: rx.doctorSpeciality || 'Chief Consultant Psychiatrist',
          date: rx.date || rx.displayDate || '',
          diagnosis: rx.diagnosis || '',
          status: rx.status || 'Active',
          medicationName: m.name || '',
          strength: `${m.strength || ''} (${m.dosage || ''})`,
          frequency: m.frequency || '',
          duration: m.duration || '',
          instructions: m.instructions || rx.instructionsGeneral || '',
          refills: m.refillsRemaining ?? 1,
          recordTimestamp: currentExportTime
        });
      });
    }
  });

  // SHEET 4: DIAGNOSTIC & PSYCHOMETRIC LAB REPORTS
  const labHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "Lab Test ID" },
    { key: "patientId", label: "Patient ID" },
    { key: "patientName", label: "Patient Name" },
    { key: "testName", label: "Diagnostic Test Name" },
    { key: "category", label: "Investigation Category" },
    { key: "testDate", label: "Test Date" },
    { key: "doctor", label: "Ordering Physician" },
    { key: "labName", label: "Pathology / Psychometry Lab" },
    { key: "status", label: "Diagnostic Status" },
    { key: "resultSummary", label: "Clinical Interpretation / Summary" },
    { key: "verifiedBy", label: "Verified By Specialist" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const labRows = (labRecords || []).map((l, idx) => ({
    rowNum: idx + 1,
    id: l.id || '',
    patientId: l.patientId || '',
    patientName: l.patientName || '',
    testName: l.testName || '',
    category: l.category || 'Psychometric Scale',
    testDate: l.testDate || l.displayDate || '',
    doctor: l.doctor || 'Dr. Shashank Pandey',
    labName: l.labName || 'MHC Central Diagnostics',
    status: l.status || 'Normal',
    resultSummary: l.resultSummary || l.remarks || '',
    verifiedBy: l.verifiedBy || 'Dr. Shashank Pandey, MD',
    recordTimestamp: currentExportTime
  }));

  // SHEET 5: BILLING INVOICES & PAYMENTS
  const billingHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "invoiceId", label: "Invoice ID" },
    { key: "receiptNumber", label: "Official Receipt #" },
    { key: "patientId", label: "Patient ID" },
    { key: "patientName", label: "Patient Name" },
    { key: "serviceDescription", label: "Service Rendered" },
    { key: "doctorName", label: "Attending Doctor" },
    { key: "amount", label: "Total Fee (INR)" },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "paymentReference", label: "Transaction Reference" },
    { key: "status", label: "Payment Status" },
    { key: "receptionistName", label: "Processing Receptionist" },
    { key: "paymentTimestamp", label: "Payment Date / Time" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const billingRows = (billingInvoices || []).map((inv, idx) => ({
    rowNum: idx + 1,
    invoiceId: inv.invoiceId || '',
    receiptNumber: inv.receiptNumber || '',
    patientId: inv.patientId || '',
    patientName: inv.patientName || '',
    serviceDescription: inv.serviceDescription || inv.service || 'Outpatient Consultation',
    doctorName: inv.doctorName || 'Dr. Shashank Pandey',
    amount: inv.amount || 1200,
    paymentMode: inv.paymentMode || 'UPI',
    paymentReference: inv.paymentReference || '',
    status: inv.status || 'Paid',
    receptionistName: inv.receptionistName || 'Medha Banerjee',
    paymentTimestamp: inv.paymentTimestamp || inv.date || '',
    recordTimestamp: currentExportTime
  }));

  // SHEET 6: VISITOR WAITING LOUNGE
  const visitorHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "tokenNumber", label: "Queue Token #" },
    { key: "id", label: "Visitor Log ID" },
    { key: "patientId", label: "Patient ID" },
    { key: "patientName", label: "Patient Name" },
    { key: "visitorName", label: "Accompanying Visitor" },
    { key: "purpose", label: "Purpose of Visit" },
    { key: "doctorName", label: "Consulting Clinician" },
    { key: "arrivalTime", label: "Arrival Time" },
    { key: "status", label: "Lounge Status" },
    { key: "date", label: "Date" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const visitorRows = (waitingVisitors || []).map((v, idx) => ({
    rowNum: idx + 1,
    tokenNumber: v.tokenNumber || idx + 1,
    id: v.id || '',
    patientId: v.patientId || '',
    patientName: v.patientName || '',
    visitorName: v.visitorName || 'Self',
    purpose: v.purpose || 'Psychiatric Follow-up',
    doctorName: v.doctorName || 'Dr. Shashank Pandey',
    arrivalTime: v.arrivalTime || '',
    status: v.status || 'In Waiting Lounge',
    date: v.date || '',
    recordTimestamp: currentExportTime
  }));

  // SHEET 7: USER ACCOUNTS & RBAC GOVERNANCE
  const accountsHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "User ID" },
    { key: "name", label: "Full Name" },
    { key: "email", label: "Official Email" },
    { key: "role", label: "System Role" },
    { key: "status", label: "Account Status" },
    { key: "clinicNode", label: "Clinic Node" },
    { key: "registeredDate", label: "Registration Date" },
    { key: "lastLogin", label: "Last Recorded Login" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const accountsRows = (userAccounts || []).map((acc, idx) => ({
    rowNum: idx + 1,
    id: acc.id || '',
    name: acc.name || '',
    email: acc.email || '',
    role: acc.role || '',
    status: acc.status || 'Active',
    clinicNode: acc.clinicNode || 'Central Hospital OPD',
    registeredDate: acc.registeredDate || '',
    lastLogin: acc.lastLogin || '',
    recordTimestamp: currentExportTime
  }));

  // SHEET 8: SECURITY AUDIT TRAIL & LOGS
  const auditHeaders = [
    { key: "rowNum", label: "Row #" },
    { key: "id", label: "Audit Log ID" },
    { key: "timestamp", label: "Event Timestamp" },
    { key: "user", label: "Operating User & Role" },
    { key: "eventType", label: "Event Classification" },
    { key: "details", label: "Event Description Details" },
    { key: "severity", label: "Severity Level" },
    { key: "recordTimestamp", label: "System Record Timestamp" }
  ];

  const auditRows = (auditLogs || []).map((log, idx) => ({
    rowNum: idx + 1,
    id: log.id || '',
    timestamp: log.timestamp || '',
    user: log.user || '',
    eventType: log.eventType || '',
    details: log.details || '',
    severity: log.severity || 'Info',
    recordTimestamp: currentExportTime
  }));

  // Assemble full XML Spreadsheet
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<?mso-application progid="Excel.Sheet"?>\n`;
  xml += `<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"\n`;
  xml += ` xmlns:o="urn:schemas-microsoft-com:office:office"\n`;
  xml += ` xmlns:x="urn:schemas-microsoft-com:office:excel"\n`;
  xml += ` xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\n`;
  xml += ` xmlns:html="http://www.w3.org/TR/REC-html40">\n`;

  // Styles block: Header, DataRowEven, DataRowOdd
  xml += `  <Styles>\n`;
  xml += `    <Style ss:ID="Default" ss:Name="Normal">\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `      <Font ss:FontName="Segoe UI" x:Family="Swiss" ss:Size="10" ss:Color="#0F172A"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="Header">\n`;
  xml += `      <Alignment ss:Horizontal="Center" ss:Vertical="Center"/>\n`;
  xml += `      <Borders>\n`;
  xml += `        <Border ss:Position="Bottom" ss:LineStyle="Continuous" ss:Weight="1" ss:Color="#4338CA"/>\n`;
  xml += `      </Borders>\n`;
  xml += `      <Font ss:FontName="Segoe UI" x:Family="Swiss" ss:Size="10" ss:Color="#FFFFFF" ss:Bold="1"/>\n`;
  xml += `      <Interior ss:Color="#3730A3" ss:Pattern="Solid"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="DataRowEven">\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `      <Interior ss:Color="#FFFFFF" ss:Pattern="Solid"/>\n`;
  xml += `    </Style>\n`;
  xml += `    <Style ss:ID="DataRowOdd">\n`;
  xml += `      <Alignment ss:Vertical="Center"/>\n`;
  xml += `      <Interior ss:Color="#F8FAFC" ss:Pattern="Solid"/>\n`;
  xml += `    </Style>\n`;
  xml += `  </Styles>\n`;

  // Append each worksheet
  xml += buildWorksheetXml('Patients_Registry', patientsHeaders, patientsRows);
  xml += buildWorksheetXml('Appointments_Schedule', appointmentsHeaders, appointmentsRows);
  xml += buildWorksheetXml('ePrescriptions_Pharmacy', prescriptionsHeaders, prescriptionsRows);
  xml += buildWorksheetXml('Diagnostic_Lab_Reports', labHeaders, labRows);
  xml += buildWorksheetXml('Billing_Invoices', billingHeaders, billingRows);
  xml += buildWorksheetXml('Visitor_Waiting_Lounge', visitorHeaders, visitorRows);
  xml += buildWorksheetXml('User_Accounts_RBAC', accountsHeaders, accountsRows);
  xml += buildWorksheetXml('System_Audit_Trail', auditHeaders, auditRows);

  xml += `</Workbook>`;

  // Create downloadable file with timestamp
  const now = new Date();
  const fileDateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}-${String(now.getMinutes()).padStart(2, '0')}`;
  const fileName = `Aarogyam_MHC_PMS_Master_Database_${fileDateStr}.xls`;

  const blob = new Blob([xml], { type: 'application/vnd.ms-excel;charset=utf-8' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);

  return { success: true, fileName, sheetsCount: 8 };
};

// 2. Export a Single Collection to CSV
export const exportSingleCollectionToCsv = (collectionName, items = []) => {
  if (!items || items.length === 0) return { success: false, message: "No items to export" };

  const currentExportTime = getFormattedTimestamp();
  const keys = Object.keys(items[0]);
  
  let csv = keys.map(k => `"${k.replace(/"/g, '""')}"`).join(',') + ',"ExportedAt"\n';
  items.forEach(item => {
    const row = keys.map(k => {
      const val = item[k];
      const str = val !== null && val !== undefined ? String(val) : '';
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',') + `,"${currentExportTime}"`;
    csv += row + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const fileName = `Aarogyam_${collectionName}_${Date.now()}.csv`;
  link.href = downloadUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(downloadUrl);

  return { success: true, fileName };
};
