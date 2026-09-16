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
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const PatientRecordsView = () => {
  const { patientProfile, medicalRecords, patientRecordsList, currentRole, showToast } = useApp();

  const [selectedPatientId, setSelectedPatientId] = useState(patientProfile?.id || 'PT-88204');
  const matchedRecord = (patientRecordsList || []).find(p => p.id === selectedPatientId);
  const activeDisplayPatient = {
    ...patientProfile,
    ...(matchedRecord || {}),
    emergencyContact: matchedRecord?.emergencyContact || activeDisplayPatient.emergencyContact,
    insurance: matchedRecord?.insurance || activeDisplayPatient.insurance,
    avatar: matchedRecord?.avatar || activeDisplayPatient.avatar
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSummary = () => {
    showToast('Medical Summary exported to PDF (MHC-PT-88204-Summary.pdf)');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              Electronic Health Records
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Confidential Patient File</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Medical Records
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Verified electronic health records, active psychiatric diagnoses, allergies, and therapeutic care timelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadSummary}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-indigo-600" />
            <span>Export Records</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 shadow-xs hover:bg-slate-50 transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-600" />
            <span>Print</span>
          </button>
        </div>
      </div>

            {/* Role-Specific Outpatient Selector for Doctor / Receptionist */}
      {currentRole !== 'patient' && (
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

      {/* Demographic & Vitals Banner */}
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
              <p className="text-xs text-slate-500 mt-0.5">{activeDisplayPatient.displayDob || (activeDisplayPatient.age ? `${activeDisplayPatient.age} Yrs (${activeDisplayPatient.gender})` : '21 Yrs')} • Blood: {activeDisplayPatient.bloodGroup}</p>
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
                {activeDisplayPatient.emergencyContact.name} ({activeDisplayPatient.emergencyContact.relationship})
              </p>
              <p className="text-slate-600">{activeDisplayPatient.emergencyContact.phone}</p>
            </div>
            <div className="pt-2 border-t border-slate-200/60">
              <span className="text-slate-400 font-medium text-[11px] block">Medical Insurance:</span>
              <p className="font-semibold text-slate-800 mt-0.5">{activeDisplayPatient.insurance.provider}</p>
              <p className="text-slate-500 font-mono text-[11px]">Policy: {activeDisplayPatient.insurance.policyNo}</p>
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

      {/* Diagnoses Section */}
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

      {/* Allergies & Sensitivities */}
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

      {/* Previous Consultations Table */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Previous Consultations & Clinical Visits</h3>
              <p className="text-[11px] text-slate-500">Historical encounter notes and doctor recommendations</p>
            </div>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/70 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4 rounded-l-xl">Date</th>
                <th className="py-3 px-4">Attending Doctor</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Clinical Progress Notes</th>
                <th className="py-3 px-4 rounded-r-xl">Recommended Follow-up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {medicalRecords.consultations.map((visit, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/40 transition">
                  <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">{visit.date}</td>
                  <td className="py-3.5 px-4 font-semibold text-indigo-800 whitespace-nowrap">{visit.doctor}</td>
                  <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">{visit.department}</td>
                  <td className="py-3.5 px-4 text-slate-700 max-w-xs">{visit.clinicalNotes}</td>
                  <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{visit.followUp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Treatment History Timeline */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Treatment Plan Progression</h3>
              <p className="text-[11px] text-slate-500">Phased mental health recovery trajectory</p>
            </div>
          </div>
        </div>

        <div className="mt-6 relative pl-6 sm:pl-8 border-l-2 border-indigo-200 space-y-6">
          {medicalRecords.treatments.map((treatment, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-5 h-5 rounded-full bg-indigo-600 border-4 border-white shadow-sm flex items-center justify-center text-white text-[10px]">
                {idx + 1}
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{treatment.phase}: {treatment.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500">{treatment.startDate} – {treatment.endDate}</span>
                    <Badge variant={treatment.progress.includes('Completed') ? 'success' : 'primary'}>
                      {treatment.progress}
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-slate-600 mt-2">
                  <span className="font-semibold text-slate-700">Key Milestones:</span> {treatment.goals}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
