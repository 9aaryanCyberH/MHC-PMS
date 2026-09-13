import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  HeartPulse, 
  Edit3, 
  CheckCircle2, 
  Sparkles, 
  Building, 
  KeyRound 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export const PatientProfileView = () => {
  const { patientProfile, updateProfile } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: patientProfile.fullName,
    email: patientProfile.email,
    phone: patientProfile.phone,
    address: patientProfile.address,
    emergencyName: patientProfile.emergencyContact.name,
    emergencyPhone: patientProfile.emergencyContact.phone
  });

  const handleOpenEdit = () => {
    setFormData({
      fullName: patientProfile.fullName,
      email: patientProfile.email,
      phone: patientProfile.phone,
      address: patientProfile.address,
      emergencyName: patientProfile.emergencyContact.name,
      emergencyPhone: patientProfile.emergencyContact.phone
    });
    setIsEditModalOpen(true);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      emergencyContact: {
        ...patientProfile.emergencyContact,
        name: formData.emergencyName,
        phone: formData.emergencyPhone
      }
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="primary" className="font-mono text-[11px]">
              Patient Profile
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Personal & Contact Record</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Patient Account & Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal profile, contact information, emergency contacts, and portal settings.
          </p>
        </div>

        <button
          onClick={handleOpenEdit}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md hover:shadow-indigo-700/20 transition cursor-pointer"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
          <img
            src={patientProfile.avatar}
            alt={patientProfile.fullName}
            className="w-24 h-24 rounded-3xl object-cover border-4 border-indigo-500/80 shadow-md"
          />
          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-xl font-bold text-slate-900">{patientProfile.fullName}</h3>
              <span className="font-mono text-xs font-bold text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-lg border border-indigo-200">
                {patientProfile.id}
              </span>
              <Badge variant="success">Active Account</Badge>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Registered Patient at MHC-PMS since {patientProfile.registeredSince}
            </p>
            <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-3 text-xs text-slate-600">
              <span className="bg-slate-100 px-3 py-1 rounded-xl">Gender: <strong>{patientProfile.gender}</strong></span>
              <span className="bg-slate-100 px-3 py-1 rounded-xl">Blood Group: <strong>{patientProfile.bloodGroup}</strong></span>
              <span className="bg-slate-100 px-3 py-1 rounded-xl">DOB: <strong>{patientProfile.dob}</strong></span>
            </div>
          </div>
        </div>

        {/* Detailed Fields Grid */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Contact Information</span>
            </h4>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] block">Primary Email Address:</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{patientProfile.email}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Mobile Phone:</span>
                <p className="font-semibold text-slate-900 text-sm mt-0.5">{patientProfile.phone}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Residential Address:</span>
                <p className="font-medium text-slate-800 mt-0.5 leading-relaxed">{patientProfile.address}</p>
              </div>
            </div>
          </div>

          {/* Emergency & Insurance */}
          <div className="space-y-4">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              <span>Emergency Contact & Medical Coverage</span>
            </h4>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div>
                <span className="text-slate-400 text-[10px] block">Emergency Contact Name:</span>
                <p className="font-bold text-slate-900 text-sm mt-0.5">
                  {patientProfile.emergencyContact.name} ({patientProfile.emergencyContact.relationship})
                </p>
                <p className="text-slate-600 mt-0.5">{patientProfile.emergencyContact.phone}</p>
              </div>
              <div className="pt-2 border-t border-slate-200/60">
                <span className="text-slate-400 text-[10px] block">Insurance Provider:</span>
                <p className="font-semibold text-slate-900 mt-0.5">{patientProfile.insurance.provider}</p>
                <p className="text-slate-500 font-mono text-[11px]">
                  Policy #: {patientProfile.insurance.policyNo} • Valid till {patientProfile.insurance.validTill}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Patient Information"
        subtitle="Changes are immediately persisted to local session state"
        maxWidth="max-w-lg"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
            <textarea
              rows={2}
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Name</label>
              <input
                type="text"
                value={formData.emergencyName}
                onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Phone</label>
              <input
                type="text"
                value={formData.emergencyPhone}
                onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
