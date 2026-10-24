import React, { useState } from 'react';
import { 
  Building, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  CheckCircle, 
  Save, 
  RotateCcw,
  ShieldCheck,
  Download,
  Upload
} from 'lucide-react';

export default function SettingsModal({ companyProfile, setCompanyProfile, onResetAllData }) {
  const [profile, setProfile] = useState({ ...companyProfile });
  const [savedMsg, setSavedMsg] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    setCompanyProfile(profile);
    setSavedMsg('Profile successfully saved!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleExportBackup = () => {
    const data = {
      profile,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `WixFox_Studio_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl mx-auto overflow-y-auto h-full">
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider flex items-center gap-2">
            <Building className="w-6 h-6 text-[#FF6B00]" />
            <span>Company Profile & Invoicing Defaults</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            These details appear on your generated quotation PDFs, invoices, and WhatsApp messages.
          </p>
        </div>

        {savedMsg && (
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse">
            <CheckCircle className="w-4 h-4" />
            <span>{savedMsg}</span>
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Brand identity */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#FF6B00] border-b border-white/10 pb-2">
            Agency Identity
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Company Name</label>
              <input
                type="text"
                value={profile.name || ''}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Tagline / Motto</label>
              <input
                type="text"
                value={profile.tagline || ''}
                onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                placeholder="Your Growth, Our Technology."
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Sub-headline Pillars</label>
            <input
              type="text"
              value={profile.subtitle || ''}
              onChange={(e) => setProfile({ ...profile, subtitle: e.target.value })}
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
              placeholder="WEBSITES | SOFTWARE | MARKETING | GROWTH SYSTEMS"
            />
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Footer Slogan</label>
            <input
              type="text"
              value={profile.slogan || ''}
              onChange={(e) => setProfile({ ...profile, slogan: e.target.value })}
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
              placeholder="MORE VISIBILITY | MORE CUSTOMERS | MORE GROWTH"
            />
          </div>
        </div>

        {/* Contact Coordinates */}
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-[#1A6FD4] border-b border-white/10 pb-2">
            Contact & Location Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Official Phone / WhatsApp</label>
              <input
                type="text"
                value={profile.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-emerald-400 font-mono focus:border-emerald-500 focus:outline-none font-bold"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Support Email</label>
              <input
                type="email"
                value={profile.email || ''}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#1A6FD4] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-semibold uppercase">Website URL</label>
              <input
                type="text"
                value={profile.website || ''}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:border-[#1A6FD4] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 font-semibold uppercase">Office Address</label>
            <input
              type="text"
              value={profile.address || ''}
              onChange={(e) => setProfile({ ...profile, address: e.target.value })}
              className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-2.5 text-xs text-slate-300 focus:border-[#1A6FD4] focus:outline-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleExportBackup}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 flex items-center gap-2"
            >
              <Download className="w-3.5 h-3.5 text-[#1A6FD4]" />
              <span>Export Backup JSON</span>
            </button>
            <button
              type="button"
              onClick={onResetAllData}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Sample Data</span>
            </button>
          </div>

          <button
            type="submit"
            className="btn-orange-glow px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
