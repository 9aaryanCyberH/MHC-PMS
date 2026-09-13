import React, { useState, useEffect } from 'react';
import { 
  CalendarClock, 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Stethoscope, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles, 
  RotateCcw, 
  CalendarDays,
  Check,
  Building,
  Info,
  CalendarCheck2,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { specialitiesList } from '../../data/mockDoctors';
import { Badge } from '../common/Badge';

export const AvailabilityView = () => {
  const { 
    doctors, 
    preselectedDoctorId, 
    setPreselectedDoctorId,
    openBookingForSlot 
  } = useApp();

  // Form State
  const [selectedSpeciality, setSelectedSpeciality] = useState('All Specialities');
  const [selectedDoctorId, setSelectedDoctorId] = useState(preselectedDoctorId || 'DOC-001');
  const [selectedDate, setSelectedDate] = useState('2026-09-18');
  const [preferredTimePeriod, setPreferredTimePeriod] = useState('Morning'); // 'Morning' | 'Afternoon' | 'Evening' | 'Any Time'

  // Availability Check Execution State
  const [hasChecked, setHasChecked] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Sync if preselectedDoctorId changes
  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
      const doc = doctors.find(d => d.id === preselectedDoctorId);
      if (doc) {
        setSelectedSpeciality(doc.speciality);
      }
      setHasChecked(false);
      setCheckResult(null);
      setSelectedSlot(null);
    }
  }, [preselectedDoctorId, doctors]);

  // Filter doctors based on selected speciality
  const filteredDoctors = selectedSpeciality === 'All Specialities'
    ? doctors
    : doctors.filter(d => d.speciality === selectedSpeciality);

  // Keep selected doctor valid when speciality changes
  useEffect(() => {
    if (filteredDoctors.length > 0 && !filteredDoctors.some(d => d.id === selectedDoctorId)) {
      setSelectedDoctorId(filteredDoctors[0].id);
      setHasChecked(false);
      setCheckResult(null);
    }
  }, [selectedSpeciality]);

  const activeDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  // Logic to simulate availability schedule (Main vs Alternate Flow)
  const handleCheckAvailability = () => {
    setIsChecking(true);
    setSelectedSlot(null);

    setTimeout(() => {
      setIsChecking(false);
      setHasChecked(true);

      const targetDate = new Date(selectedDate);
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayOfWeek = dayNames[targetDate.getDay()];

      // Check if doctor practices on this day of week
      const isDoctorWorkingToday = activeDoctor.availableDays.includes(dayOfWeek);

      // Check if slots exist for preferred time period
      let availableSlots = [];
      if (isDoctorWorkingToday) {
        if (preferredTimePeriod === 'Any Time') {
          availableSlots = [
            ...(activeDoctor.slots.Morning || []),
            ...(activeDoctor.slots.Afternoon || []),
            ...(activeDoctor.slots.Evening || [])
          ];
        } else {
          availableSlots = activeDoctor.slots[preferredTimePeriod] || [];
        }
      }

      if (!isDoctorWorkingToday || availableSlots.length === 0) {
        // ALTERNATE FLOW: Doctor is Unavailable
        let unavailabilityReason = '';
        if (!isDoctorWorkingToday) {
          unavailabilityReason = `${activeDoctor.name} does not have clinic hours on ${dayOfWeek}s. (Regular Consultation Days: ${activeDoctor.availableDays.join(', ')})`;
        } else {
          unavailabilityReason = `All slots for ${preferredTimePeriod} on ${selectedDate} are either fully booked or outside ${activeDoctor.name}'s shift timings.`;
        }

        // Find alternative doctors in the same speciality
        const otherDoctors = doctors.filter(d => d.id !== activeDoctor.id && (selectedSpeciality === 'All Specialities' || d.speciality === selectedSpeciality));

        setCheckResult({
          isAvailable: false,
          dayOfWeek,
          unavailabilityReason,
          suggestedDoctors: otherDoctors,
          nextAvailableDay: activeDoctor.availableDays[0]
        });
      } else {
        // MAIN FLOW: Doctor is Available
        setCheckResult({
          isAvailable: true,
          dayOfWeek,
          doctor: activeDoctor,
          slots: availableSlots,
          displayDate: new Date(selectedDate).toLocaleDateString('en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })
        });
      }
    }, 400);
  };

  // Fast demo presets for examiners
  const setPresetAvailable = () => {
    setSelectedSpeciality('Psychiatrist');
    setSelectedDoctorId('DOC-001'); // Dr. Shashank Pandey
    setSelectedDate('2026-09-18'); // Friday (working day)
    setPreferredTimePeriod('Morning');
    setHasChecked(false);
    setCheckResult(null);
  };

  const setPresetUnavailable = () => {
    setSelectedSpeciality('Psychiatrist');
    setSelectedDoctorId('DOC-001'); // Dr. Shashank Pandey
    setSelectedDate('2026-09-20'); // Sunday (Off-day)
    setPreferredTimePeriod('Evening');
    setHasChecked(false);
    setCheckResult(null);
  };

  const handleBookSelectedSlot = () => {
    if (!selectedSlot || !checkResult || !checkResult.isAvailable) return;

    openBookingForSlot({
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      doctorSpeciality: activeDoctor.speciality,
      doctorAvatar: activeDoctor.avatar,
      date: selectedDate,
      displayDate: checkResult.displayDate,
      time: selectedSlot,
      slotPeriod: preferredTimePeriod,
      location: activeDoctor.roomNumber,
      fee: activeDoctor.consultationFee
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              Specialist Consultation
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Doctor Availability Schedule</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Check Doctor Availability
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Query real-time doctor consultation schedules before proceeding with appointment reservations.
          </p>
        </div>

        {/* Clinic Schedule Presets */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200">
          <span className="text-[11px] font-semibold text-slate-600 px-2 hidden sm:inline">
            Schedule Samples:
          </span>
          <button
            onClick={setPresetAvailable}
            className="px-2.5 py-1 text-[11px] font-semibold bg-white text-emerald-700 hover:bg-emerald-50 rounded-xl shadow-xs border border-emerald-200 transition cursor-pointer"
            title="Load Dr. Shashank Pandey (Friday Clinic)"
          >
            Friday Clinic (Open)
          </button>
          <button
            onClick={setPresetUnavailable}
            className="px-2.5 py-1 text-[11px] font-semibold bg-white text-rose-700 hover:bg-rose-50 rounded-xl shadow-xs border border-rose-200 transition cursor-pointer"
            title="Load Sunday (Off-hours)"
          >
            Sunday Clinic (Closed)
          </button>
        </div>
      </div>

      {/* Consultation Criteria Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
          <CalendarClock className="w-4 h-4 text-indigo-600" />
          <span>Consultation Search Criteria</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. Select Speciality */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Medical Speciality
            </label>
            <div className="relative">
              <select
                value={selectedSpeciality}
                onChange={(e) => {
                  setSelectedSpeciality(e.target.value);
                  setHasChecked(false);
                }}
                className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white text-xs text-slate-800 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                {specialitiesList.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Filter by psychiatric division</span>
          </div>

          {/* 2. Select Doctor */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              2. Attending Specialist
            </label>
            <div className="relative">
              <select
                value={selectedDoctorId}
                onChange={(e) => {
                  setSelectedDoctorId(e.target.value);
                  setHasChecked(false);
                }}
                className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white text-xs text-slate-800 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                {filteredDoctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.speciality}
                  </option>
                ))}
              </select>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Select doctor for appointment</span>
          </div>

          {/* 3. Select Date */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              3. Appointment Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                min="2026-09-13"
                max="2026-12-31"
                onChange={(e) => {
                  setSelectedDate(e.target.value);
                  setHasChecked(false);
                }}
                className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white text-xs text-slate-800 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              />
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">e.g. 18 September 2026</span>
          </div>

          {/* 4. Preferred Time Period */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              4. Preferred Time Window
            </label>
            <div className="relative">
              <select
                value={preferredTimePeriod}
                onChange={(e) => {
                  setPreferredTimePeriod(e.target.value);
                  setHasChecked(false);
                }}
                className="w-full px-3 py-2.5 bg-slate-50 hover:bg-white text-xs text-slate-800 font-medium rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              >
                <option value="Morning">Morning (09:00 AM - 12:00 PM)</option>
                <option value="Afternoon">Afternoon (12:00 PM - 04:30 PM)</option>
                <option value="Evening">Evening (04:30 PM - 08:00 PM)</option>
                <option value="Any Time">All Day / Any Available Slot</option>
              </select>
            </div>
            <span className="text-[10px] text-slate-400 mt-1 block">Patient's preferred slot bracket</span>
          </div>
        </div>

        {/* Selected Doctor Preview Strip */}
        {activeDoctor && (
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <img
                src={activeDoctor.avatar}
                alt={activeDoctor.name}
                className="w-10 h-10 rounded-full object-cover border border-indigo-500"
              />
              <div>
                <p className="font-bold text-slate-900">{activeDoctor.name} <span className="font-normal text-slate-500">({activeDoctor.qualification})</span></p>
                <p className="text-[11px] text-indigo-700 font-medium">
                  {activeDoctor.speciality} • {activeDoctor.experience} Exp • Consultation Fee: ₹{activeDoctor.consultationFee}
                </p>
              </div>
            </div>
            <div className="text-[11px] text-slate-600 sm:text-right">
              <span className="text-slate-400">Regular Working Days:</span>
              <p className="font-semibold text-slate-800">{activeDoctor.availableDays.join(', ')}</p>
            </div>
          </div>
        )}

        {/* 5. Click "Check Availability" Action Button */}
        <div className="mt-6 flex items-center justify-end">
          <button
            onClick={handleCheckAvailability}
            disabled={isChecking}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md hover:shadow-indigo-700/20 transition cursor-pointer disabled:opacity-75"
          >
            {isChecking ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Checking Doctor's Schedule...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Check Availability</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Output Section: Main Flow vs Alternate Flow Results */}
      {hasChecked && checkResult && (
        <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          {checkResult.isAvailable ? (
            /* ============================================================
               MAIN FLOW: DOCTOR IS AVAILABLE
               ============================================================ */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-emerald-100 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        Doctor Available
                      </span>
                      <span className="text-xs text-slate-400">Open Consultation Slots</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                      Available Appointment Slots Found
                    </h3>
                  </div>
                </div>

                <div className="text-xs text-slate-600 sm:text-right">
                  <p><strong>Doctor:</strong> {checkResult.doctor.name}</p>
                  <p><strong>Speciality:</strong> {checkResult.doctor.speciality}</p>
                  <p><strong>Date:</strong> {checkResult.displayDate} ({checkResult.dayOfWeek})</p>
                </div>
              </div>

              {/* Slot Cards Grid */}
              <div className="mt-6">
                <p className="text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-indigo-600" />
                  <span>Available Consultation Slots for {checkResult.displayDate}:</span>
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {checkResult.slots.map((slot) => {
                    const isSelected = selectedSlot === slot;
                    return (
                      <div
                        key={slot}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-4 rounded-2xl border transition cursor-pointer text-center relative ${
                          isSelected
                            ? 'bg-indigo-50 border-indigo-600 shadow-md ring-2 ring-indigo-500'
                            : 'bg-white border-slate-200 hover:border-indigo-400 hover:shadow-xs'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px]">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <p className="text-base font-extrabold text-slate-900">{slot}</p>
                        <p className="text-[10px] text-slate-500 mt-0.5">30 Mins Consultation</p>
                        
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSlot(slot);
                          }}
                          className={`mt-2.5 w-full py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                            isSelected
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-800'
                          }`}
                        >
                          {isSelected ? 'Selected' : 'Select Slot'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Slot Summary & Book Appointment Action */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/70 p-4 rounded-2xl">
                <div>
                  <span className="text-[11px] text-slate-500 block">Current Selection:</span>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedSlot ? (
                      <>
                        {selectedSlot} on {checkResult.displayDate} with {checkResult.doctor.name}
                      </>
                    ) : (
                      <span className="text-slate-400 font-normal italic">
                        Please click "Select Slot" above to proceed with booking.
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setHasChecked(false);
                      setCheckResult(null);
                      setSelectedSlot(null);
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Reset Search
                  </button>
                  <button
                    onClick={handleBookSelectedSlot}
                    disabled={!selectedSlot}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-md transition cursor-pointer"
                  >
                    <span>Proceed to Book Appointment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================
               ALTERNATE FLOW: DOCTOR UNAVAILABLE
               ============================================================ */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-200 shadow-sm animate-in fade-in duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-5 border-b border-rose-100 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        Doctor Unavailable
                      </span>
                      <span className="text-xs text-slate-500 font-medium">Alternate Schedule Options</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mt-1">
                      No Slots Available for Selected Schedule
                    </h3>
                    <p className="text-xs text-rose-800 mt-1 font-medium max-w-xl">
                      {checkResult.unavailabilityReason}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-col gap-2">
                  <button
                    onClick={() => {
                      setPreferredTimePeriod('Any Time');
                      const nextDate = '2026-09-21'; // Monday
                      setSelectedDate(nextDate);
                      handleCheckAvailability();
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-900 bg-indigo-100 hover:bg-indigo-200 transition cursor-pointer"
                  >
                    Choose Another Time
                  </button>
                  <button
                    onClick={() => {
                      if (checkResult.suggestedDoctors && checkResult.suggestedDoctors.length > 0) {
                        setSelectedDoctorId(checkResult.suggestedDoctors[0].id);
                        setHasChecked(false);
                      }
                    }}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Choose Another Doctor
                  </button>
                </div>
              </div>

              {/* Alternate Flow Action Cards */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Alternate Booking Suggestions:
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Suggestion 1: Switch Date for Same Doctor */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                        <CalendarDays className="w-4 h-4 text-indigo-600" />
                        <span>Keep {activeDoctor.name} & Select Next Working Date</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Regular consultation days for this specialist: <strong>{activeDoctor.availableDays.join(', ')}</strong>.
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                      <span className="text-[11px] text-indigo-700 font-semibold">Suggested: Next Monday (21 Sep)</span>
                      <button
                        onClick={() => {
                          setSelectedDate('2026-09-21');
                          setPreferredTimePeriod('Morning');
                          handleCheckAvailability();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
                      >
                        Check Next Working Day
                      </button>
                    </div>
                  </div>

                  {/* Suggestion 2: Available Alternate Doctors */}
                  {checkResult.suggestedDoctors && checkResult.suggestedDoctors.length > 0 && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                          <Stethoscope className="w-4 h-4 text-indigo-600" />
                          <span>Switch to an Available Colleague</span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Other verified clinicians with availability in this discipline:
                        </p>
                        <div className="mt-2 space-y-1.5">
                          {checkResult.suggestedDoctors.slice(0, 2).map(altDoc => (
                            <div key={altDoc.id} className="flex items-center justify-between text-xs bg-white p-2 rounded-xl border border-slate-100">
                              <div>
                                <span className="font-bold text-slate-800">{altDoc.name}</span>
                                <span className="text-[10px] text-slate-500 block">{altDoc.speciality}</span>
                              </div>
                              <button
                                onClick={() => {
                                  setSelectedDoctorId(altDoc.id);
                                  setSelectedSpeciality(altDoc.speciality);
                                  handleCheckAvailability();
                                }}
                                className="text-xs text-indigo-700 font-semibold hover:underline cursor-pointer"
                              >
                                Select & Check
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
