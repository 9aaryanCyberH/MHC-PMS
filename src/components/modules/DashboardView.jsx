import React, { useState } from 'react';
import { 
  CalendarClock, 
  CalendarCheck, 
  Pill, 
  FileText, 
  Activity, 
  ArrowRight, 
  Clock, 
  MapPin, 
  UserCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Heart,
  ChevronRight,
  ShieldCheck,
  Stethoscope,
  TrendingDown,
  CalendarPlus,
  Search,
  ExternalLink,
  Users,
  Printer,
  ShieldAlert,
  FileCheck,
  Video
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const DashboardView = () => {
  const { 
    patientProfile, 
    appointments, 
    prescriptions, 
    medicalRecords, 
    labRecords,
    doctors,
    setActiveTab, 
    navigateToCheckAvailability,
    setIsBookingModalOpen
  } = useApp();

  // State for interactive quick doctor availability search widget on the dashboard
  const [quickSpeciality, setQuickSpeciality] = useState('All Specialities');
  const [quickDate, setQuickDate] = useState('2026-09-18');

  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');
  const nextAppointment = upcomingAppointments[0];
  const recentPrescription = prescriptions[0];
  const activeDiagnosis = medicalRecords.diagnoses[0];
  const activeTreatment = medicalRecords.treatments[0];
  const phq9Record = labRecords.find(l => l.id === 'LAB-2026-490');
  const thyroidRecord = labRecords.find(l => l.id === 'LAB-2026-771');

  // Care team members
  const careTeam = [
    {
      name: "Dr. Shashank Pandey",
      role: "Lead Consulting Psychiatrist",
      speciality: "Adult & Neuropsychiatry",
      avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
      id: "DOC-001"
    },
    {
      name: "Dr. Rajesh Verma",
      role: "Senior Clinical Psychologist",
      speciality: "Cognitive Behavioral Therapy (CBT)",
      avatar: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
      id: "DOC-003"
    },
    {
      name: "Preeti Sharma",
      role: "Nurse Coordinator & Triage",
      speciality: "OPD Psychiatric Care & Vitals",
      avatar: "https://images.unsplash.com/photo-1594824813718-495449704e6c?auto=format&fit=crop&q=80&w=300",
      id: "STAFF-01"
    }
  ];

  const handleQuickAvailabilitySearch = (e) => {
    e.preventDefault();
    navigateToCheckAvailability();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* 1. Welcome & Mental Wellness Overview Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-8 shadow-xl">
        {/* Soft ambient glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 bottom-0 -mb-10 w-64 h-64 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2.5">
              <span className="text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-3 py-0.5 rounded-full border border-indigo-500/30">
                Patient Portal
              </span>
              <span className="text-xs text-indigo-200">Patient ID: <strong className="font-mono bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-700/50">{patientProfile.id}</strong></span>
              <span className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Care Plan Active
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Welcome back, {patientProfile.fullName}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 max-w-2xl leading-relaxed">
              Your mental wellness portal: check psychiatrist availability in real-time, schedule consultations, view electronic health records (EHR), track active prescriptions, and review psychometric scores.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => navigateToCheckAvailability()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-linear-to-r from-indigo-500 to-blue-500 text-white font-bold text-xs shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition cursor-pointer"
            >
              <CalendarClock className="w-4 h-4 text-white" />
              <span>Check Doctor Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur transition border border-white/20 cursor-pointer"
            >
              <CalendarPlus className="w-4 h-4 text-indigo-300" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Allergy & Safety Warning (Patient Safety Record) */}
      {medicalRecords.allergies && medicalRecords.allergies.length > 0 && (
        <div className="p-3.5 px-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold">Allergy Alert on File: </span>
              <span>{medicalRecords.allergies.map(a => `${a.substance} (${a.severity})`).join(', ')}</span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('records')}
            className="text-amber-800 hover:text-amber-950 font-bold underline text-[11px] shrink-0 self-end sm:self-auto cursor-pointer"
          >
            Review Health Records
          </button>
        </div>
      )}

      {/* 2. Quick Summary Telemetry Cards (4 Key Metrics) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Appointment Card */}
        <div 
          onClick={() => setActiveTab('appointments')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition shadow-2xs">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
              {upcomingAppointments.length} Scheduled
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">Upcoming Appointment</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {nextAppointment ? nextAppointment.displayDate : 'No pending sessions'}
          </h4>
          <p className="text-[11px] text-indigo-700 font-medium mt-0.5 truncate">
            {nextAppointment ? `with ${nextAppointment.doctorName}` : 'Schedule a consultation'}
          </p>
        </div>

        {/* Active Prescriptions Card */}
        <div 
          onClick={() => setActiveTab('prescriptions-lab')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition shadow-2xs">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
              Active e-Rx
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">Active Prescription</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {recentPrescription.medicines[0].name}
          </h4>
          <p className="text-[11px] text-emerald-700 font-medium mt-0.5 truncate">
            {recentPrescription.medicines.length} medications on regimen
          </p>
        </div>

        {/* Psychometric Score Card (PHQ-9) */}
        <div 
          onClick={() => setActiveTab('prescriptions-lab')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition shadow-2xs">
              <TrendingDown className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
              Remission
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">PHQ-9 Psychometric</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            Score: 4 / 27 (Minimal)
          </h4>
          <p className="text-[11px] text-teal-700 font-medium mt-0.5 truncate">
            Improved from baseline 12/27
          </p>
        </div>

        {/* Primary Diagnosis & Treatment Card */}
        <div 
          onClick={() => setActiveTab('records')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition shadow-2xs">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Phase 3
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">Primary Diagnosis</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {activeDiagnosis.title}
          </h4>
          <p className="text-[11px] text-blue-700 font-medium mt-0.5 truncate">
            {activeTreatment.name}
          </p>
        </div>
      </div>

      {/* 3. Main Grid: Consultation Spotlight & Availability Search Widget (Left) + Records/Vitals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Appointment Showcase + Doctor Availability Widget */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Consultation Spotlight */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Next Consultation Spotlight</h3>
                  <p className="text-[11px] text-slate-500">Confirmed psychiatric outpatient session</p>
                </div>
              </div>
              <Badge variant="primary">Upcoming Session</Badge>
            </div>

            {nextAppointment ? (
              <div className="mt-5 p-5 rounded-2xl bg-linear-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={nextAppointment.doctorAvatar}
                      alt={nextAppointment.doctorName}
                      className="w-13 h-13 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">{nextAppointment.doctorName}</h4>
                      <p className="text-xs font-medium text-indigo-700">{nextAppointment.doctorSpeciality}</p>
                      <span className="text-[10px] text-slate-500 font-mono bg-white px-2 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        Booking ID: {nextAppointment.id}
                      </span>
                    </div>
                  </div>

                  <div className="sm:text-right space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-xl shadow-xs text-xs font-bold text-slate-800 border border-slate-200">
                      <Clock className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{nextAppointment.time}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-700">{nextAppointment.displayDate}</p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Consultation Modality:</span>
                    <span className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                      {nextAppointment.type === 'Online Consultation' ? (
                        <>
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                          <span>Tele-Therapy Video Link</span>
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In-Person Clinic Visit</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Consultation Suite:</span>
                    <span className="font-semibold text-slate-800 block mt-0.5">{nextAppointment.location}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Clinical Reason for Visit:</span>
                    <span className="text-slate-700 block mt-0.5">{nextAppointment.reason}</span>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-end gap-2.5">
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-800 bg-indigo-100/80 hover:bg-indigo-200 transition cursor-pointer"
                  >
                    View All Appointments
                  </button>
                  <button
                    onClick={() => navigateToCheckAvailability(nextAppointment.doctorId)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition cursor-pointer"
                  >
                    Check Doctor's Availability
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-500">You currently have no upcoming appointments scheduled.</p>
                <button
                  onClick={() => navigateToCheckAvailability()}
                  className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
                >
                  Find Available Specialist Slots
                </button>
              </div>
            )}
          </div>

          {/* Quick Doctor Availability Search Widget */}
          <div className="p-6 rounded-3xl bg-linear-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      Specialist Availability Finder
                    </span>
                    <span className="text-xs text-indigo-200">Real-Time Schedule</span>
                  </div>
                  <h3 className="text-lg font-bold">Query Doctor Availability & Timetables</h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    Search certified clinical psychologists and consulting psychiatrists by medical discipline, date, and preferred time window.
                  </p>
                </div>
                <div className="hidden sm:flex w-14 h-14 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 items-center justify-center text-indigo-300 shrink-0">
                  <CalendarClock className="w-7 h-7" />
                </div>
              </div>

              {/* Quick Search Form */}
              <form onSubmit={handleQuickAvailabilitySearch} className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-semibold text-indigo-200 mb-1">Medical Speciality</label>
                  <select 
                    value={quickSpeciality} 
                    onChange={(e) => setQuickSpeciality(e.target.value)}
                    className="w-full text-xs bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3 py-2 outline-hidden focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                  >
                    <option value="All Specialities">All Specialities</option>
                    <option value="Adult Psychiatry">Adult Psychiatry</option>
                    <option value="Clinical Psychology">Clinical Psychology</option>
                    <option value="Neuropsychiatry">Neuropsychiatry</option>
                    <option value="Sleep & Chronotherapy">Sleep Disorders</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-indigo-200 mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    value={quickDate}
                    onChange={(e) => setQuickDate(e.target.value)}
                    className="w-full text-xs bg-slate-800/90 text-white border border-slate-700 rounded-xl px-3 py-2 outline-hidden focus:ring-2 focus:ring-indigo-400 cursor-pointer"
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer h-[35px]"
                  >
                    <Search className="w-3.5 h-3.5" />
                    <span>Search Slots</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Care Team Summary */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Your Assigned Care Team</h3>
                  <p className="text-[11px] text-slate-500">Dedicated clinicians managing your mental health plan</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTab('doctors')}
                className="text-xs font-bold text-indigo-700 hover:text-indigo-900 hover:underline cursor-pointer"
              >
                Specialist Directory →
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {careTeam.map((member, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 flex flex-col justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={member.avatar} 
                      alt={member.name} 
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{member.name}</h4>
                      <p className="text-[11px] text-indigo-700 font-medium">{member.role}</p>
                    </div>
                  </div>
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500">{member.speciality}</span>
                    {member.id.startsWith('DOC') && (
                      <button
                        onClick={() => navigateToCheckAvailability(member.id)}
                        className="text-[11px] font-bold text-indigo-700 hover:underline cursor-pointer"
                      >
                        Availability
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Prescriptions, Lab Reports & Baseline Vitals */}
        <div className="space-y-6">
          {/* Active Prescriptions (e-Rx) Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Active Prescriptions (e-Rx)</h3>
              </div>
              <button 
                onClick={() => setActiveTab('prescriptions-lab')}
                className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="mt-3.5 space-y-3">
              <div className="p-3 bg-emerald-50/50 rounded-2xl border border-emerald-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-emerald-950 font-mono">{recentPrescription.id}</span>
                  <span className="text-[10px] text-emerald-800 font-medium">{recentPrescription.date}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1">Prescribed by: <strong>{recentPrescription.doctor}</strong></p>
              </div>

              <div className="space-y-2">
                {recentPrescription.medicines.map((med, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs flex items-start justify-between">
                    <div>
                      <p className="font-bold text-slate-800">{med.name} <span className="font-normal text-slate-500">({med.strength})</span></p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{med.frequency} • {med.duration}</p>
                    </div>
                    <Badge variant="primary" className="text-[10px]">{med.dosage}</Badge>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveTab('prescriptions-lab')}
                className="w-full mt-2 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Electronic Rx</span>
              </button>
            </div>
          </div>

          {/* Validated Psychometric Scales & Diagnostic Lab Scores */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900">Psychometrics & Lab Reports</h3>
              </div>
              <button 
                onClick={() => setActiveTab('prescriptions-lab')}
                className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
              >
                Full Results
              </button>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              {/* PHQ-9 Snapshot */}
              {phq9Record && (
                <div className="p-3 rounded-2xl bg-teal-50/60 border border-teal-100">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-950">PHQ-9 Depression Index</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full">Score 4/27</span>
                  </div>
                  <p className="text-[11px] text-teal-800 mt-1">{phq9Record.resultSummary}</p>
                </div>
              )}

              {/* Thyroid Panel Snapshot */}
              {thyroidRecord && (
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">Thyroid Profile (TSH)</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-full">Normal</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">TSH: 2.18 µIU/mL • Euthyroid status confirmed.</p>
                </div>
              )}
            </div>
          </div>

          {/* Baseline Vitals Telemetry */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900">Baseline Vitals Telemetry</h3>
              </div>
              <button 
                onClick={() => setActiveTab('records')}
                className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
              >
                EHR Vitals
              </button>
            </div>

            <div className="mt-3.5 grid grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-slate-500 text-[10px]">Blood Pressure</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{medicalRecords.vitals.bloodPressure}</p>
                <span className="text-[10px] text-emerald-700 font-medium">Optimal</span>
              </div>

              <div className="p-3 rounded-2xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-slate-500 text-[10px]">Resting Heart Rate</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">{medicalRecords.vitals.heartRate}</p>
                <span className="text-[10px] text-emerald-700 font-medium">Normal</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[10px]">BMI Score</span>
                <p className="font-bold text-slate-800 text-sm mt-0.5">{medicalRecords.vitals.bmi}</p>
                <span className="text-[10px] text-slate-500 font-medium">Weight: {medicalRecords.vitals.weight}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-500 text-[10px]">Last Recorded</span>
                <p className="font-bold text-slate-800 text-xs mt-0.5">{medicalRecords.vitals.lastRecorded}</p>
                <span className="text-[10px] text-slate-500 truncate block">Triage OPD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
