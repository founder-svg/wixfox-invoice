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
    <header className="h-18 border-b border-slate-800/80 bg-[#0C101A]/95 backdrop-blur-xl px-7 flex items-center justify-between z-30 sticky top-0 shadow-lg shrink-0">
      {/* Brand & Platform Tag */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl overflow-hidden p-0.5 bg-gradient-to-br from-[#FF6B00] via-[#1A6FD4] to-cyan-400 shadow-lg shadow-[#FF6B00]/20 flex items-center justify-center shrink-0">
            <img 
              src="./wixfox-fox-logo.svg" 
              alt="WixFox Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-xl tracking-wider text-white font-['Rajdhani'] uppercase leading-none">
                WixFox <span className="text-[#FF6B00]">Studio</span>
              </span>
              <span className="text-[11px] uppercase font-extrabold tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                PC Edition
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium mt-1">
              Agency ERP • Leads • Tech Projects • Quotation & Billing
            </p>
          </div>
        </div>
      </div>

      {/* Center Quick Stats / Motto */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-300 font-medium">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Local Engine Active</span>
        </div>
        <div className="h-4 w-px bg-slate-800"></div>
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer" onClick={() => window.open('https://www.wixfox.com', '_blank')}>
          <Globe className="w-4 h-4 text-[#1A6FD4]" />
          <span>wixfox.com</span>
        </div>
        <div className="h-4 w-px bg-slate-800"></div>
        <div className="flex items-center gap-2 text-slate-200">
          <PhoneCall className="w-4 h-4 text-[#FF6B00]" />
          <span>{companyProfile?.phone || '+91 8511083277'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-3">
        <button
          onClick={onNewLead}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all hover:border-[#1A6FD4]/50 hover:scale-[1.02] active:scale-[0.98]"
        >
          <UserPlus className="w-4 h-4 text-[#1A6FD4]" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        <button
          onClick={onNewQuotation}
          className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl btn-orange-glow transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Create Quotation</span>
        </button>
      </div>
    </header>
  );
}
