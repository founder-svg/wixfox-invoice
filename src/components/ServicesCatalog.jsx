import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Sparkles, 
  Check, 
  ArrowRight, 
  Globe, 
  Smartphone, 
  Cpu, 
  TrendingUp, 
  Bot,
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function ServicesCatalog({ services, setServices, onAddServiceToQuote }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const categories = ['ALL', 'Digital Marketing', 'Web Development', 'Mobile Apps', 'Software & ERP', 'AI & Automation'];

  const filtered = selectedCategory === 'ALL'
    ? services
    : services.filter(s => s.category === selectedCategory);

  const getIconForCategory = (cat) => {
    switch (cat) {
      case 'Digital Marketing': return TrendingUp;
      case 'Web Development': return Globe;
      case 'Mobile Apps': return Smartphone;
      case 'Software & ERP': return Cpu;
      case 'AI & Automation': return Bot;
      default: return Layers;
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto overflow-y-auto h-full">
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-white font-['Rajdhani'] uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#FF6B00]" />
            <span>WixFox Agency Services & Pricing Catalog</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official service offerings from wixfox.com with standard pricing, deliverables, and one-click quotation insertion.
          </p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 flex-wrap pb-2 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C35] text-white shadow-md shadow-[#FF6B00]/20'
                : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((srv) => {
          const Icon = getIconForCategory(srv.category);

          return (
            <div
              key={srv.id}
              className="glass-panel rounded-2xl p-6 flex flex-col justify-between hover:border-[#FF6B00]/40 transition-all relative group"
            >
              <div>
                {/* Header Icon + Price */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00]/20 to-[#1A6FD4]/20 border border-white/10 flex items-center justify-center text-[#FF6B00]">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase font-medium">{srv.defaultDuration}</span>
                    <span className="text-lg font-black text-white font-mono">
                      ₹ {Number(srv.defaultPrice)?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] font-bold uppercase tracking-wider text-[#4A9FE8]">
                  {srv.category}
                </span>

                <h3 className="font-bold text-white text-base leading-snug mt-1 group-hover:text-[#FF6B00] transition-colors">
                  {srv.name}
                </h3>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {srv.shortDesc}
                </p>

                {/* Sub-deliverables */}
                <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">
                    Scope & Features:
                  </span>
                  {(srv.details || []).map((d, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1A6FD4] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <button
                  onClick={() => onAddServiceToQuote(srv)}
                  className="w-full flex items-center justify-center gap-2 text-xs font-bold py-2 rounded-xl bg-white/5 hover:bg-[#FF6B00] text-slate-200 hover:text-white border border-white/10 hover:border-transparent transition-all group-hover:shadow-lg group-hover:shadow-[#FF6B00]/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Insert Into Quotation</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
