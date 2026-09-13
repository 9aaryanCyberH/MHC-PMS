import React, { useState } from 'react';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  Star, 
  Clock, 
  Calendar, 
  CalendarClock, 
  ChevronRight, 
  User, 
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { specialitiesList } from '../../data/mockDoctors';
import { Badge } from '../common/Badge';
import { DoctorProfileModal } from './DoctorProfileModal';

export const DoctorsView = () => {
  const { doctors, navigateToCheckAvailability } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('All Specialities');
  const [selectedDoctorForModal, setSelectedDoctorForModal] = useState(null);

  const filteredDoctors = doctors.filter((doc) => {
    const matchesSpeciality = selectedSpeciality === 'All Specialities' || doc.speciality === selectedSpeciality;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.speciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpeciality && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              Clinical Specialists
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Physician Directory</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Doctor Directory & Specialities
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Explore board-certified psychiatrists, clinical psychologists, and therapists with transparent credentials and consultation schedules.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by doctor name, speciality, condition (e.g. Anxiety, ADHD)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Speciality Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-1 pb-1 scrollbar-none">
          {specialitiesList.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpeciality(spec)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedSpeciality === spec
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor Cards Grid */}
      {filteredDoctors.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <Stethoscope className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No Specialists Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try resetting your search query or speciality filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedSpeciality('All Specialities');
            }}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-xs hover:border-indigo-400 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                {/* Doctor Head */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/80 shadow-sm flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/70 inline-block mb-1">
                      {doctor.speciality}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition truncate">
                      {doctor.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">{doctor.qualification}</p>
                  </div>
                </div>

                {/* Badges / Ratings */}
                <div className="flex items-center justify-between mt-3.5 pt-3 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{doctor.rating}</span>
                    <span className="text-slate-400 font-normal">({doctor.reviewCount})</span>
                  </div>
                  <span className="text-[11px] text-slate-600 font-medium">
                    <strong>{doctor.experience}</strong> Exp
                  </span>
                  <span className="text-[11px] font-bold text-indigo-900 bg-indigo-50/80 px-2 py-0.5 rounded">
                    ₹{doctor.consultationFee}
                  </span>
                </div>

                {/* Timings & Availability Status */}
                <div className="mt-3 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Available Days:</span>
                    <span className="font-semibold text-slate-800 truncate max-w-[150px]">{doctor.availableDays.join(', ')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Hours:</span>
                    <span className="text-slate-700">{doctor.timings}</span>
                  </div>
                </div>

                {/* Expertise tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {doctor.expertise.slice(0, 3).map((exp, i) => (
                    <span key={i} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: View Profile + Check Availability */}
              <div className="mt-5 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2">
                <button
                  onClick={() => setSelectedDoctorForModal(doctor)}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition text-center cursor-pointer"
                >
                  View Profile
                </button>
                <button
                  onClick={() => navigateToCheckAvailability(doctor.id)}
                  className="py-2 px-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-xs transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>Check Availability</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Doctor Detailed Profile Modal */}
      <DoctorProfileModal
        doctor={selectedDoctorForModal}
        isOpen={!!selectedDoctorForModal}
        onClose={() => setSelectedDoctorForModal(null)}
        onCheckAvailability={(docId) => navigateToCheckAvailability(docId)}
      />
    </div>
  );
};
