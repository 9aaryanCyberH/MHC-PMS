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
  FileSpreadsheet
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
    showToast 
  } = useApp();

  const [currentSubTab, setCurrentSubTab] = useState('accounts');
  const [accountSearch, setAccountSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

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
      sender: `${currentUser?.fullName || currentUser?.name || 'Shounak Sarkar'} (${currentUser.role})`
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
    showToast(`Exporting ${reportType} report to CSV/PDF. Download initiated!`);
  };

  // Filter accounts
  const filteredAccounts = userAccounts.filter(acc => {
    const matchesSearch = acc.name.toLowerCase().includes(accountSearch.toLowerCase()) ||
                          acc.id.toLowerCase().includes(accountSearch.toLowerCase()) ||
                          acc.email.toLowerCase().includes(accountSearch.toLowerCase());
    const matchesRole = roleFilter === 'All' || acc.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Administrator Profile Hero Card */}
      <div className="bg-linear-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-900/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 sm:gap-6">
            <img 
              src={currentUser?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300'} 
              alt={currentUser?.fullName || currentUser?.name || 'Administrator'}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-4 ring-indigo-500/30 shadow-lg"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {currentUser?.role || 'System Admin'} • {currentUser?.id || 'ADM-001'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Root Governance Session
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                {currentUser?.fullName || currentUser?.name || 'Shounak Sarkar'}
              </h2>
              <p className="text-xs sm:text-sm text-indigo-200/80">
                {currentUser?.title || 'Healthcare Informatics & Systems Administrator'}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                {currentUser?.department || 'IT Systems & Health Records Governance'} • {currentUser?.accessLevel || 'Level 4 Super Administrator'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleSyncAll}
              disabled={isSyncing}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/20 transition flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Synchronizing...' : 'Sync All Clinics'}</span>
            </button>
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Alert</span>
            </button>
          </div>
        </div>

        {/* Global Key Governance Metrics */}
        <div className="mt-6 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Total Treated YTD</p>
            <p className="text-xl font-black text-white mt-0.5">{adminReports.summary.totalPatientsTreated}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Active User Accounts</p>
            <p className="text-xl font-black text-indigo-300 mt-0.5">{userAccounts.filter(a => a.status === 'Active').length}</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Synchronized Clinics</p>
            <p className="text-xl font-black text-emerald-300 mt-0.5">{clinicNodes.length} Nodes</p>
          </div>
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <p className="text-[11px] text-slate-400 uppercase font-bold tracking-wider">Bed Occupancy</p>
            <p className="text-xl font-black text-amber-300 mt-0.5">{adminReports.summary.averageBedOccupancy}</p>
          </div>
        </div>
      </div>

      {/* Sub-Navigation Pills */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200/80 pb-3">
        {[
          { id: 'accounts', label: 'User Account Governance', icon: Users },
          { id: 'reports', label: 'Clinical & Management Reports', icon: BarChart3 },
          { id: 'sync', label: 'Cross-Clinic Data Synchronization', icon: RefreshCw },
          { id: 'broadcasts', label: 'Broadcast System Announcements', icon: BellRing }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = currentSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentSubTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-sm' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* SubTab 1: User Accounts Management (Activate / Deactivate) */}
      {currentSubTab === 'accounts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">User Account Lifecycle & Access Control</h3>
              <p className="text-xs text-slate-500">Manage account activation, suspension, and permissions across all roles</p>
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
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
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
                  <th className="py-3 px-4">Clinic Affiliation</th>
                  <th className="py-3 px-4">Last Activity</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Account Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredAccounts.map(acc => (
                  <tr key={acc.id} className="hover:bg-slate-50/60">
                    <td className="py-3 px-4 font-bold text-indigo-600">{acc.id}</td>
                    <td className="py-3 px-4">
                      <p className="font-bold text-slate-900">{acc.name}</p>
                      <p className="text-[11px] text-slate-500">{acc.email}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200/60">
                        {acc.role}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{acc.clinicNode}</td>
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

      {/* SubTab 2: Clinical & Management Reports */}
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
                  onClick={() => handleExportReport('Clinical Performance')}
                  className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => handleExportReport('Audit Compliance')}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Export Full Audit (PDF)</span>
                </button>
              </div>
            </div>

            {/* Monthly Trend Bars */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">6-Month Patient Consultation Volumes</h4>
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
                  <span>Mental Health Care Legal Provisions Active</span>
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
                  <span>High-Volume Pharmaceutical Dispensing</span>
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

      {/* SubTab 3: Cross-Clinic Data Synchronization */}
      {currentSubTab === 'sync' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-bold text-slate-900">Distributed Clinic Synchronization Hub</h3>
              <p className="text-xs text-slate-500">Centralized database sync with local offline-capable clinic computers</p>
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
                  onClick={() => {
                    triggerClinicSync(node.id);
                  }}
                  className="w-full py-1.5 text-xs font-semibold bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl transition cursor-pointer"
                >
                  Force Node Re-Sync
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SubTab 4: Broadcast Announcements */}
      {currentSubTab === 'broadcasts' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">System Broadcasts & Urgent Notices</h3>
              <p className="text-xs text-slate-500">Dispatch clinical bulletins, schedule changes, and security updates</p>
            </div>
            <button
              onClick={() => setIsBroadcastModalOpen(true)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Compose Bulletin</span>
            </button>
          </div>

          <div className="space-y-3">
            {broadcastNotifications.map(notif => (
              <div key={notif.id} className="p-5 rounded-2xl border border-slate-200/80 bg-slate-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      notif.priority === 'High' ? 'bg-rose-100 text-rose-800' : 'bg-indigo-100 text-indigo-800'
                    }`}>
                      {notif.priority} Priority
                    </span>
                    <span className="text-xs font-semibold text-slate-500">To: {notif.audience}</span>
                  </div>
                  <span className="text-xs text-slate-400">{notif.date}</span>
                </div>
                <h4 className="text-sm font-bold text-slate-900">{notif.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{notif.content}</p>
                <p className="text-[11px] text-slate-400 pt-1">Dispatched by: {notif.sender}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Compose Broadcast */}
      {isBroadcastModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Broadcast System Bulletin</h3>
                  <p className="text-xs text-slate-500">Publish notice to account holders</p>
                </div>
              </div>
              <button 
                onClick={() => setIsBroadcastModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendBroadcast} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Scheduled System Maintenance"
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
                    <option value="All Users">All Registered Users</option>
                    <option value="Doctors Only">Doctors & Clinicians</option>
                    <option value="Patients Only">Patients Only</option>
                    <option value="Staff Only">Clinic Staff & Reception</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Priority</label>
                  <select
                    value={broadcastForm.priority}
                    onChange={(e) => setBroadcastForm({ ...broadcastForm, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Normal">Normal</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent / Critical</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Announcement Body *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Enter detailed notification content..."
                  value={broadcastForm.content}
                  onChange={(e) => setBroadcastForm({ ...broadcastForm, content: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsBroadcastModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Broadcast Notice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Modal: Add User Account / Doctor */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New User Account / Doctor</h3>
                  <p className="text-xs text-slate-500">Register credentials into the centralized MHC-PMS registry</p>
                </div>
              </div>
              <button 
                onClick={() => setIsAddUserModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="mt-5 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Priya Rao"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Official Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. priya.rao@mhc-pms.org"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">System Role *</label>
                  <select
                    value={userForm.role}
                    onChange={(e) => setUserForm({ ...userForm, role: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Doctor">Doctor (Clinical Consultant)</option>
                    <option value="Receptionist">Receptionist (Front Desk)</option>
                    <option value="Patient">Patient</option>
                    <option value="System Admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Clinic Node / Branch</label>
                  <select
                    value={userForm.clinicNode}
                    onChange={(e) => setUserForm({ ...userForm, clinicNode: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:outline-hidden bg-white"
                  >
                    <option value="Central Hospital OPD">Central Hospital OPD</option>
                    <option value="North Specialty Satellite">North Specialty Satellite</option>
                    <option value="West Community Clinic">West Community Clinic</option>
                    <option value="South Suburban Practice">South Suburban Practice</option>
                  </select>
                </div>
              </div>

              {userForm.role === 'Doctor' && (
                <div className="p-3.5 bg-indigo-50/60 border border-indigo-100 rounded-2xl space-y-3">
                  <p className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider">
                    Doctor Speciality & Credential Details
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Clinical Speciality</label>
                      <input
                        type="text"
                        placeholder="e.g. Neuropsychiatry"
                        value={userForm.speciality}
                        onChange={(e) => setUserForm({ ...userForm, speciality: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Consultation Fee (₹)</label>
                      <input
                        type="number"
                        placeholder="1200"
                        value={userForm.consultationFee}
                        onChange={(e) => setUserForm({ ...userForm, consultationFee: e.target.value })}
                        className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Qualifications / Degrees</label>
                    <input
                      type="text"
                      placeholder="e.g. MBBS, MD (Psychiatry), DNB"
                      value={userForm.qualifications}
                      onChange={(e) => setUserForm({ ...userForm, qualifications: e.target.value })}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 transition cursor-pointer font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition shadow-sm cursor-pointer"
                >
                  Create & Activate Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
