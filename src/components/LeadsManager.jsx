import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Plus, 
  Phone, 
  Mail, 
  ArrowRight, 
  FileSpreadsheet, 
  FolderPlus, 
  Sparkles,
  Share2,
  Trash2,
  CheckCircle,
  Clock,
  Filter
} from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

export default function LeadsManager({ 
  leads, 
  setLeads, 
  onCreateQuotationForLead, 
  onConvertLeadToProject 
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newLead, setNewLead] = useState({
    clientName: '',
    contactPerson: '',
    phone: '',
    email: '',
    serviceInterest: 'Digital Marketing & Meta Ads',
    estimatedBudget: 5000,
    status: 'New',
    source: 'Direct WhatsApp',
    notes: ''
  });

  const statuses = ['New', 'Contacted', 'In Discussion', 'Proposal Sent', 'Won', 'Lost'];

  const getStatusColor = (status) => {
    switch (status) {
      case 'New': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Contacted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'In Discussion': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Proposal Sent': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Won': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Lost': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const filteredLeads = (leads || []).filter(lead => {
    const matchesSearch = 
      lead.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.contactPerson?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone?.includes(searchTerm) ||
      lead.serviceInterest?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreateLead = (e) => {
    e.preventDefault();
    if (!newLead.clientName) return;

    const created = {
      ...newLead,
      id: `lead-${Date.now()}`,
      lastContactDate: new Date().toISOString().split('T')[0]
    };

    setLeads(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewLead({
      clientName: '',
      contactPerson: '',
      phone: '',
      email: '',
      serviceInterest: 'Digital Marketing & Meta Ads',
      estimatedBudget: 5000,
      status: 'New',
      source: 'Direct WhatsApp',
      notes: ''
    });
  };

  const handleUpdateStatus = (leadId, newStatus) => {
    setLeads(prev => prev.map(lead => lead.id === leadId ? { ...lead, status: newStatus } : lead));
  };

  const handleDeleteLead = (leadId) => {
    setLeads(prev => prev.filter(lead => lead.id !== leadId));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider flex items-center gap-2">
            <Users className="w-6 h-6 text-[#FF6B00]" />
            <span>Leads & Client Acquisition Pipeline</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Track inquiries, prospective budgets, services requested, and follow up directly on WhatsApp.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-orange-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Lead</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by client, phone, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-[#FF6B00] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap w-full md:w-auto">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Status:</span>
          {['ALL', ...statuses].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                statusFilter === st
                  ? 'bg-[#1A6FD4] text-white shadow-md shadow-[#1A6FD4]/20'
                  : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead) => (
          <div
            key={lead.id}
            className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-[#FF6B00]/40 transition-all group relative"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getStatusColor(lead.status)}`}>
                  {lead.status}
                </span>

                <div className="flex items-center gap-1">
                  <select
                    value={lead.status}
                    onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                    className="bg-black/50 text-[11px] text-slate-300 border border-white/10 rounded px-1.5 py-0.5 focus:outline-none cursor-pointer"
                  >
                    {statuses.map(st => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => handleDeleteLead(lead.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Delete lead"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Client & Person */}
              <h3 className="font-bold text-white text-base leading-tight group-hover:text-[#FF6B00] transition-colors">
                {lead.clientName}
              </h3>
              {lead.contactPerson && (
                <p className="text-xs text-slate-400 mt-0.5">
                  Contact: <span className="text-slate-300 font-medium">{lead.contactPerson}</span>
                </p>
              )}

              {/* Service & Budget */}
              <div className="mt-3 p-2.5 rounded-xl bg-black/30 border border-white/5 space-y-1 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Interest:</span>
                  <span className="font-semibold text-slate-200">{lead.serviceInterest}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Est. Budget:</span>
                  <span className="font-bold text-[#FF6B00]">₹ {Number(lead.estimatedBudget)?.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Notes */}
              {lead.notes && (
                <p className="text-[11px] text-slate-400 mt-3 line-clamp-2 italic">
                  "{lead.notes}"
                </p>
              )}

              {/* Contact metadata */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
                <div className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#1A6FD4]" />
                  <span>{lead.phone || 'No phone'}</span>
                </div>
                {lead.lastContactDate && (
                  <div className="flex items-center gap-1 text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{lead.lastContactDate}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
              <button
                onClick={() => openWhatsAppChat(lead.phone, `Hello ${lead.contactPerson || lead.clientName}, greeting from WixFox Technologies!`)}
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2.5 py-1.5 rounded-lg border border-emerald-500/20 transition-all"
                title="Open WhatsApp chat with lead"
              >
                <Share2 className="w-3 h-3" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => onCreateQuotationForLead(lead)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#FF6B00] hover:text-[#FFA24C] bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-2.5 py-1.5 rounded-lg border border-[#FF6B00]/20 transition-all"
                title="Create Quotation for this client"
              >
                <FileSpreadsheet className="w-3 h-3" />
                <span>Make Quote</span>
              </button>

              <button
                onClick={() => onConvertLeadToProject(lead)}
                className="flex items-center gap-1 text-[11px] font-bold text-[#4A9FE8] hover:text-cyan-300 bg-[#1A6FD4]/10 hover:bg-[#1A6FD4]/20 px-2.5 py-1.5 rounded-lg border border-[#1A6FD4]/20 transition-all"
                title="Convert this lead into an active project"
              >
                <FolderPlus className="w-3 h-3" />
                <span>Start Project</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredLeads.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <Users className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm">No leads found matching your search criteria.</p>
        </div>
      )}

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#11141C] border border-white/20 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#FF6B00]" />
                <span>Add Prospective Client / Lead</span>
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Client / Company Name *</label>
                <input
                  type="text"
                  required
                  value={newLead.clientName}
                  onChange={(e) => setNewLead({ ...newLead, clientName: e.target.value })}
                  placeholder="e.g. Aavad Krupa Construction"
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Contact Person</label>
                  <input
                    type="text"
                    value={newLead.contactPerson}
                    onChange={(e) => setNewLead({ ...newLead, contactPerson: e.target.value })}
                    placeholder="e.g. Mr. Haresh Patel"
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Phone / WhatsApp *</label>
                  <input
                    type="text"
                    required
                    value={newLead.phone}
                    onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                    placeholder="+91 8511083277"
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Service Required</label>
                  <select
                    value={newLead.serviceInterest}
                    onChange={(e) => setNewLead({ ...newLead, serviceInterest: e.target.value })}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                  >
                    <option value="Digital Marketing & Meta Ads">Digital Marketing & Meta Ads</option>
                    <option value="Websites & E-commerce">Websites & E-commerce</option>
                    <option value="Custom Android & iOS App">Custom Android & iOS App</option>
                    <option value="CRM & ERP Billing Software">CRM & ERP Billing Software</option>
                    <option value="AI Agent & Automation Bot">AI Agent & Automation Bot</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Estimated Budget (₹)</label>
                  <input
                    type="number"
                    value={newLead.estimatedBudget}
                    onChange={(e) => setNewLead({ ...newLead, estimatedBudget: Number(e.target.value) })}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Inquiry Details / Scope Notes</label>
                <textarea
                  rows={3}
                  value={newLead.notes}
                  onChange={(e) => setNewLead({ ...newLead, notes: e.target.value })}
                  placeholder="What are the client's key goals or requirements?"
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-slate-300 focus:border-[#FF6B00] focus:outline-none leading-relaxed"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-orange-glow px-5 py-2 rounded-lg text-xs font-bold text-white shadow-lg"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
