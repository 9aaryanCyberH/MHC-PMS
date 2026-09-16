import React, { useState, useEffect } from 'react';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  User,
  Stethoscope,
  Shield,
  PhoneCall,
  ChevronDown,
  UserPlus,
  Building,
  LogOut,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginView = () => {
  const { login, registerPatient, currentRole, switchNotice, setSwitchNotice } = useApp();

  // Role dropdown state: defaults to currentRole or 'patient'
  const [selectedRole, setSelectedRole] = useState(currentRole || 'patient');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Sync selectedRole if currentRole changes
  useEffect(() => {
    if (currentRole) {
      setSelectedRole(currentRole);
      setError('');
    }
  }, [currentRole]);

  // Forgot password modal
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Register account modal
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [regForm, setRegForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    gender: 'Male',
    bloodGroup: 'B+',
    password: ''
  });

  const roleConfigs = {
    patient: {
      key: 'patient',
      label: 'Patient',
      badge: 'Confidential Patient Portal',
      icon: User,
      defaultEmail: 'aaryan.kumar@example.com',
      defaultId: 'PT-88204',
      defaultPass: 'patient123',
      color: 'indigo',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      accentLinear: 'from-indigo-600 to-blue-600',
      description: 'Book appointments, view doctor notes, active prescriptions, lab reports and clinical summaries.'
    },
    doctor: {
      key: 'doctor',
      label: 'Doctor',
      badge: 'Clinician Consultation Portal',
      icon: Stethoscope,
      defaultEmail: 'shashank.pandey@mhc-pms.org',
      defaultId: 'DOC-001',
      defaultPass: 'doctor123',
      color: 'emerald',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      accentLinear: 'from-emerald-600 to-teal-600',
      description: 'Access patient psychiatric EHR, manage consultation queue, write e-prescriptions and review lab scales.'
    },
    receptionist: {
      key: 'receptionist',
      label: 'Receptionist',
      badge: 'Front Desk & Admissions Portal',
      icon: Building,
      defaultEmail: 'medha.banerjee@mhc-pms.org',
      defaultId: 'REC-104',
      defaultPass: 'reception123',
      color: 'sky',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      accentLinear: 'from-sky-600 to-blue-600',
      description: 'Schedule appointments, register walk-in patients, manage waiting lounge queue and record billing payments.'
    },
    admin: {
      key: 'admin',
      label: 'System Admin',
      badge: 'IT Governance & Healthcare Informatics',
      icon: Shield,
      defaultEmail: 'shounak.sarkar@mhc-pms.org',
      defaultId: 'ADM-001',
      defaultPass: 'admin123',
      color: 'purple',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      accentLinear: 'from-purple-600 to-indigo-600',
      description: 'Account access control, cross-clinic database sync, legal mental health statistics & management reports.'
    }
  };

  const activeRoleConfig = roleConfigs[selectedRole] || roleConfigs.patient;
  const RoleIcon = activeRoleConfig.icon;

  // Handle Role Change from Dropdown
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole);
    setError('');
    if (setSwitchNotice) setSwitchNotice('');
    setIdentifier('');
    setPassword('');
  };

  // Quick fill demo credentials for the chosen role
  const handleQuickDemoFill = () => {
    setIdentifier(activeRoleConfig.defaultEmail);
    setPassword(activeRoleConfig.defaultPass);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError(`Please enter your ${activeRoleConfig.label} email address or ID.`);
      return;
    }
    if (!password.trim()) {
      setError('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(selectedRole, identifier, password);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error);
      } else {
        if (setSwitchNotice) setSwitchNotice('');
      }
    }, 350);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setShowForgotPasswordModal(false);
      setForgotEmail('');
    }, 2000);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!regForm.fullName || !regForm.email) {
      return;
    }
    const res = registerPatient(regForm);
    setShowRegisterModal(false);
    setSelectedRole('patient');
    setIdentifier(res.email);
    setPassword('patient123');
    setRegForm({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      gender: 'Male',
      bloodGroup: 'B+',
      password: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-8 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Background glow ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[42rem] h-[42rem] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4 relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-500 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-xl shadow-indigo-950/60 ring-4 ring-indigo-500/20">
            <HeartPulse className="w-8 h-8" />
          </div>
        </div>
        <h1 className="mt-3.5 text-2xl sm:text-3xl font-black text-white tracking-tight">
          MHC-PMS
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-indigo-200/90 font-medium">
          Mental Health Care — Patient Management System
        </p>
        <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold shadow-inner">
          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
          <span>Cross-Clinic Healthcare Information System</span>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-white/95 backdrop-blur-xl py-7 px-6 sm:px-9 shadow-2xl shadow-slate-950/40 rounded-3xl border border-slate-200/80 animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header text with dynamic role tag */}
          <div className="text-center mb-5">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Sign In to Your Workspace
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Select your role and enter credentials to open the role-specific dashboard.
            </p>
          </div>

          {/* Switch Role Notice Banner if arriving from a profile switch */}
          {switchNotice && (
            <div className="mb-4 p-3 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-2.5 text-amber-900 text-xs animate-in fade-in">
              <LogOut className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-bold">Profile Switched — Authentication Required</p>
                <p className="text-amber-800 mt-0.5">{switchNotice}</p>
              </div>
              <button
                type="button"
                onClick={() => setSwitchNotice && setSwitchNotice('')}
                className="text-amber-500 hover:text-amber-700 text-sm font-bold"
                aria-label="Dismiss notice"
              >
                ✕
              </button>
            </div>
          )}

          {/* Role Preview Banner */}
          <div className={`mb-5 p-3 rounded-2xl border flex items-center justify-between gap-3 ${activeRoleConfig.badgeBg}`}>
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="p-2 rounded-xl bg-white shadow-2xs shrink-0">
                <RoleIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider block truncate">
                    {activeRoleConfig.label} Role
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-white/80 font-semibold border border-current/20">
                    Active
                  </span>
                </div>
                <p className="text-[10px] opacity-85 truncate mt-0.5">
                  {activeRoleConfig.description}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickDemoFill}
              className="text-[11px] font-bold px-2.5 py-1.5 rounded-xl bg-white hover:bg-white/90 border border-current/30 shadow-2xs transition cursor-pointer shrink-0"
              title={`Auto-fill demo credentials for ${activeRoleConfig.label}`}
            >
              Auto Fill
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2.5 text-rose-800 text-xs animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Authentication Notice</p>
                <p className="text-rose-700 mt-0.5">{error}</p>
              </div>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {/* ROLE DROPDOWN BOX */}
            <div>
              <label htmlFor="role-select" className="block text-xs font-bold text-slate-800 mb-1.5">
                Choose Role / Access Level
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <RoleIcon className="w-4 h-4 text-indigo-600" />
                </div>
                <select
                  id="role-select"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  className="block w-full pl-10 pr-10 py-2.5 text-xs font-semibold border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 outline-hidden bg-slate-50/50 hover:bg-white transition cursor-pointer appearance-none"
                >
                  <option value="patient">Patient (Mental Health Portal)</option>
                  <option value="doctor">Doctor (Senior Consultant Psychiatrist)</option>
                  <option value="receptionist">Receptionist (Front Desk & Admissions)</option>
                  <option value="admin">System Admin (Governance & Infrastructure)</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-1">
                Select your designated role: System Admin, Receptionist, Doctor, or Patient.
              </p>
            </div>

            {/* EMAIL / ID INPUT */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                {activeRoleConfig.label} Email Address or ID
              </label>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={`e.g. ${activeRoleConfig.defaultEmail} or ${activeRoleConfig.defaultId}`}
                  className="block w-full pl-10 pr-3.5 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 outline-hidden bg-white transition"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(true)}
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-2xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  className="block w-full pl-10 pr-10 py-2.5 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-900 outline-hidden bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* DEMO CREDENTIAL HINT CARD */}
            <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl text-[11px] text-slate-600 flex items-center justify-between">
              <div className="truncate">
                <span className="font-bold text-slate-800">Demo {activeRoleConfig.label}: </span>
                <span className="font-mono text-slate-700">{activeRoleConfig.defaultEmail}</span>
                <span className="mx-1 text-slate-300">|</span>
                <span className="font-mono text-slate-700">{activeRoleConfig.defaultPass}</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold shrink-0 ml-2">● Verified</span>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 border-slate-300 rounded-sm focus:ring-indigo-500 cursor-pointer"
                />
                <span className="text-xs text-slate-600 select-none">Remember session</span>
              </label>
              <span className="text-[11px] text-slate-400 font-medium">256-Bit SSL Encrypted</span>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-linear-to-r ${activeRoleConfig.accentLinear} hover:opacity-95 active:scale-[0.99] transition shadow-md cursor-pointer disabled:opacity-50`}
            >
              {isLoading ? (
                <span>Authenticating {activeRoleConfig.label} Session...</span>
              ) : (
                <>
                  <span>Sign In as {activeRoleConfig.label}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Self-Register Patient Link */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">New patient?</span>
            <button
              type="button"
              onClick={() => setShowRegisterModal(true)}
              className="font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register Account</span>
            </button>
          </div>

          {/* Privacy & Confidentiality Guarantee */}
          <div className="mt-3 pt-2 text-center">
            <p className="text-[11px] text-slate-400 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Centralized psychiatric database protected under DISHA & HIPAA guidelines.</span>
            </p>
          </div>
        </div>

        {/* 24x7 Mental Health Helpline Footer Banner */}
        <div className="mt-4 p-3 rounded-2xl bg-indigo-950/70 border border-indigo-800/40 text-center backdrop-blur-xs flex items-center justify-center gap-2 text-xs text-indigo-200 shadow-sm">
          <PhoneCall className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span>24x7 Mental Health Helpline (Tele-MANAS): <strong>14416</strong> (Toll-Free)</span>
        </div>
      </div>

      {/* REGISTER PATIENT MODAL */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">Patient Account Self-Registration</h3>
                <p className="text-xs text-slate-500">Create an MHC-PMS electronic health profile.</p>
              </div>
              <button
                onClick={() => setShowRegisterModal(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleRegisterSubmit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aaryan Kumar"
                  value={regForm.fullName}
                  onChange={(e) => setRegForm({ ...regForm, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registered Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. aaryan.kumar@example.com"
                  value={regForm.email}
                  onChange={(e) => setRegForm({ ...regForm, email: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={regForm.phone}
                    onChange={(e) => setRegForm({ ...regForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="24"
                    value={regForm.age}
                    onChange={(e) => setRegForm({ ...regForm, age: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
                  <select
                    value={regForm.gender}
                    onChange={(e) => setRegForm({ ...regForm, gender: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
                  <select
                    value={regForm.bloodGroup}
                    onChange={(e) => setRegForm({ ...regForm, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="A+">A+</option>
                    <option value="B+">B+</option>
                    <option value="O+">O+</option>
                    <option value="AB+">AB+</option>
                    <option value="A-">A-</option>
                    <option value="B-">B-</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowRegisterModal(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs cursor-pointer"
                >
                  Complete Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95">
            <h3 className="text-sm font-bold text-slate-900">Reset {activeRoleConfig.label} Password</h3>
            <p className="text-xs text-slate-500 mt-1">Enter your registered email address to receive password reset instructions.</p>
            
            {forgotSuccess ? (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Password recovery token dispatched successfully to registered email.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
                <input
                  type="email"
                  required
                  placeholder={`e.g. ${activeRoleConfig.defaultEmail}`}
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 cursor-pointer"
                  >
                    Send Recovery Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
