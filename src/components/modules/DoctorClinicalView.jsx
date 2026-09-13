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
  ExternalLink,
  Save,
  X
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
    labRecords, 
    patientProfile,
    activeTab,
    setActiveTab,
    showToast
  } = useApp();

  // Internal tab: 'queue' | 'patients' | 'prescriptions' | 'speciality' | 'labs'
  const [currentSubTab, setCurrentSubTab] = useState('queue');

  // New Prescription Modal State
  const [isRxModalOpen, setIsRxModalOpen] = useState(false);
  const [rxForm, setRxForm] = useState({
    patientId: patientProfile.id,
    patientName: patientProfile.fullName,
    medicineName: '',
    category: 'Antidepressant',
    dosage: '',
    frequency: 'Once Daily (Morning after food)',
    duration: '30 Days',
    instructions: 'Take consistently with water. Do not discontinue abruptly.',
    refills: 1
  });

  // Edit Doctor Profile Modal State
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    fullName: doctorProfile.fullName,
    title: doctorProfile.title,
    qualifications: doctorProfile.qualifications,
    consultationFee: doctorProfile.consultationFee,
    opdRoom: doctorProfile.opdRoom,
    schedule: doctorProfile.schedule,
    bio: doctorProfile.bio
  });

  // Filter appointments for this doctor (DOC-001 or all)
  const doctorAppointments = appointments.filter(
    apt => apt.doctorId === doctorProfile.id || apt.doctorName.includes('Shashank')
  );

  const handleCreatePrescription = (e) => {
    e.preventDefault();
    if (!rxForm.medicineName || !rxForm.dosage) {
      showToast('Please enter both medication name and dosage.', 'error');
      return;
    }
    addNewPrescription(rxForm);
    setIsRxModalOpen(false);
    setRxForm({
      patientId: patientProfile.id,
      patientName: patientProfile.fullName,
      medicineName: '',
      category: 'Antidepressant',
      dosage: '',
      frequency: 'Once Daily (Morning after food)',
      duration: '30 Days',
      instructions: 'Take consistently with water. Do not discontinue abruptly.',
      refills: 1
    });
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    updateDoctorProfile(profileForm);
    setIsEditProfileOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Clinician Profile Hero Card */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img 
              src={doctorProfile.avatar} 
              alt={doctorProfile.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {doctorProfile.role} • {doctorProfile.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  On-Duty Consulting
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {doctorProfile.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/80">
                {doctorProfile.title} • {doctorProfile.qualifications}
              </p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-2">
                <span>{doctorProfile.opdRoom}</span>
                <span>•</span>
                <span>Consultation Fee: ₹{doctorProfile.consultationFee}</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Update Speciality & Info</span>
            </button>
            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Write Prescription</span>
            </button>
          </div>
        </div>

        {/* Quick Stats Strip */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Today</p>
            <p className="text-xl font-black text-white mt-0.5">{doctorAppointments.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Assigned Patients</p>
            <p className="text-xl font-black text-indigo-300 mt-0.5">28</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Active Prescriptions</p>
            <p className="text-xl font-black text-emerald-300 mt-0.5">{prescriptions.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Lab Reviews Pending</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{labRecords.length}</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: 'queue', label: 'Consultation Queue', icon: Clock },
          { id: 'patients', label: 'Assigned Patients (EHR)', icon: User },
          { id: 'prescriptions', label: 'Clinical Prescriptions', icon: Pill },
          { id: 'labs', label: 'Diagnostic Lab Reviews', icon: FlaskConical },
          { id: 'speciality', label: 'Speciality & OPD Details', icon: Stethoscope }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Consultation Queue */}
      {currentSubTab === 'queue' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Today's Consultation Schedule</h3>
              <p className="text-xs text-slate-500">Confirmed patient consultations assigned to {doctorProfile.fullName}</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              {doctorAppointments.length} Consultations
            </span>
          </div>

          <div className="space-y-3">
            {doctorAppointments.map(apt => (
              <div 
                key={apt.id}
                className="p-4 rounded-2xl border border-slate-200/70 hover:border-indigo-300 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm shrink-0">
                    {apt.time.split(' ')[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-800">{apt.id}</span>
                      <span className="text-[11px] px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-medium">
                        {apt.status}
                      </span>
                      <span className="text-xs text-slate-400">• {apt.type}</span>
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                      Patient: {patientProfile.fullName} <span className="text-xs font-normal text-slate-500">({patientProfile.id})</span>
                    </h4>
                    <p className="text-xs text-slate-600 mt-1">
                      <strong>Clinical Reason:</strong> {apt.reason}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setCurrentSubTab('patients')}
                    className="px-3 py-1.5 text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer"
                  >
                    View History
                  </button>
                  <button
                    onClick={() => setIsRxModalOpen(true)}
                    className="px-3 py-1.5 text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition shadow-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Pill className="w-3.5 h-3.5" />
                    <span>Prescribe</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Assigned Patients (EHR) */}
      {currentSubTab === 'patients' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Psychiatric Medical Records — {patientProfile.fullName}</h3>
              <p className="text-xs text-slate-500">Patient ID: {patientProfile.id} • Age: {patientProfile.age || 21} • Blood Group: {patientProfile.bloodGroup || 'A+'} • Attending: {doctorProfile.fullName}</p>
            </div>
            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition flex items-center gap-1.5 self-start cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Add Clinical Prescription</span>
            </button>
          </div>

          {/* Vitals Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 bg-indigo-50/60 rounded-2xl border border-indigo-100">
              <p className="text-[11px] font-semibold text-indigo-700">Blood Pressure</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{medicalRecords.vitals.bloodPressure}</p>
              <p className="text-[10px] text-slate-500">Normal Range</p>
            </div>
            <div className="p-3.5 bg-rose-50/60 rounded-2xl border border-rose-100">
              <p className="text-[11px] font-semibold text-rose-700">Resting Heart Rate</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{medicalRecords.vitals.heartRate}</p>
              <p className="text-[10px] text-slate-500">Slight resting tachycardia</p>
            </div>
            <div className="p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100">
              <p className="text-[11px] font-semibold text-emerald-700">Body Mass Index</p>
              <p className="text-lg font-bold text-slate-900 mt-0.5">{medicalRecords.vitals.bmi}</p>
              <p className="text-[10px] text-slate-500">Optimal BMI</p>
            </div>
            <div className="p-3.5 bg-amber-50/60 rounded-2xl border border-amber-100">
              <p className="text-[11px] font-semibold text-amber-700">Active Diagnosis</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">{medicalRecords.diagnoses[0].code}</p>
              <p className="text-[10px] text-slate-500 truncate">{medicalRecords.diagnoses[0].name}</p>
            </div>
          </div>

          {/* Clinical Encounter History */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Clinical Consultation Encounters</h4>
            <div className="space-y-3">
              {medicalRecords.previousConsultations.map(enc => (
                <div key={enc.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-indigo-700">{enc.doctor}</span>
                    <span className="text-xs text-slate-400">{enc.displayDate}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800">Primary Diagnosis: {enc.diagnosis}</p>
                  <p className="text-xs text-slate-600 mt-1">{enc.notes}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Clinical Prescriptions */}
      {currentSubTab === 'prescriptions' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Psychopharmacology & Treatment Regimens</h3>
              <p className="text-xs text-slate-500">Active medical prescriptions issued to patients</p>
            </div>
            <button
              onClick={() => setIsRxModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Issue New e-Rx</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Rx ID</th>
                  <th className="py-3 px-4">Medication</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Dosage</th>
                  <th className="py-3 px-4">Frequency</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {prescriptions.map(rx => (
                  <tr key={rx.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-indigo-600">{rx.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{rx.medicineName}</td>
                    <td className="py-3 px-4 text-slate-500">{rx.category}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{rx.dosage}</td>
                    <td className="py-3 px-4">{rx.frequency}</td>
                    <td className="py-3 px-4">{rx.duration}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                        {rx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 4: Diagnostic Labs */}
      {currentSubTab === 'labs' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Psychometric & Diagnostic Laboratory Reports</h3>
            <p className="text-xs text-slate-500">Evaluated psychological scales and biochemical profiles</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labRecords.map(report => (
              <div key={report.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md">
                    {report.category}
                  </span>
                  <span className="text-xs text-slate-400">{report.displayDate}</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{report.testName}</h4>
                  <p className="text-xs text-slate-500">{report.id} • Ref: {report.referringDoctor}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-xs">
                  <p className="font-semibold text-slate-700">Diagnostic Finding:</p>
                  <p className="text-slate-600 mt-0.5">{report.summary}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span>Sign-off: {report.pathologist}</span>
                  <span className="font-bold text-emerald-600">✓ Validated</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Speciality & OPD Details */}
      {currentSubTab === 'speciality' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinical Profile & Departmental Information</h3>
              <p className="text-xs text-slate-500">Public clinical directory details visible to patients</p>
            </div>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Credentials</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Doctor Name & Title</label>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{doctorProfile.fullName} ({doctorProfile.title})</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Academic Qualifications</label>
                <p className="text-sm text-slate-800 mt-0.5">{doctorProfile.qualifications}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Department</label>
                <p className="text-sm text-slate-800 mt-0.5">{doctorProfile.department}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Consultation Room</label>
                <p className="text-sm text-slate-800 mt-0.5">{doctorProfile.opdRoom}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-400">Consulting Hours</label>
                <p className="text-sm font-bold text-slate-900 mt-0.5">{doctorProfile.schedule}</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Standard Consultation Fee</label>
                <p className="text-sm font-bold text-indigo-600 mt-0.5">₹{doctorProfile.consultationFee} per session</p>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Speciality Focus Areas</label>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {doctorProfile.specialities.map((s, i) => (
                    <span key={i} className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-lg border border-slate-200/60">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-400">Biography</label>
                <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{doctorProfile.bio}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal 1: Write Prescription */}
      {isRxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Write Electronic Prescription</h3>
                  <p className="text-xs text-slate-500">Patient: {patientProfile.fullName} ({patientProfile.id})</p>
                </div>
              </div>
              <button 
                onClick={() => setIsRxModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePrescription} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Medicine / Molecule Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sertraline HCl"
                    value={rxForm.medicineName}
                    onChange={(e) => setRxForm({ ...rxForm, medicineName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Therapeutic Category</label>
                  <select
                    value={rxForm.category}
                    onChange={(e) => setRxForm({ ...rxForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Antidepressant">Antidepressant (SSRI/SNRI)</option>
                    <option value="Anxiolytic">Anxiolytic / Benzodiazepine</option>
                    <option value="Mood Stabilizer">Mood Stabilizer</option>
                    <option value="Antipsychotic">Atypical Antipsychotic</option>
                    <option value="Sleep Aid">Sedative / Hypnotic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 50 mg"
                    value={rxForm.dosage}
                    onChange={(e) => setRxForm({ ...rxForm, dosage: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <select
                    value={rxForm.frequency}
                    onChange={(e) => setRxForm({ ...rxForm, frequency: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Once Daily (Morning after food)">Once Daily (Morning)</option>
                    <option value="Once Daily (Bedtime)">Once Daily (Bedtime)</option>
                    <option value="Twice Daily (Morning & Evening)">Twice Daily (BD)</option>
                    <option value="As Needed for Acute Anxiety (SOS)">As Needed (SOS)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Course Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 30 Days"
                    value={rxForm.duration}
                    onChange={(e) => setRxForm({ ...rxForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Instructions</label>
                <textarea
                  rows={2}
                  value={rxForm.instructions}
                  onChange={(e) => setRxForm({ ...rxForm, instructions: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRxModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Sign & Issue Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Edit Doctor Profile */}
      {isEditProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Update Doctor Speciality & Information</h3>
                  <p className="text-xs text-slate-500">Edit clinical details published across MHC-PMS</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditProfileOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProfile} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileForm.fullName}
                    onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinical Title</label>
                  <input
                    type="text"
                    value={profileForm.title}
                    onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Qualifications</label>
                  <input
                    type="text"
                    value={profileForm.qualifications}
                    onChange={(e) => setProfileForm({ ...profileForm, qualifications: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={profileForm.consultationFee}
                    onChange={(e) => setProfileForm({ ...profileForm, consultationFee: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Room</label>
                  <input
                    type="text"
                    value={profileForm.opdRoom}
                    onChange={(e) => setProfileForm({ ...profileForm, opdRoom: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consulting Hours</label>
                  <input
                    type="text"
                    value={profileForm.schedule}
                    onChange={(e) => setProfileForm({ ...profileForm, schedule: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Professional Bio</label>
                <textarea
                  rows={3}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
