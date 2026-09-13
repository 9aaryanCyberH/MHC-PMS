import React from 'react';
import { 
  X, 
  Stethoscope, 
  Award, 
  GraduationCap, 
  Clock, 
  Calendar, 
  MapPin, 
  Star, 
  Languages, 
  CalendarClock, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const DoctorProfileModal = ({ doctor, isOpen, onClose, onCheckAvailability }) => {
  if (!isOpen || !doctor) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div 
          className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl my-8 border border-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900 text-white p-6 relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img
                src={doctor.avatar}
                alt={doctor.name}
                className="w-20 h-20 rounded-2xl object-cover border-2 border-indigo-400 shadow-lg"
              />
              <div className="text-center sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2.5 py-0.5 rounded-full border border-indigo-500/40">
                  {doctor.speciality}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-1">{doctor.name}</h3>
                <p className="text-xs text-indigo-200">{doctor.title}</p>
                <div className="flex items-center justify-center sm:justify-start gap-3 mt-2 text-xs text-slate-300">
                  <span className="flex items-center gap-1 text-amber-300 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    {doctor.rating} ({doctor.reviewCount} Reviews)
                  </span>
                  <span>•</span>
                  <span>{doctor.experience} Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto text-xs">
            {/* Clinical Bio */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-1.5 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-indigo-600" />
                <span>Professional Background</span>
              </h4>
              <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {doctor.bio}
              </p>
            </div>

            {/* Timings & Room Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-900 block flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-indigo-600" />
                  Consultation Schedule
                </span>
                <p className="font-bold text-slate-900">{doctor.availableDays.join(', ')}</p>
                <p className="text-slate-600 text-[11px]">{doctor.timings}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  Clinic Chamber
                </span>
                <p className="font-bold text-slate-900">{doctor.roomNumber}</p>
                <p className="text-slate-600 text-[11px]">Fee: <strong>₹{doctor.consultationFee}</strong> / 30 mins</p>
              </div>
            </div>

            {/* Areas of Expertise */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-indigo-600" />
                <span>Clinical Specializations</span>
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {doctor.expertise.map((item, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Education & Credentials */}
            <div>
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-600" />
                <span>Education & Medical Qualifications</span>
              </h4>
              <ul className="space-y-1.5 text-slate-600">
                {doctor.education.map((edu, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 mt-0.5 flex-shrink-0" />
                    <span>{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-2 text-slate-600 pt-1">
              <Languages className="w-4 h-4 text-slate-400" />
              <span>Languages: <strong>{doctor.languages.join(', ')}</strong></span>
            </div>
          </div>

          {/* Footer Action Bar with Check Availability CTA */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-xl cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onCheckAvailability(doctor.id);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              <CalendarClock className="w-4 h-4" />
              <span>Check Doctor Availability</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
