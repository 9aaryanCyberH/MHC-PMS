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
  Building,
  KeyRound,
  Upload,
  Image as ImageIcon,
  Camera,
  X,
  Sparkles,
  ArrowRightLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const PatientProfileView = () => {
  const {
    patientProfile,
    updateProfile,
    showToast
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: patientProfile.fullName || '',
    email: patientProfile.email || '',
    phone: patientProfile.phone || '',
    dob: patientProfile.dob || '',
    age: patientProfile.age || '',
    gender: patientProfile.gender || 'Male',
    bloodGroup: patientProfile.bloodGroup || 'A+',
    address: patientProfile.address || '',
    avatar: patientProfile.avatar || '',
    emergencyName: patientProfile.emergencyContact?.name || '',
    emergencyRelationship: patientProfile.emergencyContact?.relationship || 'Parent / Guardian',
    emergencyPhone: patientProfile.emergencyContact?.phone || '',
    insuranceProvider: patientProfile.insurance?.provider || '',
    policyNo: patientProfile.insurance?.policyNo || '',
    validTill: patientProfile.insurance?.validTill || ''
  });

  const avatarPresets = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  ];

  const handleOpenEdit = () => {
    setFormData({
      fullName: patientProfile.fullName || '',
      email: patientProfile.email || '',
      phone: patientProfile.phone || '',
      dob: patientProfile.dob || '',
      age: patientProfile.age || '',
      gender: patientProfile.gender || 'Male',
      bloodGroup: patientProfile.bloodGroup || 'A+',
      address: patientProfile.address || '',
      avatar: patientProfile.avatar || '',
      emergencyName: patientProfile.emergencyContact?.name || '',
      emergencyRelationship: patientProfile.emergencyContact?.relationship || 'Parent / Guardian',
      emergencyPhone: patientProfile.emergencyContact?.phone || '',
      insuranceProvider: patientProfile.insurance?.provider || '',
      policyNo: patientProfile.insurance?.policyNo || '',
      validTill: patientProfile.insurance?.validTill || ''
    });
    setIsEditModalOpen(true);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image file size should be less than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result }));
        showToast('Photo uploaded from local device!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      displayDob: `${formData.dob} (Age: ${formData.age})`,
      age: Number(formData.age) || patientProfile.age,
      gender: formData.gender,
      bloodGroup: formData.bloodGroup,
      address: formData.address,
      avatar: formData.avatar,
      emergencyContact: {
        name: formData.emergencyName,
        relationship: formData.emergencyRelationship,
        phone: formData.emergencyPhone
      },
      insurance: {
        provider: formData.insuranceProvider,
        policyNo: formData.policyNo,
        validTill: formData.validTill
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
              Patient Profile (Individual Login)
            </Badge>
            <span className="text-xs text-slate-500 font-medium">Editable Details & Photo</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Personal Health Account Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your personal profile, profile photo, emergency contacts, and medical insurance information.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEdit}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md shadow-amber-400/20 transition cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile & Photo</span>
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-slate-100">
          <div className="relative group">
            <img
              src={patientProfile.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
              alt={patientProfile.fullName}
              className="w-28 h-28 rounded-3xl object-cover border-4 border-amber-400 shadow-md"
            />
            <button
              onClick={handleOpenEdit}
              className="absolute inset-0 bg-slate-900/60 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition cursor-pointer"
            >
              <Camera className="w-5 h-5 mb-1" />
              <span>Change Photo</span>
            </button>
          </div>

          <div className="text-center sm:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h3 className="text-2xl font-black text-slate-900">{patientProfile.fullName}</h3>
              <span className="font-mono text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300">
                {patientProfile.id}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                {patientProfile.activeStatus || 'Active Outpatient'}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Registered Patient • Primary Care: <strong className="text-slate-700">{patientProfile.assignedDoctor || 'Dr. Shashank Pandey'}</strong>
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>DOB: {patientProfile.displayDob || patientProfile.dob}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Blood: <strong>{patientProfile.bloodGroup}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Gender: {patientProfile.gender}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Residential Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 pb-6 border-b border-slate-100">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Contact Information</h4>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{patientProfile.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{patientProfile.phone}</span>
              </div>
              <div className="flex items-start gap-2.5 text-slate-700">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{patientProfile.address}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Emergency Contact (Next of Kin)</h4>
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-1.5 text-amber-900">
              <p className="font-bold">{patientProfile.emergencyContact?.name || 'Sunita Kumar'}</p>
              <p className="text-amber-800">Relationship: {patientProfile.emergencyContact?.relationship || 'Parent / Guardian'}</p>
              <p className="font-mono text-amber-900 font-semibold">{patientProfile.emergencyContact?.phone || '+91 98765 12345'}</p>
            </div>
          </div>
        </div>

        {/* Insurance Coverage */}
        <div className="pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Medical Insurance Coverage</h4>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900">{patientProfile.insurance?.provider || 'Star Health Care'}</p>
                <p className="text-[11px] text-slate-500 font-mono">Policy No: {patientProfile.insurance?.policyNo || 'SHC-MH-9941029'}</p>
              </div>
            </div>
            <div className="text-left sm:text-right text-xs">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[11px]">
                Valid till {patientProfile.insurance?.validTill || '31 Dec 2027'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL WITH PHOTO UPLOAD & DETAIL INPUTS */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Patient Details & Photo</h3>
                  <p className="text-xs text-slate-500">ID: {patientProfile.id} • Individual Login</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* PHOTO / AVATAR EDITING SECTION */}
              <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                <label className="block text-xs font-bold text-slate-800 mb-2">Profile Photo (Upload or URL)</label>
                <div className="flex items-center gap-4">
                  <img
                    src={formData.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer transition shadow-2xs flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-amber-600" />
                        <span>Upload from Computer</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                    <input
                      type="url"
                      placeholder="Or paste direct image URL"
                      value={formData.avatar}
                      onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Preset Avatars */}
                <div className="mt-3 pt-3 border-t border-amber-200/60">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Or choose a preset avatar:</p>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {avatarPresets.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: preset })}
                        className={`w-9 h-9 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${formData.avatar === preset ? 'border-amber-500 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                      >
                        <img src={preset} alt={`preset ${idx}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* PERSONAL INFORMATION */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Registered Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={formData.bloodGroup}
                    onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  >
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                />
              </div>

              {/* EMERGENCY CONTACT */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-800 mb-2">Emergency Contact</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={formData.emergencyName}
                      onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="Contact Phone"
                      value={formData.emergencyPhone}
                      onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-400 focus:border-amber-400 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition cursor-pointer shadow-sm shadow-amber-400/20"
                >
                  Save Profile & Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
