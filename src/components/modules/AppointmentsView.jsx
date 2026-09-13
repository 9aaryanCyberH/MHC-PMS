import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Clock, 
  User, 
  MapPin, 
  Video, 
  Building, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  CalendarPlus, 
  CalendarClock, 
  Search, 
  ChevronRight,
  Filter,
  FileText
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const AppointmentsView = () => {
  const { 
    appointments, 
    cancelAppointment, 
    navigateToCheckAvailability, 
    setActiveTab, 
    setIsBookingModalOpen 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState('Upcoming');
  const [searchQuery, setSearchQuery] = useState('');

  const [aptToCancel, setAptToCancel] = useState(null);
  const [cancellationReason, setCancellationReason] = useState('Personal schedule conflict');

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = activeFilter === 'All' || apt.status === activeFilter;
    const matchesSearch = apt.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.doctorSpeciality.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const counts = {
    Upcoming: appointments.filter(a => a.status === 'Upcoming').length,
    Completed: appointments.filter(a => a.status === 'Completed').length,
    Cancelled: appointments.filter(a => a.status === 'Cancelled').length,
    All: appointments.length
  };

  const handleConfirmCancel = () => {
    if (!aptToCancel) return;
    cancelAppointment(aptToCancel.id, cancellationReason);
    setAptToCancel(null);
    setCancellationReason('Personal schedule conflict');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Upcoming':
        return <Badge variant="primary">Upcoming</Badge>;
      case 'Completed':
        return <Badge variant="success">Completed</Badge>;
      case 'Cancelled':
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="text-[11px]">
              Consultation Schedule
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Appointments Overview</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            My Appointments
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            View upcoming consultations, historical completed clinical sessions, or manage cancellations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => navigateToCheckAvailability()}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-indigo-700/20 transition cursor-pointer"
          >
            <CalendarClock className="w-4 h-4" />
            <span>Check Availability</span>
          </button>
          <button
            onClick={() => setIsBookingModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition cursor-pointer"
          >
            <CalendarPlus className="w-4 h-4 text-slate-600" />
            <span>Book New</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {['Upcoming', 'Completed', 'Cancelled', 'All'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeFilter === tab
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/80 hover:text-slate-900'
              }`}
            >
              <span>{tab}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                activeFilter === tab ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {counts[tab]}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search doctor or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
      </div>

      {/* Appointments List / Cards */}
      {filteredAppointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <CalendarCheck className="w-7 h-7" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">No {activeFilter} Appointments Found</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {searchQuery 
              ? `No appointments matching "${searchQuery}".`
              : `You have no appointments categorized as ${activeFilter.toLowerCase()} right now.`
            }
          </p>
          <div className="mt-4">
            <button
              onClick={() => navigateToCheckAvailability()}
              className="px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition cursor-pointer"
            >
              Check Doctor Availability
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt) => (
            <div
              key={apt.id}
              className={`bg-white rounded-3xl p-5 sm:p-6 border transition hover:shadow-md ${
                apt.status === 'Cancelled' ? 'border-slate-200/60 opacity-85' : 'border-slate-200/90'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Doctor & Appointment info */}
                <div className="flex items-start gap-4">
                  <img
                    src={apt.doctorAvatar}
                    alt={apt.doctorName}
                    className="w-13 h-13 rounded-2xl object-cover border-2 border-slate-100 shadow-xs flex-shrink-0"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {apt.doctorName}
                      </h3>
                      <span className="text-xs font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/70">
                        {apt.doctorSpeciality}
                      </span>
                      {getStatusBadge(apt.status)}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                      <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        {apt.id}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-indigo-600" />
                        <strong>{apt.displayDate || apt.date}</strong> at <strong>{apt.time}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        {apt.type.includes('Online') ? <Video className="w-3.5 h-3.5 text-blue-500" /> : <Building className="w-3.5 h-3.5 text-slate-500" />}
                        {apt.type}
                      </span>
                    </div>

                    {apt.reason && (
                      <p className="text-xs text-slate-500 mt-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                        <span className="font-medium text-slate-700">Reason:</span> {apt.reason}
                      </p>
                    )}

                    {/* Show cancellation notice if cancelled */}
                    {apt.status === 'Cancelled' && (
                      <div className="mt-2 text-xs text-rose-700 bg-rose-50 p-2 rounded-xl border border-rose-200">
                        <span className="font-semibold">Cancellation Log:</span> {apt.cancellationReason || 'Appointment cancelled.'}
                      </div>
                    )}

                    {/* Show doctor's notes if completed */}
                    {apt.status === 'Completed' && apt.notes && (
                      <div className="mt-2 text-xs text-emerald-800 bg-emerald-50/70 p-2.5 rounded-xl border border-emerald-100">
                        <span className="font-bold">Consultation Outcome:</span> {apt.notes}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-2 pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                  {apt.status === 'Upcoming' && (
                    <button
                      onClick={() => setAptToCancel(apt)}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition cursor-pointer"
                    >
                      Cancel Appointment
                    </button>
                  )}

                  {apt.status === 'Completed' && (
                    <button
                      onClick={() => setActiveTab('prescriptions-lab')}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-indigo-800 bg-indigo-50 hover:bg-indigo-100 transition cursor-pointer"
                    >
                      View Prescriptions
                    </button>
                  )}

                  <button
                    onClick={() => navigateToCheckAvailability(apt.doctorId)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition cursor-pointer"
                  >
                    Check Availability
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cancellation Confirmation Dialog */}
      <Modal
        isOpen={!!aptToCancel}
        onClose={() => setAptToCancel(null)}
        title="Cancel Appointment"
        subtitle="Please review and confirm your cancellation request"
        maxWidth="max-w-md"
      >
        {aptToCancel && (
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3.5 bg-rose-50 rounded-2xl border border-rose-200">
              <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-rose-950">
                  Are you sure you want to cancel this appointment?
                </h4>
                <p className="text-[11px] text-rose-800 mt-1">
                  You are about to cancel your consultation with <strong>{aptToCancel.doctorName}</strong> on{' '}
                  <strong>{aptToCancel.displayDate || aptToCancel.date}</strong> at <strong>{aptToCancel.time}</strong>.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Reason for Cancellation (Optional)
              </label>
              <select
                value={cancellationReason}
                onChange={(e) => setCancellationReason(e.target.value)}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              >
                <option value="Personal schedule conflict">Personal schedule conflict</option>
                <option value="Feeling better / Symptoms resolved">Feeling better / Symptoms resolved</option>
                <option value="Rescheduling for another date">Rescheduling for another date</option>
                <option value="Travel / Transportation issue">Travel / Transportation issue</option>
                <option value="Other medical commitment">Other medical commitment</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setAptToCancel(null)}
                className="px-4 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition cursor-pointer"
              >
                Keep Appointment
              </button>
              <button
                type="button"
                onClick={handleConfirmCancel}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow transition cursor-pointer"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
