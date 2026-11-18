import React, { useState } from 'react';
import { 
  UserPlus,
  ShieldCheck, 
  Users, 
  BarChart3, 
  RefreshCw, 
  FileDown, 
  BellRing, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Send, 
  Server, 
  HardDrive, 
  Activity, 
  DollarSign, 
  Layers, 
  X,
  FileSpreadsheet,
  ShieldAlert,
  ArrowRightLeft,
  FileText,
  Clock,
  CheckCircle,
  Building,
  Key,
  Edit3,
  Upload,
  Camera,
  Database,
  Cloud,
  Download,
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminGovernanceView = () => {
  const { 
    currentUser, 
    currentRole,
    userAccounts, 
    toggleUserAccountStatus, 
    clinicNodes, 
    triggerClinicSync, 
    adminReports, 
    broadcastNotifications, 
    broadcastAnnouncement,
    addUserAccount,
    updateAnyUserAccount,
    updateAdminProfile,
    systemAuditLogs,
    switchRoleWithLogout,
    activeTab,
    setActiveTab,
    showToast,
    patientRecordsList,
    appointments,
    prescriptions,
    labRecords,
    billingInvoices,
    waitingVisitors,
    firebaseConfig,
    firebaseSyncStatus,
    updateFirebaseConfiguration,
    testFirebaseConnectionAsync,
    syncAllCollectionsToFirebase,
    exportMasterDatabaseToExcel,
    exportCollectionToCsv
  } = useApp();

  // Firebase Form State
  const [fbConfigForm, setFbConfigForm] = useState({
    projectId: firebaseConfig?.projectId || '',
    apiKey: firebaseConfig?.apiKey || ''
  });
  const [isTestingFb, setIsTestingFb] = useState(false);
  const [isExportingExcel, setIsExportingExcel] = useState(false);

  // Admin Profile Edit State (Photos and details editable by individual login)
  const [isEditAdminProfileOpen, setIsEditAdminProfileOpen] = useState(false);
  const [adminProfileForm, setAdminProfileForm] = useState({
    fullName: currentUser?.fullName || 'Shounak Sarkar',
    title: currentUser?.title || 'Healthcare Informatics & Systems Administrator',
    department: currentUser?.department || 'IT Systems & Health Records Governance',
    email: currentUser?.email || 'shounak.sarkar@mhc-pms.org',
    phone: currentUser?.phone || '+91 99201 88776',
    avatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'
  });

  // Edit User Account Modal State (Admin Universal Authority)
  const [isEditUserAccountModalOpen, setIsEditUserAccountModalOpen] = useState(false);
  const [editingUserAccount, setEditingUserAccount] = useState({
    id: '',
    name: '',
    email: '',
    role: 'Patient',
    status: 'Active',
    password: ''
  });

  const handleAdminPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('Image file size should be less than 2MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAdminProfileForm(prev => ({ ...prev, avatar: reader.result }));
        showToast('Admin photo loaded from local device!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAdminProfile = (e) => {
    e.preventDefault();
    updateAdminProfile(adminProfileForm);
    setIsEditAdminProfileOpen(false);
  };

  const handleOpenEditUser = (acc) => {
    setEditingUserAccount({
      id: acc.id,
      name: acc.name,
      email: acc.email,
      role: acc.role,
      status: acc.status,
      clinicNode: acc.clinicNode || 'Central Hospital OPD',
      password: ''
    });
    setIsEditUserAccountModalOpen(true);
  };

  const handleSaveUserAccount = (e) => {
    e.preventDefault();
    updateAnyUserAccount(editingUserAccount.id, editingUserAccount);
    setIsEditUserAccountModalOpen(false);
  };

  // Synchronize internal subtab with sidebar activeTab
  const currentSubTab = activeTab && (activeTab.startsWith('adm-') || activeTab.startsWith('doc-') || activeTab.startsWith('rec-'))
    ? activeTab.replace(/^(adm-|doc-|rec-)/, '')
    : (activeTab === 'sync' ? 'sync' : 'accounts');

  const setCurrentSubTab = (tabId) => {
    if (currentRole === 'doctor') {
      setActiveTab(tabId === 'sync' ? 'doc-sync' : 'doc-queue');
    } else if (currentRole === 'receptionist') {
      setActiveTab(tabId === 'sync' ? 'rec-sync' : 'rec-schedule');
    } else {
      setActiveTab('adm-' + tabId);
    }
  };
  
  // Account filtering
  const [accountSearch, setAccountSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  // Audit log filtering
  const [auditSearch, setAuditSearch] = useState('');
  const [auditSeverityFilter, setAuditSeverityFilter] = useState('All');

  // Add User / Doctor Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Doctor',
    clinicNode: 'Central Hospital OPD',
    speciality: 'Adult Psychiatry',
    consultationFee: 1200,
    qualifications: 'MBBS, MD (Psychiatry)'
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!userForm.name || !userForm.email) {
      showToast('Please enter both name and email.', 'error');
      return;
    }
    addUserAccount(userForm);
    setIsAddUserModalOpen(false);
    setUserForm({
      name: '',
      email: '',
      role: 'Doctor',
      clinicNode: 'Central Hospital OPD',
      speciality: 'Adult Psychiatry',
      consultationFee: 1200,
      qualifications: 'MBBS, MD (Psychiatry)'
    });
  };

  // Broadcast Modal State
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [broadcastForm, setBroadcastForm] = useState({
    title: '',
    audience: 'All Users',
    content: '',
    priority: 'Normal'
  });

  // Sync animation state
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncAll = async () => {
    setIsSyncing(true);
    triggerClinicSync();
    try {
      await syncAllCollectionsToFirebase();
    } finally {
      setTimeout(() => {
        setIsSyncing(false);
      }, 800);
    }
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastForm.title || !broadcastForm.content) {
      showToast('Please provide a title and announcement content.', 'error');
      return;
    }
    broadcastAnnouncement({
      ...broadcastForm,
      sender: `${currentUser?.fullName || currentUser?.name || 'Shounak Sarkar'} (${currentUser?.role || 'System Admin'})`
    });
    setIsBroadcastModalOpen(false);
    setBroadcastForm({
      title: '',
      audience: 'All Users',
      content: '',
      priority: 'Normal'
    });
  };

  const handleExportReport = (reportType) => {
    showToast(`Exporting ${reportType} report to CSV/PDF. Download initiated!`, 'success');
  };

  // Filtered accounts
  const filteredAccounts = userAccounts.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(accountSearch.toLowerCase()) ||
                          acc.id.toLowerCase().includes(accountSearch.toLowerCase()) ||
                          acc.email.toLowerCase().includes(accountSearch.toLowerCase());
    const matchesRole = roleFilter === 'All' || acc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Filtered audit logs
  const filteredAuditLogs = (systemAuditLogs || []).filter(log => {
    const matchesSearch = log.details.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.user.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.eventType.toLowerCase().includes(auditSearch.toLowerCase()) ||
                          log.id.toLowerCase().includes(auditSearch.toLowerCase());
    const matchesSeverity = auditSeverityFilter === 'All' || log.severity === auditSeverityFilter;
    return matchesSearch && matchesSeverity;
  });

  const adminTabs = [
    { id: 'accounts', label: 'User Account Governance', icon: Users, count: userAccounts.length },
    { id: 'reports', label: 'Clinical & Legal Reports', icon: BarChart3 },
    { id: 'sync', label: 'Firebase Cloud DB & Excel Engine', icon: Database, count: clinicNodes.length },
    { id: 'audit', label: 'System Security & Audit Trail', icon: ShieldAlert, count: systemAuditLogs?.length || 0, highlight: true },
    { id: 'broadcasts', label: 'Broadcast Announcements', icon: BellRing, count: broadcastNotifications?.length || 0 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Non-Admin Staff Sync Access Banner */}
      {currentRole !== 'admin' && (
        <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <p className="font-bold text-slate-900">Hospital Cloud Database &amp; Synchronization Engine</p>
              <p className="text-slate-600">Accessing centralized Google Cloud Firebase sync and Excel data backups as {currentRole === 'doctor' ? 'Attending Doctor' : 'Front Desk Receptionist'}.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab(currentRole === 'doctor' ? 'doc-queue' : 'rec-schedule')}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
          >
            ← Return to {currentRole === 'doctor' ? 'Doctor Suite' : 'Front Desk'}
          </button>
        </div>
      )}
      {/* 1. Administrator Profile Hero Card */}
      <div className="bg-linear-to-r from-amber-50/90 via-white to-amber-100/50 text-slate-900 rounded-3xl p-6 sm:p-7 shadow-xs border border-amber-200/90 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.fullName || currentUser?.name || 'Administrator'}
              className="w-18 h-18 rounded-2xl object-cover ring-4 ring-amber-300 shadow-sm shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {currentUser?.role || 'System Admin'} • {currentUser?.id || 'ADM-001'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Root Governance Session Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950">
                {currentUser?.fullName || currentUser?.name || 'Shounak Sarkar'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {currentUser?.title || 'Healthcare Informatics & Systems Administrator'}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                {currentUser?.department || 'IT Systems & Health Records Governance'} • {currentUser?.accessLevel || 'Enterprise Super Administrator'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('records')}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-400/40 transition flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Open full interactive multi-sheet EHR spreadsheet on website"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-amber-400" />
              <span>Tabular EHR (Excel)</span>
            </button>
            <button
              onClick={() => {
                setIsExportingExcel(true);
                exportMasterDatabaseToExcel();
                setTimeout(() => setIsExportingExcel(false), 800);
              }}
              disabled={isExportingExcel}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
              title="Download full multi-sheet Excel spreadsheet with timestamps"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>{isExportingExcel ? 'Exporting...' : 'Export Excel DB'}</span>
            </button>
            <button
              onClick={() => setIsEditAdminProfileOpen(true)}
              className="px-3.5 py-2 text-xs font-bold rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Details & Photo</span>
            </button>
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50 font-black"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing Cloud...' : 'Sync Database to Cloud'}</span>
            </button>
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-purple-700 hover:bg-purple-600 text-white transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Alert</span>
            </button>
          </div>
        </div>

        {/* Global Key Governance Metrics */}
        <div className="mt-5 pt-5 border-t border-amber-200/60 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Total Treated YTD</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{adminReports.summary.totalPatientsTreated}</p>
          </div>
          <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Active User Accounts</p>
            <p className="text-lg font-black text-amber-700 mt-0.5">{userAccounts.filter(a => a.status === 'Active').length}</p>
          </div>
          <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Synchronized Clinics</p>
            <p className="text-lg font-black text-emerald-700 mt-0.5">{clinicNodes.length} Nodes</p>
          </div>
          <div className="bg-white rounded-2xl p-2.5 border border-slate-200/80 shadow-xs">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Bed Occupancy</p>
            <p className="text-lg font-black text-slate-900 mt-0.5">{adminReports.summary.averageBedOccupancy}</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-3">
        {adminTabs.map(tab => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSubTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive 
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' 
                  : tab.highlight
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-slate-900/10 text-slate-950' : 'bg-slate-100 text-slate-600'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* SUBTAB 1: USER ACCOUNTS GOVERNANCE & ACCESS CONTROL */}
      {/* ========================================================================= */}
      {currentSubTab === 'accounts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">User Account Directory & Access Privileges</h3>
              <p className="text-xs text-slate-500">Manage account activation, suspension, clinical privileges, and credentials across all roles</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search user name or ID..."
                  value={accountSearch}
                  onChange={(e) => setAccountSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden w-44 sm:w-56"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
              >
                <option value="All">All Roles</option>
                <option value="Doctor">Doctors</option>
                <option value="Patient">Patients</option>
                <option value="Receptionist">Receptionists</option>
                <option value="System Admin">Administrators</option>
              </select>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Add User / Doctor</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">User ID</th>
                  <th className="py-3 px-4">Full Name & Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Clinic Affiliation / Speciality</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Account Governance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredAccounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-amber-800 font-mono">{acc.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{acc.name}</p>
                      <p className="text-[11px] text-slate-500">{acc.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        acc.role === 'Doctor' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        acc.role === 'System Admin' ? 'bg-amber-50 text-amber-850 border border-amber-300' :
                        acc.role === 'Receptionist' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">
                      <p className="font-semibold text-slate-800">{acc.clinicNode}</p>
                      {acc.speciality && <p className="text-[10px] text-slate-400">{acc.speciality} (₹{acc.consultationFee})</p>}
                    </td>
                    <td className="py-3 px-4 text-slate-500">{acc.lastLogin}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        acc.status === 'Active' 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditUser(acc)}
                          className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition cursor-pointer flex items-center gap-1"
                          title="Edit credentials and details (Universal Authority)"
                        >
                          <Edit3 className="w-3 h-3 text-slate-600" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => toggleUserAccountStatus(acc.id)}
                          className={`px-3 py-1 text-[11px] font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ${
                            acc.status === 'Active'
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {acc.status === 'Active' ? (
                            <>
                              <Lock className="w-3 h-3" />
                              <span>Deactivate</span>
                            </>
                          ) : (
                            <>
                              <Unlock className="w-3 h-3" />
                              <span>Activate</span>
                            </>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 2: CLINICAL & MANAGEMENT REPORTS */}
      {/* ========================================================================= */}
      {currentSubTab === 'reports' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Hospital Performance & Clinical Throughput Reports</h3>
                <p className="text-xs text-slate-500">Aggregated statistics across outpatient admissions, legal provisions, and pharmaceutical costs</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleExportReport('Clinical Performance CSV')}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => handleExportReport('MHA Legal Audit PDF')}
                  className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Full Audit (PDF)</span>
                </button>
              </div>
            </div>

            {/* Monthly Trend Bars */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">6-Month Patient Consultation & Inpatient Volumes</h4>
              <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
                {adminReports.monthlyTrends.map((t, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50/60 text-center">
                    <p className="text-xs font-semibold text-slate-500">{t.month}</p>
                    <p className="text-lg font-black text-amber-700 mt-1">{t.treated}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">Admissions: {t.admissions}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Mental Health Care Provisions & Medication Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Legal Mental Health Care Provisions */}
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Mental Health Care Act Legal Provisions Active</span>
                </h4>
                <div className="space-y-2.5">
                  {adminReports.legalCareCategories.map((cat, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{cat.section}</p>
                        <p className="text-[11px] text-slate-500">Statutory Clinical Supervision</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{cat.count} Patients</p>
                        <span className="text-[10px] font-bold text-amber-700">{cat.percentage}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top Prescribed Medications */}
              <div className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>High-Volume Pharmaceutical Dispensing & Cost</span>
                </h4>
                <div className="space-y-2.5">
                  {adminReports.topPrescriptions.slice(0, 3).map((rx, i) => (
                    <div key={i} className="p-3 bg-white rounded-xl border border-slate-200/60 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold text-slate-800">{rx.drug}</p>
                        <p className="text-[11px] text-slate-500">{rx.category}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-slate-900">{rx.unitsDispensed} Units</p>
                        <span className="text-[10px] font-bold text-emerald-600">{rx.cost}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 3: GOOGLE CLOUD FIREBASE FREE TIER & EXCEL SYNCHRONIZATION ENGINE */}
      {/* ========================================================================= */}
      {currentSubTab === 'sync' && (
        <div className="space-y-6">
          {/* 1. Google Cloud Firebase Free Tier (Spark Plan) Management Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                  <Database className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">Google Cloud Firebase Database (Spark Free Tier)</h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Free Tier Active ($0.00)
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Serverless Firestore cloud database with automatic offline sync & zero-dependency REST integration
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    setIsTestingFb(true);
                    await testFirebaseConnectionAsync(fbConfigForm);
                    setIsTestingFb(false);
                  }}
                  disabled={isTestingFb}
                  className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTestingFb ? 'animate-spin' : ''}`} />
                  <span>{isTestingFb ? 'Testing Ping...' : 'Test Connection'}</span>
                </button>
                <button
                  onClick={syncAllCollectionsToFirebase}
                  disabled={firebaseSyncStatus.isSyncing}
                  className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
                >
                  <Cloud className={`w-3.5 h-3.5 ${firebaseSyncStatus.isSyncing ? 'animate-spin' : ''}`} />
                  <span>{firebaseSyncStatus.isSyncing ? 'Syncing to Cloud...' : 'Backup All Collections to Firebase'}</span>
                </button>
              </div>
            </div>

            {/* Spark Tier Quota & Specs Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-amber-50/50 p-4 rounded-2xl border border-amber-200/50 text-xs">
              <div>
                <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Free Daily Reads</p>
                <p className="text-base font-black text-slate-900 mt-0.5">50,000 / day</p>
                <span className="text-[10px] text-amber-700">Spark Plan Quota</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Free Daily Writes</p>
                <p className="text-base font-black text-slate-900 mt-0.5">20,000 / day</p>
                <span className="text-[10px] text-amber-700">Spark Plan Quota</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Cloud Storage</p>
                <p className="text-base font-black text-slate-900 mt-0.5">1 GiB Documents</p>
                <span className="text-[10px] text-emerald-700 font-semibold">Zero Bill Guaranteed</span>
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">Connection Status</p>
                <p className="text-base font-black text-emerald-700 mt-0.5">
                  {firebaseSyncStatus.isConnected ? 'Cloud Connected' : (fbConfigForm.projectId ? 'Configured (Idle)' : 'Local Standby')}
                </p>
                <span className="text-[10px] text-slate-500">
                  {firebaseSyncStatus.lastSynced ? `Synced: ${firebaseSyncStatus.lastSynced}` : 'Ready for 1-click sync'}
                </span>
              </div>
            </div>

            {/* Firebase Configuration Form */}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                updateFirebaseConfiguration(fbConfigForm);
              }}
              className="bg-slate-50/70 p-4 rounded-2xl border border-slate-200/80 space-y-4 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-amber-600" />
                  Firebase Project Settings (Google Cloud Console)
                </span>
                <span className="text-[11px] text-slate-500">
                  Values persist in secure browser local storage
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Google Cloud Firebase Project ID
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.projectId}
                    onChange={(e) => setFbConfigForm(prev => ({ ...prev, projectId: e.target.value }))}
                    placeholder="e.g. mhc-pms-free-tier or your-project-id"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Found in Firebase Console &gt; Project Settings &gt; General
                  </p>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Web API Key (Optional)
                  </label>
                  <input
                    type="text"
                    value={fbConfigForm.apiKey}
                    onChange={(e) => setFbConfigForm(prev => ({ ...prev, apiKey: e.target.value }))}
                    placeholder="AIzaSy... (leave blank for open testing rules)"
                    className="w-full px-3 py-2 text-xs bg-white rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-mono"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">
                    Enables authenticated request quotas on Google Cloud API Gateway
                  </p>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
                >
                  Save Firebase Credentials
                </button>
              </div>
            </form>

            {/* Mapped Collections Summary */}
            <div>
              <p className="text-xs font-bold text-slate-700 mb-2">Cloud Collections Synced to Google Cloud Firestore:</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { name: 'patients', label: 'Patients Registry', count: patientRecordsList?.length || 2, color: 'text-amber-700' },
                  { name: 'appointments', label: 'Appointments Schedule', count: appointments?.length || 0, color: 'text-sky-600' },
                  { name: 'prescriptions', label: 'e-Prescriptions', count: prescriptions?.length || 0, color: 'text-emerald-600' },
                  { name: 'lab_records', label: 'Diagnostic Lab Tests', count: labRecords?.length || 0, color: 'text-teal-600' },
                  { name: 'billing_invoices', label: 'Invoices & Receipts', count: billingInvoices?.length || 0, color: 'text-amber-600' },
                  { name: 'waiting_visitors', label: 'Visitor Lounge Log', count: waitingVisitors?.length || 0, color: 'text-purple-600' },
                  { name: 'user_accounts', label: 'User Access Directory', count: userAccounts?.length || 0, color: 'text-rose-600' },
                  { name: 'audit_logs', label: 'System Audit Trail', count: systemAuditLogs?.length || 0, color: 'text-slate-600' }
                ].map(col => (
                  <div key={col.name} className="p-2.5 bg-slate-50/70 border border-slate-200/60 rounded-xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold text-slate-800">{col.label}</p>
                      <p className="text-[10px] text-slate-400 font-mono">collection: {col.name}</p>
                    </div>
                    <span className={`font-black ${col.color} text-sm`}>{col.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Connected Microsoft Excel Data Engine Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-black text-slate-900">Connected Microsoft Excel Data Engine (.xls / .xlsx)</h3>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      8 Worksheets • Formatted Rows &amp; Columns
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live database exported into multi-sheet spreadsheet format with explicit row timestamps, widths, and styling
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  onClick={() => setActiveTab('records')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-xs cursor-pointer border border-amber-400/40"
                  title="Open live multi-sheet tabular Excel view directly on the website"
                >
                  <FileSpreadsheet className="w-4 h-4 text-amber-400" />
                  <span>Open Tabular EHR Database</span>
                </button>

                <button
                  onClick={() => {
                    setIsExportingExcel(true);
                    exportMasterDatabaseToExcel();
                    setTimeout(() => setIsExportingExcel(false), 800);
                  }}
                  disabled={isExportingExcel}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-black transition flex items-center gap-2 shadow-md cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isExportingExcel ? 'Generating Workbook...' : 'Download Master Excel (.xls)'}</span>
                </button>
              </div>
            </div>

            {/* Quick Export Individual Tables */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Export Individual Table Spreadsheets (CSV / Excel format)
                </h4>
                <span className="text-[11px] text-slate-400">Includes system timestamps on each exported row</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <button
                  onClick={() => exportCollectionToCsv('Patients_Registry', patientRecordsList)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">1. Patients Registry</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{patientRecordsList?.length || 2} registered patients</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('Appointments_Schedule', appointments)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">2. Appointments</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{appointments?.length || 0} clinic visits</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('ePrescriptions_Pharmacy', prescriptions)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">3. e-Prescriptions</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{prescriptions?.length || 0} active Rx slips</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('Diagnostic_Lab_Reports', labRecords)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">4. Diagnostic Labs</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{labRecords?.length || 0} test orders</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('Billing_Invoices', billingInvoices)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">5. Billing &amp; Invoices</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{billingInvoices?.length || 0} receipts</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('Visitor_Waiting_Lounge', waitingVisitors)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">6. Visitor Lounge</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{waitingVisitors?.length || 0} visitor logs</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('User_Accounts_Directory', userAccounts)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">7. User Accounts Directory</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{userAccounts?.length || 0} system roles</span>
                </button>

                <button
                  onClick={() => exportCollectionToCsv('System_Audit_Trail', systemAuditLogs)}
                  className="p-3 bg-slate-50 hover:bg-emerald-50 text-left rounded-xl border border-slate-200 hover:border-emerald-300 transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-bold text-slate-800">8. Audit Trail</span>
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-slate-500">{systemAuditLogs?.length || 0} log events</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3. Distributed Multi-Clinic Synchronization Hub */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Distributed Multi-Clinic Synchronization Hub</h3>
                <p className="text-xs text-slate-500">Centralized database sync with local offline-capable clinic nodes and regional branches</p>
              </div>

              <button
                onClick={handleSyncAll}
                disabled={isSyncing}
                className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>{isSyncing ? 'Synchronizing Cluster...' : 'Sync All Remote Nodes'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clinicNodes.map(node => (
                <div key={node.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-amber-600" />
                      <span className="text-xs font-bold text-slate-800">{node.id}</span>
                    </div>
                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-100 text-emerald-800">
                      {node.status}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{node.name}</h4>
                    <p className="text-xs text-slate-500">{node.location} • {node.type}</p>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-slate-200/60 text-xs space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Connection:</span>
                      <span className="font-semibold text-slate-800">{node.connectionSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Records Cached:</span>
                      <span className="font-semibold text-slate-800">{node.recordsCount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Last Synced:</span>
                      <span className="font-bold text-amber-800">{node.lastSynced}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => triggerClinicSync(node.id)}
                    className="w-full py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer"
                  >
                    Force Node Re-Sync
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 4: SYSTEM SECURITY & AUDIT TRAIL */}
      {/* ========================================================================= */}
      {currentSubTab === 'audit' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">System Security, EHR Access & Compliance Audit Trail</h3>
              <p className="text-xs text-slate-500">Immutable regulatory audit logging for patient record access, authentication, prescription signing, and replication</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search audit trail..."
                  value={auditSearch}
                  onChange={(e) => setAuditSearch(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden w-44 sm:w-56"
                />
              </div>

              <select
                value={auditSeverityFilter}
                onChange={(e) => setAuditSeverityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
              >
                <option value="All">All Severities</option>
                <option value="Info">Info Level</option>
                <option value="Warning">Warning Level</option>
                <option value="Critical">Critical Level</option>
              </select>

              <button
                onClick={() => handleExportReport('Regulatory Security Audit Log')}
                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Export Audit</span>
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-[11px] font-bold uppercase text-slate-400">
                  <th className="py-3 px-4">Audit ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Authorized User / Actor</th>
                  <th className="py-3 px-4">Event Type</th>
                  <th className="py-3 px-4">Details & Compliance Summary</th>
                  <th className="py-3 px-4">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-mono">
                {filteredAuditLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-amber-800">{log.id}</td>
                    <td className="py-3 px-4 text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                    <td className="py-3 px-4 font-sans font-bold text-slate-900">{log.user}</td>
                    <td className="py-3 px-4 font-sans">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                        {log.eventType}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-600 max-w-md truncate">
                      {log.details}
                    </td>
                    <td className="py-3 px-4 font-sans">
                      <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                        log.severity === 'Critical' ? 'bg-rose-100 text-rose-800 font-black' :
                        log.severity === 'Warning' ? 'bg-amber-100 text-amber-800' :
                        'bg-sky-100 text-sky-800'
                      }`}>
                        {log.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUBTAB 5: BROADCAST ANNOUNCEMENTS & ADVISORIES */}
      {/* ========================================================================= */}
      {currentSubTab === 'broadcasts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Hospital Broadcast Notices & Clinical Advisories</h3>
              <p className="text-xs text-slate-500">Dispatch urgent announcements and operational notices to clinicians, receptionists, or patients</p>
            </div>

            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-500 text-slate-950 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Create New Broadcast</span>
            </button>
          </div>

          <div className="space-y-3">
            {broadcastNotifications.map(notice => (
              <div key={notice.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      notice.priority === 'Urgent' ? 'bg-rose-100 text-rose-800' :
                      notice.priority === 'High' ? 'bg-amber-100 text-amber-800' :
                      'bg-slate-200 text-slate-800'
                    }`}>
                      {notice.priority} Priority
                    </span>
                    <h4 className="font-bold text-slate-900 text-sm">{notice.title}</h4>
                  </div>
                  <span className="text-[11px] text-slate-400">{notice.timestamp}</span>
                </div>

                <p className="text-xs text-slate-600">{notice.content}</p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-[11px] text-slate-500">
                  <span>Audience: <strong>{notice.audience}</strong></span>
                  <span>Dispatched by: <strong>{notice.sender}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 1: ADD USER / DOCTOR ACCOUNT */}
      {/* ========================================================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Add Staff Account / Doctor Profile</h3>
              </div>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Priya Sharma"
                  value={userForm.name}
                  onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. priya.sharma@mhc.care"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white font-bold"
                  >
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="Patient">Patient</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinic Node *</label>
                  <select
                    value={userForm.clinicNode}
                    onChange={(e) => setUserForm({ ...userForm, clinicNode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  >
                    <option value="Central Hospital OPD">Central Hospital OPD</option>
                    <option value="North Satellite Clinic">North Satellite Clinic</option>
                    <option value="South Community Health">South Community Health</option>
                    <option value="East Suburban Practice">East Suburban Practice</option>
                  </select>
                </div>
              </div>

              {userForm.role === 'Doctor' && (
                <div className="space-y-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <p className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">Clinician Speciality Configuration</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Speciality</label>
                      <input
                        type="text"
                        value={userForm.speciality}
                        onChange={(e) => setUserForm({ ...userForm, speciality: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Fee (₹)</label>
                      <input
                        type="number"
                        value={userForm.consultationFee}
                        onChange={(e) => setUserForm({ ...userForm, consultationFee: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Medical Qualifications</label>
                    <input
                      type="text"
                      value={userForm.qualifications}
                      onChange={(e) => setUserForm({ ...userForm, qualifications: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: BROADCAST SYSTEM NOTICE */}
      {/* ========================================================================= */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Send className="w-5 h-5 text-amber-500" />
                <h3 className="text-base font-bold text-slate-900">Broadcast Hospital Announcement</h3>
              </div>
              <button onClick={() => setIsBroadcastModalOpen(false)} className="text-slate-400 font-bold">✕</button>
            </div>

            <form onSubmit={handleSendBroadcast} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Severe Drug Interaction Advisory: SSRI + MAOI"
                  value={broadcastForm.title}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={broadcastForm.audience}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, audience: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white"
                  >
                    <option value="All Users">All Roles & Users</option>
                    <option value="Doctors">All Clinicians & Doctors</option>
                    <option value="Receptionists">Front Desk & Reception</option>
                    <option value="Patients">Registered Outpatients</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden bg-white font-bold"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent / Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Advisory Content *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter full notice text for clinical and operational teams..."
                  value={broadcastForm.content}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 rounded-xl shadow-xs"
                >
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ========================================================================= */}
      {/* MODAL: EDIT ADMIN PROFILE & PHOTO */}
      {/* ========================================================================= */}
      {isEditAdminProfileOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Administrator Profile & Photo</h3>
                  <p className="text-xs text-slate-500">Universal Authority • Shounak Sarkar (`ADM-001`)</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditAdminProfileOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveAdminProfile} className="space-y-3.5 text-xs">
              <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200">
                <label className="block font-bold text-slate-800 mb-2">Administrator Profile Photo</label>
                <div className="flex items-center gap-4">
                  <img
                    src={adminProfileForm.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'}
                    alt="Preview"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500 shrink-0"
                  />
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer shadow-2xs">
                      <Upload className="w-3.5 h-3.5 text-purple-600" />
                      <span>Upload Local Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAdminPhotoUpload}
                        className="hidden"
                      />
                    </label>
                    <input
                      type="url"
                      placeholder="Or paste direct image URL"
                      value={adminProfileForm.avatar}
                      onChange={(e) => setAdminProfileForm({ ...adminProfileForm, avatar: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-300 rounded-xl bg-white outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Legal Name</label>
                  <input
                    type="text"
                    required
                    value={adminProfileForm.fullName}
                    onChange={(e) => setAdminProfileForm({ ...adminProfileForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Administrative Title</label>
                  <input
                    type="text"
                    required
                    value={adminProfileForm.title}
                    onChange={(e) => setAdminProfileForm({ ...adminProfileForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={adminProfileForm.phone}
                    onChange={(e) => setAdminProfileForm({ ...adminProfileForm, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    value={adminProfileForm.email}
                    onChange={(e) => setAdminProfileForm({ ...adminProfileForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Department</label>
                <input
                  type="text"
                  value={adminProfileForm.department}
                  onChange={(e) => setAdminProfileForm({ ...adminProfileForm, department: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditAdminProfileOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 transition cursor-pointer shadow-sm"
                >
                  Save Admin Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: UNIVERSAL AUTHORITY - EDIT ANY USER ACCOUNT & CREDENTIALS */}
      {/* ========================================================================= */}
      {isEditUserAccountModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 sm:p-7 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Universal Account Governance</h3>
                  <p className="text-xs text-slate-500">Edit Credentials, Role & Password for ID: {editingUserAccount.id}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditUserAccountModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUserAccount} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">User Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingUserAccount.name}
                    onChange={(e) => setEditingUserAccount({ ...editingUserAccount, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Account Email / ID</label>
                  <input
                    type="email"
                    required
                    value={editingUserAccount.email}
                    onChange={(e) => setEditingUserAccount({ ...editingUserAccount, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role</label>
                  <select
                    value={editingUserAccount.role}
                    onChange={(e) => setEditingUserAccount({ ...editingUserAccount, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white font-semibold"
                  >
                    <option value="Patient">Patient</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Receptionist">Receptionist</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Account Status</label>
                  <select
                    value={editingUserAccount.status}
                    onChange={(e) => setEditingUserAccount({ ...editingUserAccount, status: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none bg-white font-semibold"
                  >
                    <option value="Active">Active</option>
                    <option value="Deactivated">Deactivated</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Clinic Node</label>
                <input
                  type="text"
                  value={editingUserAccount.clinicNode}
                  onChange={(e) => setEditingUserAccount({ ...editingUserAccount, clinicNode: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-200">
                <label className="block font-bold text-amber-900 mb-1">Set / Reset Password</label>
                <input
                  type="text"
                  placeholder="Leave empty to keep existing password, or enter new password"
                  value={editingUserAccount.password}
                  onChange={(e) => setEditingUserAccount({ ...editingUserAccount, password: e.target.value })}
                  className="w-full px-3 py-2 border border-amber-300 rounded-xl focus:ring-2 focus:ring-amber-500 outline-none font-mono bg-white"
                />
                <p className="text-[10px] text-amber-700 mt-1">Universal Authority override allows instant credential reassignment.</p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditUserAccountModalOpen(false)}
                  className="px-4 py-2 rounded-xl font-bold text-slate-600 hover:bg-slate-100 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-500 transition cursor-pointer shadow-sm"
                >
                  Save Account Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
