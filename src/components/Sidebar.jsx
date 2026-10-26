import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Users, 
  FolderKanban, 
  Layers, 
  Settings, 
  Share2,
  ChevronRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, counts = {} }) {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'quotation',
      label: 'Quotation & Invoice',
      icon: FileSpreadsheet,
      badge: counts.quotations || '1',
      badgeColor: 'bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30'
    },
    {
      id: 'leads',
      label: 'Leads Pipeline',
      icon: Users,
      badge: counts.leads || '4',
      badgeColor: 'bg-[#1A6FD4]/20 text-[#4A9FE8] border border-[#1A6FD4]/30'
    },
    {
      id: 'projects',
      label: 'Ongoing Projects',
      icon: FolderKanban,
      badge: counts.projects || '3',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
    },
    {
      id: 'services',
      label: 'Services Catalog',
      icon: Layers,
      badge: '6'
    },
    {
      id: 'settings',
      label: 'Company Profile',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-70 border-r border-slate-800/80 bg-[#0A0D15] flex flex-col justify-between p-5 select-none shrink-0">
      <div>
        {/* Navigation Category */}
        <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
          <span>Core Operations</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
        </div>

        <nav className="space-y-1.5 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF6B00]/15 to-[#1A6FD4]/10 text-white border border-[#FF6B00]/40 shadow-lg shadow-[#FF6B00]/5'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl transition-colors ${
                    isActive 
                      ? 'bg-gradient-to-br from-[#FF6B00] to-[#FF8C35] text-white shadow-md shadow-[#FF6B00]/30' 
                      : 'bg-slate-900 text-slate-400 group-hover:text-white group-hover:bg-slate-800'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="tracking-wide">{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Agency Mission Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121929] via-[#162035] to-[#0D1526] border border-[#1A6FD4]/30 relative overflow-hidden shadow-lg">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FF6B00]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] mb-1.5">
          <Zap className="w-4 h-4 fill-[#FF6B00]" />
          <span className="tracking-wider">WIXFOX ENGINE</span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          More Visibility. More Customers. More Growth.
        </p>
        <div className="mt-3 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>WhatsApp Ready</span>
          </span>
          <span className="text-[11px] text-cyan-400 font-mono font-semibold">v2.1</span>
        </div>
      </div>
    </aside>
  );
}
