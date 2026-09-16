import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  PlusCircle, 
  Search, 
  CreditCard, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  PhoneCall, 
  Receipt, 
  X,
  Building,
  UserPlus,
  CalendarClock,
  CalendarCheck,
  CalendarDays,
  Shield,
  HeartHandshake,
  UserCheck,
  Printer,
  FileSpreadsheet,
  ArrowRightLeft,
  Sparkles,
  RefreshCw,
  BadgeAlert
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReceptionistDeskView = () => {
  const { 
    currentUser, 
    appointments, 
    bookNewAppointment, 
    rescheduleAppointment,
    cancelAppointment, 
    doctors, 
    billingInvoices, 
    createBillingInvoice, 
    waitingVisitors, 
    checkInVisitor, 
    updateVisitorStatus,
    patientRecordsList,
    addPatientRecord,
    counsellingSessions,
    allotCounsellingSession,
    cancelCounsellingSession,
    switchRoleWithLogout,
    showToast 
  } = useApp();

  // Primary subtab navigation matching the 6 core receptionist use-cases:
  // 'schedule' | 'patients' | 'visitors' | 'billing' | 'counselling'
  const [currentSubTab, setCurrentSubTab] = useState('schedule');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // 1. Walk-in Booking Modal State
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [walkInForm, setWalkInForm] = useState({
    patientName: '',
    patientPhone: '',
    doctorId: 'DOC-001',
    doctorName: 'Dr. Shashank Pandey',
    doctorSpeciality: 'Psychiatrist',
    date: '2026-09-18',
    time: '11:00 AM',
    slotPeriod: 'Morning',
    type: 'In-Person Clinic Consultation',
    location: 'OPD Suite 204, East Wing',
    fee: 1200,
    reason: 'Walk-in emergency anxiety evaluation'
  });

  // 2. Reschedule Modal State
  const [isRescheduleModalOpen, setIsRescheduleModalOpen] = useState(false);
  const [rescheduleData, setRescheduleData] = useState(null);
  const [rescheduleForm, setRescheduleForm] = useState({
    date: '2026-09-20',
    time: '10:30 AM',
    slotPeriod: 'Morning',
    reason: 'Patient requested time shift due to transport delay'
  });

  // 3. Create Patient Record Modal State
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [patientForm, setPatientForm] = useState({
    fullName: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '',
    email: '',
    address: 'Bengaluru, KA',
    emergencyContact: '',
    assignedDoctor: 'Dr. Shashank Pandey',
    primaryDiagnosis: 'Anxiety and Mood Evaluation',
    severity: 'Moderate',
    insuranceProvider: 'Star Health Care',
    clinicNode: 'Central Hospital OPD'
  });

  // 4. Record Visitor Details Modal State
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [visitorForm, setVisitorForm] = useState({
    visitorName: '',
    visitorPhone: '',
    patientName: 'Aaryan Kumar',
    patientId: 'PT-88204',
    relationship: 'Parent / Guardian',
    purposeOfVisit: 'Consultation Companion',
    idProof: 'National ID / Aadhaar',
    assignedDoctor: 'Dr. Shashank Pandey',
    room: 'OPD Suite 204'
  });

  // 5. Process Payment / Billing Modal State
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [billingForm, setBillingForm] = useState({
    patientName: 'Aaryan Kumar',
    patientId: 'PT-88204',
    doctorName: 'Dr. Shashank Pandey',
    service: 'Outpatient Psychiatric Consultation',
    amount: 1200,
    paymentMode: 'UPI / Digital',
    referenceNote: 'UPI Ref #8990141203'
  });

  // Receipt Preview Modal
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // 6. Allot Counselling Session Modal State
  const [isCounsellingModalOpen, setIsCounsellingModalOpen] = useState(false);
  const [counsellingForm, setCounsellingForm] = useState({
    patientName: 'Aaryan Kumar',
    patientId: 'PT-88204',
    therapistName: 'Dr. Kabir Sengupta',
    therapistRole: 'Clinical Psychologist & CBT Specialist',
    therapyType: 'Cognitive Behavioral Therapy (CBT)',
    date: '2026-09-21',
    time: '11:00 AM',
    duration: '45 Minutes',
    format: 'In-Person Clinic Suite #4',
    clinicalObjective: 'Cognitive restructuring and thought records for performance anxiety.'
  });

  // Handlers
  const handleWalkInBooking = (e) => {
    e.preventDefault();
    if (!walkInForm.patientName) {
      showToast('Please enter patient name.', 'error');
      return;
    }
    const selectedDoc = doctors.find(d => d.id === walkInForm.doctorId);
    bookNewAppointment({
      ...walkInForm,
      doctorName: selectedDoc ? selectedDoc.name : walkInForm.doctorName,
      doctorSpeciality: selectedDoc ? selectedDoc.speciality : walkInForm.doctorSpeciality,
      displayDate: new Date(walkInForm.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    });
    setIsWalkInModalOpen(false);
    setWalkInForm({
      patientName: '',
      patientPhone: '',
      doctorId: 'DOC-001',
      doctorName: 'Dr. Shashank Pandey',
      doctorSpeciality: 'Psychiatrist',
      date: '2026-09-18',
      time: '11:00 AM',
      slotPeriod: 'Morning',
      type: 'In-Person Clinic Consultation',
      location: 'OPD Suite 204, East Wing',
      fee: 1200,
      reason: 'Walk-in emergency anxiety evaluation'
    });
  };

  const handleOpenReschedule = (apt) => {
    setRescheduleData(apt);
    setRescheduleForm({
      date: apt.date || '2026-09-20',
      time: apt.time || '11:00 AM',
      slotPeriod: apt.slotPeriod || 'Morning',
      reason: 'Patient requested appointment time adjustment'
    });
    setIsRescheduleModalOpen(true);
  };

  const handleConfirmReschedule = (e) => {
    e.preventDefault();
    if (!rescheduleData) return;
    rescheduleAppointment(
      rescheduleData.id,
      rescheduleForm.date,
      rescheduleForm.time,
      rescheduleForm.slotPeriod,
      rescheduleForm.reason
    );
    setIsRescheduleModalOpen(false);
    setRescheduleData(null);
  };

  const handleCreatePatientRecord = (e) => {
    e.preventDefault();
    if (!patientForm.fullName || !patientForm.phone) {
      showToast('Please enter both patient full name and phone number.', 'error');
      return;
    }
    addPatientRecord(patientForm);
    setIsAddPatientModalOpen(false);
    setPatientForm({
      fullName: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'B+',
      phone: '',
      email: '',
      address: 'Bengaluru, KA',
      emergencyContact: '',
      assignedDoctor: 'Dr. Shashank Pandey',
      primaryDiagnosis: 'Anxiety and Mood Evaluation',
      severity: 'Moderate',
      insuranceProvider: 'Star Health Care',
      clinicNode: 'Central Hospital OPD'
    });
  };

  const handleRecordVisitor = (e) => {
    e.preventDefault();
    if (!visitorForm.visitorName) {
      showToast('Please enter visitor name.', 'error');
      return;
    }
    checkInVisitor(visitorForm);
    setIsVisitorModalOpen(false);
    setVisitorForm({
      visitorName: '',
      visitorPhone: '',
      patientName: 'Aaryan Kumar',
      patientId: 'PT-88204',
      relationship: 'Parent / Guardian',
      purposeOfVisit: 'Consultation Companion',
      idProof: 'National ID / Aadhaar',
      assignedDoctor: 'Dr. Shashank Pandey',
      room: 'OPD Suite 204'
    });
  };

  const handleProcessPayment = (e) => {
    e.preventDefault();
    if (!billingForm.amount) {
      showToast('Please enter a valid bill amount.', 'error');
      return;
    }
    const invoice = createBillingInvoice(billingForm);
    setIsBillingModalOpen(false);
    setSelectedReceipt(invoice);
  };

  const handleAllotCounselling = (e) => {
    e.preventDefault();
    if (!counsellingForm.patientName) {
      showToast('Please specify patient name.', 'error');
      return;
    }
    allotCounsellingSession(counsellingForm);
    setIsCounsellingModalOpen(false);
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.doctorName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || apt.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Filter patients
  const filteredPatients = (patientRecordsList || []).filter(p => {
    return p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
           p.phone.includes(searchQuery);
  });

  const subTabs = [
    { id: 'schedule', label: '1. Appointments (Book/Reschedule/Cancel)', icon: CalendarCheck, count: appointments.length },
    { id: 'patients', label: '2. Create & Add Patient Records', icon: UserPlus, count: patientRecordsList?.length || 0 },
    { id: 'visitors', label: '3. Record Visitor Details & Lounge', icon: Users, count: waitingVisitors.length },
    { id: 'billing', label: '4. Process Patient Payments', icon: CreditCard, count: billingInvoices.length },
    { id: 'counselling', label: '5. Allot Counselling Sessions', icon: HeartHandshake, count: counsellingSessions?.length || 0 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Receptionist Identity & Shift Session Banner */}
      <div className="bg-linear-to-r from-slate-900 via-sky-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-sky-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.fullName || 'Receptionist'} 
              className="w-18 h-18 rounded-2xl object-cover ring-4 ring-sky-500/30 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  {currentUser?.role || 'Receptionist'} • {currentUser?.id || 'REC-104'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Front Desk Intake Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {currentUser?.fullName || 'Medha Banerjee'}
              </h2>
              <p className="text-xs sm:text-sm text-sky-200/90 font-medium">
                {currentUser?.title || 'Lead Front Desk & Patient Intake Coordinator'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {currentUser?.deskLocation || 'Main Lobby Central Reception, Desk #2'} • {currentUser?.shift || 'Morning Shift (08:00 AM - 04:00 PM)'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
            <button
              onClick={() => setIsAddPatientModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Patient Record</span>
            </button>
            <button
              onClick={() => switchRoleWithLogout('doctor')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
              title="Log out and switch role"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-sky-300" />
              <span>Switch Role</span>
            </button>
          </div>
        </div>

        {/* Quick Reception Metrics */}
        <div className="mt-5 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Appointments</p>
            <p className="text-lg font-black text-white mt-0.5">{appointments.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Registered Patients</p>
            <p className="text-lg font-black text-indigo-300 mt-0.5">{patientRecordsList?.length || 0}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Visitors In Lounge</p>
            <p className="text-lg font-black text-sky-300 mt-0.5">{waitingVisitors.filter(v => v.status === 'In Waiting Lounge').length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Invoices Issued</p>
            <p className="text-lg font-black text-emerald-300 mt-0.5">{billingInvoices.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5 col-span-2 sm:col-span-1">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Counselling Sessions</p>
            <p className="text-lg font-black text-purple-300 mt-0.5">{counsellingSessions?.length || 0}</p>
          </div>
        </div>
      </div>

      {/* Feature Sub-Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
        {subTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setCurrentSubTab(tab.id);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive 
                  ? 'bg-sky-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: APPOINTMENTS (BOOK, RESCHEDULE, CANCEL) */}
      {/* ========================================================================= */}
      {currentSubTab === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinic Master Appointment Queue</h3>
              <p className="text-xs text-slate-500">Book new consultations, reschedule active appointments, or record cancellations</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patient, doctor, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden w-48 sm:w-60"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
              >
                <option value="All">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button
                onClick={() => setIsWalkInModalOpen(true)}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Book Walk-in</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Token / ID</th>
                  <th className="py-3 px-4">Patient Details</th>
                  <th className="py-3 px-4">Attending Doctor</th>
                  <th className="py-3 px-4">Date & Slot</th>
                  <th className="py-3 px-4">Consultation Mode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-sky-700">{apt.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{apt.patientName || 'Aaryan Kumar'}</p>
                      <p className="text-[11px] text-slate-400">Fee: ₹{apt.fee || 1200}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{apt.doctorName}</p>
                      <p className="text-[11px] text-slate-400">{apt.doctorSpeciality}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{apt.displayDate || apt.date}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{apt.time} ({apt.slotPeriod})</p>
                      {apt.rescheduledAt && (
                        <span className="text-[9px] text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 font-semibold block w-fit mt-0.5">
                          Rescheduled
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[11px] text-slate-600 block">{apt.type}</span>
                      <span className="text-[10px] text-slate-400">{apt.location}</span>
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
                      {apt.status === 'Upcoming' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenReschedule(apt)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 transition cursor-pointer"
                            title="Reschedule this appointment"
                          >
                            Reschedule
                          </button>
                          <button
                            onClick={() => cancelAppointment(apt.id)}
                            className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition cursor-pointer"
                            title="Cancel appointment"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-[11px] italic">Archived</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: CREATE AND ADD PATIENT RECORDS */}
      {/* ========================================================================= */}
      {currentSubTab === 'patients' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Patient Electronic Health Registry (EHR)</h3>
              <p className="text-xs text-slate-500">Register new incoming patients, create demographic records, and manage intake histories</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search patient name, ID, or phone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden w-48 sm:w-64"
                />
              </div>
              <button
                onClick={() => setIsAddPatientModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add Patient Record</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Patient ID</th>
                  <th className="py-3 px-4">Full Name & Contact</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Attending Doctor</th>
                  <th className="py-3 px-4">Primary Diagnosis</th>
                  <th className="py-3 px-4">Clinic Node</th>
                  <th className="py-3 px-4 text-right">Intake Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredPatients.map(patient => (
                  <tr key={patient.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-indigo-700 font-mono">{patient.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{patient.fullName}</p>
                      <p className="text-[11px] text-slate-500">{patient.phone} • {patient.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-800">{patient.age} Yrs • {patient.gender}</p>
                      <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        {patient.bloodGroup}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{patient.assignedDoctor}</td>
                    <td className="py-3 px-4">
                      <p className="font-medium text-slate-900">{patient.primaryDiagnosis}</p>
                      <span className="text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-semibold">
                        {patient.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{patient.clinicNode}</td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          setWalkInForm(prev => ({
                            ...prev,
                            patientName: patient.fullName,
                            patientPhone: patient.phone
                          }));
                          setIsWalkInModalOpen(true);
                        }}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 transition cursor-pointer"
                      >
                        Book Visit
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
      {/* SUBTAB 3: RECORD VISITOR DETAILS & WAITING LOUNGE */}
      {/* ========================================================================= */}
      {currentSubTab === 'visitors' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Waiting Lounge & Visitor Registry</h3>
              <p className="text-xs text-slate-500">Record visitor details, issue queue tokens, and manage patient companions</p>
            </div>

            <button
              onClick={() => setIsVisitorModalOpen(true)}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Record Visitor Details</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Token #</th>
                  <th className="py-3 px-4">Visitor / Companion</th>
                  <th className="py-3 px-4">Patient Accompanied</th>
                  <th className="py-3 px-4">Purpose of Visit</th>
                  <th className="py-3 px-4">Arrival Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Lounge Triage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {waitingVisitors.map(visitor => (
                  <tr key={visitor.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4">
                      <span className="w-7 h-7 rounded-full bg-sky-100 text-sky-800 font-bold flex items-center justify-center text-xs">
                        #{visitor.tokenNumber}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{visitor.visitorName || visitor.accompaniedBy || 'Family Member'}</p>
                      <p className="text-[11px] text-slate-400">{visitor.visitorPhone || 'Self Check-in'} • {visitor.relationship || 'Companion'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{visitor.patientName}</p>
                      <p className="text-[11px] text-indigo-600 font-mono">{visitor.patientId}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-slate-700 font-medium">{visitor.purposeOfVisit || 'Consultation Companion'}</p>
                      <p className="text-[10px] text-slate-400">{visitor.room || 'OPD Suite'}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600 font-mono">{visitor.arrivalTime}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        visitor.status === 'In Waiting Lounge' ? 'bg-amber-100 text-amber-800' :
                        visitor.status === 'With Doctor' || visitor.status === 'With Clinician' ? 'bg-sky-100 text-sky-800' :
                        'bg-emerald-100 text-emerald-800'
                      }`}>
                        {visitor.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <select
                        value={visitor.status}
                        onChange={(e) => updateVisitorStatus(visitor.id, e.target.value)}
                        className="px-2 py-1 text-[11px] font-semibold border border-slate-200 rounded-lg bg-white"
                      >
                        <option value="In Waiting Lounge">In Waiting Lounge</option>
                        <option value="With Clinician">With Clinician</option>
                        <option value="Visit Concluded">Visit Concluded</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: PROCESS PATIENT PAYMENTS */}
      {/* ========================================================================= */}
      {currentSubTab === 'billing' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Consultation Fee Billing & Payment Processing</h3>
              <p className="text-xs text-slate-500">Collect consultation fees, generate tax receipts, and record payment modes</p>
            </div>

            <button
              onClick={() => setIsBillingModalOpen(true)}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Process New Payment</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Invoice / Receipt #</th>
                  <th className="py-3 px-4">Patient Name & ID</th>
                  <th className="py-3 px-4">Clinical Service Rendered</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Amount Paid</th>
                  <th className="py-3 px-4">Mode & Status</th>
                  <th className="py-3 px-4 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {billingInvoices.map(inv => (
                  <tr key={inv.invoiceId} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900 font-mono">{inv.invoiceId}</p>
                      <p className="text-[10px] text-emerald-700 font-mono">{inv.receiptNumber}</p>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{inv.patientName}</p>
                      <p className="text-[11px] text-slate-400">{inv.patientId}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{inv.service}</td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{inv.doctorName}</td>
                    <td className="py-3 px-4">
                      <span className="font-black text-slate-900 text-sm">₹{inv.amount}</span>
                    </td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{inv.paymentMode}</p>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedReceipt(inv)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center gap-1 ml-auto"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Receipt</span>
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
      {/* SUBTAB 5: ALLOTTING COUNSELLING SESSIONS */}
      {/* ========================================================================= */}
      {currentSubTab === 'counselling' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Psychotherapy & Counselling Session Allotment</h3>
              <p className="text-xs text-slate-500">Allot cognitive therapy, trauma recovery, and psychological counselling appointments</p>
            </div>

            <button
              onClick={() => setIsCounsellingModalOpen(true)}
              className="px-3.5 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Allot Counselling Session</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {counsellingSessions.map(session => (
              <div key={session.sessionId} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:shadow-md transition space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
                    {session.sessionId}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    session.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' :
                    session.status === 'Scheduled' ? 'bg-sky-100 text-sky-800' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {session.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-slate-900">{session.patientName}</h4>
                  <p className="text-[11px] text-slate-400 font-mono">Patient ID: {session.patientId}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-slate-200/60 space-y-1 text-xs">
                  <p className="font-bold text-purple-900">{session.therapyType}</p>
                  <p className="text-[11px] text-slate-600">Therapist: <strong>{session.therapistName}</strong></p>
                  <p className="text-[10px] text-slate-400">{session.therapistRole}</p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                  <span>{session.displayDate || session.date} • {session.time}</span>
                  <span className="font-semibold text-slate-700">{session.duration}</span>
                </div>

                <p className="text-[11px] text-slate-600 italic line-clamp-2">
                  "{session.clinicalObjective}"
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] text-slate-400">
                  <span>Room: {session.format}</span>
                  {session.status !== 'Cancelled' && (
                    <button
                      onClick={() => cancelCounsellingSession(session.sessionId)}
                      className="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                    >
                      Cancel Session
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: WALK-IN / ADVANCE BOOKING */}
      {/* ========================================================================= */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">Book Patient Appointment</h3>
              </div>
              <button 
                onClick={() => setIsWalkInModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleWalkInBooking} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sneha Patel"
                    value={walkInForm.patientName}
                    onChange={(e) => setWalkInForm({ ...walkInForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98451 22334"
                    value={walkInForm.patientPhone}
                    onChange={(e) => setWalkInForm({ ...walkInForm, patientPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Attending Clinician *</label>
                <select
                  value={walkInForm.doctorId}
                  onChange={(e) => {
                    const doc = doctors.find(d => d.id === e.target.value);
                    setWalkInForm({
                      ...walkInForm,
                      doctorId: e.target.value,
                      doctorName: doc ? doc.name : walkInForm.doctorName,
                      doctorSpeciality: doc ? doc.speciality : walkInForm.doctorSpeciality,
                      fee: doc ? doc.consultationFee || doc.fee : 1200
                    });
                  }}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.speciality} (₹{d.consultationFee || d.fee})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Appointment Date</label>
                  <input
                    type="date"
                    required
                    value={walkInForm.date}
                    onChange={(e) => setWalkInForm({ ...walkInForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={walkInForm.time}
                    onChange={(e) => setWalkInForm({ ...walkInForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
                  >
                    <option value="09:30 AM">09:30 AM (Morning)</option>
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:00 AM">11:00 AM (Morning)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon)</option>
                    <option value="03:30 PM">03:30 PM (Afternoon)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Consultation Reason / Triage Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Follow-up consultation for mood adjustment"
                  value={walkInForm.reason}
                  onChange={(e) => setWalkInForm({ ...walkInForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: RESCHEDULE APPOINTMENT */}
      {/* ========================================================================= */}
      {isRescheduleModalOpen && rescheduleData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CalendarClock className="w-5 h-5 text-amber-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Reschedule Appointment</h3>
                  <p className="text-[11px] text-slate-400 font-mono">{rescheduleData.id}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsRescheduleModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs">
              <p className="font-bold text-amber-900">Current Slot: {rescheduleData.displayDate || rescheduleData.date} at {rescheduleData.time}</p>
              <p className="text-[11px] text-amber-800">Patient: {rescheduleData.patientName || 'Aaryan Kumar'} with {rescheduleData.doctorName}</p>
            </div>

            <form onSubmit={handleConfirmReschedule} className="mt-4 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">New Date *</label>
                  <input
                    type="date"
                    required
                    value={rescheduleForm.date}
                    onChange={(e) => setRescheduleForm({ ...rescheduleForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">New Time Slot *</label>
                  <select
                    value={rescheduleForm.time}
                    onChange={(e) => setRescheduleForm({ ...rescheduleForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:outline-hidden bg-white"
                  >
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rescheduling Reason *</label>
                <textarea
                  rows={2}
                  required
                  value={rescheduleForm.reason}
                  onChange={(e) => setRescheduleForm({ ...rescheduleForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsRescheduleModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs"
                >
                  Confirm Reschedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: CREATE & ADD PATIENT RECORD */}
      {/* ========================================================================= */}
      {isAddPatientModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <div>
                  <h3 className="text-base font-bold text-slate-900">Create & Add Electronic Patient Record</h3>
                  <p className="text-[11px] text-slate-500">MHC-PMS Central Clinical Health Record Intake</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddPatientModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePatientRecord} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Sen"
                    value={patientForm.fullName}
                    onChange={(e) => setPatientForm({ ...patientForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98112 34567"
                    value={patientForm.phone}
                    onChange={(e) => setPatientForm({ ...patientForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="25"
                    value={patientForm.age}
                    onChange={(e) => setPatientForm({ ...patientForm, age: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={patientForm.gender}
                    onChange={(e) => setPatientForm({ ...patientForm, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={patientForm.bloodGroup}
                    onChange={(e) => setPatientForm({ ...patientForm, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Attending Clinician</label>
                  <select
                    value={patientForm.assignedDoctor}
                    onChange={(e) => setPatientForm({ ...patientForm, assignedDoctor: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.speciality})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinic Satellite Node</label>
                  <select
                    value={patientForm.clinicNode}
                    onChange={(e) => setPatientForm({ ...patientForm, clinicNode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Central Hospital OPD">Central Hospital OPD</option>
                    <option value="North Specialty Satellite">North Specialty Satellite</option>
                    <option value="West Community Clinic">West Community Clinic</option>
                    <option value="South Suburban Practice">South Suburban Practice</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Initial Chief Complaint / Clinical Concern</label>
                <input
                  type="text"
                  placeholder="e.g. Persistent panic attacks and depressive dysphoria"
                  value={patientForm.primaryDiagnosis}
                  onChange={(e) => setPatientForm({ ...patientForm, primaryDiagnosis: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person</label>
                  <input
                    type="text"
                    placeholder="e.g. Meera Sen (Spouse) - 98112 00000"
                    value={patientForm.emergencyContact}
                    onChange={(e) => setPatientForm({ ...patientForm, emergencyContact: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Insurance / Billing Type</label>
                  <input
                    type="text"
                    placeholder="e.g. Star Health / Self Pay"
                    value={patientForm.insuranceProvider}
                    onChange={(e) => setPatientForm({ ...patientForm, insuranceProvider: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddPatientModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Save & Register Patient
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: RECORD VISITOR DETAILS */}
      {/* ========================================================================= */}
      {isVisitorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-sky-600" />
                <h3 className="text-base font-bold text-slate-900">Record Visitor / Companion Details</h3>
              </div>
              <button 
                onClick={() => setIsVisitorModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRecordVisitor} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visitor Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alok Roy"
                    value={visitorForm.visitorName}
                    onChange={(e) => setVisitorForm({ ...visitorForm, visitorName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Visitor Mobile Number</label>
                  <input
                    type="tel"
                    placeholder="+91 94220 33440"
                    value={visitorForm.visitorPhone}
                    onChange={(e) => setVisitorForm({ ...visitorForm, visitorPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Visited *</label>
                  <input
                    type="text"
                    required
                    value={visitorForm.patientName}
                    onChange={(e) => setVisitorForm({ ...visitorForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Relationship with Patient</label>
                  <select
                    value={visitorForm.relationship}
                    onChange={(e) => setVisitorForm({ ...visitorForm, relationship: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
                  >
                    <option value="Spouse">Spouse</option>
                    <option value="Parent / Guardian">Parent / Guardian</option>
                    <option value="Child">Child</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Friend / Relative">Friend / Relative</option>
                    <option value="Self">Self (Patient)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Purpose of Visit</label>
                  <select
                    value={visitorForm.purposeOfVisit}
                    onChange={(e) => setVisitorForm({ ...visitorForm, purposeOfVisit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
                  >
                    <option value="Consultation Companion">Consultation Companion</option>
                    <option value="Inpatient Ward Visit">Inpatient Ward Visit</option>
                    <option value="Prescription / Report Pickup">Prescription / Report Pickup</option>
                    <option value="Billing & Admissions Inquiry">Billing & Admissions Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">ID Proof Provided</label>
                  <select
                    value={visitorForm.idProof}
                    onChange={(e) => setVisitorForm({ ...visitorForm, idProof: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-600 focus:outline-hidden bg-white"
                  >
                    <option value="National ID / Aadhaar">National ID / Aadhaar</option>
                    <option value="Driving License">Driving License</option>
                    <option value="Passport">Passport</option>
                    <option value="Hospital Attendant Pass">Hospital Attendant Pass</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVisitorModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs"
                >
                  Record & Issue Lounge Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 5: PROCESS PATIENT PAYMENTS */}
      {/* ========================================================================= */}
      {isBillingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">Process Patient Payment</h3>
              </div>
              <button 
                onClick={() => setIsBillingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProcessPayment} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Name & ID *</label>
                <input
                  type="text"
                  required
                  value={billingForm.patientName}
                  onChange={(e) => setBillingForm({ ...billingForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Service Rendered</label>
                <select
                  value={billingForm.service}
                  onChange={(e) => setBillingForm({ ...billingForm, service: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white"
                >
                  <option value="Outpatient Psychiatric Consultation">Outpatient Psychiatric Consultation</option>
                  <option value="Psychotherapy & CBT Assessment">Psychotherapy & CBT Assessment</option>
                  <option value="Emergency Crisis Consultation">Emergency Crisis Consultation</option>
                  <option value="Diagnostic Psychometry & Lab Review">Diagnostic Psychometry & Lab Review</option>
                  <option value="Prescription Refill & Pharmacy Dispensing">Prescription Refill & Pharmacy Dispensing</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount Due (₹) *</label>
                  <input
                    type="number"
                    required
                    value={billingForm.amount}
                    onChange={(e) => setBillingForm({ ...billingForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Mode *</label>
                  <select
                    value={billingForm.paymentMode}
                    onChange={(e) => setBillingForm({ ...billingForm, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden bg-white font-semibold"
                  >
                    <option value="UPI / Digital">UPI / QR Code</option>
                    <option value="Credit Card">Credit / Debit Card</option>
                    <option value="Cash">Cash at Counter</option>
                    <option value="Insurance Claim Verification">Insurance / TPA Claim</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Transaction Ref / Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Card Auth #9910 or Cash Counter #1"
                  value={billingForm.referenceNote}
                  onChange={(e) => setBillingForm({ ...billingForm, referenceNote: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBillingModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs"
                >
                  Process & Print Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECEIPT PREVIEW MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="text-center pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold uppercase tracking-widest text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                Official Payment Receipt
              </span>
              <h3 className="text-lg font-black text-slate-900 mt-2">MHC-PMS Health Center</h3>
              <p className="text-[11px] text-slate-500">Central Healthcare Psychiatric Services</p>
              <p className="font-mono text-[10px] text-slate-400 mt-0.5">Receipt: {selectedReceipt.receiptNumber} • Invoice: {selectedReceipt.invoiceId}</p>
            </div>

            <div className="py-4 space-y-2 border-b border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-500">Patient Name:</span>
                <span className="font-bold text-slate-900">{selectedReceipt.patientName} ({selectedReceipt.patientId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-800">{selectedReceipt.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Attending Doctor:</span>
                <span className="text-slate-800">{selectedReceipt.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-semibold text-emerald-700">{selectedReceipt.paymentMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date & Time:</span>
                <span className="text-slate-700">{selectedReceipt.date}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-sm">
                <span className="font-bold text-slate-900">Total Paid:</span>
                <span className="font-black text-emerald-700 text-base">₹{selectedReceipt.amount}</span>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <span className="text-[10px] text-slate-400">Processed by: Medha Banerjee (Front Desk)</span>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 6: ALLOT COUNSELLING SESSION */}
      {/* ========================================================================= */}
      {isCounsellingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-bold text-slate-900">Allot Psychotherapy & Counselling Session</h3>
              </div>
              <button 
                onClick={() => setIsCounsellingModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAllotCounselling} className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    required
                    value={counsellingForm.patientName}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient ID</label>
                  <input
                    type="text"
                    value={counsellingForm.patientId}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, patientId: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Psychotherapist / Counsellor *</label>
                  <select
                    value={counsellingForm.therapistName}
                    onChange={(e) => {
                      const doc = doctors.find(d => d.name === e.target.value);
                      setCounsellingForm({
                        ...counsellingForm,
                        therapistName: e.target.value,
                        therapistRole: doc ? doc.speciality : 'Clinical Psychologist'
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.name}>{d.name} ({d.speciality})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Counselling Modality *</label>
                  <select
                    value={counsellingForm.therapyType}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, therapyType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                  >
                    <option value="Cognitive Behavioral Therapy (CBT)">Cognitive Behavioral Therapy (CBT)</option>
                    <option value="Behavioral Activation Therapy (BAT)">Behavioral Activation Therapy (BAT)</option>
                    <option value="Trauma-Informed Psychotherapy & EMDR">Trauma-Informed Psychotherapy & EMDR</option>
                    <option value="Dialectical Behavior Therapy (DBT)">Dialectical Behavior Therapy (DBT)</option>
                    <option value="Family & Marital Relationship Counselling">Family & Marital Relationship Counselling</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Session Date</label>
                  <input
                    type="date"
                    required
                    value={counsellingForm.date}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Time Slot</label>
                  <select
                    value={counsellingForm.time}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:30 PM">05:30 PM</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Duration</label>
                  <select
                    value={counsellingForm.duration}
                    onChange={(e) => setCounsellingForm({ ...counsellingForm, duration: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden bg-white"
                  >
                    <option value="45 Minutes">45 Minutes</option>
                    <option value="60 Minutes">60 Minutes</option>
                    <option value="90 Minutes">90 Minutes</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinical Objectives / Therapeutic Focus</label>
                <textarea
                  rows={2}
                  value={counsellingForm.clinicalObjective}
                  onChange={(e) => setCounsellingForm({ ...counsellingForm, clinicalObjective: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCounsellingModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl shadow-xs"
                >
                  Confirm & Allot Session
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
