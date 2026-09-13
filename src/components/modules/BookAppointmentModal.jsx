import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  Stethoscope, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  MapPin, 
  Video, 
  Building2, 
  ArrowRight, 
  Printer, 
  Share2,
  Sparkles,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const BookAppointmentModal = ({ isOpen, onClose, initialData }) => {
  const { doctors, bookNewAppointment, setActiveTab } = useApp();

  const [step, setStep] = useState('form'); // 'form' | 'summary' | 'confirmed'
  const [doctorId, setDoctorId] = useState(initialData?.doctorId || 'DOC-001');
  const [date, setDate] = useState(initialData?.date || '2026-09-18');
  const [time, setTime] = useState(initialData?.time || '10:00 AM');
  const [type, setType] = useState('In-Person Clinic Consultation');
  const [reason, setReason] = useState('Routine anxiety & mood management follow-up');
  const [confirmedData, setConfirmedData] = useState(null);

  useEffect(() => {
    if (initialData) {
      if (initialData.doctorId) setDoctorId(initialData.doctorId);
      if (initialData.date) setDate(initialData.date);
      if (initialData.time) setTime(initialData.time);
      if (initialData.slotPeriod) {
        setStep('summary');
      } else {
        setStep('form');
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const currentDoctor = doctors.find(d => d.id === doctorId) || doctors[0];

  const handleProceedToSummary = (e) => {
    e.preventDefault();
    setStep('summary');
  };

  const handleConfirmAppointment = () => {
    const formattedDate = new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const newApt = bookNewAppointment({
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      doctorSpeciality: currentDoctor.speciality,
      doctorAvatar: currentDoctor.avatar,
      date: date,
      displayDate: formattedDate,
      time: time,
      type: type,
      location: type.includes('Online') ? 'Telehealth Portal Room #4' : currentDoctor.roomNumber,
      reason: reason,
      fee: currentDoctor.consultationFee
    });

    setConfirmedData(newApt);
    setStep('confirmed');

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // safe fallback
    }
  };

  const handleViewAppointment = () => {
    onClose();
    setActiveTab('appointments');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={step === 'confirmed' ? handleViewAppointment : onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-xl my-8 border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/80">
            <div>
              <div className="flex items-center gap-2">
                <Badge variant="primary" className="text-[10px]">New Appointment</Badge>
                <span className="text-xs text-slate-400">Patient Portal</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {step === 'form' && 'Schedule Appointment'}
                {step === 'summary' && 'Confirm Appointment Details'}
                {step === 'confirmed' && '✓ Appointment Confirmed'}
              </h3>
            </div>
            <button
              onClick={step === 'confirmed' ? handleViewAppointment : onClose}
              className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-6">
            {/* ----------------- STEP 1: FORM ----------------- */}
            {step === 'form' && (
              <form onSubmit={handleProceedToSummary} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Doctor & Speciality</label>
                  <select
                    value={doctorId}
                    onChange={(e) => setDoctorId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-slate-50 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {doctors.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.speciality})</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Date</label>
                    <input
                      type="date"
                      value={date}
                      min="2026-09-13"
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Time Slot</label>
                    <input
                      type="text"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      placeholder="e.g. 10:00 AM"
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Consultation Mode</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setType('In-Person Clinic Consultation')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                        type === 'In-Person Clinic Consultation'
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Building2 className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                      <span>In-Person Clinic</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setType('Online Tele-Therapy Session')}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2 transition cursor-pointer ${
                        type === 'Online Tele-Therapy Session'
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-1 ring-indigo-500'
                          : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Video className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span>Online Tele-Therapy</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Chief Concern / Clinical Reason</label>
                  <textarea
                    rows={2}
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="Brief description of symptoms or consultation goal..."
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow transition cursor-pointer"
                  >
                    Review Summary
                  </button>
                </div>
              </form>
            )}

            {/* ----------------- STEP 2: SUMMARY ----------------- */}
            {step === 'summary' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80">
                  <h4 className="text-xs font-bold text-indigo-950 uppercase tracking-wider mb-3">
                    Appointment Booking Summary
                  </h4>

                  <div className="space-y-2.5 text-xs text-slate-800">
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Doctor:</span>
                      <span className="font-bold text-slate-900">{currentDoctor.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Speciality:</span>
                      <span className="font-semibold text-indigo-800">{currentDoctor.speciality}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Date:</span>
                      <span className="font-bold text-slate-900">
                        {new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Time:</span>
                      <span className="font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        {time}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Mode:</span>
                      <span className="font-semibold text-slate-900">{type}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-indigo-100">
                      <span className="text-slate-500 font-medium">Room / Location:</span>
                      <span className="font-semibold text-slate-900">{currentDoctor.roomNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 pt-2">
                      <span className="text-slate-500 font-medium">Consultation Fee:</span>
                      <span className="font-extrabold text-indigo-950 text-sm">₹{currentDoctor.consultationFee}</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs">
                  <span className="text-slate-500 text-[11px] block">Reason for visit:</span>
                  <p className="text-slate-800 italic mt-0.5">"{reason}"</p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep('form')}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Edit Details
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmAppointment}
                    className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md hover:shadow-indigo-700/20 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Confirm Appointment</span>
                  </button>
                </div>
              </div>
            )}

            {/* ----------------- STEP 3: CONFIRMED ----------------- */}
            {step === 'confirmed' && confirmedData && (
              <div className="text-center space-y-4 animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Booking Confirmed
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mt-2">
                    ✓ Appointment Confirmed
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Your appointment has been recorded in MHC-PMS and synced with the clinical calendar.
                  </p>
                </div>

                {/* Confirmed Details Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-2">
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Appointment ID:</span>
                    <span className="font-mono font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      {confirmedData.id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Doctor:</span>
                    <span className="font-bold text-slate-900">{confirmedData.doctorName}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Date:</span>
                    <span className="font-semibold text-slate-900">{confirmedData.displayDate}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Time:</span>
                    <span className="font-semibold text-indigo-700">{confirmedData.time}</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                    <span className="text-slate-500">Status:</span>
                    <Badge variant="success">Upcoming</Badge>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span className="text-slate-500">Location:</span>
                    <span className="font-medium text-slate-800">{confirmedData.location}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleViewAppointment}
                    className="w-full py-2.5 px-4 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md transition cursor-pointer"
                  >
                    View in My Appointments
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
