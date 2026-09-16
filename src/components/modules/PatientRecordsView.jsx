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
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const PatientRecordsView = () => {
  const { patientProfile, medicalRecords, patientRecordsList, currentRole, showToast } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState(patientProfile?.id || 'PT-88204');
  const [adminSearch, setAdminSearch] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');

  // Find selected patient record from list or fallback safely to patientProfile
  const matchedRecord = (patientRecordsList || []).find(p => p.id === selectedPatientId);
  const activeDisplayPatient = {
    ...patientProfile,
    ...(matchedRecord || {}),
    emergencyContact: matchedRecord?.emergencyContact || patientProfile?.emergencyContact || { name: 'Sunita Kumar', relationship: 'Mother', phone: '+91 98765 11223' },
    insurance: matchedRecord?.insurance || patientProfile?.insurance || { provider: 'Star Health Care', policyNo: 'SH-8892-01A' },
    avatar: matchedRecord?.avatar || patientProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  };

  // Filtered patients for System Admin Central Registry table
  const filteredCentralRecords = (patientRecordsList || []).filter(p => {
    const matchesSearch = p.fullName.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          p.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
                          p.primaryDiagnosis.toLowerCase().includes(adminSearch.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || p.severity?.toLowerCase().includes(severityFilter.toLowerCase());
    return matchesSearch && matchesSeverity;
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    showToast(`Medical Summary exported to PDF (MHC-${activeDisplayPatient.id}-Summary.pdf)`, 'success');
  };

  const handleExportCentralDatabase = () => {
    showToast('Exporting Central Health Informatics Database (CSV/JSON). Download initiated!', 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* 1. Header with Role-Specific Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              {currentRole === 'admin' ? 'Central Health Informatics' : 'Electronic Health Records'}
            </Badge>
            <span className="text-xs text-slate-500 font-medium">
              {currentRole === 'admin' ? 'Enterprise Master Patient Index' : 'Confidential Patient File'}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            {currentRole === 'admin' ? 'Central EHR Records & Informatics Database' : 'Patient Medical Records'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {currentRole === 'admin' 
              ? 'Centralized clinical electronic health records repository synchronized across all distributed hospital nodes and psychiatric clinics.'
              : 'Verified electronic health records, active psychiatric diagnoses, allergies, and therapeutic care timelines.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentRole === 'admin' ? (
            <button
              onClick={handleExportCentralDatabase}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 shadow-xs hover:bg-indigo-700 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Export Central Registry (CSV)</span>
            </button>
          ) : (
            <button
              onClick={handleDownloadSummary}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-600" />
              <span>Export Records</span>
            </button>
          )}
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* 2. System Admin Central Registry Telemetry Banner */}
      {currentRole === 'admin' && (
        <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 border border-indigo-900/40 shadow-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">Central Master Patient Index (MPI)</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Live Cluster Synced
                  </span>
                </div>
                <p className="text-xs text-indigo-200/80">Enterprise healthcare data store • DISHA & Mental Health Act statutory compliance active</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Encryption: AES-256 GCM</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Patient Files</span>
              <p className="text-lg font-black text-white mt-0.5">{patientRecordsList?.length || 4} Profiles</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Active Clinic Nodes</span>
              <p className="text-lg font-black text-emerald-300 mt-0.5">4 Distributed</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Audit Integrity</span>
              <p className="text-lg font-black text-indigo-300 mt-0.5">100% Immutable</p>
            </div>
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Compliance Standard</span>
              <p className="text-lg font-black text-amber-300 mt-0.5">MHA 2017 Sec 89-94</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. System Admin Central Registry Table */}
      {currentRole === 'admin' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Central Outpatient EHR Index</h3>
              <p className="text-xs text-slate-500">Query and inspect patient clinical files stored across all centralized hospital nodes</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patient name, ID, diagnosis..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden w-52 sm:w-64"
                />
              </div>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
              >
                <option value="All">All Severities</option>
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Full Name & Demographic</th>
                  <th className="py-3 px-4">Blood Group</th>
                  <th className="py-3 px-4">Primary Psychiatric Diagnosis</th>
                  <th className="py-3 px-4">Severity / Status</th>
                  <th className="py-3 px-4">Emergency Contact</th>
                  <th className="py-3 px-4 text-right">Informatics Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredCentralRecords.map(p => {
                  const isSelected = selectedPatientId === p.id;
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50/70 transition ${isSelected ? 'bg-indigo-50/50' : ''}`}>
                      <td className="py-3 px-4 font-mono font-bold text-indigo-700">{p.id}</td>
                      <td className="py-3 px-4">
                        <p className="font-bold text-slate-900">{p.fullName}</p>
                        <p className="text-[11px] text-slate-400">{p.age} Yrs • {p.gender} • {p.phone}</p>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-800">{p.bloodGroup}</td>
                      <td className="py-3 px-4 max-w-xs truncate text-slate-800 font-medium">
                        {p.primaryDiagnosis}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          p.severity?.includes('Severe') ? 'bg-rose-100 text-rose-800' :
                          p.severity?.includes('Moderate') ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {p.severity || 'Stable'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 text-[11px]">
                        <p className="font-medium text-slate-800">{p.emergencyContact?.name || 'Primary Guardian'}</p>
                        <p className="text-slate-400">{p.emergencyContact?.phone || p.phone}</p>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => {
                            setSelectedPatientId(p.id);
                            showToast(`Inspecting clinical EHR for ${p.fullName} (${p.id})`);
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ml-auto cursor-pointer ${
                            isSelected 
                              ? 'bg-indigo-600 text-white shadow-xs' 
                              : 'bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200'
                          }`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{isSelected ? 'Active Record' : 'Inspect File'}</span>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. Role-Specific Outpatient Selector for Doctor / Receptionist */}
      {currentRole !== 'patient' && currentRole !== 'admin' && (
        <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
            <User className="w-4 h-4 text-indigo-600" />
            <span>Select Outpatient Record ({currentRole === 'doctor' ? 'Clinical Assessment' : 'Front Desk Registry'}):</span>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {(patientRecordsList || []).map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPatientId(p.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                  selectedPatientId === p.id 
                    ? 'bg-indigo-600 text-white shadow-xs' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {p.fullName} ({p.id})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 5. Demographic & Vitals Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Overview */}
          <div className="flex items-start gap-4">
            <img
              src={activeDisplayPatient.avatar}
              alt={activeDisplayPatient.fullName}
              className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">{activeDisplayPatient.fullName}</h3>
                <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                  {activeDisplayPatient.id}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {activeDisplayPatient.displayDob || (activeDisplayPatient.age ? `${activeDisplayPatient.age} Yrs (${activeDisplayPatient.gender})` : '21 Yrs')} • Blood: {activeDisplayPatient.bloodGroup}
              </p>
              <div className="mt-2 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>{activeDisplayPatient.phone}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span className="truncate">{activeDisplayPatient.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact & Insurance */}
          <div className="space-y-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div>
              <span className="text-slate-400 font-medium text-[11px] block">Emergency Contact:</span>
              <p className="font-bold text-slate-800 mt-0.5">
                {activeDisplayPatient.emergencyContact?.name} ({activeDisplayPatient.emergencyContact?.relationship})
              </p>
              <p className="text-slate-600">{activeDisplayPatient.emergencyContact?.phone}</p>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-slate-400 font-medium text-[11px] block">Medical Insurance:</span>
              <p className="font-semibold text-slate-800 mt-0.5">{activeDisplayPatient.insurance?.provider}</p>
              <p className="text-slate-500 font-mono text-[11px]">Policy: {activeDisplayPatient.insurance?.policyNo}</p>
            </div>
          </div>

          {/* Clinical Vitals */}
          <div className="space-y-2 text-xs bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100">
            <div className="flex items-center justify-between pb-1 border-b border-indigo-200/60">
              <span className="text-xs font-bold text-indigo-950 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-indigo-600" />
                Latest Clinical Vitals
              </span>
              <span className="text-[10px] text-indigo-700">{medicalRecords.vitals.lastRecorded}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-[10px] text-slate-500 block">Blood Pressure:</span>
                <span className="font-bold text-slate-800 text-sm">{medicalRecords.vitals.bloodPressure}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Heart Rate:</span>
                <span className="font-bold text-slate-800 text-sm">{medicalRecords.vitals.heartRate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">BMI & Weight:</span>
                <span className="font-semibold text-slate-800">{medicalRecords.vitals.bmi} ({medicalRecords.vitals.weight})</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block">Triage Assessor:</span>
                <span className="font-medium text-slate-700">{medicalRecords.vitals.recordedBy}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Diagnoses Section */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Clinical Diagnoses</h3>
              <p className="text-[11px] text-slate-500">ICD-10 psychiatric diagnostic classification</p>
            </div>
          </div>
          <Badge variant="purple">{medicalRecords.diagnoses.length} Active Records</Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalRecords.diagnoses.map((diag, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {diag.code}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">{diag.title}</h4>
                </div>
                <Badge variant="success" className="text-[10px]">{diag.status}</Badge>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed bg-white p-2.5 rounded-xl border border-slate-100">
                {diag.summary}
              </p>
              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
                <span>Diagnosed by: <strong>{diag.diagnosedBy}</strong></span>
                <span>Date: {diag.diagnosedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 7. Allergies & Sensitivities */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Documented Allergies & Drug Adverse Reactions</h3>
              <p className="text-[11px] text-slate-500">Flagged safety warnings during prescription issuance</p>
            </div>
          </div>
          <Badge variant="danger">{medicalRecords.allergies.length} Flagged</Badge>
        </div>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {medicalRecords.allergies.map((allergy, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-200/80 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  {allergy.type}
                </span>
                <h4 className="text-xs font-bold text-rose-950 mt-1">{allergy.substance}</h4>
                <p className="text-[11px] text-rose-700 mt-0.5">Reaction: {allergy.reaction}</p>
              </div>
              <span className="text-[10px] font-bold text-rose-800 bg-white px-2 py-1 rounded-lg border border-rose-200">
                {allergy.severity}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Care & Clinical History Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Clinical History & Encounter Timeline</h3>
              <p className="text-[11px] text-slate-500">Chronological psychiatric notes and interventions</p>
            </div>
          </div>
        </div>

        <div className="mt-6 relative pl-6 border-l-2 border-indigo-100 space-y-6">
          {medicalRecords.clinicalHistory.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-white border-2 border-indigo-600 group-hover:bg-indigo-600 transition-colors" />
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 hover:bg-white hover:shadow-xs transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-xs font-bold text-slate-900">{item.event}</h4>
                  <span className="text-[10px] font-semibold text-slate-400">{item.date}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{item.notes}</p>
                <div className="pt-1 flex items-center gap-1.5 text-[11px] text-indigo-600 font-medium">
                  <Stethoscope className="w-3 h-3" />
                  <span>{item.provider}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
