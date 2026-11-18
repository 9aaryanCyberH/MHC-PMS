import React, { useState, useEffect } from 'react';
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
  Stethoscope,
  Briefcase,
  Clock,
  Award,
  DollarSign,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';

export const ProfileView = () => {
  const {
    currentRole,
    currentUser,
    patientProfile,
    staffProfiles,
    doctorProfile,
    updateProfile,
    updateDoctorProfile,
    updateReceptionistProfile,
    updateAdminProfile,
    showToast,
    setActiveTab
  } = useApp();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Role-specific avatar presets
  const doctorAvatarPresets = [
    "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1594824813718-495449704e6c?auto=format&fit=crop&q=80&w=300"
  ];

  const receptionistAvatarPresets = [
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300"
  ];

  const adminAvatarPresets = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=300"
  ];

  const patientAvatarPresets = [
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300"
  ];

  // Active role presets
  const activePresets = 
    currentRole === 'doctor' ? doctorAvatarPresets :
    currentRole === 'receptionist' ? receptionistAvatarPresets :
    currentRole === 'admin' ? adminAvatarPresets :
    patientAvatarPresets;

  // Unified Form State for all roles
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    avatar: '',
    // Doctor Specific
    title: '',
    speciality: '',
    qualifications: '',
    consultationFee: 1500,
    opdRoom: '',
    schedule: '',
    bio: '',
    // Receptionist Specific
    deskLocation: '',
    shift: '',
    // Admin Specific
    department: '',
    // Patient Specific
    dob: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'A+',
    address: '',
    emergencyName: '',
    emergencyRelationship: 'Parent / Guardian',
    emergencyPhone: '',
    insuranceProvider: '',
    policyNo: '',
    validTill: ''
  });

  // Sync Form Data with current active profile
  const populateFormData = () => {
    if (currentRole === 'doctor') {
      const doc = staffProfiles.doctor || doctorProfile || {};
      setFormData({
        fullName: doc.fullName || 'Dr. Shashank Pandey',
        email: doc.email || 'shashank.pandey@mhc-pms.org',
        phone: doc.phone || '+91 98450 11223',
        avatar: doc.avatar || 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
        title: doc.title || 'Chief Consultant Psychiatrist & Clinical Director',
        speciality: doc.speciality || 'Adult & Neuropsychiatry (NIMHANS)',
        qualifications: doc.qualifications || 'MBBS, MD Psychiatry - NIMHANS, DNB, FIPS',
        consultationFee: doc.consultationFee || 1500,
        opdRoom: doc.opdRoom || 'OPD Room 204, East Wing',
        schedule: doc.schedule || 'Mon – Fri: 09:00 AM – 04:00 PM',
        bio: doc.bio || 'Over 14 years of clinical psychiatry experience specializing in mood disorders, adult ADHD, psychopharmacology, and neurocognitive assessments.'
      });
    } else if (currentRole === 'receptionist') {
      const rec = staffProfiles.receptionist || {};
      setFormData({
        fullName: rec.fullName || 'Medha Banerjee',
        email: rec.email || 'medha.banerjee@mhc-pms.org',
        phone: rec.phone || '+91 98301 98765',
        avatar: rec.avatar || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
        title: rec.title || 'Lead Receptionist & Admissions Coordinator',
        deskLocation: rec.deskLocation || 'Main Outpatient Reception Desk A-1, Ground Floor',
        shift: rec.shift || 'Morning OPD Shift: 08:30 AM – 04:30 PM'
      });
    } else if (currentRole === 'admin') {
      const adm = staffProfiles.admin || {};
      setFormData({
        fullName: adm.fullName || 'Shounak Sarkar',
        email: adm.email || 'shounak.sarkar@mhc-pms.org',
        phone: adm.phone || '+91 98310 44556',
        avatar: adm.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
        title: adm.title || 'Healthcare Informatics Administrator & IT Governance',
        department: adm.department || 'Hospital IT & Digital Health Systems'
      });
    } else {
      // Patient
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
    }
  };

  useEffect(() => {
    populateFormData();
  }, [currentRole, staffProfiles, patientProfile]);

  const handleOpenEdit = () => {
    populateFormData();
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
        showToast('New photo loaded from your computer!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      showToast('Name cannot be empty', 'error');
      return;
    }

    if (currentRole === 'doctor') {
      updateDoctorProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
        title: formData.title,
        speciality: formData.speciality,
        qualifications: formData.qualifications,
        consultationFee: formData.consultationFee,
        opdRoom: formData.opdRoom,
        schedule: formData.schedule,
        bio: formData.bio
      });
    } else if (currentRole === 'receptionist') {
      updateReceptionistProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
        title: formData.title,
        deskLocation: formData.deskLocation,
        shift: formData.shift
      });
    } else if (currentRole === 'admin') {
      updateAdminProfile({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        avatar: formData.avatar,
        title: formData.title,
        department: formData.department
      });
    } else {
      // Patient
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
    }

    setIsEditModalOpen(false);
  };

  // Helper metadata
  const roleDisplayMeta = {
    admin: {
      roleTitle: 'Universal System Administrator',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-300',
      heroGrad: 'from-slate-950 via-purple-950 to-slate-900',
      id: staffProfiles.admin?.id || 'ADM-001',
      subtitle: 'Manage administrative profile credentials, IT governance metadata, and display photo.'
    },
    doctor: {
      roleTitle: 'Senior Attending Psychiatrist',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      heroGrad: 'from-slate-950 via-emerald-950 to-slate-900',
      id: staffProfiles.doctor?.id || 'DOC-001',
      subtitle: 'Manage clinical credentials, consulting timings, OPD suite details, and practitioner photo.'
    },
    receptionist: {
      roleTitle: 'Front Desk Admissions & Triage Lead',
      badgeClass: 'bg-sky-100 text-sky-800 border-sky-300',
      heroGrad: 'from-slate-950 via-sky-950 to-slate-900',
      id: staffProfiles.receptionist?.id || 'REC-104',
      subtitle: 'Manage front-desk workstation location, shift schedules, phone number, and display photo.'
    },
    patient: {
      roleTitle: 'Registered Outpatient',
      badgeClass: 'bg-amber-100 text-amber-900 border-amber-300',
      heroGrad: 'from-slate-950 via-amber-950 to-slate-900',
      id: patientProfile?.id || 'PT-88204',
      subtitle: 'Manage your confidential personal profile, photo, emergency contacts, and care details.'
    }
  };

  const activeMeta = roleDisplayMeta[currentRole] || roleDisplayMeta.patient;
  const activeUser = currentUser || {};

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-300 pb-12">
      {/* 1. Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${activeMeta.badgeClass}`}>
              {activeMeta.roleTitle}
            </span>
            <span className="text-xs text-slate-500 font-medium font-mono">
              ID: {activeMeta.id}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Profile &amp; Account Settings
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeMeta.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleOpenEdit}
            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md shadow-amber-400/20 transition cursor-pointer"
          >
            <Edit3 className="w-4 h-4" />
            <span>Edit Name &amp; Photo</span>
          </button>
        </div>
      </div>

      {/* 2. Primary Identity Hero Card */}
      <div className={`bg-linear-to-r ${activeMeta.heroGrad} text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800`}>
        {/* Soft decorative glow */}
        <div className="absolute right-0 top-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with hover change photo shortcut */}
          <div className="relative group shrink-0">
            <img
              src={activeUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=300"}
              alt={activeUser.fullName || activeUser.name}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover ring-4 ring-amber-400 shadow-xl"
            />
            <button
              onClick={handleOpenEdit}
              className="absolute inset-0 bg-slate-950/75 rounded-3xl opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white text-xs font-bold transition cursor-pointer"
              title="Click to change your photo"
            >
              <Camera className="w-5 h-5 mb-1 text-amber-400" />
              <span>Change Photo</span>
            </button>
          </div>

          {/* User Details */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1.5">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight truncate">
                {activeUser.fullName || activeUser.name}
              </h3>
              <span className="font-mono text-xs font-bold text-amber-300 bg-white/10 px-2.5 py-0.5 rounded-lg border border-amber-400/30">
                {activeMeta.id}
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Active Session
              </span>
            </div>

            <p className="text-xs sm:text-sm font-medium text-amber-200/90 leading-snug">
              {activeUser.title || activeMeta.roleTitle}
            </p>

            {/* Quick Metadata Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <Mail className="w-3.5 h-3.5 text-amber-300" />
                <span className="truncate">{activeUser.email || 'N/A'}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xs px-3 py-1.5 rounded-xl border border-white/10">
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>{activeUser.phone || 'N/A'}</span>
              </div>
              {currentRole === 'doctor' && (
                <div className="flex items-center gap-1.5 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-400/30 text-emerald-200">
                  <Building className="w-3.5 h-3.5" />
                  <span>{staffProfiles.doctor?.opdRoom || 'OPD Room 204'}</span>
                </div>
              )}
              {currentRole === 'receptionist' && (
                <div className="flex items-center gap-1.5 bg-sky-500/20 px-3 py-1.5 rounded-xl border border-sky-400/30 text-sky-200">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{staffProfiles.receptionist?.deskLocation || 'Desk A-1, Ground Floor'}</span>
                </div>
              )}
              {currentRole === 'admin' && (
                <div className="flex items-center gap-1.5 bg-purple-500/20 px-3 py-1.5 rounded-xl border border-purple-400/30 text-purple-200">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Universal Authority (All Nodes)</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Role-Specific Details Grid */}
      {currentRole === 'doctor' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Stethoscope className="w-4 h-4 text-emerald-600" />
              <span>Clinical Credentials &amp; Speciality</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Medical Speciality</span>
                <span className="text-slate-800 font-extrabold text-sm">{staffProfiles.doctor?.speciality || 'Adult & Neuropsychiatry'}</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Academic Qualifications</span>
                <span className="text-slate-700 font-semibold">{staffProfiles.doctor?.qualifications || 'MBBS, MD Psychiatry - NIMHANS, DNB'}</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-bold block mb-0.5">Consultation Fee</span>
                  <span className="text-emerald-700 font-black text-base">₹{staffProfiles.doctor?.consultationFee || 1500}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-bold block mb-0.5">OPD Consultation Suite</span>
                  <span className="text-slate-800 font-bold">{staffProfiles.doctor?.opdRoom || 'Room 204'}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>OPD Timings &amp; Professional Bio</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Weekly Consulting Hours</span>
                <span className="text-slate-800 font-bold">{staffProfiles.doctor?.schedule || 'Mon – Fri: 09:00 AM – 04:00 PM'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-1">Clinical Biography</span>
                <p className="text-slate-600 leading-relaxed">{staffProfiles.doctor?.bio || 'Chief consulting psychiatrist with expertise in clinical mood disorders and neuropsychiatry.'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'receptionist' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Building className="w-4 h-4 text-sky-600" />
              <span>Front Desk Post &amp; Admissions</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Assigned Workstation Location</span>
                <span className="text-slate-800 font-black text-sm">{staffProfiles.receptionist?.deskLocation || 'Main Outpatient Reception Desk A-1, Ground Floor'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Shift Timings</span>
                <span className="text-slate-800 font-bold">{staffProfiles.receptionist?.shift || 'Morning OPD Shift: 08:30 AM – 04:30 PM'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Operational Duties &amp; Permissions</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Walk-in patient registration &amp; intake records</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doctor appointment booking, cancellation &amp; rescheduling</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Visitor lounge tokens, logging &amp; fee payment receipt generation</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Hospital Tabular EHR spreadsheet inspection and Cloud Firebase sync</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-purple-600" />
              <span>Super Administrator Governance</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Department / Organization Node</span>
                <span className="text-slate-800 font-extrabold text-sm">{staffProfiles.admin?.department || 'Hospital IT & Digital Health Systems'}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Governance Authority Level</span>
                <span className="text-purple-700 font-black">Level 4 — Universal Authority across All Hospital Nodes</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-600" />
              <span>Universal Administrative Scope</span>
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>One-click user account provisioning, role modification &amp; suspension</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Multi-sheet Excel database export engine &amp; Google Cloud Firestore sync</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mental Healthcare Act (MHA) legal compliance &amp; clinical audit logs</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Broadcast priority bulletins to doctors, receptionists and patients</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentRole === 'patient' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <User className="w-4 h-4 text-amber-600" />
              <span>Demographics &amp; Vitals Profile</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-bold block mb-0.5">Date of Birth / Age</span>
                  <span className="text-slate-800 font-bold">{patientProfile.displayDob || patientProfile.dob || '21 Years'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 font-bold block mb-0.5">Blood Group</span>
                  <span className="text-rose-600 font-black">{patientProfile.bloodGroup || 'A+'}</span>
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Residential Address</span>
                <span className="text-slate-700 font-medium">{patientProfile.address || 'Bengaluru, Karnataka, India'}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Emergency Contact &amp; Health Insurance</span>
            </h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Emergency Contact</span>
                <span className="text-slate-800 font-bold">
                  {patientProfile.emergencyContact?.name || 'Guardian'} ({patientProfile.emergencyContact?.relationship || 'Parent'}) • {patientProfile.emergencyContact?.phone || 'N/A'}
                </span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 font-bold block mb-0.5">Medical Insurance Policy</span>
                <span className="text-slate-700 font-medium">
                  {patientProfile.insurance?.provider || 'Universal Health Guard'} • Policy: {patientProfile.insurance?.policyNo || 'POL-88204'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. MODAL: EDIT NAME, PHOTO & PROFILE DETAILS */}
      {/* ========================================================================= */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center">
                  <Edit3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-black text-slate-900">
                    Edit {currentRole === 'doctor' ? 'Doctor' : currentRole === 'receptionist' ? 'Receptionist' : currentRole === 'admin' ? 'Administrator' : 'Patient'} Profile &amp; Photo
                  </h3>
                  <p className="text-[11px] text-slate-500 font-medium">Update your name, profile photo, and credentials</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProfile} className="p-6 space-y-5 overflow-y-auto flex-1 text-xs">
              {/* Photo Upload & Preview Section */}
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
                <label className="block font-black text-slate-900">
                  Profile Photo &amp; Avatar
                </label>

                <div className="flex items-center gap-4">
                  <img
                    src={formData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover ring-2 ring-amber-400 shadow-md shrink-0"
                  />
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <label className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-xs font-bold transition shadow-2xs cursor-pointer">
                      <Upload className="w-3.5 h-3.5 text-amber-600" />
                      <span>Upload Photo from Device</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[10px] text-slate-500">Supports JPG, PNG, WEBP (Max 2MB)</p>
                  </div>
                </div>

                {/* Direct Image URL input */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Or Enter Image URL:
                  </label>
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs font-mono focus:border-amber-400 focus:outline-hidden"
                  />
                </div>

                {/* Preset Avatar Picker */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                    Or Choose from Recommended Presets:
                  </label>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                    {activePresets.map((presetUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, avatar: presetUrl })}
                        className={`relative rounded-xl overflow-hidden ring-2 transition cursor-pointer shrink-0 ${
                          formData.avatar === presetUrl ? 'ring-amber-500 scale-105 shadow-md' : 'ring-transparent hover:ring-slate-300'
                        }`}
                      >
                        <img src={presetUrl} alt={`Preset ${idx + 1}`} className="w-10 h-10 object-cover" />
                        {formData.avatar === presetUrl && (
                          <div className="absolute inset-0 bg-amber-400/25 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-amber-900 drop-shadow" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Full Name & Primary Contact */}
              <div className="space-y-3">
                <div>
                  <label className="block font-black text-slate-900 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Shashank Pandey / Medha Banerjee / Shounak Sarkar"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:border-amber-400 focus:outline-hidden shadow-2xs"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Contact Phone</label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98450 11223"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@mhc-pms.org"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Doctor Specific Fields */}
              {currentRole === 'doctor' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Clinical Designation</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Lead Consulting Psychiatrist"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Medical Speciality</label>
                      <input
                        type="text"
                        value={formData.speciality}
                        onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
                        placeholder="Adult & Neuropsychiatry"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Academic Qualifications</label>
                    <input
                      type="text"
                      value={formData.qualifications}
                      onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                      placeholder="MBBS, MD Psychiatry - NIMHANS, DNB"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        value={formData.consultationFee}
                        onChange={(e) => setFormData({ ...formData, consultationFee: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">OPD Room Number</label>
                      <input
                        type="text"
                        value={formData.opdRoom}
                        onChange={(e) => setFormData({ ...formData, opdRoom: e.target.value })}
                        placeholder="Room 204, East Wing"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Consultation Timings / Schedule</label>
                    <input
                      type="text"
                      value={formData.schedule}
                      onChange={(e) => setFormData({ ...formData, schedule: e.target.value })}
                      placeholder="Mon – Fri: 09:00 AM – 04:00 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Clinical Bio &amp; Experience</label>
                    <textarea
                      rows={2}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Summary of psychiatric clinical focus..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Receptionist Specific Fields */}
              {currentRole === 'receptionist' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Job Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Lead Receptionist"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Front Desk Location</label>
                      <input
                        type="text"
                        value={formData.deskLocation}
                        onChange={(e) => setFormData({ ...formData, deskLocation: e.target.value })}
                        placeholder="Desk A-1, Ground Floor"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Shift Timings</label>
                    <input
                      type="text"
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      placeholder="Morning OPD Shift: 08:30 AM – 04:30 PM"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              {/* Admin Specific Fields */}
              {currentRole === 'admin' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Job Title / Designation</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Healthcare Informatics Administrator"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Department</label>
                      <input
                        type="text"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        placeholder="Hospital IT & Digital Systems"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Patient Specific Fields */}
              {currentRole === 'patient' && (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.dob}
                        onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Blood Group</label>
                      <select
                        value={formData.bloodGroup}
                        onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden font-bold"
                      >
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">Residential Address</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Bengaluru, Karnataka"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Emergency Contact Name</label>
                      <input
                        type="text"
                        value={formData.emergencyName}
                        onChange={(e) => setFormData({ ...formData, emergencyName: e.target.value })}
                        placeholder="Contact person name"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-800 mb-1">Emergency Phone</label>
                      <input
                        type="text"
                        value={formData.emergencyPhone}
                        onChange={(e) => setFormData({ ...formData, emergencyPhone: e.target.value })}
                        placeholder="+91 98450 ..."
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:border-amber-400 focus:outline-hidden"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black shadow-md shadow-amber-400/25 transition cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

