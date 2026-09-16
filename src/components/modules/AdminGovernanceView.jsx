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
  Key
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AdminGovernanceView = () => {
  const { 
    currentUser, 
    userAccounts, 
    toggleUserAccountStatus, 
    clinicNodes, 
    triggerClinicSync, 
    adminReports, 
    broadcastNotifications, 
    broadcastAnnouncement,
    addUserAccount,
    systemAuditLogs,
    switchRoleWithLogout,
    activeTab,
    setActiveTab,
    showToast 
  } = useApp();

  // Synchronize internal subtab with sidebar activeTab
  const currentSubTab = activeTab && activeTab.startsWith('adm-') 
    ? activeTab.replace('adm-', '') 
    : 'accounts';

  const setCurrentSubTab = (tabId) => {
    setActiveTab('adm-' + tabId);
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

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => {
      triggerClinicSync();
      setIsSyncing(false);
    }, 1200);
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
    { id: 'sync', label: 'Cross-Clinic Data Sync', icon: RefreshCw, count: clinicNodes.length },
    { id: 'audit', label: 'System Security & Audit Trail', icon: ShieldAlert, count: systemAuditLogs?.length || 0, highlight: true },
    { id: 'broadcasts', label: 'Broadcast Announcements', icon: BellRing, count: broadcastNotifications?.length || 0 }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Administrator Profile Hero Card */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div className="flex items-center gap-4 sm:gap-5">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.fullName || currentUser?.name || 'Administrator'}
              className="w-18 h-18 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-md shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {currentUser?.role || 'System Admin'} • {currentUser?.id || 'ADM-001'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Root Governance Session Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {currentUser?.fullName || currentUser?.name || 'Shounak Sarkar'}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/90 font-medium">
                {currentUser?.title || 'Healthcare Informatics & Systems Administrator'}
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                {currentUser?.department || 'IT Systems & Health Records Governance'} • {currentUser?.accessLevel || 'Level 4 Super Administrator'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition flex items-center gap-1.5 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing...' : 'Sync All Remote Nodes'}</span>
            </button>
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2 text-xs font-bold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Alert</span>
            </button>
            <button
              onClick={() => switchRoleWithLogout('doctor')}
              className="px-3 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowRightLeft className="w-3.5 h-3.5 text-indigo-300" />
              <span>Switch Role</span>
            </button>
          </div>
        </div>

        {/* Global Key Governance Metrics */}
        <div className="mt-5 pt-5 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Treated YTD</p>
            <p className="text-lg font-black text-white mt-0.5">{adminReports.summary.totalPatientsTreated}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active User Accounts</p>
            <p className="text-lg font-black text-indigo-300 mt-0.5">{userAccounts.filter(a => a.status === 'Active').length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Synchronized Clinics</p>
            <p className="text-lg font-black text-emerald-300 mt-0.5">{clinicNodes.length} Nodes</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-2.5 border border-white/5">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Bed Occupancy</p>
            <p className="text-lg font-black text-amber-300 mt-0.5">{adminReports.summary.averageBedOccupancy}</p>
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
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : tab.highlight
                  ? 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
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
              <h3 className="text-base font-bold text-slate-900">User Account Lifecycle & Role-Based Access Control</h3>
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
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden w-44 sm:w-56"
                />
              </div>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
              >
                <option value="All">All Roles</option>
                <option value="Doctor">Doctors</option>
                <option value="Patient">Patients</option>
                <option value="Receptionist">Receptionists</option>
                <option value="System Admin">Administrators</option>
              </select>
              <button
                onClick={() => setIsAddUserModalOpen(true)}
                className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                    <td className="py-3 px-4 font-bold text-indigo-600 font-mono">{acc.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{acc.name}</p>
                      <p className="text-[11px] text-slate-500">{acc.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        acc.role === 'Doctor' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        acc.role === 'System Admin' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' :
                        acc.role === 'Receptionist' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-sky-50 text-sky-700 border border-sky-200'
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
                      <button
                        onClick={() => toggleUserAccountStatus(acc.id)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-xl transition cursor-pointer flex items-center gap-1.5 ml-auto ${
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
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                    <p className="text-lg font-black text-indigo-700 mt-1">{t.treated}</p>
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
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
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
                        <span className="text-[10px] font-bold text-indigo-600">{cat.percentage}</span>
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
      {/* SUBTAB 3: CROSS-CLINIC DATA SYNCHRONIZATION */}
      {/* ========================================================================= */}
      {currentSubTab === 'sync' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Distributed Multi-Clinic Synchronization Hub</h3>
              <p className="text-xs text-slate-500">Centralized database sync with local offline-capable clinic nodes and regional branches</p>
            </div>

            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
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
                    <Server className="w-4 h-4 text-indigo-600" />
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
                    <span className="font-bold text-indigo-600">{node.lastSynced}</span>
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
                  className="pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden w-44 sm:w-56"
                />
              </div>

              <select
                value={auditSeverityFilter}
                onChange={(e) => setAuditSeverityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
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
                    <td className="py-3 px-4 font-bold text-indigo-700">{log.id}</td>
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
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                <UserPlus className="w-5 h-5 text-indigo-600" />
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white font-bold"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
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
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Fee (₹)</label>
                      <input
                        type="number"
                        value={userForm.consultationFee}
                        onChange={(e) => setUserForm({ ...userForm, consultationFee: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Medical Qualifications</label>
                    <input
                      type="text"
                      value={userForm.qualifications}
                      onChange={(e) => setUserForm({ ...userForm, qualifications: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
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
                <Send className="w-5 h-5 text-indigo-600" />
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Audience</label>
                  <select
                    value={broadcastForm.audience}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, audience: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white font-bold"
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
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs"
                >
                  Send Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
