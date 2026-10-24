import React from 'react';
import { PlusCircle, FileText, UserPlus, PhoneCall, Globe, Sparkles } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onNewQuotation, 
  onNewLead, 
  companyProfile 
}) {
  return (
    <header className="h-16 border-b border-white/10 bg-[#0E121A]/90 backdrop-blur-md px-6 flex items-center justify-between z-30 sticky top-0">
      {/* Brand & Platform Tag */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden p-0.5 bg-gradient-to-br from-[#FF6B00] via-[#1A6FD4] to-cyan-400 shadow-lg shadow-[#FF6B00]/20 flex items-center justify-center">
            <img 
              src="./wixfox-fox-logo.svg" 
              alt="WixFox Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-wider text-white font-['Rajdhani'] uppercase">
                WixFox <span className="text-[#FF6B00]">Studio</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                PC Edition
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              Agency ERP • Leads • Projects • Quotation & Invoicing
            </p>
          </div>
        </div>
      </div>

      {/* Center Quick Stats / Motto */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Local Database Active</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" onClick={() => window.open('https://www.wixfox.com', '_blank')}>
          <Globe className="w-3.5 h-3.5 text-[#1A6FD4]" />
          <span>wixfox.com</span>
        </div>
        <div className="h-4 w-px bg-white/10"></div>
        <div className="flex items-center gap-2 text-slate-300">
          <PhoneCall className="w-3.5 h-3.5 text-[#FF6B00]" />
          <span>{companyProfile?.phone || '+91 8511083277'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNewLead}
          className="flex items-center gap-2 text-xs font-semibold px-3.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-all hover:border-[#1A6FD4]/50"
        >
          <UserPlus className="w-4 h-4 text-[#1A6FD4]" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        <button
          onClick={onNewQuotation}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg btn-orange-glow transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Quotation</span>
        </button>
      </div>
    </header>
  );
}
