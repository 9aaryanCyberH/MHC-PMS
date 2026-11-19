import React, { useState } from 'react';
import { 
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
  Building,
  Shield,
  Phone,
  Calendar,
  KeyRound,
  Sparkles,
  HeartPulse,
  Activity
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AarogyamLogo } from '../common/AarogyamLogo';

export const LoginView = () => {
  const { 
    login, 
    registerAccount, 
    changePassword, 
    setPublicView, 
    showToast,
    currentRole,
    setCurrentRole
  } = useApp();

  // Mode: 'login' | 'signup'
  const [authMode, setAuthMode] = useState('login');

  // Admin login mode (toggled by Admin Login button or if arriving as admin)
  const [isAdminMode, setIsAdminMode] = useState(currentRole === 'admin');

  // Sign In inputs - completely blank
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Sign Up inputs - completely blank (Patients only)
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regGender, setRegGender] = useState('Male');
  const [regBloodGroup, setRegBloodGroup] = useState('B+');
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Status & Feedback
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Password Reset Modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotNewPass, setForgotNewPass] = useState('');
  const [forgotConfirmPass, setForgotConfirmPass] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Handle Sign In Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanId = identifier.trim();
    const cleanPass = password.trim();

    if (!cleanId) {
      setError('Please enter your registered email address or User ID.');
      return;
    }
    if (!cleanPass) {
      setError('Please enter your account password.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await login(cleanId, cleanPass);
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'Authentication failed. Please verify your credentials.');
      }
    } catch (err) {
      setIsLoading(false);
      setError('Authentication check failed. Please verify your credentials and try again.');
    }
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!regName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!regPassword || regPassword.length < 6) {
      setError('Password must be at least 6 characters in length.');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      setError('Passwords do not match. Please re-enter your password.');
      return;
    }
    if (!termsAgreed) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerAccount({
        role: 'Patient',
        fullName: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        password: regPassword,
        age: regAge,
        gender: regGender,
        bloodGroup: regBloodGroup
      });
      setIsLoading(false);

      if (!res.success) {
        setError(res.error || 'Registration failed. Please check your inputs.');
      } else {
        setSuccessMessage(`Account created successfully for ${res.account.name}! Credentials saved to database. You can sign in below.`);
        showToast(`Account created successfully! Credentials saved.`, 'success');
        
        // Ensure patient role mode
        setIsAdminMode(false);
        setCurrentRole('patient');

        // Populate identifier with the newly registered email and keep password populated for effortless sign-in
        setIdentifier(regEmail.trim());
        setPassword(regPassword);
        setAuthMode('login');
      }
    } catch (err) {
      setIsLoading(false);
      setError('An error occurred during account registration. Please try again.');
    }
  };

  // Handle Password Reset
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!forgotEmail.trim()) {
      setError('Please enter your registered email address or User ID.');
      return;
    }
    if (!forgotNewPass || forgotNewPass.length < 6) {
      setError('New password must be at least 6 characters.');
      return;
    }
    if (forgotNewPass !== forgotConfirmPass) {
      setError('Passwords do not match.');
      return;
    }

    const res = changePassword(forgotEmail.trim(), forgotNewPass);
    if (!res.success) {
      setError(res.error || 'Unable to update password for this user ID.');
    } else {
      setForgotSuccess(true);
      showToast('Password updated securely. You can now sign in.', 'success');
      setTimeout(() => {
        setShowForgotModal(false);
        setForgotSuccess(false);
        setPassword('');
      }, 1400);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50/50 via-slate-50 to-white flex flex-col justify-between py-6 sm:py-10 px-4">
      {/* Top Utility Bar */}
      <div className="max-w-5xl w-full mx-auto flex items-center justify-between pb-6">
        <button
          onClick={() => setPublicView('landing')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-amber-700 bg-white/90 hover:bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-2xs transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home Page</span>
        </button>

        <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50/80 px-3 py-1.5 rounded-full border border-emerald-200">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>DISHA & ISO 27001 Certified System</span>
        </div>
      </div>

      {/* Main Split-Card Auth Container */}
      <div className="max-w-5xl w-full mx-auto bg-white rounded-3xl sm:rounded-[28px] shadow-xl border border-amber-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* Left Column: Visual Brand & Artwork Canvas */}
        <div className="lg:col-span-5 bg-linear-to-b from-amber-100/70 via-amber-50/60 to-slate-100/90 p-8 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-amber-200/70 relative overflow-hidden">
          
          {/* Ambient Lighting Circles */}
          <div className="absolute -top-16 -left-16 w-56 h-56 bg-amber-300/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Brand Link */}
          <div className="relative z-10">
            <AarogyamLogo size="md" subtitle="Hospitals" />
          </div>

          {/* Center Graphic & Clinical Wellness Visual */}
          <div className="relative z-10 py-8 my-auto space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-linear-to-tr from-amber-400 to-amber-200 p-0.5 shadow-lg shadow-amber-400/20 mx-auto flex items-center justify-center">
              <div className="w-full h-full bg-white rounded-[22px] flex items-center justify-center">
                <HeartPulse className="w-10 h-10 text-amber-500" />
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-extrabold text-xl text-slate-900 tracking-tight">
                Holistic Mental Health Care &amp; Psychiatry
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Evidence-based clinical psychiatry, compassionate therapy, and secure digital health records management.
              </p>
            </div>

            {/* Healthcare Trust Badges */}
            <div className="space-y-2.5 pt-2 max-w-xs mx-auto text-xs">
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-semibold text-slate-800 text-[11px]">256-Bit Encrypted Health Records</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-semibold text-slate-800 text-[11px]">24x7 Emergency Psychiatric Care</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-2xl bg-white/80 border border-amber-200/60 shadow-2xs">
                <Activity className="w-4 h-4 text-sky-600 shrink-0" />
                <span className="font-semibold text-slate-800 text-[11px]">Multi-Disciplinary Care Collaboration</span>
              </div>
            </div>
          </div>

          {/* Left Footer */}
          <div className="relative z-10 pt-4 border-t border-amber-200/60 text-center text-[11px] text-slate-500 font-medium">
            Protected Health Information • MHC-PMS Network
          </div>
        </div>

        {/* Right Column: Clean Form Canvas (Parichay UI Engine) */}
        <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full">

            {/* ================================================================= */}
            {/* VIEW A: SIGN IN FORM */}
            {/* ================================================================= */}
            {authMode === 'login' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  {/* Contextual Role Portal Badge */}
                  {isAdminMode ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs font-bold mb-3 animate-in fade-in">
                      <Shield className="w-3.5 h-3.5 text-purple-700" />
                      <span>Hospital Administration Gateway</span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAdminMode(false);
                          setCurrentRole('patient');
                        }}
                        className="ml-1 text-purple-500 hover:text-purple-800 text-xs font-bold cursor-pointer"
                        title="Exit Admin Mode"
                      >
                        ×
                      </button>
                    </div>
                  ) : currentRole === 'doctor' ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold mb-3 animate-in fade-in">
                      <Stethoscope className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Attending Doctor Access</span>
                      <button
                        type="button"
                        onClick={() => setCurrentRole('patient')}
                        className="ml-1 text-emerald-500 hover:text-emerald-800 text-xs font-bold cursor-pointer"
                        title="General Sign In"
                      >
                        ×
                      </button>
                    </div>
                  ) : currentRole === 'receptionist' ? (
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold mb-3 animate-in fade-in">
                      <Building className="w-3.5 h-3.5 text-sky-700" />
                      <span>Reception Desk Access</span>
                      <button
                        type="button"
                        onClick={() => setCurrentRole('patient')}
                        className="ml-1 text-sky-500 hover:text-sky-800 text-xs font-bold cursor-pointer"
                        title="General Sign In"
                      >
                        ×
                      </button>
                    </div>
                  ) : null}

                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {isAdminMode ? 'Admin Console' : currentRole === 'doctor' ? 'Doctor Portal' : currentRole === 'receptionist' ? 'Reception Desk' : 'Welcome'}<br />
                    {isAdminMode || currentRole === 'doctor' || currentRole === 'receptionist' ? 'Sign in.' : 'back!'}
                  </h1>
                  <p className="text-sm text-slate-500 mt-2">
                    {isAdminMode
                      ? 'Authenticate with hospital administrative credentials to manage system governance.'
                      : currentRole === 'doctor'
                      ? 'Enter your clinical credentials to access your consultation suite.'
                      : currentRole === 'receptionist'
                      ? 'Enter your staff credentials to coordinate patient triage and admissions.'
                      : 'Sign in to continue your healthcare journey with Aarogyam.'}
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in shake">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Success Banner */}
                {successMessage && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                    <span>{successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Email address / ID Input */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-800">
                      {isAdminMode
                        ? 'Administrator Email or ID'
                        : currentRole === 'doctor'
                        ? 'Doctor Email address or User ID'
                        : currentRole === 'receptionist'
                        ? 'Receptionist Email or User ID'
                        : 'Email address or User ID'}
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => {
                          setIdentifier(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder={
                          isAdminMode
                            ? 'Email address or Administrator ID'
                            : currentRole === 'doctor'
                            ? 'Email address or Doctor ID'
                            : currentRole === 'receptionist'
                            ? 'Email address or Staff ID'
                            : 'Email address or User ID'
                        }
                        className="w-full pl-10 pr-3.5 py-3 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-slate-900 shadow-2xs"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-slate-800">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setError('');
                          setShowForgotModal(true);
                        }}
                        className="text-xs text-amber-700 hover:text-amber-900 underline underline-offset-3 font-semibold cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (error) setError('');
                        }}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-10 py-3 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition text-slate-900 shadow-2xs font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                        title={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                    />
                    <label htmlFor="rememberMe" className="text-xs text-slate-600 font-medium cursor-pointer select-none">
                      Keep me signed in on this device
                    </label>
                  </div>

                  {/* Pill Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2 active:scale-[0.99] ${
                      isAdminMode
                        ? 'bg-purple-700 hover:bg-purple-600 text-white shadow-purple-700/25'
                        : currentRole === 'doctor'
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25'
                        : currentRole === 'receptionist'
                        ? 'bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/25'
                        : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/25'
                    }`}
                  >
                    <span>
                      {isLoading
                        ? 'Signing in...'
                        : isAdminMode
                        ? 'Log in as Admin'
                        : currentRole === 'doctor'
                        ? 'Log in as Doctor'
                        : currentRole === 'receptionist'
                        ? 'Log in to Front Desk'
                        : 'Log me in'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Switch to Sign Up & Dedicated Admin Login Button */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center">
                    <span>Don't have an account?</span>
                    <button
                      type="button"
                      onClick={() => {
                        setError('');
                        setSuccessMessage('');
                        setAuthMode('signup');
                      }}
                      className="font-bold text-amber-700 hover:text-amber-900 underline underline-offset-3 ml-1.5 cursor-pointer"
                    >
                      Sign up
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setSuccessMessage('');
                      const nextAdminState = !isAdminMode;
                      setIsAdminMode(nextAdminState);
                      if (nextAdminState) {
                        setCurrentRole('admin');
                      } else {
                        setCurrentRole('patient');
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      isAdminMode
                        ? 'bg-purple-100 text-purple-900 border-purple-300 ring-2 ring-purple-300/40 shadow-2xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span>{isAdminMode ? 'Admin Portal Active' : 'Admin Login'}</span>
                  </button>
                </div>

                {/* Footer Notes */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Terms of Service</a>
                  <span>•</span>
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Privacy Policy</a>
                  <span>•</span>
                  <span className="font-semibold text-slate-500">Helpline: 1800-599-0019</span>
                </div>
              </div>
            )}

            {/* ================================================================= */}
            {/* VIEW B: SIGN UP (CREATE PATIENT ACCOUNT) FORM */}
            {/* ================================================================= */}
            {authMode === 'signup' && (
              <div className="space-y-5 animate-in fade-in duration-200">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 text-xs font-bold mb-3">
                    <User className="w-3.5 h-3.5 text-amber-700" />
                    <span>Outpatient Registration</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    Create your<br />patient account.
                  </h1>
                  <p className="text-sm text-slate-500 mt-2">
                    Register your confidential personal health profile to book appointments, consult specialists, and access electronic medical records.
                  </p>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-slate-800">Full legal name</label>
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition text-slate-900 shadow-2xs"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Email address</label>
                      <input
                        type="email"
                        required
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="name@example.com"
                        className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition text-slate-900 shadow-2xs"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Phone number</label>
                      <input
                        type="tel"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition text-slate-900 shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Age, Gender & Blood Group */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">Age</label>
                      <input
                        type="number"
                        min="1"
                        max="120"
                        value={regAge}
                        onChange={(e) => setRegAge(e.target.value)}
                        placeholder="Age"
                        className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">Gender</label>
                      <select
                        value={regGender}
                        onChange={(e) => setRegGender(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 cursor-pointer"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[11px] font-bold text-slate-700">Blood Group</label>
                      <select
                        value={regBloodGroup}
                        onChange={(e) => setRegBloodGroup(e.target.value)}
                        className="w-full px-2.5 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 text-slate-900 cursor-pointer"
                      >
                        <option value="A+">A+</option>
                        <option value="B+">B+</option>
                        <option value="O+">O+</option>
                        <option value="AB+">AB+</option>
                        <option value="A-">A-</option>
                        <option value="B-">B-</option>
                        <option value="O-">O-</option>
                        <option value="AB-">AB-</option>
                      </select>
                    </div>
                  </div>

                  {/* Password & Confirm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Password</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition text-slate-900 shadow-2xs font-mono"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-slate-800">Confirm password</label>
                      <input
                        type="password"
                        required
                        minLength={6}
                        value={regConfirmPassword}
                        onChange={(e) => setRegConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 transition text-slate-900 shadow-2xs font-mono"
                      />
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="termsCheck"
                      required
                      checked={termsAgreed}
                      onChange={(e) => setTermsAgreed(e.target.checked)}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 accent-amber-500 cursor-pointer"
                    />
                    <label htmlFor="termsCheck" className="text-xs text-slate-600 cursor-pointer select-none">
                      I agree to the <a href="#terms" onClick={(e) => e.preventDefault()} className="text-amber-700 underline font-semibold">Terms of Service</a> and <a href="#privacy" onClick={(e) => e.preventDefault()} className="text-amber-700 underline font-semibold">Privacy Policy</a>.
                    </label>
                  </div>

                  {/* Pill Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 px-6 rounded-full bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-bold text-xs sm:text-sm shadow-md shadow-amber-400/25 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
                  >
                    <span>{isLoading ? 'Creating account...' : 'Create Patient Account'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Switch to Sign In */}
                <div className="pt-2 text-center text-xs text-slate-600">
                  <span>Already have an account?</span>
                  <button
                    type="button"
                    onClick={() => {
                      setError('');
                      setSuccessMessage('');
                      setAuthMode('login');
                    }}
                    className="font-bold text-amber-700 hover:text-amber-900 underline underline-offset-3 ml-1.5 cursor-pointer"
                  >
                    Sign in
                  </button>
                </div>

                {/* Footer Notes */}
                <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400">
                  <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Terms of Service</a>
                  <span>•</span>
                  <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-600">Privacy Policy</a>
                  <span>•</span>
                  <span className="font-semibold text-slate-500">Helpline: 1800-599-0019</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: FORGOT / RESET PASSWORD */}
      {/* ========================================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <KeyRound className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Reset Account Password</h3>
              </div>
              <button 
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {forgotSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Password Updated Successfully</h4>
                <p className="text-xs text-slate-500">You can now authenticate with your new credentials.</p>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="mt-4 space-y-3.5 text-xs">
                {error && (
                  <div className="p-3 rounded-xl bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Email Address or User ID</label>
                  <input
                    type="text"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="Enter your registered email or ID"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={forgotNewPass}
                    onChange={(e) => setForgotNewPass(e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block font-bold text-slate-700">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={forgotConfirmPass}
                    onChange={(e) => setForgotConfirmPass(e.target.value)}
                    placeholder="Re-enter new password"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden font-mono"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-2xs"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bottom Footer info */}
      <div className="max-w-5xl w-full mx-auto text-center pt-4 text-[11px] text-slate-400">
        © 2026 Aarogyam Hospitals (MHC-PMS). All rights reserved.
      </div>
    </div>
  );
};