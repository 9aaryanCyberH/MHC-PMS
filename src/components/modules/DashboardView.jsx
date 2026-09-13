import React from 'react';
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
  Stethoscope
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const DashboardView = () => {
  const { 
    patientProfile, 
    appointments, 
    prescriptions, 
    medicalRecords, 
    doctors,
    setActiveTab, 
    navigateToCheckAvailability 
  } = useApp();

  const upcomingAppointments = appointments.filter(a => a.status === 'Upcoming');
  const nextAppointment = upcomingAppointments[0];
  const recentPrescription = prescriptions[0];
  const recentRecord = medicalRecords.consultations[0];
  const activeDiagnosis = medicalRecords.diagnoses[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 sm:p-8 shadow-lg">
        {/* Soft decorative glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
                Patient Portal Dashboard
              </span>
              <span className="text-xs text-indigo-200">ID: <strong className="font-mono">{patientProfile.id}</strong></span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {patientProfile.fullName}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-200 max-w-xl">
              Track your mental wellness journey, review psychological assessments, manage consultations, and connect with certified clinical specialists.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigateToCheckAvailability()}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold text-xs shadow-lg hover:shadow-indigo-500/25 hover:scale-[1.02] transition cursor-pointer"
            >
              <CalendarClock className="w-4 h-4 text-white" />
              <span>Check Doctor Availability</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setActiveTab('book-appointment')}
              className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold backdrop-blur transition border border-white/20 cursor-pointer"
            >
              <span>Book Appointment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Summary Cards (4 stats) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Appointment */}
        <div 
          onClick={() => setActiveTab('appointments')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
              <CalendarCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full">
              {upcomingAppointments.length} Active
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">Upcoming Appointment</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {nextAppointment ? nextAppointment.displayDate : 'No scheduled sessions'}
          </h4>
          <p className="text-[11px] text-indigo-700 font-medium mt-0.5 truncate">
            {nextAppointment ? `with ${nextAppointment.doctorName}` : 'Book a consultation'}
          </p>
        </div>

        {/* Active Prescriptions */}
        <div 
          onClick={() => setActiveTab('prescriptions-lab')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition">
              <Pill className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Active Rx
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

        {/* Recent Medical Record */}
        <div 
          onClick={() => setActiveTab('records')}
          className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs hover:border-indigo-300 hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
              <FileText className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full">
              Diagnosis
            </span>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-3">Primary Diagnosis</p>
          <h4 className="text-sm font-bold text-slate-900 mt-1 truncate">
            {activeDiagnosis.title}
          </h4>
          <p className="text-[11px] text-blue-700 font-medium mt-0.5 truncate">
            Status: {activeDiagnosis.status}
          </p>
        </div>

        {/* Assigned Doctor / Availability Shortcut */}
        <div 
          onClick={() => navigateToCheckAvailability('DOC-001')}
          className="p-5 rounded-3xl bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200/70 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
              <Stethoscope className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-100 px-2.5 py-0.5 rounded-full">
              Primary Doc
            </span>
          </div>
          <p className="text-xs font-semibold text-indigo-900 mt-3">Consulting Psychiatrist</p>
          <h4 className="text-sm font-bold text-indigo-950 mt-1 truncate">
            {doctors.find(d => d.id === 'DOC-001')?.name || 'Dr. Shashank Pandey'}
          </h4>
          <div className="flex items-center gap-1 text-[11px] text-indigo-700 font-semibold mt-0.5 group-hover:underline">
            <span>Check Availability</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Main Grid: Upcoming Appointment Card + Recent Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Upcoming Appointment Detailed & Check Availability Prompt */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointment Showcase */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-50 text-indigo-700">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">Your Next Appointment</h3>
                  <p className="text-[11px] text-slate-500">Confirmed mental health consultation</p>
                </div>
              </div>
              <Badge variant="primary">Upcoming Session</Badge>
            </div>

            {nextAppointment ? (
              <div className="mt-5 p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 border border-slate-200/80">
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
                      <span className="text-[10px] text-slate-500 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200 mt-1 inline-block">
                        {nextAppointment.id}
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
                    <span className="text-slate-500 block text-[11px]">Consultation Mode:</span>
                    <span className="font-semibold text-slate-800">{nextAppointment.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Location / Room:</span>
                    <span className="font-semibold text-slate-800">{nextAppointment.location}</span>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-slate-500 block text-[11px]">Clinical Reason:</span>
                    <span className="text-slate-700">{nextAppointment.reason}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-end gap-2.5">
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-800 bg-indigo-100/70 hover:bg-indigo-200 transition cursor-pointer"
                  >
                    View in My Appointments
                  </button>
                  <button
                    onClick={() => navigateToCheckAvailability(nextAppointment.doctorId)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition cursor-pointer"
                  >
                    Check Doctor's Schedule
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
                  Find Available Doctor Slots
                </button>
              </div>
            )}
          </div>

          {/* Doctor Availability Shortcut Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="bg-blue-500/30 text-blue-200 border border-blue-400/40 font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Quick Consultation Search
                  </span>
                  <span className="text-xs text-indigo-200">Real-Time Scheduling</span>
                </div>
                <h3 className="text-lg font-bold">Check Doctor Availability & Schedule</h3>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Query real-time specialist timetables by medical department, date, and preferred time window to reserve your consultation slots seamlessly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => navigateToCheckAvailability()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-indigo-950 rounded-xl text-xs font-bold shadow-md hover:bg-indigo-50 transition cursor-pointer"
                  >
                    <span>Launch Availability Checker</span>
                    <ArrowRight className="w-3.5 h-3.5 text-indigo-800" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-indigo-600/30 border border-indigo-400/30 items-center justify-center text-indigo-300">
                <CalendarClock className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Col: Recent Prescription & Recent Medical Records */}
        <div className="space-y-6">
          {/* Recent Prescription Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Pill className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">Recent Prescription</h3>
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
                      <p className="text-[10px] text-slate-500 mt-0.5">{med.frequency}</p>
                    </div>
                    <Badge variant="primary" className="text-[10px]">{med.dosage}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Consultation / Medical Record */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                <h3 className="text-xs font-bold text-slate-900">Recent Medical Record</h3>
              </div>
              <button 
                onClick={() => setActiveTab('records')}
                className="text-[11px] text-indigo-700 font-semibold hover:underline cursor-pointer"
              >
                Full History
              </button>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{recentRecord.doctor}</span>
                  <span className="text-[10px] text-slate-500">{recentRecord.date}</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 font-medium">{recentRecord.department}</p>
                <p className="text-[11px] text-slate-600 mt-2 bg-white p-2 rounded-xl border border-slate-200/80 italic">
                  "{recentRecord.clinicalNotes}"
                </p>
              </div>

              {/* Vitals Summary */}
              <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <p className="text-[10px] font-bold text-indigo-900 uppercase tracking-wider">Latest Recorded Vitals</p>
                <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                  <div>
                    <span className="text-slate-500 text-[10px]">Blood Pressure:</span>
                    <p className="font-bold text-slate-800">{medicalRecords.vitals.bloodPressure}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[10px]">Heart Rate:</span>
                    <p className="font-bold text-slate-800">{medicalRecords.vitals.heartRate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
