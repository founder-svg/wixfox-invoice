import React from 'react';
import { 
  Users, 
  FolderKanban, 
  FileSpreadsheet, 
  TrendingUp, 
  ArrowUpRight, 
  Sparkles, 
  PlusCircle, 
  Globe, 
  Clock, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function Dashboard({ 
  leads = [], 
  projects = [], 
  quotation, 
  setActiveTab, 
  companyProfile 
}) {
  const totalLeadsPipeline = leads.reduce((sum, l) => sum + (Number(l.estimatedBudget) || 0), 0);
  const totalProjectsValue = projects.reduce((sum, p) => sum + (Number(p.totalPrice) || 0), 0);
  const totalCollected = projects.reduce((sum, p) => sum + (Number(p.paidAmount) || 0), 0);
  const activeProjectsCount = projects.filter(p => p.status !== 'Completed').length;

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Welcome Hero Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-[#141B2D] via-[#1A2540] to-[#0E1528] border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B00]/15 to-[#1A6FD4]/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] px-3 py-1 rounded-full bg-[#FF6B00]/10 border border-[#FF6B00]/20">
                Official Agency ERP
              </span>
              <span className="text-xs text-slate-400">Gandhidham, Gujarat & Global</span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-white font-['Rajdhani'] uppercase tracking-wider">
              Welcome to <span className="text-[#FF6B00]">WixFox Studio</span>
            </h1>
            <p className="text-xs lg:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Manage client inquiries, live tech projects, itemized quotation billing, and instant WhatsApp dispatch directly from your desktop.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('quotation')}
              className="btn-orange-glow px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Open Quotation Studio</span>
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-white border border-white/10 flex items-center gap-2 transition-all"
            >
              <Users className="w-4 h-4 text-[#1A6FD4]" />
              <span>View Pipeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pipeline */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-[#FF6B00]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Leads Pipeline</span>
            <div className="p-2 rounded-xl bg-[#FF6B00]/10 text-[#FF6B00]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ₹ {totalLeadsPipeline.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{leads.length} Active Inquiries</span>
          </div>
        </div>

        {/* Active Projects */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-[#1A6FD4]/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Projects</span>
            <div className="p-2 rounded-xl bg-[#1A6FD4]/10 text-[#4A9FE8]">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {activeProjectsCount} Ongoing
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <Clock className="w-3.5 h-3.5 text-[#1A6FD4]" />
            <span>Total Value: ₹{totalProjectsValue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Revenue Collected */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Collected Revenue</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            ₹ {totalCollected.toLocaleString('en-IN')}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>From delivered milestones</span>
          </div>
        </div>

        {/* Active Quotation */}
        <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-cyan-500/40 transition-all">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Active Quotation</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <FileSpreadsheet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            ₹ {quotation?.totalAmount?.toLocaleString('en-IN') || '4,200'}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-cyan-400">
            <span>{quotation?.quotationNo || 'WTX/2026/001'}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 truncate max-w-[120px]">{quotation?.client?.name}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Leads & Ongoing Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <Users className="w-4 h-4 text-[#FF6B00]" />
              <span>Recent Client Leads</span>
            </div>
            <button
              onClick={() => setActiveTab('leads')}
              className="text-xs font-semibold text-[#FF6B00] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {leads.slice(0, 4).map((lead) => (
              <div
                key={lead.id}
                className="p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between hover:border-white/20 transition-all"
              >
                <div>
                  <div className="text-xs font-bold text-white">{lead.clientName}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {lead.serviceInterest} • <span className="text-[#FF6B00] font-semibold">₹{lead.estimatedBudget?.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Projects */}
        <div className="glass-panel rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <FolderKanban className="w-4 h-4 text-[#1A6FD4]" />
              <span>Ongoing Projects Progress</span>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs font-semibold text-[#4A9FE8] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="p-3.5 rounded-xl bg-black/30 border border-white/5 space-y-2 hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{proj.projectName}</span>
                  <span className="font-mono font-bold text-emerald-400">
                    {proj.progressPercent}%
                  </span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-[#FF6B00] to-[#1A6FD4] h-full rounded-full"
                    style={{ width: `${proj.progressPercent}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Client: {proj.clientName}</span>
                  <span className="font-semibold text-slate-300">₹{proj.totalPrice?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
