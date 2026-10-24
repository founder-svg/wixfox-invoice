import React, { useState } from 'react';
import { 
  FolderKanban, 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Share2, 
  Trash2,
  TrendingUp,
  FileText
} from 'lucide-react';
import { openWhatsAppChat } from '../utils/whatsapp';

export default function ProjectsTracker({ projects, setProjects, onGenerateInvoiceForProject }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProject, setNewProject] = useState({
    projectName: '',
    clientName: '',
    phone: '',
    services: ['Websites & E-commerce'],
    totalPrice: 25000,
    paidAmount: 10000,
    startDate: new Date().toISOString().split('T')[0],
    deadline: '',
    status: 'In Progress',
    progressPercent: 20,
    deliverables: 'Initial wireframing & tech stack configuration.'
  });

  const filteredProjects = (projects || []).filter(p => 
    p.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.services || []).some(s => s.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!newProject.projectName) return;

    const created = {
      ...newProject,
      id: `proj-${Date.now()}`
    };

    setProjects(prev => [created, ...prev]);
    setShowAddModal(false);
    setNewProject({
      projectName: '',
      clientName: '',
      phone: '',
      services: ['Websites & E-commerce'],
      totalPrice: 25000,
      paidAmount: 10000,
      startDate: new Date().toISOString().split('T')[0],
      deadline: '',
      status: 'In Progress',
      progressPercent: 20,
      deliverables: ''
    });
  };

  const handleUpdateProgress = (projId, percent) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projId) {
        const num = Math.min(100, Math.max(0, Number(percent)));
        return {
          ...p,
          progressPercent: num,
          status: num === 100 ? 'Completed' : 'In Progress'
        };
      }
      return p;
    }));
  };

  const handleDelete = (projId) => {
    setProjects(prev => prev.filter(p => p.id !== projId));
  };

  const handleWhatsAppUpdate = (project) => {
    const text = `🦊 *WixFox Technologies — Project Update*
━━━━━━━━━━━━━━━━━━━━━
Project: *${project.projectName}*
Client: *${project.clientName}*
Current Status: *${project.status}* (${project.progressPercent}% Completed)
Deliverables: ${project.deliverables || 'Work underway.'}
Agreed Budget: ₹${project.totalPrice?.toLocaleString('en-IN')}
Paid Amount: ₹${project.paidAmount?.toLocaleString('en-IN')}

Need any adjustments? Feel free to message back!
🌐 https://www.wixfox.com`;

    openWhatsAppChat(project.phone, text);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider flex items-center gap-2">
            <FolderKanban className="w-6 h-6 text-[#1A6FD4]" />
            <span>Ongoing Projects & Services Tracker</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Monitor deliverables, timeline deadlines, payment collections, and agreed project costs.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-blue-glow px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Search */}
      <div className="glass-panel rounded-2xl p-4 flex items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search projects or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:border-[#1A6FD4] focus:outline-none"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((proj) => {
          const balance = (proj.totalPrice || 0) - (proj.paidAmount || 0);

          return (
            <div
              key={proj.id}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between hover:border-[#1A6FD4]/50 transition-all relative group"
            >
              <div>
                {/* Status Bar */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                    proj.status === 'Completed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-[#1A6FD4]/10 text-[#4A9FE8] border-[#1A6FD4]/20'
                  }`}>
                    {proj.status}
                  </span>

                  <button
                    onClick={() => handleDelete(proj.id)}
                    className="text-slate-500 hover:text-rose-400 p-1"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Project Title & Client */}
                <h3 className="font-bold text-white text-base leading-tight">
                  {proj.projectName}
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-medium">
                  Client: <span className="text-slate-200">{proj.clientName}</span>
                </p>

                {/* Services Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {(proj.services || []).map((srv, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300"
                    >
                      {srv}
                    </span>
                  ))}
                </div>

                {/* Progress Bar & Slider */}
                <div className="mt-4 p-3 rounded-xl bg-black/40 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">Progress:</span>
                    <span className="font-bold text-[#4A9FE8]">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#FF6B00] to-[#1A6FD4] h-full rounded-full transition-all duration-300"
                      style={{ width: `${proj.progressPercent}%` }}
                    ></div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={proj.progressPercent || 0}
                    onChange={(e) => handleUpdateProgress(proj.id, e.target.value)}
                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#FF6B00]"
                  />
                </div>

                {/* Financials: Agreed Price vs Paid */}
                <div className="mt-3 grid grid-cols-3 gap-2 text-center p-2.5 rounded-xl bg-black/30 border border-white/5 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Agreed</span>
                    <span className="font-bold text-white">₹{Number(proj.totalPrice)?.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Collected</span>
                    <span className="font-bold text-emerald-400">₹{Number(proj.paidAmount)?.toLocaleString('en-IN')}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Balance</span>
                    <span className={`font-bold ${balance > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
                      ₹{balance?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Deliverables snippet */}
                {proj.deliverables && (
                  <p className="text-[11px] text-slate-400 mt-3 line-clamp-2">
                    <span className="text-slate-500 font-semibold">Scope: </span>
                    {proj.deliverables}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleWhatsAppUpdate(proj)}
                  className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/20 transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Update on WhatsApp</span>
                </button>

                <button
                  onClick={() => onGenerateInvoiceForProject(proj)}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#FF6B00] hover:text-orange-300 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 px-3 py-1.5 rounded-lg border border-[#FF6B00]/20 transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Bill Invoice</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <FolderKanban className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-sm">No ongoing projects found matching query.</p>
        </div>
      )}

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#11141C] border border-white/20 rounded-2xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#1A6FD4]" />
                <span>Initialize Ongoing Project</span>
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white text-xl">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-3">
              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Project Name *</label>
                <input
                  type="text"
                  required
                  value={newProject.projectName}
                  onChange={(e) => setNewProject({ ...newProject, projectName: e.target.value })}
                  placeholder="e.g. Aavad Krupa Digital Growth Campaign"
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#1A6FD4] focus:outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newProject.clientName}
                    onChange={(e) => setNewProject({ ...newProject, clientName: e.target.value })}
                    placeholder="e.g. Aavad Krupa Construction"
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#1A6FD4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Client Phone (WhatsApp)</label>
                  <input
                    type="text"
                    value={newProject.phone}
                    onChange={(e) => setNewProject({ ...newProject, phone: e.target.value })}
                    placeholder="+91 8511083277"
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Agreed Total Price (₹)</label>
                  <input
                    type="number"
                    value={newProject.totalPrice}
                    onChange={(e) => setNewProject({ ...newProject, totalPrice: Number(e.target.value) })}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white font-bold focus:border-[#1A6FD4] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold uppercase">Advance Paid (₹)</label>
                  <input
                    type="number"
                    value={newProject.paidAmount}
                    onChange={(e) => setNewProject({ ...newProject, paidAmount: Number(e.target.value) })}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-emerald-400 font-bold focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold uppercase">Key Deliverables & Scope</label>
                <textarea
                  rows={3}
                  value={newProject.deliverables}
                  onChange={(e) => setNewProject({ ...newProject, deliverables: e.target.value })}
                  placeholder="Specify key deliverables for the client..."
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-slate-300 focus:border-[#1A6FD4] focus:outline-none leading-relaxed"
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
                  className="btn-blue-glow px-5 py-2 rounded-lg text-xs font-bold text-white shadow-lg"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
