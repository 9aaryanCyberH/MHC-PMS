import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  User, 
  Activity, 
  AlertCircle, 
  Calendar, 
  ShieldAlert, 
  Clock, 
  Stethoscope, 
  CheckCircle2, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  FileText,
  Sparkles,
  Download,
  Printer,
  Search,
  Filter,
  Server,
  Database,
  ShieldCheck,
  Eye,
  PlusCircle,
  X,
  UserPlus,
  Cloud,
  RefreshCw,
  CreditCard,
  Pill,
  FlaskConical,
  UserCheck,
  Users,
  Shield,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const PatientRecordsView = () => {
  const { 
    patientProfile, 
    medicalRecords, 
    patientRecordsList, 
    addPatientRecord,
    currentRole, 
    showToast,
    appointments,
    prescriptions,
    labRecords,
    billingInvoices,
    waitingVisitors,
    userAccounts,
    systemAuditLogs,
    exportMasterDatabaseToExcel,
    exportCollectionToCsv,
    syncAllCollectionsToFirebase,
    firebaseSyncStatus,
    setActiveTab
  } = useApp();

  // Active Sheet Selector (Spreadsheet Tabs)
  const [activeSheet, setActiveSheet] = useState('patients'); // 'patients' | 'appointments' | 'prescriptions' | 'labs' | 'billing' | 'visitors' | 'accounts' | 'audit'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedPatientForModal, setSelectedPatientForModal] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Add Patient Modal State
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patientForm, setPatientForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '',
    email: '',
    address: 'Bengaluru, Karnataka',
    emergencyContact: '',
    primaryDiagnosis: 'Generalized Anxiety Disorder (GAD)',
    severity: 'Mild to Moderate',
    assignedDoctor: 'Dr. Shashank Pandey',
    clinicNode: 'Central Hospital OPD Hub'
  });

  const handleSyncToCloud = async () => {
    setIsSyncing(true);
    try {
      await syncAllCollectionsToFirebase();
    } finally {
      setTimeout(() => setIsSyncing(false), 600);
    }
  };

  const handleDownloadFullExcel = () => {
    setIsExporting(true);
    exportMasterDatabaseToExcel();
    setTimeout(() => setIsExporting(false), 700);
  };

  const handleCreatePatientSubmit = (e) => {
    e.preventDefault();
    if (!patientForm.fullName.trim() || !patientForm.phone.trim()) {
      showToast('Please enter both patient full legal name and contact number.', 'error');
      return;
    }
    const created = addPatientRecord ? addPatientRecord(patientForm) : null;
    if (created) {
      showToast(`Patient file created for ${created.fullName} (${created.id})!`, 'success');
    }
    setIsAddPatientModalOpen(false);
    setPatientForm({
      fullName: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '',
      email: '',
      address: 'Bengaluru, Karnataka',
      emergencyContact: '',
      primaryDiagnosis: 'Generalized Anxiety Disorder (GAD)',
      severity: 'Mild to Moderate',
      assignedDoctor: 'Dr. Shashank Pandey',
      clinicNode: 'Central Hospital OPD Hub'
    });
  };

  // Sheet Definitions with row counts
  const sheets = [
    { id: 'patients', name: 'Patients Registry', icon: Users, count: (patientRecordsList || []).length, exportName: 'Patients_Registry', data: patientRecordsList || [] },
    { id: 'appointments', name: 'Appointments Schedule', icon: Calendar, count: (appointments || []).length, exportName: 'Appointments_Schedule', data: appointments || [] },
    { id: 'prescriptions', name: 'e-Prescriptions', icon: Pill, count: (prescriptions || []).length, exportName: 'ePrescriptions_Pharmacy', data: prescriptions || [] },
    { id: 'labs', name: 'Diagnostic Lab Tests', icon: FlaskConical, count: (labRecords || []).length, exportName: 'Diagnostic_Lab_Reports', data: labRecords || [] },
    { id: 'billing', name: 'Billing & Invoices', icon: CreditCard, count: (billingInvoices || []).length, exportName: 'Billing_Invoices', data: billingInvoices || [] },
    { id: 'visitors', name: 'Visitor Lounge Log', icon: UserCheck, count: (waitingVisitors || []).length, exportName: 'Visitor_Lounge_Log', data: waitingVisitors || [] },
    ...(currentRole === 'admin' || currentRole === 'doctor' || currentRole === 'receptionist' ? [
      { id: 'accounts', name: 'User Access Directory', icon: Shield, count: (userAccounts || []).length, exportName: 'User_Accounts_Access', data: userAccounts || [] }
    ] : []),
    ...(currentRole === 'admin' ? [
      { id: 'audit', name: 'Security Audit Trail', icon: ShieldAlert, count: (systemAuditLogs || []).length, exportName: 'System_Audit_Trail', data: systemAuditLogs || [] }
    ] : [])
  ];

  const currentSheetObj = sheets.find(s => s.id === activeSheet) || sheets[0];

  const handleExportCurrentSheet = () => {
    exportCollectionToCsv(currentSheetObj.exportName, currentSheetObj.data);
  };

  // Helper search filter across all fields
  const cleanTerm = searchQuery.trim().toLowerCase();

  // Confidentiality Barrier: Outpatients are prohibited from accessing staff-wide raw EHR spreadsheets
  if (currentRole === 'patient') {
    return (
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center max-w-xl mx-auto space-y-4 my-10 shadow-xs animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center mx-auto shadow-2xs">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Confidential Hospital EHR Database</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          Master hospital electronic medical records and multi-sheet administrative spreadsheets are restricted to verified clinical specialists and front desk coordinators under Indian Mental Healthcare Act statutory privacy regulations.
        </p>
        <p className="text-xs text-slate-500">
          To view your personal digital e-prescriptions and diagnostic scale results, please proceed to your dedicated health record view.
        </p>
        <button
          onClick={() => setActiveTab('prescriptions-lab')}
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer shadow-xs"
        >
          View My Prescriptions &amp; Lab Reports
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-300 pb-12 font-sans">
      
      {/* ========================================================================= */}
      {/* 1. TOP SPREADSHEET EHR HEADER BANNER */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-5 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                <span>Central EHR Tabular Database</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                Connected Excel Engine (.xls / .xlsx)
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Google Cloud Firebase Active (Spark Free Tier)
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Electronic Health Records (EHR) Master Registry
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
              Live hospital clinical database displayed in multi-sheet spreadsheet format with explicit row timestamps, diagnoses, appointments, and prescriptions.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Sync with Cloud Firebase */}
            <button
              onClick={handleSyncToCloud}
              disabled={isSyncing}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-xs disabled:opacity-50"
              title="Synchronize all collections to Google Cloud Firebase"
            >
              <Cloud className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing to Cloud...' : 'Sync Database'}</span>
            </button>

            {/* Download Full Excel (.xls) */}
            <button
              onClick={handleDownloadFullExcel}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black transition cursor-pointer flex items-center gap-2 shadow-sm disabled:opacity-50"
              title="Download entire 8-sheet Excel Workbook"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
              <span>{isExporting ? 'Building Excel...' : 'Download Excel (.xls)'}</span>
            </button>

            {/* Export Current Sheet (CSV) */}
            <button
              onClick={handleExportCurrentSheet}
              className="px-3.5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              title="Export current active sheet to CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-600" />
              <span>Export Sheet (CSV)</span>
            </button>

            {/* Add Patient Button for Receptionist/Admin */}
            {(currentRole === 'receptionist' || currentRole === 'admin') && (
              <button
                onClick={() => setIsAddPatientModalOpen(true)}
                className="px-3.5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Patient Record</span>
              </button>
            )}

            {/* Print */}
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition cursor-pointer"
              title="Print table"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. EXCEL MULTI-SHEET TABS BAR */}
        {/* ========================================================================= */}
        <div className="pt-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            <span>Sheets:</span>
          </span>
          {sheets.map(sheet => {
            const Icon = sheet.icon;
            const isActive = activeSheet === sheet.id;
            return (
              <button
                key={sheet.id}
                onClick={() => {
                  setActiveSheet(sheet.id);
                  setSearchQuery('');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 shrink-0 border ${
                  isActive 
                    ? 'bg-slate-950 text-white border-slate-950 shadow-sm' 
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                <span>{sheet.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  isActive ? 'bg-amber-400 text-slate-950' : 'bg-slate-200 text-slate-600'
                }`}>
                  {sheet.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. LIVE SPREADSHEET TABLE CANVAS */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4">
        
        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-base font-black text-slate-900 tracking-tight">
              Worksheet: {currentSheetObj.name}
            </h3>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              ({currentSheetObj.count} total records • Synchronized with Google Cloud Firebase)
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search in ${currentSheetObj.name}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-slate-50/60 font-medium placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Tabular Spreadsheet Table Container */}
        <div className="overflow-x-auto rounded-2xl border border-slate-200/90 shadow-2xs">
          
          {/* SHEET 1: PATIENTS REGISTRY */}
          {activeSheet === 'patients' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Patient ID</th>
                  <th className="py-3 px-3.5 font-bold">Full Legal Name</th>
                  <th className="py-3 px-3.5 font-bold">Age / Gender</th>
                  <th className="py-3 px-3.5 font-bold">Blood Group</th>
                  <th className="py-3 px-3.5 font-bold">Phone Number</th>
                  <th className="py-3 px-3.5 font-bold">Primary Psychiatric Diagnosis</th>
                  <th className="py-3 px-3.5 font-bold">Severity</th>
                  <th className="py-3 px-3.5 font-bold">Assigned Doctor</th>
                  <th className="py-3 px-3.5 font-bold">Clinic Node</th>
                  <th className="py-3 px-3.5 font-bold">Record Timestamp</th>
                  <th className="py-3 px-3.5 text-right font-bold">Clinical File</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(patientRecordsList || [])
                  .filter(p => !cleanTerm || 
                    (p.fullName && p.fullName.toLowerCase().includes(cleanTerm)) ||
                    (p.id && p.id.toLowerCase().includes(cleanTerm)) ||
                    (p.phone && p.phone.includes(cleanTerm)) ||
                    (p.primaryDiagnosis && p.primaryDiagnosis.toLowerCase().includes(cleanTerm))
                  )
                  .map((p, idx) => (
                    <tr key={p.id} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-amber-900 bg-amber-50/50">{p.id}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{p.fullName}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">{p.age} Yrs • {p.gender}</td>
                      <td className="py-3 px-3.5 font-bold text-rose-700">{p.bloodGroup}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600">{p.phone}</td>
                      <td className="py-3 px-3.5 max-w-xs truncate text-slate-800 font-semibold">{p.primaryDiagnosis}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.severity?.includes('Severe') ? 'bg-rose-100 text-rose-800' :
                          p.severity?.includes('Moderate') ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.severity || 'Stable'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{p.assignedDoctor || 'Dr. Shashank Pandey'}</td>
                      <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">{p.clinicNode || 'Central Hospital OPD'}</td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {p.registeredDate ? `${p.registeredDate} 09:30:00` : '2026-09-18 10:00:00'}
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedPatientForModal(p)}
                          className="px-2.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg transition cursor-pointer flex items-center gap-1 ml-auto text-[11px] shadow-2xs"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect File</span>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 2: APPOINTMENTS SCHEDULE */}
          {activeSheet === 'appointments' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Booking ID</th>
                  <th className="py-3 px-3.5 font-bold">Patient Name</th>
                  <th className="py-3 px-3.5 font-bold">Patient ID</th>
                  <th className="py-3 px-3.5 font-bold">Attending Doctor</th>
                  <th className="py-3 px-3.5 font-bold">Date & Time Slot</th>
                  <th className="py-3 px-3.5 font-bold">Modality</th>
                  <th className="py-3 px-3.5 font-bold">Consultation Suite</th>
                  <th className="py-3 px-3.5 font-bold">Fee</th>
                  <th className="py-3 px-3.5 font-bold">Status</th>
                  <th className="py-3 px-3.5 font-bold">Clinical Reason</th>
                  <th className="py-3 px-3.5 font-bold">System Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(appointments || [])
                  .filter(a => !cleanTerm || 
                    (a.patientName && a.patientName.toLowerCase().includes(cleanTerm)) ||
                    (a.id && a.id.toLowerCase().includes(cleanTerm)) ||
                    (a.doctorName && a.doctorName.toLowerCase().includes(cleanTerm))
                  )
                  .map((a, idx) => (
                    <tr key={a.id} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-sky-800 bg-sky-50/50">{a.id}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{a.patientName}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-500">{a.patientId}</td>
                      <td className="py-3 px-3.5 text-slate-800 font-semibold whitespace-nowrap">{a.doctorName}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="font-bold">{a.displayDate || a.date}</span> at <span className="font-mono text-slate-600">{a.time}</span>
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-700">In-Person Clinic</td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{a.location || 'OPD Suite 204'}</td>
                      <td className="py-3 px-3.5 font-black text-emerald-800">₹{a.fee || 1200}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          a.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                          a.status === 'Cancelled' ? 'bg-rose-100 text-rose-800' :
                          'bg-amber-100 text-amber-900'
                        }`}>
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 max-w-xs truncate text-slate-600">{a.reason}</td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {a.bookingDate ? `${a.bookingDate} 10:15:00` : '2026-09-18 10:00:00'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 3: E-PRESCRIPTIONS */}
          {activeSheet === 'prescriptions' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Rx ID</th>
                  <th className="py-3 px-3.5 font-bold">Patient Name</th>
                  <th className="py-3 px-3.5 font-bold">Patient ID</th>
                  <th className="py-3 px-3.5 font-bold">Prescribing Clinician</th>
                  <th className="py-3 px-3.5 font-bold">Medication Name</th>
                  <th className="py-3 px-3.5 font-bold">Dosage & Frequency</th>
                  <th className="py-3 px-3.5 font-bold">Duration</th>
                  <th className="py-3 px-3.5 font-bold">Status</th>
                  <th className="py-3 px-3.5 font-bold">Instructions</th>
                  <th className="py-3 px-3.5 font-bold">Issued Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(prescriptions || [])
                  .filter(rx => !cleanTerm || 
                    (rx.patientName && rx.patientName.toLowerCase().includes(cleanTerm)) ||
                    (rx.medication && rx.medication.toLowerCase().includes(cleanTerm)) ||
                    (rx.id && rx.id.toLowerCase().includes(cleanTerm))
                  )
                  .map((rx, idx) => (
                    <tr key={rx.id} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-emerald-800 bg-emerald-50/50">{rx.id}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{rx.patientName}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-500">{rx.patientId}</td>
                      <td className="py-3 px-3.5 text-slate-700 whitespace-nowrap">{rx.doctorName || 'Dr. Shashank Pandey'}</td>
                      <td className="py-3 px-3.5 font-bold text-emerald-900 whitespace-nowrap">{rx.medication}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">{rx.dosage} ({rx.frequency})</td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{rx.duration}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {rx.status || 'Active Rx'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 max-w-xs truncate text-slate-600">{rx.instructions}</td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {rx.date ? `${rx.date} 09:12:05` : '2026-09-18 09:12:05'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 4: DIAGNOSTIC LAB TESTS */}
          {activeSheet === 'labs' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Test ID</th>
                  <th className="py-3 px-3.5 font-bold">Patient Name</th>
                  <th className="py-3 px-3.5 font-bold">Patient ID</th>
                  <th className="py-3 px-3.5 font-bold">Diagnostic Scale / Test Name</th>
                  <th className="py-3 px-3.5 font-bold">Category</th>
                  <th className="py-3 px-3.5 font-bold">Result / Score</th>
                  <th className="py-3 px-3.5 font-bold">Reference Range</th>
                  <th className="py-3 px-3.5 font-bold">Status</th>
                  <th className="py-3 px-3.5 font-bold">Accredited Laboratory</th>
                  <th className="py-3 px-3.5 font-bold">Test Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(labRecords || [])
                  .filter(l => !cleanTerm || 
                    (l.patientName && l.patientName.toLowerCase().includes(cleanTerm)) ||
                    (l.testName && l.testName.toLowerCase().includes(cleanTerm)) ||
                    (l.id && l.id.toLowerCase().includes(cleanTerm))
                  )
                  .map((l, idx) => (
                    <tr key={l.id} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-purple-900 bg-purple-50/50">{l.id}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{l.patientName}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-500">{l.patientId}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900">{l.testName}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{l.category}</td>
                      <td className="py-3 px-3.5 font-black text-purple-900 whitespace-nowrap">{l.value || l.score}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-500 whitespace-nowrap">{l.normalRange || 'N/A'}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {l.status || 'Verified'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{l.laboratory || 'Central Psychometrics Lab'}</td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {l.date ? `${l.date} 11:20:00` : '2026-09-18 11:20:00'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 5: BILLING & INVOICES */}
          {activeSheet === 'billing' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Invoice ID</th>
                  <th className="py-3 px-3.5 font-bold">Receipt No</th>
                  <th className="py-3 px-3.5 font-bold">Patient Name</th>
                  <th className="py-3 px-3.5 font-bold">Service Rendered</th>
                  <th className="py-3 px-3.5 font-bold">Amount</th>
                  <th className="py-3 px-3.5 font-bold">Payment Method</th>
                  <th className="py-3 px-3.5 font-bold">Payment Status</th>
                  <th className="py-3 px-3.5 font-bold">Issued Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(billingInvoices || [])
                  .filter(inv => !cleanTerm || 
                    (inv.patientName && inv.patientName.toLowerCase().includes(cleanTerm)) ||
                    (inv.invoiceId && inv.invoiceId.toLowerCase().includes(cleanTerm)) ||
                    (inv.service && inv.service.toLowerCase().includes(cleanTerm))
                  )
                  .map((inv, idx) => (
                    <tr key={inv.invoiceId || idx} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-amber-900 bg-amber-50/50">{inv.invoiceId}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600">{inv.receiptNumber}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{inv.patientName}</td>
                      <td className="py-3 px-3.5 text-slate-800 font-medium">{inv.service}</td>
                      <td className="py-3 px-3.5 font-black text-emerald-800">₹{inv.amount}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap text-slate-600">{inv.paymentMethod}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {inv.status || 'Paid'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {inv.date ? `${inv.date} 12:45:00` : '2026-09-18 12:45:00'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 6: VISITOR LOUNGE LOG */}
          {activeSheet === 'visitors' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Pass ID</th>
                  <th className="py-3 px-3.5 font-bold">Token #</th>
                  <th className="py-3 px-3.5 font-bold">Visitor / Patient Name</th>
                  <th className="py-3 px-3.5 font-bold">Accompanying Person</th>
                  <th className="py-3 px-3.5 font-bold">Contact Phone</th>
                  <th className="py-3 px-3.5 font-bold">Purpose of Visit</th>
                  <th className="py-3 px-3.5 font-bold">Check-in Time</th>
                  <th className="py-3 px-3.5 font-bold">Lounge Status</th>
                  <th className="py-3 px-3.5 font-bold">Entry Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(waitingVisitors || [])
                  .filter(v => !cleanTerm || 
                    (v.patientName && v.patientName.toLowerCase().includes(cleanTerm)) ||
                    (v.id && v.id.toLowerCase().includes(cleanTerm)) ||
                    (v.tokenNumber && String(v.tokenNumber).includes(cleanTerm))
                  )
                  .map((v, idx) => (
                    <tr key={v.id || idx} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-purple-900 bg-purple-50/50">{v.id}</td>
                      <td className="py-3 px-3.5 font-mono font-black text-amber-700 bg-amber-50/60 text-center">#{v.tokenNumber}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{v.patientName}</td>
                      <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{v.accompanyingPerson || 'Independent'}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600">{v.phone}</td>
                      <td className="py-3 px-3.5 text-slate-800 font-medium">{v.purpose}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600">{v.checkInTime}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          v.status === 'In Consultation' ? 'bg-emerald-100 text-emerald-800' :
                          v.status === 'Departed' ? 'bg-slate-100 text-slate-600' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        2026-09-18 {v.checkInTime}:00
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 7: USER ACCOUNTS DIRECTORY */}
          {activeSheet === 'accounts' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">User ID</th>
                  <th className="py-3 px-3.5 font-bold">Staff Member Name</th>
                  <th className="py-3 px-3.5 font-bold">Official Email</th>
                  <th className="py-3 px-3.5 font-bold">System Role</th>
                  <th className="py-3 px-3.5 font-bold">Assigned Clinic Node</th>
                  <th className="py-3 px-3.5 font-bold">Account Status</th>
                  <th className="py-3 px-3.5 font-bold">Registered Date</th>
                  <th className="py-3 px-3.5 font-bold">Last Activity Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(userAccounts || [])
                  .filter(u => !cleanTerm || 
                    (u.name && u.name.toLowerCase().includes(cleanTerm)) ||
                    (u.email && u.email.toLowerCase().includes(cleanTerm)) ||
                    (u.id && u.id.toLowerCase().includes(cleanTerm))
                  )
                  .map((u, idx) => (
                    <tr key={u.id} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-rose-900 bg-rose-50/50">{u.id}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{u.name}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600">{u.email}</td>
                      <td className="py-3 px-3.5 font-semibold text-slate-800 whitespace-nowrap">{u.role}</td>
                      <td className="py-3 px-3.5 text-slate-600 whitespace-nowrap">{u.clinicNode || 'Central Hospital OPD'}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-500 whitespace-nowrap">{u.registeredDate}</td>
                      <td className="py-3 px-3.5 font-mono text-[11px] text-slate-500 whitespace-nowrap">
                        {u.lastLogin || 'Today, 10:14:00'}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {/* SHEET 8: SECURITY AUDIT TRAIL */}
          {activeSheet === 'audit' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 text-slate-600 uppercase text-[10px] font-black tracking-wider border-b border-slate-200 sticky top-0">
                <tr>
                  <th className="py-3 px-3.5 w-12 text-center">Row #</th>
                  <th className="py-3 px-3.5 font-bold">Audit ID</th>
                  <th className="py-3 px-3.5 font-bold">Timestamp</th>
                  <th className="py-3 px-3.5 font-bold">Staff User Identity</th>
                  <th className="py-3 px-3.5 font-bold">Event Type</th>
                  <th className="py-3 px-3.5 font-bold">Severity</th>
                  <th className="py-3 px-3.5 font-bold">Audit Log Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {(systemAuditLogs || [])
                  .filter(log => !cleanTerm || 
                    (log.user && log.user.toLowerCase().includes(cleanTerm)) ||
                    (log.eventType && log.eventType.toLowerCase().includes(cleanTerm)) ||
                    (log.details && log.details.toLowerCase().includes(cleanTerm))
                  )
                  .map((log, idx) => (
                    <tr key={log.id || idx} className="hover:bg-amber-50/40 transition even:bg-slate-50/40">
                      <td className="py-3 px-3.5 text-center font-mono text-slate-400 font-bold">{idx + 1}</td>
                      <td className="py-3 px-3.5 font-mono font-bold text-slate-700 bg-slate-100">{log.id}</td>
                      <td className="py-3 px-3.5 font-mono text-slate-600 whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3 px-3.5 font-bold text-slate-900 whitespace-nowrap">{log.user}</td>
                      <td className="py-3 px-3.5 font-semibold text-slate-800 whitespace-nowrap">{log.eventType}</td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                          {log.severity || 'Info'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-slate-600">{log.details}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Spreadsheet Footer Status Bar */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-xs text-slate-500 font-medium">
          <div className="flex items-center gap-3">
            <span className="font-bold text-slate-700">Database Engine:</span>
            <span>Google Cloud Firestore + Microsoft XML Spreadsheet Specification</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Last Synced:</span>
            <span className="font-mono text-slate-700 font-bold">
              {firebaseSyncStatus?.lastSynced || 'Continuous Online Replication'}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. CLINICAL FILE INSPECTOR MODAL */}
      {/* ========================================================================= */}
      {selectedPatientForModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setSelectedPatientForModal(null)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 space-y-5">
              
              <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 font-black flex items-center justify-center text-lg shrink-0">
                    {selectedPatientForModal.fullName?.charAt(0) || 'P'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-slate-900">{selectedPatientForModal.fullName}</h3>
                      <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        {selectedPatientForModal.id}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {selectedPatientForModal.age} Years • {selectedPatientForModal.gender} • Blood Group: <strong className="text-rose-700">{selectedPatientForModal.bloodGroup}</strong>
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => setSelectedPatientForModal(null)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Patient Contact & Triage */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Contact Phone</p>
                  <p className="font-bold text-slate-800 mt-0.5 font-mono">{selectedPatientForModal.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Clinical Severity</p>
                  <p className="font-bold text-amber-800 mt-0.5">{selectedPatientForModal.severity || 'Mild to Moderate'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Assigned Doctor</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedPatientForModal.assignedDoctor || 'Dr. Shashank Pandey'}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Clinic Node</p>
                  <p className="font-bold text-slate-800 mt-0.5">{selectedPatientForModal.clinicNode || 'Central Hub'}</p>
                </div>
              </div>

              {/* Clinical Assessment */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-500" />
                  <span>Primary Psychiatric Diagnosis</span>
                </h4>
                <div className="p-3.5 bg-amber-50/50 rounded-2xl border border-amber-200/60 text-xs text-slate-800 font-medium">
                  {selectedPatientForModal.primaryDiagnosis}
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Emergency Contact on File</p>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {typeof selectedPatientForModal.emergencyContact === 'string'
                    ? selectedPatientForModal.emergencyContact
                    : selectedPatientForModal.emergencyContact?.name 
                    ? `${selectedPatientForModal.emergencyContact.name} (${selectedPatientForModal.emergencyContact.relationship || 'Guardian'}) - ${selectedPatientForModal.emergencyContact.phone || ''}`
                    : 'Emergency Contact Verified on File'}
                </p>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedPatientForModal(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition cursor-pointer"
                >
                  Close File
                </button>
                <button
                  onClick={() => {
                    showToast(`Printed clinical summary for ${selectedPatientForModal.fullName}`);
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. ADD PATIENT RECORD MODAL (FOR RECEPTION / ADMIN) */}
      {/* ========================================================================= */}
      {isAddPatientModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" onClick={() => setIsAddPatientModalOpen(false)} />
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="relative bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 z-10 animate-in zoom-in-95 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center">
                    <UserPlus className="w-5 h-5 text-amber-700" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900">Add Master Patient File</h3>
                    <p className="text-[11px] text-slate-500">Appends row directly into live spreadsheet and cloud database</p>
                  </div>
                </div>
                <button onClick={() => setIsAddPatientModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreatePatientSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Legal Name *</label>
                  <input
                    type="text"
                    required
                    value={patientForm.fullName}
                    onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                    placeholder="e.g. Sumanth Sen"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={patientForm.age}
                      onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                      placeholder="e.g. 28"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Gender</label>
                    <select
                      value={patientForm.gender}
                      onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-white"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Blood Group</label>
                    <select
                      value={patientForm.bloodGroup}
                      onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden bg-white"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                    <input
                      type="text"
                      required
                      value={patientForm.phone}
                      onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={patientForm.email}
                      onChange={(e) => setPatientForm({ ...patientForm, email: e.target.value })}
                      placeholder="patient@aarogyam.org"
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Primary Psychiatric Diagnosis</label>
                  <input
                    type="text"
                    value={patientForm.primaryDiagnosis}
                    onChange={(e) => setPatientForm({ ...patientForm, primaryDiagnosis: e.target.value })}
                    placeholder="e.g. Clinical Depression & Affective Disorder"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-400 focus:outline-hidden"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddPatientModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-xs cursor-pointer"
                  >
                    Insert Row into EHR
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
