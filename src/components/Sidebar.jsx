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
  Sparkles
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
    <aside className="w-64 border-r border-white/10 bg-[#0C0F17] flex flex-col justify-between p-4 select-none shrink-0">
      <div>
        {/* Navigation Category */}
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Operations
        </div>

        <nav className="space-y-1 mt-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF6B00]/15 to-[#1A6FD4]/10 text-white border border-[#FF6B00]/30 shadow-lg shadow-[#FF6B00]/5'
                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-1.5 rounded-lg transition-colors ${
                    isActive ? 'bg-[#FF6B00] text-white shadow-md shadow-[#FF6B00]/30' : 'bg-white/5 text-slate-400 group-hover:text-white'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${item.badgeColor || 'bg-white/10 text-slate-300'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Agency Mission Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#111624] via-[#161d30] to-[#0d1424] border border-[#1A6FD4]/30 relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-[#FF6B00]/10 rounded-full blur-xl pointer-events-none"></div>
        <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] mb-1">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WIXFOX ENGINE</span>
        </div>
        <p className="text-xs text-slate-300 font-medium leading-relaxed">
          More Visibility. More Customers. More Growth.
        </p>
        <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
          <span>WhatsApp Share Ready</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
      </div>
    </aside>
  );
}
