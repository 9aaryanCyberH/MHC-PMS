import React, { useState } from 'react';
import { 
  Stethoscope, 
  Calendar, 
  Clock, 
  User, 
  FileText, 
  Pill, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle, 
  Edit3, 
  Activity, 
  FlaskConical, 
  ChevronRight, 
  Search, 
  Save, 
  X,
  AlertTriangle,
  ShieldAlert,
  Brain,
  FileCheck,
  ArrowRightLeft,
  Sparkles,
  Heart,
  TrendingDown,
  Building
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DoctorClinicalView = () => {
  const { 
    doctorProfile, 
    updateDoctorProfile, 
    appointments, 
    medicalRecords, 
    prescriptions, 
    addNewPrescription, 
    updatePrescription,
    labRecords, 
    orderLabTest,
    patientRecordsList,
    patientRiskAlerts,
    updatePatientRiskAlert,
    switchRoleWithLogout,
    activeTab,
    setActiveTab,
    showToast
  } = useApp();

  // Synchronize internal subtab with sidebar activeTab
  const currentSubTab = activeTab && activeTab.startsWith('doc-') 
    ? activeTab.replace('doc-', '') 
    : 'queue';

  const setCurrentSubTab = (tabId) => {
    setActiveTab('doc-' + tabId);
  };
  const [selectedPatientId, setSelectedPatientId] = useState('PT-88204');
  const [queueStatusFilter, setQueueStatusFilter] = useState('All');

  // 1. New / Update Prescription Modal State
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [editingRxId, setEditingRxId] = useState(null);
  const [rxForm, setRxForm] = useState({
    patientId: 'PT-88204',
    patientName: 'Aaryan Kumar',
    medicineName: '',
    category: 'Antidepressant (SSRI)',
    dosage: '50mg',
    frequency: 'Once Daily (Morning after breakfast)',
    duration: '30 Days',
    instructions: 'Take consistently with water. Do not discontinue abruptly.',
    refills: 1
  });

  // 2. Order Lab / Psychometric Test Modal State
  const [isOrderLabModalOpen, setIsOrderLabModalOpen] = useState(false);
  const [labOrderForm, setLabOrderForm] = useState({
    patientId: 'PT-88204',
    patientName: 'Aaryan Kumar',
    testName: 'PHQ-9 (Patient Health Questionnaire - 9 Item)',
    category: 'Psychometric Assessment Scale',
    urgency: 'Routine Evaluation',
    clinicalRationale: 'Bi-weekly psychometric monitoring for depressive and anxiety symptomatology.'
  });

  // 3. Clinical Risk Alert Modal State
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);
  const [riskForm, setRiskForm] = useState({
    patientId: 'PT-88204',
    patientName: 'Aaryan Kumar',
    riskLevel: 'Low',
    alertType: 'Affective Symptom Review',
    summary: 'Mild performance anxiety noted; no self-harm ideation reported.',
    actionPlan: 'Continue current psychopharmacology; review CBT progress in 2 weeks.'
  });

  // 4. Edit Doctor Profile Modal State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: doctorProfile?.fullName || 'Dr. Shashank Pandey',
    title: doctorProfile?.title || 'Senior Consultant Psychiatrist',
    qualifications: doctorProfile?.qualifications || 'MBBS, MD (Psychiatry), DPM, FIPS',
    consultationFee: doctorProfile?.consultationFee || 1200,
    opdRoom: doctorProfile?.opdRoom || 'OPD Suite 204, East Wing',
    schedule: doctorProfile?.schedule || 'Monday to Saturday, 09:00 AM - 02:00 PM',
    bio: doctorProfile?.bio || 'Senior consultant psychiatrist with extensive experience in affective mood disorders.'
  });

  // Currently selected patient record
  const currentPatient = (patientRecordsList || []).find(p => p.id === selectedPatientId) || patientRecordsList?.[0] || {
    id: "PT-88204",
    fullName: "Aaryan Kumar",
    age: 21,
    gender: "Male",
    bloodGroup: "A+",
    phone: "+91 98765 43210",
    primaryDiagnosis: "Generalized Anxiety Disorder (GAD)",
    severity: "Mild to Moderate"
  };

  // Filter appointments for this doctor
  const doctorAppointments = appointments.filter(apt => {
    const isDoc = apt.doctorId === doctorProfile?.id || apt.doctorName?.includes('Shashank') || apt.doctorId === 'DOC-001';
    const isStatus = queueStatusFilter === 'All' || apt.status === queueStatusFilter;
    return isDoc && isStatus;
  });

  const handleCreatePrescription = (e) => {
    e.preventDefault();
    if (!rxForm.medicineName || !rxForm.dosage) {
      showToast('Please enter both medication name and dosage.', 'error');
      return;
    }
    if (editingRxId) {
      updatePrescription(editingRxId, rxForm);
      setEditingRxId(null);
    } else {
      addNewPrescription(rxForm);
    }
    setIsRxModalOpen(false);
    setRxForm({
      patientId: currentPatient.id,
      patientName: currentPatient.fullName,
      medicineName: '',
      category: 'Antidepressant (SSRI)',
      dosage: '50mg',
      frequency: 'Once Daily (Morning after breakfast)',
      duration: '30 Days',
      instructions: 'Take consistently with water. Do not discontinue abruptly.',
      refills: 1
    });
  };

  const handleOpenEditPrescription = (rx) => {
    setEditingRxId(rx.id);
    setRxForm({
      patientId: rx.patientId || currentPatient.id,
      patientName: rx.patientName || currentPatient.fullName,
      medicineName: rx.medicineName || (rx.medicines && rx.medicines[0]?.name) || '',
      category: rx.category || 'Antidepressant (SSRI)',
      dosage: rx.dosage || (rx.medicines && rx.medicines[0]?.dosage) || '50mg',
      frequency: rx.frequency || (rx.medicines && rx.medicines[0]?.instructions) || 'Once Daily',
      duration: rx.duration || '30 Days',
      instructions: rx.instructions || 'Take consistently with water.',
      refills: rx.refills || 1
    });
    setIsRxModalOpen(true);
  };

  const handleOrderLab = (e) => {
    e.preventDefault();
    orderLabTest(labOrderForm);
    setIsOrderLabModalOpen(false);
  };

  const handleSaveRiskAlert = (e) => {
    e.preventDefault();
    updatePatientRiskAlert(riskForm);
    setIsRiskModalOpen(false);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateDoctorProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  const doctorTabs = [
    { id: 'queue', label: 'Consultation Queue', icon: Clock, count: doctorAppointments.length },
    { id: 'patients', label: 'Psychiatric EHR & Summaries', icon: FileText, count: patientRecordsList?.length || 0 },
    { id: 'prescriptions', label: 'e-Prescribing (e-Rx)', icon: Pill, count: prescriptions.length },
    { id: 'labs', label: 'Psychometric & Lab Scales', icon: FlaskConical, count: labRecords.length },
    { id: 'alerts', label: 'Health Risk Alerts', icon: ShieldAlert, count: patientRiskAlerts?.length || 0, highlight: true },
    { id: 'speciality', label: 'My Speciality Profile', icon: Stethoscope }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Doctor Clinician Identity Hero Card */}
      <div className="bg-linear-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-emerald-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <img 
              src={doctorProfile?.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300'} 
              alt={doctorProfile?.fullName || 'Doctor'}
              className="w-18 h-18 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  {doctorProfile?.role || 'Doctor'} • {doctorProfile?.id || 'DOC-001'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Clinical Consultation Suite Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {doctorProfile?.fullName || 'Dr. Shashank Pandey'}
              </h2>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                {doctorProfile?.title || 'Senior Consultant Psychiatrist'} • {doctorProfile?.department || 'Adult Psychiatry & Neuropsychiatry'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {doctorProfile?.opdRoom || 'OPD Suite 204, East Wing'} • Fee: ₹{doctorProfile?.consultationFee || 1200}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setRxForm(prev => ({ ...prev, patientName: currentPatient.fullName, patientId: currentPatient.id }));
                setIsRxModalOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Pill className="w-4 h-4" />
              <span>Write e-Prescription</span>
            </button>
            <button
              onClick={() => {
                setLabOrderForm(prev => ({ ...prev, patientName: currentPatient.fullName, patientId: currentPatient.id }));
                setIsOrderLabModalOpen(true);
              }}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-teal-600 hover:bg-teal-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Order Lab Test</span>
            </button>
            <button
              onClick={() => switchRoleWithLogout('patient')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-emerald-300" />
              <span>Switch Role</span>
            </button>
          </div>
        </div>

        {/* Quick Clinical Highlights */}
        <div className="mt-5 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Today's Patients</p>
            <p className="text-lg font-black text-white mt-0.5">{doctorAppointments.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Prescriptions</p>
            <p className="text-lg font-black text-emerald-300 mt-0.5">{prescriptions.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Diagnostic Orders</p>
            <p className="text-lg font-black text-teal-300 mt-0.5">{labRecords.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Risk Alerts Flagged</p>
            <p className="text-lg font-black text-rose-300 mt-0.5">{patientRiskAlerts?.filter(r => r.riskLevel === 'High').length || 1} High</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
        {doctorTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive 
                  ? 'bg-emerald-600 text-white shadow-sm' 
                  : tab.highlight
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: CONSULTATION QUEUE */}
      {/* ========================================================================= */}
      {currentSubTab === 'queue' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinician Consultation Queue</h3>
              <p className="text-xs text-slate-500">Scheduled patients for today, triage statuses, and quick action buttons</p>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={queueStatusFilter}
                onChange={(e) => setQueueStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
              >
                <option value="All">All Queue</option>
                <option value="Upcoming">Upcoming / In Waiting</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Token / ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Slot & Time</th>
                  <th className="py-3 px-4">Consultation Reason</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Clinical Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {doctorAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-emerald-700 font-mono">{apt.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{apt.patientName || 'Aaryan Kumar'}</p>
                      <p className="text-[10px] text-slate-400">{apt.type}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-800">{apt.time}</span>
                      <span className="text-[11px] text-slate-400 block">{apt.displayDate || apt.date}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs truncate text-slate-600">
                      {apt.reason || 'Routine psychiatric assessment and prescription check'}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        apt.status === 'Upcoming' ? 'bg-sky-100 text-sky-800' :
                        apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedPatientId('PT-88204');
                            setCurrentSubTab('patients');
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition cursor-pointer"
                        >
                          Open EHR
                        </button>
                        <button
                          onClick={() => {
                            setRxForm(prev => ({ ...prev, patientName: apt.patientName || 'Aaryan Kumar' }));
                            setIsRxModalOpen(true);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition cursor-pointer"
                        >
                          Prescribe
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: PSYCHIATRIC EHR & SUMMARIES */}
      {/* ========================================================================= */}
      {currentSubTab === 'patients' && (
        <div className="space-y-6">
          {/* Patient Selector Pills */}
          <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider shrink-0">Select Outpatient:</span>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(patientRecordsList || []).map(p => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPatientId(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    currentPatient.id === p.id 
                      ? 'bg-emerald-600 text-white shadow-xs' 
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {p.fullName} ({p.id})
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Active Clinical Record
                  </span>
                  <span className="text-xs text-slate-400 font-mono">ID: {currentPatient.id}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{currentPatient.fullName}</h3>
                <p className="text-xs text-slate-500">
                  {currentPatient.age} Yrs • {currentPatient.gender} • Blood Group: {currentPatient.bloodGroup} • {currentPatient.phone}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setRiskForm({
                      patientId: currentPatient.id,
                      patientName: currentPatient.fullName,
                      riskLevel: 'Low',
                      alertType: 'Affective Symptom Review',
                      summary: `Clinical review for ${currentPatient.fullName}`,
                      actionPlan: 'Routine monitoring'
                    });
                    setIsRiskModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Update Risk Alert</span>
                </button>
                <button
                  onClick={() => {
                    setRxForm(prev => ({ ...prev, patientName: currentPatient.fullName, patientId: currentPatient.id }));
                    setIsRxModalOpen(true);
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Pill className="w-3.5 h-3.5" />
                  <span>e-Prescribe</span>
                </button>
              </div>
            </div>

            {/* Vitals & Clinical Summaries */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Blood Pressure</p>
                <p className="text-sm font-black text-slate-800 mt-0.5">{medicalRecords.vitals.bloodPressure}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Resting Heart Rate</p>
                <p className="text-sm font-black text-emerald-700 mt-0.5">{medicalRecords.vitals.heartRate}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">BMI & Weight</p>
                <p className="text-sm font-black text-slate-800 mt-0.5">{medicalRecords.vitals.weight} ({medicalRecords.vitals.bmi})</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Primary Diagnosis</p>
                <p className="text-xs font-bold text-indigo-700 truncate mt-0.5">{currentPatient.primaryDiagnosis}</p>
              </div>
            </div>

            {/* Diagnoses & Treatment Plan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-indigo-600" />
                  <span>Clinical Psychiatric Assessment</span>
                </h4>
                {medicalRecords.diagnoses.map((d, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/60 text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{d.title}</span>
                      <span className="text-[10px] font-mono text-slate-400">{d.code}</span>
                    </div>
                    <p className="text-[11px] text-slate-600">{d.summary}</p>
                    <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded inline-block">
                      {d.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-600" />
                  <span>Allergies & Contraindications</span>
                </h4>
                {medicalRecords.allergies.map((al, i) => (
                  <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/60 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-rose-900">{al.substance} ({al.type})</p>
                      <p className="text-[11px] text-slate-500">{al.reaction}</p>
                    </div>
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                      {al.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: E-PRESCRIBING (E-RX) */}
      {/* ========================================================================= */}
      {currentSubTab === 'prescriptions' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Psychopharmacology & e-Prescription Records</h3>
              <p className="text-xs text-slate-500">Issue signed e-prescriptions with dosage, course, and medication instructions</p>
            </div>

            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Pill className="w-3.5 h-3.5" />
              <span>Write e-Prescription</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Rx ID</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Medication & Category</th>
                  <th className="py-3 px-4">Dosage & Regimen</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Prescribed Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Clinical Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {prescriptions.map(rx => (
                  <tr key={rx.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-emerald-700 font-mono">{rx.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{rx.patientName || 'Aaryan Kumar'}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{rx.medicineName}</p>
                      <span className="text-[10px] text-indigo-700 font-semibold">{rx.category}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{rx.dosage}</p>
                      <p className="text-[11px] text-slate-400">{rx.frequency}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{rx.duration}</td>
                    <td className="py-3 px-4 text-slate-500">{rx.displayDate || rx.date}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                        {rx.status || 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => handleOpenEditPrescription(rx)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Update Treatment</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: PSYCHOMETRIC & DIAGNOSTIC LABS */}
      {/* ========================================================================= */}
      {currentSubTab === 'labs' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Psychometric Scales & Laboratory Diagnostics</h3>
              <p className="text-xs text-slate-500">Review evaluated depression, anxiety, EEG, and toxicology profiles or place new orders</p>
            </div>

            <button
              onClick={() => setIsOrderLabModalOpen(true)}
              className="px-3.5 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <FlaskConical className="w-3.5 h-3.5" />
              <span>Order Diagnostic Test</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labRecords.map(lab => (
              <div key={lab.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-xs transition space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {lab.id}
                  </span>
                  <span className="text-[10px] text-slate-400">{lab.displayDate || lab.date}</span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{lab.testName}</h4>
                  <p className="text-[11px] text-slate-500">{lab.category} • Ordered for: <strong>{lab.patientName || 'Aaryan Kumar'}</strong></p>
                </div>
                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-500">Score / Assessment:</span>
                    <span className="font-bold text-teal-800">{lab.score}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 italic">"{lab.interpretation}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: PATIENT HEALTH RISK ALERTS & CONTINUOUS MONITORING */}
      {/* ========================================================================= */}
      {currentSubTab === 'alerts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Patient Risk Monitoring & Triage Alerts</h3>
              <p className="text-xs text-slate-500">Continuous clinical safety surveillance for suicide risk, adverse drug effects, and non-adherence</p>
            </div>

            <button
              onClick={() => setIsRiskModalOpen(true)}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Flag / Update Clinical Alert</span>
            </button>
          </div>

          <div className="space-y-3">
            {patientRiskAlerts.map(alert => (
              <div 
                key={alert.id} 
                className={`p-4 rounded-2xl border transition ${
                  alert.riskLevel === 'High' ? 'bg-rose-50/60 border-rose-200' :
                  alert.riskLevel === 'Moderate' ? 'bg-amber-50/60 border-amber-200' :
                  'bg-slate-50/80 border-slate-200'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-black/5">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      alert.riskLevel === 'High' ? 'bg-rose-600 text-white' :
                      alert.riskLevel === 'Moderate' ? 'bg-amber-600 text-white' :
                      'bg-emerald-600 text-white'
                    }`}>
                      {alert.riskLevel} Risk
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{alert.patientName} ({alert.patientId})</h4>
                  </div>
                  <span className="text-[11px] text-slate-500">Evaluated: {alert.lastEvaluated} by {alert.evaluatedBy}</span>
                </div>

                <div className="mt-2 space-y-1 text-xs">
                  <p className="font-semibold text-slate-800">{alert.alertType}</p>
                  <p className="text-slate-600">{alert.summary}</p>
                  <div className="mt-2 p-2.5 rounded-xl bg-white/80 border border-black/5">
                    <span className="font-bold text-slate-700">Clinical Protocol / Action Plan: </span>
                    <span className="text-slate-600">{alert.actionPlan}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 6: DOCTOR SPECIALITY & CLINICAL INFORMATION */}
      {/* ========================================================================= */}
      {currentSubTab === 'speciality' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Physician Credentials & Consultation Speciality</h3>
              <p className="text-xs text-slate-500">Manage board qualifications, consultation timings, clinical fee, and biography</p>
            </div>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Speciality Info</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Specialist Designations</p>
              <p className="text-sm font-bold text-slate-900">{doctorProfile?.fullName}</p>
              <p className="text-emerald-700 font-semibold">{doctorProfile?.title}</p>
              <p className="text-slate-600">{doctorProfile?.qualifications}</p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-2">
              <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Practice Details</p>
              <p className="text-slate-800">OPD Location: <strong>{doctorProfile?.opdRoom}</strong></p>
              <p className="text-slate-800">Consultation Fee: <strong>₹{doctorProfile?.consultationFee}</strong></p>
              <p className="text-slate-600">{doctorProfile?.schedule}</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 space-y-1 text-xs">
            <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">Clinical Biography & Philosophy</p>
            <p className="text-slate-700 leading-relaxed">{doctorProfile?.bio}</p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: WRITE E-PRESCRIBING (E-RX) */}
      {/* ========================================================================= */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">{editingRxId ? 'Update Prescription & Treatment Regimen' : 'Sign & Issue e-Prescription (e-Rx)'}</h3>
              </div>
              <button 
                onClick={() => setIsRxModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={rxForm.patientName}
                    onChange={(e) => setRxForm({ ...rxForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Drug Category</label>
                  <select
                    value={rxForm.category}
                    onChange={(e) => setRxForm({ ...rxForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                  >
                    <option value="Antidepressant (SSRI)">Antidepressant (SSRI)</option>
                    <option value="Antidepressant (SNRI)">Antidepressant (SNRI)</option>
                    <option value="Mood Stabilizer">Mood Stabilizer</option>
                    <option value="Anxiolytic / Benzodiazepine">Anxiolytic / Benzodiazepine</option>
                    <option value="Atypical Antipsychotic">Atypical Antipsychotic</option>
                    <option value="Hypnotic / Sleep Restorative">Hypnotic / Sleep Restorative</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Medication Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sertraline Hydrochloride"
                    value={rxForm.medicineName}
                    onChange={(e) => setRxForm({ ...rxForm, medicineName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50mg"
                    value={rxForm.dosage}
                    onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={rxForm.frequency}
                    onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Duration</label>
                  <input
                    type="text"
                    value={rxForm.duration}
                    onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Special Clinical Instructions</label>
                <textarea
                  rows={2}
                  value={rxForm.instructions}
                  onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRxModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  {editingRxId ? 'Save Updated Treatment' : 'Sign & Issue e-Rx'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ORDER LAB / PSYCHOMETRIC TEST */}
      {/* ========================================================================= */}
      {isOrderLabModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-teal-600" />
                <h3 className="text-base font-bold text-slate-900">Order Diagnostic / Psychometric Test</h3>
              </div>
              <button onClick={() => setIsOrderLabModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleOrderLab} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Patient *</label>
                <input
                  type="text"
                  required
                  value={labOrderForm.patientName}
                  onChange={(e) => setLabOrderForm({ ...labOrderForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Diagnostic Test / Scale *</label>
                <select
                  value={labOrderForm.testName}
                  onChange={(e) => setLabOrderForm({ ...labOrderForm, testName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-hidden bg-white"
                >
                  <option value="PHQ-9 (Patient Health Questionnaire - 9 Item)">PHQ-9 Depression Scale</option>
                  <option value="GAD-7 (Generalized Anxiety Disorder 7-Item)">GAD-7 Anxiety Scale</option>
                  <option value="BDI-II (Beck Depression Inventory)">BDI-II (Beck Depression Inventory)</option>
                  <option value="Serum Lithium Level Assay">Serum Lithium Level Assay</option>
                  <option value="Comprehensive Thyroid Panel (TSH/FT3/FT4)">Comprehensive Thyroid Panel</option>
                  <option value="Quantitative EEG (qEEG) Brain Mapping">Quantitative EEG Brain Mapping</option>
                  <option value="Brain Magnetic Resonance Imaging (MRI)">Brain MRI (Volumetric Analysis)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Rationale & Instructions</label>
                <textarea
                  rows={2}
                  value={labOrderForm.clinicalRationale}
                  onChange={(e) => setLabOrderForm({ ...labOrderForm, clinicalRationale: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOrderLabModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-teal-600 hover:bg-teal-700 rounded-xl shadow-xs"
                >
                  Confirm Lab Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CLINICAL RISK ALERT UPDATE */}
      {/* ========================================================================= */}
      {isRiskModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-bold text-slate-900">Flag / Update Health Risk Alert</h3>
              </div>
              <button onClick={() => setIsRiskModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveRiskAlert} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    value={riskForm.patientName}
                    onChange={(e) => setRiskForm({ ...riskForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Risk Severity Level *</label>
                  <select
                    value={riskForm.riskLevel}
                    onChange={(e) => setRiskForm({ ...riskForm, riskLevel: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:outline-hidden bg-white font-bold"
                  >
                    <option value="Low">Low Risk</option>
                    <option value="Moderate">Moderate Risk</option>
                    <option value="High">High / Critical Risk</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alert Classification *</label>
                <select
                  value={riskForm.alertType}
                  onChange={(e) => setRiskForm({ ...riskForm, alertType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:outline-hidden bg-white"
                >
                  <option value="Suicide / Self-Harm Risk Flag">Suicide / Self-Harm Risk Flag</option>
                  <option value="Medication Non-Adherence & Relapse">Medication Non-Adherence & Relapse</option>
                  <option value="Adverse Drug Reaction / Toxicity">Adverse Drug Reaction / Toxicity</option>
                  <option value="Acute Panic / Agoraphobia Crisis">Acute Panic / Agoraphobia Crisis</option>
                  <option value="Substance Induced Agitation">Substance Induced Agitation</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Observation *</label>
                <textarea
                  rows={2}
                  required
                  value={riskForm.summary}
                  onChange={(e) => setRiskForm({ ...riskForm, summary: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Intervention Protocol</label>
                <textarea
                  rows={2}
                  value={riskForm.actionPlan}
                  onChange={(e) => setRiskForm({ ...riskForm, actionPlan: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRiskModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs"
                >
                  Save Alert Flag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: EDIT DOCTOR PROFILE & SPECIALITY */}
      {/* ========================================================================= */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Edit Speciality & Clinical Information</h3>
              </div>
              <button onClick={() => setIsEditProfileOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Speciality Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={profileForm.consultationFee}
                    onChange={(e) => setProfileForm({ ...profileForm, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">OPD Location Room</label>
                  <input
                    type="text"
                    value={profileForm.opdRoom}
                    onChange={(e) => setProfileForm({ ...profileForm, opdRoom: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Medical Degrees & Qualifications</label>
                <input
                  type="text"
                  value={profileForm.qualifications}
                  onChange={(e) => setProfileForm({ ...profileForm, qualifications: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Biography</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
