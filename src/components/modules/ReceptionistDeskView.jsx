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
  UserCheck, 
  Receipt, 
  X,
  Building,
  UserPlus
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ReceptionistDeskView = () => {
  const { 
    currentUser, 
    appointments, 
    bookNewAppointment, 
    cancelAppointment, 
    doctors, 
    billingInvoices, 
    createBillingInvoice, 
    waitingVisitors, 
    checkInVisitor, 
    updateVisitorStatus,
    showToast 
  } = useApp();

  const [currentSubTab, setCurrentSubTab] = useState('schedule');
  const [searchQuery, setSearchQuery] = useState('');

  // Walk-in Booking Modal State
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

  // Billing Modal State
  const [isBillingModalOpen, setIsBillingModalOpen] = useState(false);
  const [billingForm, setBillingForm] = useState({
    patientName: 'Aaryan Kumar',
    patientId: 'PT-88204',
    doctorName: 'Dr. Shashank Pandey',
    service: 'Outpatient Psychiatric Consultation',
    amount: 1200,
    paymentMode: 'UPI / Digital'
  });

  // Visitor Check-in Modal State
  const [isVisitorModalOpen, setIsVisitorModalOpen] = useState(false);
  const [visitorForm, setVisitorForm] = useState({
    patientName: '',
    patientId: 'PT-88204',
    assignedDoctor: 'Dr. Shashank Pandey',
    accompaniedBy: 'Self',
    room: 'OPD Suite 204'
  });

  // Handle Walk-in Booking
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

  // Handle Billing Creation
  const handleCreateBilling = (e) => {
    e.preventDefault();
    createBillingInvoice(billingForm);
    setIsBillingModalOpen(false);
  };

  // Handle Visitor Check-in
  const handleCheckInVisitor = (e) => {
    e.preventDefault();
    if (!visitorForm.patientName) {
      showToast('Please provide patient name.', 'error');
      return;
    }
    checkInVisitor(visitorForm);
    setIsVisitorModalOpen(false);
    setVisitorForm({
      patientName: '',
      patientId: 'PT-88204',
      assignedDoctor: 'Dr. Shashank Pandey',
      accompaniedBy: 'Self',
      room: 'OPD Suite 204'
    });
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(apt => {
    const q = searchQuery.toLowerCase();
    return apt.doctorName.toLowerCase().includes(q) || 
           apt.id.toLowerCase().includes(q) ||
           (apt.reason && apt.reason.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      {/* Reception Hero Banner */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img 
              src={currentUser.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"} 
              alt={currentUser.fullName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {currentUser.role} • {currentUser.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Reception Desk Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentUser.fullName}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/80">
                {currentUser.title}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser.deskLocation} • {currentUser.shift}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsVisitorModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Check-in Patient</span>
            </button>
            <button
              onClick={() => setIsBillingModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition flex items-center gap-2 shadow-xs cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5" />
              <span>Record Payment</span>
            </button>
            <button
              onClick={() => setIsWalkInModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Book Walk-in</span>
            </button>
          </div>
        </div>

        {/* Reception Stats */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Scheduled Today</p>
            <p className="text-xl font-black text-white mt-0.5">{appointments.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">In Waiting Lounge</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{waitingVisitors.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Payments Processed</p>
            <p className="text-xl font-black text-emerald-300 mt-0.5">{billingInvoices.length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Active Clinics</p>
            <p className="text-xl font-black text-indigo-300 mt-0.5">4</p>
          </div>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: 'schedule', label: 'Master Clinic Schedule', icon: Calendar },
          { id: 'waiting', label: 'Waiting Lounge & Check-in', icon: UserCheck },
          { id: 'billing', label: 'Billing & Invoicing', icon: CreditCard }
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

      {/* SubTab 1: Master Schedule */}
      {currentSubTab === 'schedule' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Clinic Master Appointment Queue</h3>
              <p className="text-xs text-slate-500">Real-time scheduling across all psychiatric suites</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search doctor or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden w-48 sm:w-64"
                />
              </div>
              <button
                onClick={() => setIsWalkInModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
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
                  <th className="py-3 px-4">APT ID</th>
                  <th className="py-3 px-4">Doctor</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Consultation Mode</th>
                  <th className="py-3 px-4">OPD Room</th>
                  <th className="py-3 px-4">Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredAppointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-indigo-600">{apt.id}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{apt.doctorName}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{apt.date}</p>
                      <p className="text-[11px] text-slate-500">{apt.time}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{apt.type}</td>
                    <td className="py-3 px-4 text-slate-600">{apt.location}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹{apt.fee || 1200}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                        apt.status === 'Upcoming' 
                          ? 'bg-emerald-100 text-emerald-800'
                          : apt.status === 'Cancelled'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {apt.status === 'Upcoming' && (
                        <button
                          onClick={() => cancelAppointment(apt.id, 'Cancelled by Reception Desk')}
                          className="px-2.5 py-1 text-[11px] font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SubTab 2: Waiting Lounge */}
      {currentSubTab === 'waiting' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Waiting Lounge & Patient Check-in Log</h3>
              <p className="text-xs text-slate-500">Live tracker of patients present in clinic waiting reception</p>
            </div>
            <button
              onClick={() => setIsVisitorModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Check-in New Visitor</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {waitingVisitors.map(v => (
              <div key={v.id} className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-lg bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
                    #{v.tokenNumber}
                  </span>
                  <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                    v.status === 'With Doctor' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{v.patientName}</h4>
                  <p className="text-xs text-slate-500">ID: {v.patientId} • Arrived: {v.arrivalTime}</p>
                </div>
                <div className="text-xs text-slate-600 space-y-1">
                  <p><strong>Consultant:</strong> {v.assignedDoctor}</p>
                  <p><strong>Accompanied By:</strong> {v.accompaniedBy}</p>
                  <p><strong>Assigned Room:</strong> {v.room}</p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60">
                  <button
                    onClick={() => updateVisitorStatus(v.id, 'With Doctor')}
                    className="flex-1 py-1 text-[11px] font-semibold bg-white hover:bg-slate-50 border border-slate-200 rounded-lg text-slate-700 transition cursor-pointer"
                  >
                    Call In
                  </button>
                  <button
                    onClick={() => updateVisitorStatus(v.id, 'Completed')}
                    className="flex-1 py-1 text-[11px] font-semibold bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-emerald-700 transition cursor-pointer"
                  >
                    Discharged
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 3: Billing & Invoicing */}
      {currentSubTab === 'billing' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Consultation Fee Billing & Invoices</h3>
              <p className="text-xs text-slate-500">Recorded patient payments, payment modes, and receipts</p>
            </div>
            <button
              onClick={() => setIsBillingModalOpen(true)}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Record New Payment</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Patient</th>
                  <th className="py-3 px-4">Doctor & Service</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Payment Mode</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {billingInvoices.map(inv => (
                  <tr key={inv.invoiceId} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-indigo-600">{inv.invoiceId}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{inv.patientName}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-slate-800">{inv.doctorName}</p>
                      <p className="text-[11px] text-slate-500">{inv.service}</p>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{inv.date}</td>
                    <td className="py-3 px-4 text-slate-600">{inv.paymentMode}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">₹{inv.amount}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                      {inv.receiptNumber}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Walk-In Booking */}
      {isWalkInModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Book Walk-In / Phone Consultation</h3>
                  <p className="text-xs text-slate-500">Front desk patient scheduling</p>
                </div>
              </div>
              <button 
                onClick={() => setIsWalkInModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleWalkInBooking} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Chandra"
                    value={walkInForm.patientName}
                    onChange={(e) => setWalkInForm({ ...walkInForm, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    placeholder="+91 98000 00000"
                    value={walkInForm.patientPhone}
                    onChange={(e) => setWalkInForm({ ...walkInForm, patientPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Doctor</label>
                  <select
                    value={walkInForm.doctorId}
                    onChange={(e) => {
                      const doc = doctors.find(d => d.id === e.target.value);
                      setWalkInForm({ 
                        ...walkInForm, 
                        doctorId: e.target.value,
                        doctorName: doc ? doc.name : '',
                        doctorSpeciality: doc ? doc.speciality : '',
                        fee: doc ? doc.fee : 1200
                      });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.speciality})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Date</label>
                  <input
                    type="date"
                    value={walkInForm.date}
                    onChange={(e) => setWalkInForm({ ...walkInForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Slot Time</label>
                  <select
                    value={walkInForm.time}
                    onChange={(e) => setWalkInForm({ ...walkInForm, time: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="10:00 AM">10:00 AM (Morning)</option>
                    <option value="11:30 AM">11:30 AM (Morning)</option>
                    <option value="02:00 PM">02:00 PM (Afternoon)</option>
                    <option value="04:30 PM">04:30 PM (Evening)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                  <input
                    type="number"
                    value={walkInForm.fee}
                    onChange={(e) => setWalkInForm({ ...walkInForm, fee: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reason for Visit</label>
                <input
                  type="text"
                  value={walkInForm.reason}
                  onChange={(e) => setWalkInForm({ ...walkInForm, reason: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsWalkInModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Confirm Walk-In Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Record Payment */}
      {isBillingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <Receipt className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Record Fee Payment</h3>
                  <p className="text-xs text-slate-500">Generate receipt and invoice</p>
                </div>
              </div>
              <button 
                onClick={() => setIsBillingModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBilling} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={billingForm.patientName}
                  onChange={(e) => setBillingForm({ ...billingForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Consulting Doctor</label>
                <input
                  type="text"
                  value={billingForm.doctorName}
                  onChange={(e) => setBillingForm({ ...billingForm, doctorName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Amount (₹)</label>
                  <input
                    type="number"
                    value={billingForm.amount}
                    onChange={(e) => setBillingForm({ ...billingForm, amount: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Payment Mode</label>
                  <select
                    value={billingForm.paymentMode}
                    onChange={(e) => setBillingForm({ ...billingForm, paymentMode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="UPI / Digital">UPI / Digital</option>
                    <option value="Credit Card">Credit / Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Insurance Co-pay">Insurance Co-pay</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBillingModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Issue Receipt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 3: Check-in Visitor */}
      {isVisitorModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Check-In Patient Arrival</h3>
                  <p className="text-xs text-slate-500">Log waiting room token and accompanying visitors</p>
                </div>
              </div>
              <button 
                onClick={() => setIsVisitorModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCheckInVisitor} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aaryan Kumar"
                  value={visitorForm.patientName}
                  onChange={(e) => setVisitorForm({ ...visitorForm, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Consulting Doctor</label>
                <select
                  value={visitorForm.assignedDoctor}
                  onChange={(e) => setVisitorForm({ ...visitorForm, assignedDoctor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.name}>{d.name} ({d.opdRoom || 'OPD Suite'})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Accompanied By</label>
                <input
                  type="text"
                  placeholder="Self / Spouse / Family member"
                  value={visitorForm.accompaniedBy}
                  onChange={(e) => setVisitorForm({ ...visitorForm, accompaniedBy: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsVisitorModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Generate Waiting Token
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
