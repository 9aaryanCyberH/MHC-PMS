import React, { useState } from 'react';
import { 
  FileText, 
  Pill, 
  FlaskConical, 
  Calendar, 
  User, 
  Printer, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Eye, 
  Clock, 
  ShieldCheck, 
  Stethoscope, 
  ChevronRight, 
  Sparkles 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const PrescriptionsLabView = () => {
  const { prescriptions, labRecords, patientProfile, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('prescriptions');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [selectedLabReport, setSelectedLabReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPrescriptions = prescriptions.filter(rx => 
    rx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    rx.medicines.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredLabs = labRecords.filter(lab =>
    lab.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = (filename) => {
    showToast(`Downloaded: ${filename}`);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              Clinical Pharmacy & Diagnostics
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Verified Records</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Prescriptions & Lab Records
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Access verified electronic prescriptions, drug schedules, pathology reports, and psychometric assessments.
          </p>
        </div>
      </div>

      {/* Tabs Switcher & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('prescriptions');
              setSearchQuery('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'prescriptions'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Pill className="w-4 h-4" />
            <span>Prescriptions</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'prescriptions' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {prescriptions.length}
            </span>
          </button>

          <button
            onClick={() => {
              setActiveTab('lab-records');
              setSearchQuery('');
            }}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeTab === 'lab-records'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>Lab & Diagnostic Records</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
              activeTab === 'lab-records' ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
            }`}>
              {labRecords.length}
            </span>
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={activeTab === 'prescriptions' ? "Search medicine, doctor, ID..." : "Search test, parameter..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* ======================= TAB 1: PRESCRIPTIONS ======================= */}
      {activeTab === 'prescriptions' && (
        <div className="space-y-4">
          {filteredPrescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-indigo-800 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200">
                      {rx.id}
                    </span>
                    <Badge variant={rx.status === 'Active' ? 'success' : 'default'}>
                      {rx.status}
                    </Badge>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                    Prescribed by: {rx.doctor}
                  </h3>
                  <p className="text-xs text-slate-500">{rx.doctorSpeciality} • Issued on {rx.date}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View Details</span>
                  </button>
                  <button
                    onClick={() => handleDownload(`${rx.id}-Prescription.pdf`)}
                    className="p-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                    title="Download Prescription PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Medicine Table inside Prescription card */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-2.5 px-3 rounded-l-lg">Medicine Name</th>
                      <th className="py-2.5 px-3">Dosage</th>
                      <th className="py-2.5 px-3">Frequency</th>
                      <th className="py-2.5 px-3">Duration</th>
                      <th className="py-2.5 px-3 rounded-r-lg">Special Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {rx.medicines.map((med, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/70">
                        <td className="py-3 px-3">
                          <span className="font-bold text-slate-800">{med.name}</span>
                          <span className="text-[10px] text-slate-500 block">{med.strength}</span>
                        </td>
                        <td className="py-3 px-3 font-semibold text-slate-700">{med.dosage}</td>
                        <td className="py-3 px-3 text-slate-600">{med.frequency}</td>
                        <td className="py-3 px-3 font-medium text-slate-800">{med.duration}</td>
                        <td className="py-3 px-3 text-slate-600 italic">{med.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rx.instructionsGeneral && (
                <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600">
                  <span className="font-semibold text-slate-800">Doctor's Clinical Advice:</span> {rx.instructionsGeneral}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ======================= TAB 2: LAB RECORDS ======================= */}
      {activeTab === 'lab-records' && (
        <div className="space-y-4">
          {filteredLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-indigo-300 transition"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-3 rounded-2xl bg-indigo-50 text-indigo-700 flex-shrink-0">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                        {lab.id}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded">
                        {lab.category}
                      </span>
                      <Badge variant={lab.status === 'Normal' || lab.status === 'Improved' ? 'success' : 'warning'}>
                        {lab.status}
                      </Badge>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-1.5">
                      {lab.testName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      Referred by {lab.doctor} • Conducted: {lab.testDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedLabReport(lab)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-indigo-600" />
                    <span>View Report</span>
                  </button>
                  <button
                    onClick={() => handleDownload(`${lab.id}-DiagnosticReport.pdf`)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </button>
                </div>
              </div>

              {/* Lab summary snippet */}
              <div className="mt-3.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-semibold text-slate-800">Clinical Interpretation: </span>
                <span className="text-slate-600">{lab.resultSummary}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ======================= PRESCRIPTION DETAILS MODAL ======================= */}
      <Modal
        isOpen={!!selectedPrescription}
        onClose={() => setSelectedPrescription(null)}
        title="Electronic Prescription (e-Rx)"
        subtitle={selectedPrescription ? `ID: ${selectedPrescription.id} • ${selectedPrescription.date}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedPrescription && (
          <div className="space-y-4">
            {/* Clinic Header Banner */}
            <div className="p-4 bg-indigo-950 text-white rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-sm tracking-wide">MHC-PMS CLINICAL OUTPATIENT WING</h4>
                <p className="text-[10px] text-indigo-200">National Mental Health Care Center • Department of Psychiatry</p>
              </div>
              <div className="text-right text-[11px]">
                <p className="font-mono font-bold text-indigo-300">{selectedPrescription.id}</p>
                <p className="text-slate-300">Date: {selectedPrescription.date}</p>
              </div>
            </div>

            {/* Patient & Doctor Subheader */}
            <div className="grid grid-cols-2 gap-3 text-xs p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px]">Patient Information:</span>
                <p className="font-bold text-slate-900">{patientProfile.fullName} ({patientProfile.id})</p>
                <p className="text-slate-600">{patientProfile.gender} • {patientProfile.displayDob}</p>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Prescribing Clinician:</span>
                <p className="font-bold text-indigo-900">{selectedPrescription.doctor}</p>
                <p className="text-slate-600">{selectedPrescription.doctorSpeciality}</p>
              </div>
            </div>

            {/* Medicines List */}
            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-600" />
                <span>Prescribed Medications (Rx)</span>
              </h5>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Medication</th>
                      <th className="p-2.5">Dosage</th>
                      <th className="p-2.5">Frequency</th>
                      <th className="p-2.5">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedPrescription.medicines.map((m, i) => (
                      <tr key={i}>
                        <td className="p-2.5">
                          <strong className="text-slate-900">{m.name}</strong>
                          <span className="text-[10px] text-slate-500 block">{m.instructions}</span>
                        </td>
                        <td className="p-2.5 font-medium">{m.dosage}</td>
                        <td className="p-2.5">{m.frequency}</td>
                        <td className="p-2.5 font-semibold text-slate-800">{m.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900">
              <span className="font-bold">Instructions & Advisory:</span> {selectedPrescription.instructionsGeneral}
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Valid until: {selectedPrescription.validUntil}</span>
              <div className="flex gap-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Rx</span>
                </button>
                <button
                  onClick={() => handleDownload(`${selectedPrescription.id}.pdf`)}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* ======================= LAB REPORT MODAL ======================= */}
      <Modal
        isOpen={!!selectedLabReport}
        onClose={() => setSelectedLabReport(null)}
        title="Diagnostic & Pathology Report"
        subtitle={selectedLabReport ? `${selectedLabReport.testName} • ${selectedLabReport.testDate}` : ''}
        maxWidth="max-w-2xl"
      >
        {selectedLabReport && (
          <div className="space-y-4">
            <div className="p-4 bg-slate-900 text-white rounded-2xl flex justify-between items-center">
              <div>
                <h4 className="font-extrabold text-sm">{selectedLabReport.labName}</h4>
                <p className="text-[10px] text-slate-300">Certified Diagnostic Pathology & Clinical Psychometry Wing</p>
              </div>
              <Badge variant={selectedLabReport.status === 'Normal' ? 'success' : 'warning'}>
                {selectedLabReport.status}
              </Badge>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 text-[10px]">Test Report ID:</span>
                <p className="font-mono font-bold text-slate-800">{selectedLabReport.id}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px]">Referring Physician:</span>
                <p className="font-bold text-indigo-800">{selectedLabReport.doctor}</p>
              </div>
            </div>

            <div>
              <h5 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Quantitative Test Parameters & Reference Ranges
              </h5>
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 text-slate-700 font-semibold text-[10px] uppercase">
                    <tr>
                      <th className="p-2.5">Parameter Investigated</th>
                      <th className="p-2.5">Observed Value</th>
                      <th className="p-2.5">Reference Biological Range</th>
                      <th className="p-2.5">Flag</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {selectedLabReport.parameters.map((p, idx) => (
                      <tr key={idx}>
                        <td className="p-2.5 font-medium text-slate-900">{p.name}</td>
                        <td className="p-2.5 font-bold text-indigo-800">{p.value}</td>
                        <td className="p-2.5 text-slate-500">{p.normalRange}</td>
                        <td className="p-2.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            p.status === 'Normal' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-xs">
              <p className="font-semibold text-indigo-950">Clinical Pathologist Remarks:</p>
              <p className="text-slate-700 mt-1 italic">"{selectedLabReport.remarks}"</p>
              <p className="text-[11px] text-slate-500 mt-2">Verified by: <strong>{selectedLabReport.verifiedBy}</strong></p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl cursor-pointer"
              >
                Print
              </button>
              <button
                onClick={() => handleDownload(`${selectedLabReport.id}.pdf`)}
                className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow cursor-pointer"
              >
                Download Official Report
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
