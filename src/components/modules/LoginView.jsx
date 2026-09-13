import React, { useState } from 'react';
import { 
  HeartPulse, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle, 
  CheckCircle2, 
  ShieldCheck,
  User,
  Stethoscope,
  Users,
  Shield,
  Building,
  KeyRound,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginView = () => {
  const { login } = useApp();
  // chosenRole: null indicates the 4-button role selection screen; 'admin' | 'receptionist' | 'doctor' | 'patient'
  const [chosenRole, setChosenRole] = useState(null);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const roleConfig = {
    admin: {
      role: 'admin',
      label: 'System Admin',
      icon: Shield,
      name: 'Shounak Sarkar',
      designation: 'Healthcare Informatics Administrator',
      defaultId: 'ADM-001',
      defaultPass: 'admin123',
      description: 'Account governance, cross-clinic synchronization, audit logs & operational reports.',
      themeColor: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-50 text-purple-700 border-purple-200',
      btnBg: 'bg-purple-600 hover:bg-purple-700 text-white',
      accentBorder: 'hover:border-purple-400 group-hover:border-purple-500'
    },
    receptionist: {
      role: 'receptionist',
      label: 'Receptionist',
      icon: Building,
      name: 'Medha Banerjee',
      designation: 'Lead Front Desk & Intake Coordinator',
      defaultId: 'REC-104',
      defaultPass: 'reception123',
      description: 'Master appointments schedule, patient check-in, billing invoices & walk-in reservations.',
      themeColor: 'from-sky-600 to-blue-600',
      badgeBg: 'bg-sky-50 text-sky-700 border-sky-200',
      btnBg: 'bg-sky-600 hover:bg-sky-700 text-white',
      accentBorder: 'hover:border-sky-400 group-hover:border-sky-500'
    },
    doctor: {
      role: 'doctor',
      label: 'Doctor',
      icon: Stethoscope,
      name: 'Dr. Shashank Pandey',
      designation: 'Chief Consultant Psychiatrist',
      defaultId: 'DOC-001',
      defaultPass: 'doctor123',
      description: 'Consultation queue, full psychiatric EHR, e-prescribing (e-Rx) & diagnostic reviews.',
      themeColor: 'from-emerald-600 to-teal-600',
      badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      accentBorder: 'hover:border-emerald-400 group-hover:border-emerald-500'
    },
    patient: {
      role: 'patient',
      label: 'Patient',
      icon: User,
      name: 'Aaryan Kumar',
      designation: 'Registered Patient (Age: 21, A+)',
      defaultId: 'PT-88204',
      defaultPass: 'patient123',
      description: 'Personal health dashboard, specialist availability, appointments & active prescriptions.',
      themeColor: 'from-indigo-600 to-blue-600',
      badgeBg: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      btnBg: 'bg-indigo-600 hover:bg-indigo-700 text-white',
      accentBorder: 'hover:border-indigo-400 group-hover:border-indigo-500'
    }
  };

  // When user clicks one of the 4 role buttons
  const handleSelectRole = (roleKey) => {
    setChosenRole(roleKey);
    setIdentifier(roleConfig[roleKey].defaultId);
    setPassword(roleConfig[roleKey].defaultPass);
    setError('');
  };

  const handleQuickFill = () => {
    if (!chosenRole) return;
    setIdentifier(roleConfig[chosenRole].defaultId);
    setPassword(roleConfig[chosenRole].defaultPass);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!identifier.trim()) {
      setError('Please enter your User ID or registered Email address.');
      return;
    }
    if (!password.trim()) {
      setError('Please enter your account password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = login(identifier, password, chosenRole);
      setIsLoading(false);
      if (!res.success) {
        setError(res.error);
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

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-center py-10 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* Background glow ambiance */}
      <div className="absolute top-1/4 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Branding */}
      <div className="sm:mx-auto sm:w-full sm:max-w-2xl text-center px-4">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-linear-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-xl shadow-indigo-950">
            <HeartPulse className="w-8 h-8" />
          </div>
        </div>
        <h1 className="mt-3.5 text-2xl sm:text-3xl font-black text-white tracking-tight">
          MHC-PMS
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-indigo-200 font-medium">
          Mental Health Care — Patient Management System
        </p>
        <p className="mt-0.5 text-[11px] text-slate-400">
          Integrated Clinical & Administrative Healthcare Portal
        </p>
      </div>

      <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-2xl px-4 sm:px-0">
        {/* Step 1: 4 Large "Login As" Buttons */}
        {!chosenRole && (
          <div className="bg-white/95 backdrop-blur-xl py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                Step 1: Role Authentication
              </span>
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 mt-2">
                Login As:
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your designated role to enter the corresponding clinical or administrative workspace.
              </p>
            </div>

            {/* 4 Role Selection Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Button 1: System Admin */}
              <button
                type="button"
                onClick={() => handleSelectRole('admin')}
                className="group p-5 rounded-2xl border-2 border-slate-200/80 hover:border-purple-500 bg-white hover:bg-purple-50/40 text-left transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <Shield className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-purple-100 text-purple-800 rounded-full border border-purple-200">
                      Governance
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition">
                    System Admin
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    Shounak Sarkar
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    User accounts, cross-clinic cluster sync, reports & system bulletins.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
                  <span>Sign In as Admin</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Button 2: Receptionist */}
              <button
                type="button"
                onClick={() => handleSelectRole('receptionist')}
                className="group p-5 rounded-2xl border-2 border-slate-200/80 hover:border-sky-500 bg-white hover:bg-sky-50/40 text-left transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <Building className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-sky-100 text-sky-800 rounded-full border border-sky-200">
                      Front Desk
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-sky-700 transition">
                    Receptionist
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    Medha Banerjee
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Clinic schedule, patient check-in, billing invoices & walk-in booking.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                  <span>Sign In as Receptionist</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Button 3: Doctor */}
              <button
                type="button"
                onClick={() => handleSelectRole('doctor')}
                className="group p-5 rounded-2xl border-2 border-slate-200/80 hover:border-emerald-500 bg-white hover:bg-emerald-50/40 text-left transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-emerald-100 text-emerald-800 rounded-full border border-emerald-200">
                      Clinical
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                    Doctor
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    Dr. Shashank Pandey
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Consultation queue, psychiatric EHR, clinical e-Rx & lab reviews.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                  <span>Sign In as Doctor</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Button 4: Patient */}
              <button
                type="button"
                onClick={() => handleSelectRole('patient')}
                className="group p-5 rounded-2xl border-2 border-slate-200/80 hover:border-indigo-500 bg-white hover:bg-indigo-50/40 text-left transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-transform">
                      <User className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 bg-indigo-100 text-indigo-800 rounded-full border border-indigo-200">
                      Patient Portal
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition">
                    Patient
                  </h3>
                  <p className="text-xs font-semibold text-slate-700 mt-0.5">
                    Aaryan Kumar (Age: 21, A+)
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1 leading-relaxed">
                    Doctor availability, appointment booking, vital records & e-Rx.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
                  <span>Sign In as Patient</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Dedicated Login Form for the Chosen Role */}
        {chosenRole && (
          <div className="bg-white/95 backdrop-blur-xl py-7 px-6 sm:px-9 shadow-2xl rounded-3xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 max-w-md mx-auto">
            {/* Top Navigation Back to 4-Role Buttons */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <button
                type="button"
                onClick={() => setChosenRole(null)}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-indigo-600 transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Choose Another Role</span>
              </button>

              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleConfig[chosenRole].badgeBg}`}>
                {roleConfig[chosenRole].label}
              </span>
            </div>

            {/* Selected Role Profile Banner */}
            <div className="my-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl bg-linear-to-tr ${roleConfig[chosenRole].themeColor} flex items-center justify-center text-white shadow-xs`}>
                  {React.createElement(roleConfig[chosenRole].icon, { className: 'w-5 h-5' })}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900">
                    {roleConfig[chosenRole].name}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {roleConfig[chosenRole].designation}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                className="text-[11px] font-bold text-indigo-700 hover:text-indigo-900 bg-white hover:bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-xl shadow-2xs transition cursor-pointer"
                title="Auto-fill default credentials"
              >
                Auto Fill
              </button>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-2 text-rose-800 text-xs">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Authentication Notice</p>
                  <p className="text-rose-700 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <form className="space-y-3.5" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  User ID / Registered Account
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={`e.g. ${roleConfig[chosenRole].defaultId}`}
                    className="block w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 outline-hidden"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
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
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-9 pr-10 py-2 text-xs border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-slate-900 outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 text-indigo-600 border-slate-300 rounded-sm focus:ring-indigo-500"
                  />
                  <span className="text-xs text-slate-600">Remember session</span>
                </label>
                <span className="text-[11px] text-slate-400">256-Bit Encrypted</span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold text-white transition shadow-md cursor-pointer disabled:opacity-50 ${roleConfig[chosenRole].btnBg}`}
              >
                {isLoading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <span>Enter {roleConfig[chosenRole].label} Menu</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900">Reset Account Password</h3>
            <p className="text-xs text-slate-500 mt-1">Enter your registered ID or email to receive reset instructions.</p>
            
            {forgotSuccess ? (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800">
                Password recovery token dispatched successfully.
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3">
                <input
                  type="text"
                  required
                  placeholder="e.g. Registered ID or email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotPasswordModal(false)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 rounded-xl cursor-pointer"
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
