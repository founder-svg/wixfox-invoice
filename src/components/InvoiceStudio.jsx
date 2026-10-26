import React, { useState } from 'react';
import { 
  Download, 
  Send, 
  Printer, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  Sparkles, 
  CheckCircle2, 
  Globe, 
  Smartphone, 
  Cpu, 
  TrendingUp, 
  Sliders, 
  Building2,
  Calendar,
  Share2,
  FileCheck,
  Copy,
  ZoomIn,
  ZoomOut,
  Maximize2,
  BadgeCheck
} from 'lucide-react';
import { downloadQuotationPDF, numberToIndianWords } from '../utils/pdfGenerator';
import { generateWhatsAppLink } from '../utils/whatsapp';
import signatureImg from '../assets/signature.png';

export default function InvoiceStudio({ quotation, setQuotation, companyProfile, servicesCatalog }) {
  const [activeView, setActiveView] = useState('split'); // 'split', 'editor', 'preview'
  const [zoomLevel, setZoomLevel] = useState(0.85); // Preview zoom scale
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Handle updates to quotation fields
  const updateField = (field, value) => {
    setQuotation(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateClientField = (field, value) => {
    setQuotation(prev => ({
      ...prev,
      client: {
        ...prev.client,
        [field]: value
      }
    }));
  };

  // Add Item
  const handleAddItem = (presetService = null) => {
    const newItem = presetService ? {
      id: `item-${Date.now()}`,
      srNo: (quotation.items?.length || 0) + 1,
      title: presetService.name,
      details: [...presetService.details],
      duration: presetService.defaultDuration,
      price: presetService.defaultPrice,
      priceLabel: presetService.priceUnit,
      badgeIcon: presetService.category?.toLowerCase().includes('marketing') ? 'meta' : 'calendar'
    } : {
      id: `item-${Date.now()}`,
      srNo: (quotation.items?.length || 0) + 1,
      title: 'New Service Deliverable',
      details: ['Deliverable specification and scope', 'Quality assurance and testing'],
      duration: 'One Time',
      price: 5000,
      priceLabel: 'INR',
      badgeIcon: 'calendar'
    };

    const newItems = [...(quotation.items || []), newItem];
    const newTotal = newItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

    setQuotation(prev => ({
      ...prev,
      items: newItems,
      totalAmount: newTotal,
      amountInWords: numberToIndianWords(newTotal)
    }));
  };

  // Delete Item
  const handleDeleteItem = (index) => {
    const newItems = quotation.items.filter((_, i) => i !== index).map((item, i) => ({
      ...item,
      srNo: i + 1
    }));
    const newTotal = newItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);

    setQuotation(prev => ({
      ...prev,
      items: newItems,
      totalAmount: newTotal,
      amountInWords: numberToIndianWords(newTotal)
    }));
  };

  // Update Item details
  const updateItem = (index, field, value) => {
    const newItems = [...quotation.items];
    newItems[index] = {
      ...newItems[index],
      [field]: value
    };

    let newTotal = quotation.totalAmount;
    if (field === 'price') {
      newTotal = newItems.reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    }

    setQuotation(prev => ({
      ...prev,
      items: newItems,
      totalAmount: newTotal,
      amountInWords: numberToIndianWords(newTotal)
    }));
  };

  // Download PDF
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setStatusMsg('Generating high-resolution A4 PDF...');
    try {
      const filename = `WixFox_${quotation.documentType || 'Quotation'}_${(quotation.quotationNo || 'WTX-001').replace(/\//g, '-')}.pdf`;
      await downloadQuotationPDF('wixfox-quotation-print-sheet', filename);
      setStatusMsg('PDF Downloaded successfully!');
      setTimeout(() => setStatusMsg(''), 4000);
    } catch (err) {
      console.error(err);
      setStatusMsg('Failed to generate PDF');
    } finally {
      setIsDownloading(false);
    }
  };

  // WhatsApp Share
  const handleWhatsAppShare = () => {
    const link = generateWhatsAppLink(quotation, quotation.client?.phone);
    window.open(link, '_blank');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#070A10]">
      {/* Top Toolbar — Cyber Modern Header */}
      <div className="border-b border-slate-800/80 bg-[#0C101A]/95 backdrop-blur-xl px-7 py-3.5 flex flex-wrap items-center justify-between gap-4 shrink-0 shadow-lg z-20">
        <div className="flex items-center gap-4">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-950/80 rounded-xl p-1 border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveView('split')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeView === 'split' 
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C35] text-white shadow-md shadow-[#FF6B00]/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Split Studio</span>
            </button>
            <button
              onClick={() => setActiveView('editor')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeView === 'editor' 
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C35] text-white shadow-md shadow-[#FF6B00]/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor Only</span>
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
                activeView === 'preview' 
                  ? 'bg-gradient-to-r from-[#FF6B00] to-[#FF8C35] text-white shadow-md shadow-[#FF6B00]/30' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>A4 Print View</span>
            </button>
          </div>

          <div className="h-5 w-px bg-slate-800"></div>

          {/* Doc Type Selector */}
          <div className="flex items-center gap-2.5 bg-slate-950/70 border border-slate-800 rounded-xl px-3 py-1.5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Doc Type:</span>
            <select
              value={quotation.documentType || 'QUOTATION'}
              onChange={(e) => updateField('documentType', e.target.value)}
              className="bg-transparent text-white text-xs font-extrabold focus:outline-none cursor-pointer tracking-wider"
            >
              <option value="QUOTATION" className="bg-slate-900 text-white">QUOTATION</option>
              <option value="TAX INVOICE" className="bg-slate-900 text-white">TAX INVOICE</option>
              <option value="PROFORMA INVOICE" className="bg-slate-900 text-white">PROFORMA INVOICE</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 animate-pulse">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{statusMsg}</span>
            </span>
          )}

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            title="Send pre-formatted quotation summary & PDF to client on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl btn-orange-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-slate-300 hover:text-white transition-colors"
            title="Print Document"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor Panel */}
        {(activeView === 'split' || activeView === 'editor') && (
          <div className={`overflow-y-auto p-7 space-y-6 border-r border-slate-800/80 bg-[#0B0F19] ${
            activeView === 'split' ? 'w-full lg:w-1/2' : 'w-full max-w-4xl mx-auto'
          }`}>
            {/* Card 1: Document Meta & Reference */}
            <div className="bg-[#121826]/80 backdrop-blur-xl border border-slate-700/60 shadow-xl rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-sm">
                    <FileCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">Document Reference & Timing</h3>
                    <p className="text-xs text-slate-400">Invoice number, issue date and validity period</p>
                  </div>
                </div>
                <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#1A6FD4]/15 border border-[#1A6FD4]/30 text-[#4A9FE8] tracking-wider">
                  {quotation.quotationNo}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                    Document Number
                  </label>
                  <input
                    type="text"
                    value={quotation.quotationNo || ''}
                    onChange={(e) => updateField('quotationNo', e.target.value)}
                    className="w-full h-11 px-4 text-sm font-semibold text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={quotation.date || ''}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full h-11 px-4 text-sm font-medium text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                    Valid Till
                  </label>
                  <input
                    type="date"
                    value={quotation.validTill || ''}
                    onChange={(e) => updateField('validTill', e.target.value)}
                    className="w-full h-11 px-4 text-sm font-medium text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                  Header Category Title
                </label>
                <input
                  type="text"
                  value={quotation.categoryTitle || 'DIGITAL MARKETING SERVICES'}
                  onChange={(e) => updateField('categoryTitle', e.target.value)}
                  className="w-full h-11 px-4 text-sm font-bold text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#FF6B00] focus:ring-2 focus:ring-[#FF6B00]/20 outline-none transition-all tracking-wider"
                  placeholder="e.g. DIGITAL MARKETING SERVICES"
                />
              </div>
            </div>

            {/* Card 2: Client & Proposal Salutation */}
            <div className="bg-[#121826]/80 backdrop-blur-xl border border-slate-700/60 shadow-xl rounded-2xl p-6 space-y-5">
              <div className="flex items-center gap-3 border-b border-slate-700/60 pb-4">
                <div className="w-9 h-9 rounded-xl bg-[#1A6FD4]/15 border border-[#1A6FD4]/30 flex items-center justify-center text-[#1A6FD4] shadow-sm">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">Client Details & Proposal Message</h3>
                  <p className="text-xs text-slate-400">Recipient information, WhatsApp contact, and letter intro</p>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                  Client / Business Name
                </label>
                <input
                  type="text"
                  value={quotation.client?.name || ''}
                  onChange={(e) => updateClientField('name', e.target.value)}
                  className="w-full h-12 px-4 text-base font-bold text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#1A6FD4] focus:ring-2 focus:ring-[#1A6FD4]/20 outline-none transition-all placeholder:text-slate-500"
                  placeholder="e.g. AAVAD KRUPA CONSTRUCTION & CONSULTANCY"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block flex items-center justify-between">
                    <span>Client WhatsApp Number</span>
                    <span className="text-[11px] text-emerald-400 lowercase font-medium">used for 1-click send</span>
                  </label>
                  <input
                    type="text"
                    value={quotation.client?.phone || ''}
                    onChange={(e) => updateClientField('phone', e.target.value)}
                    className="w-full h-11 px-4 text-sm font-mono font-bold text-emerald-400 bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600"
                    placeholder="+91 8511083277"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                    Client Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={quotation.client?.email || ''}
                    onChange={(e) => updateClientField('email', e.target.value)}
                    className="w-full h-11 px-4 text-sm font-medium text-white bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#1A6FD4] focus:ring-2 focus:ring-[#1A6FD4]/20 outline-none transition-all placeholder:text-slate-600"
                    placeholder="info@client.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 block">
                  Proposal Salutation & Introductory Letter
                </label>
                <textarea
                  rows={3}
                  value={quotation.client?.message || ''}
                  onChange={(e) => updateClientField('message', e.target.value)}
                  className="w-full p-4 text-sm text-slate-200 bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#1A6FD4] focus:ring-2 focus:ring-[#1A6FD4]/20 outline-none transition-all leading-relaxed placeholder:text-slate-500"
                  placeholder="Thank you for giving us the opportunity to be a part of your growth journey..."
                />
              </div>
            </div>

            {/* Card 3: Itemized Services & Deliverables */}
            <div className="bg-[#121826]/80 backdrop-blur-xl border border-slate-700/60 shadow-xl rounded-2xl p-6 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00] shadow-sm">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white tracking-wide">Itemized Services & Pricing</h3>
                    <p className="text-xs text-slate-400">Configure billable modules, timelines, and deliverables</p>
                  </div>
                </div>
                <button
                  onClick={() => handleAddItem()}
                  className="text-xs font-bold px-3.5 py-2 rounded-xl bg-[#FF6B00]/15 text-[#FF6B00] hover:bg-[#FF6B00] hover:text-white border border-[#FF6B00]/30 transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Custom Item</span>
                </button>
              </div>

              {/* Quick Template Presets */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block mb-2.5">
                  Quick Add From WixFox Official Service Presets:
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {(servicesCatalog || []).slice(0, 4).map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleAddItem(srv)}
                      className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-[#FF6B00]/20 hover:border-[#FF6B00]/50 border border-slate-700/80 text-slate-200 hover:text-white transition-all flex items-center gap-2 group shadow-sm"
                    >
                      <Plus className="w-3.5 h-3.5 text-[#FF6B00] group-hover:scale-110 transition-transform" />
                      <span>{srv.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                        ₹{srv.defaultPrice}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {(quotation.items || []).map((item, index) => (
                  <div key={item.id || index} className="p-5 rounded-2xl bg-slate-950/70 border border-slate-700/80 relative space-y-4 shadow-md hover:border-slate-600 transition-all">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-[#FF6B00]/20 border border-[#FF6B00]/40 text-[#FF6B00] font-bold text-xs flex items-center justify-center">
                          #{item.srNo || index + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                          Deliverable Module {index + 1}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteItem(index)}
                        className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-rose-500/10 transition-all"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5">
                      <div className="md:col-span-6">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                          Service Title
                        </label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateItem(index, 'title', e.target.value)}
                          className="w-full h-11 px-3.5 text-sm font-semibold text-white bg-slate-900/90 border border-slate-700 rounded-xl focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 outline-none"
                          placeholder="e.g. Meta / Instagram Ads Management"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                          Duration
                        </label>
                        <input
                          type="text"
                          value={item.duration || ''}
                          onChange={(e) => updateItem(index, 'duration', e.target.value)}
                          className="w-full h-11 px-3.5 text-sm font-medium text-slate-300 bg-slate-900/90 border border-slate-700 rounded-xl focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 outline-none"
                          placeholder="e.g. One Time / 1 Month"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5 block">
                          Price (INR ₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-2.5 text-sm font-bold text-slate-400 font-mono">₹</span>
                          <input
                            type="number"
                            value={item.price || 0}
                            onChange={(e) => updateItem(index, 'price', e.target.value)}
                            className="w-full h-11 pl-8 pr-3.5 text-sm font-bold font-mono text-emerald-400 bg-slate-900/90 border border-slate-700 rounded-xl focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sub-Bullets Details */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                          Deliverable Scope Bullets:
                        </label>
                        <span className="text-[11px] text-slate-400 font-normal">
                          one deliverable point per line
                        </span>
                      </div>
                      <textarea
                        rows={3}
                        value={(item.details || []).join('\n')}
                        onChange={(e) => updateItem(index, 'details', e.target.value.split('\n'))}
                        className="w-full p-3.5 text-sm text-slate-200 bg-slate-900/90 border border-slate-700 rounded-xl focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 outline-none leading-relaxed"
                        placeholder="Targeted ad campaign setup&#10;Audience research & targeting&#10;Creative design & ad copy"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Display Card */}
              <div className="mt-4 p-5 rounded-2xl bg-gradient-to-r from-[#141B2E] to-[#0E1528] border-2 border-[#FF6B00]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Grand Total Invoiced:
                  </span>
                  <div className="text-xs text-slate-300 font-medium italic">
                    {quotation.amountInWords || 'Four Thousand Two Hundred Only'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl lg:text-3xl font-black text-[#FF6B00] font-mono tracking-tight drop-shadow-sm">
                    ₹ {quotation.totalAmount?.toLocaleString('en-IN') || 0} /-
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4: Terms and Conditions */}
            <div className="bg-[#121826]/80 backdrop-blur-xl border border-slate-700/60 shadow-xl rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-700/60 pb-3">
                <div className="w-8 h-8 rounded-lg bg-[#1A6FD4]/15 border border-[#1A6FD4]/30 flex items-center justify-center text-[#1A6FD4]">
                  <FileCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Terms & Payment Conditions
                </h3>
              </div>
              <textarea
                rows={4}
                value={(quotation.termsAndConditions || []).join('\n')}
                onChange={(e) => updateField('termsAndConditions', e.target.value.split('\n'))}
                className="w-full p-4 text-sm text-slate-300 bg-slate-950/70 border border-slate-700/80 rounded-xl focus:border-[#1A6FD4] focus:ring-1 focus:ring-[#1A6FD4]/20 outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Right: Live A4 Document Canvas Preview */}
        {(activeView === 'split' || activeView === 'preview') && (
          <div className={`overflow-y-auto flex flex-col items-center bg-[#05070B] ${
            activeView === 'split' ? 'w-full lg:w-1/2' : 'w-full'
          }`}>
            {/* Preview Canvas Control Bar */}
            <div className="w-full bg-[#0A0D15] border-b border-slate-800/80 px-6 py-2.5 flex items-center justify-between shrink-0 sticky top-0 z-10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-xs font-semibold text-slate-300">Live A4 Paper Preview</span>
                <span className="text-[10px] text-slate-500 hidden sm:inline">• Synchronized with Editor</span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-slate-900/90 rounded-lg p-1 border border-slate-800">
                <button
                  onClick={() => setZoomLevel(prev => Math.max(0.6, prev - 0.05))}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Zoom Out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] font-mono font-bold text-slate-300 px-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={() => setZoomLevel(prev => Math.min(1.2, prev + 0.05))}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                  title="Zoom In"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(0.85)}
                  className="text-[10px] font-semibold text-slate-400 hover:text-white px-1.5 py-0.5 rounded hover:bg-slate-800"
                  title="Reset Zoom"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* A4 Sheet Container */}
            <div className="p-8 flex justify-center w-full">
              <div 
                className="origin-top transition-transform duration-200 shadow-2xl rounded-sm"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                {/* THE OFFICIAL PIXEL-PERFECT A4 SHEET */}
                <div
                  id="wixfox-quotation-print-sheet"
                  className="quotation-canvas rounded-sm flex flex-col justify-between"
                  style={{
                    width: '794px',
                    minHeight: '1123px',
                    background: '#FFFFFF',
                    color: '#0F172A',
                    padding: '36px 42px 0 42px'
                  }}
                >
                  <div>
                    {/* HEADER SECTION */}
                    <div className="flex items-start justify-between border-b-2 border-[#1A6FD4] pb-4">
                      {/* Brand Logo & Slogan */}
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-[#FF6B00] to-[#1A6FD4] flex items-center justify-center shrink-0">
                          <img 
                            src="./wixfox-fox-logo.svg" 
                            alt="WixFox Technologies" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <h1 className="text-2xl font-black tracking-tight text-[#0A1A3A] font-['Montserrat'] leading-none">
                            Wixfox <span className="font-medium text-[#1A6FD4]">Technologies</span>
                          </h1>
                          <p className="text-[8.5px] uppercase font-bold tracking-widest text-[#1A6FD4] mt-1.5">
                            {companyProfile?.subtitle || 'WEBSITES | SOFTWARE | MARKETING | GROWTH SYSTEMS'}
                          </p>
                        </div>
                      </div>

                      {/* Tagline & Services Icons */}
                      <div className="text-right">
                        <div className="text-base font-black text-[#1A6FD4] font-['Montserrat'] leading-tight">
                          Your Growth,<br />Our Technology.
                        </div>
                        <div className="flex items-center justify-end gap-3.5 mt-2 text-[9px] font-semibold text-slate-700">
                          <div className="flex items-center gap-1">
                            <Globe className="w-3 h-3 text-[#1A6FD4]" />
                            <span>Websites & E-commerce</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Smartphone className="w-3 h-3 text-[#1A6FD4]" />
                            <span>Mobile Apps</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Cpu className="w-3 h-3 text-[#1A6FD4]" />
                            <span>CRM & ERP</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* DOCUMENT TITLE & METADATA SECTION */}
                    <div className="mt-5 grid grid-cols-12 gap-4 items-center">
                      {/* Document Title & Recipient */}
                      <div className="col-span-7">
                        <div className="text-3xl font-black tracking-tight text-[#0D2A68] uppercase font-['Montserrat'] leading-none">
                          {quotation.documentType || 'QUOTATION'}
                        </div>
                        <div className="text-[11px] font-bold tracking-widest text-[#1A6FD4] uppercase mt-1">
                          {quotation.categoryTitle || 'DIGITAL MARKETING SERVICES'}
                        </div>
                        <div className="mt-2.5 text-xs text-slate-700 font-medium">
                          <span className="text-slate-500 font-semibold uppercase text-[10px] tracking-wider block">
                            {quotation.documentType === 'TAX INVOICE' ? 'Billed To:' : 'Quotation Prepared For:'}
                          </span>
                          <span className="text-sm font-black text-[#0A1A3A] uppercase font-['Montserrat']">
                            {quotation.client?.name || 'Valued Client'}
                          </span>
                        </div>
                      </div>

                      {/* Quotation Meta Reference Box */}
                      <div className="col-span-5 text-right">
                        <div className="inline-block bg-slate-50 border border-slate-200 rounded-lg p-2.5 px-3.5 text-left text-[10.5px] text-slate-800 space-y-1 font-medium shadow-sm">
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Quotation No :</span>
                            <span className="font-bold text-[#0D2A68]">{quotation.quotationNo}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Date :</span>
                            <span className="font-bold text-slate-900">{quotation.date}</span>
                          </div>
                          <div className="flex justify-between gap-4">
                            <span className="text-slate-500">Valid Till :</span>
                            <span className="font-bold text-slate-900">{quotation.validTill}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Salutation Letter */}
                    <div className="mt-4 p-3 bg-blue-50/50 rounded-lg border border-blue-100/60 text-[10.5px] text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 block mb-0.5">
                        {quotation.client?.salutation || 'Dear Sir/Madam,'}
                      </span>
                      <p>
                        {quotation.client?.message || 
                          `Thank you for giving us the opportunity to be a part of your growth journey. We are pleased to share our quotation for Digital Marketing Services for ${quotation.client?.name}.`}
                      </p>
                    </div>

                    {/* SERVICES BREAKDOWN TABLE */}
                    <div className="mt-4 border border-[#1B3C73] rounded-lg overflow-hidden">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-[#1B3C73] text-white text-[11px] font-bold uppercase tracking-wider">
                            <th className="py-2.5 px-3 w-[8%] text-center border-r border-blue-400/30">Sr. No.</th>
                            <th className="py-2.5 px-3 w-[26%] border-r border-blue-400/30">Service Description</th>
                            <th className="py-2.5 px-3 w-[36%] border-r border-blue-400/30">Details</th>
                            <th className="py-2.5 px-3 w-[15%] text-center border-r border-blue-400/30">Duration</th>
                            <th className="py-2.5 px-3 w-[15%] text-right">Price (INR)</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 text-[10.5px]">
                          {(quotation.items || []).map((item, idx) => (
                            <tr key={item.id || idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/70'}>
                              <td className="py-3 px-3 text-center font-bold text-slate-800 align-top border-r border-slate-200">
                                {item.srNo || idx + 1}
                              </td>
                              <td className="py-3 px-3 font-bold text-slate-900 align-top border-r border-slate-200">
                                {item.title}
                              </td>
                              <td className="py-3 px-3 text-slate-600 align-top border-r border-slate-200">
                                <ul className="space-y-1">
                                  {(item.details || []).map((detail, dIdx) => (
                                    <li key={dIdx} className="flex items-start gap-1.5 leading-snug">
                                      <span className="text-[#1A6FD4] font-bold">•</span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </td>
                              <td className="py-3 px-3 text-center font-semibold text-slate-700 align-top border-r border-slate-200">
                                {item.duration}
                              </td>
                              <td className="py-3 px-3 text-right font-black text-slate-900 align-top">
                                <div className="text-xs">₹ {Number(item.price)?.toLocaleString('en-IN')}</div>
                                {item.priceLabel && (
                                  <div className="text-[9px] text-slate-500 font-medium">({item.priceLabel})</div>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* TOTAL QUOTATION AMOUNT BANNER */}
                    <div className="mt-4 bg-[#0D2A68] rounded-xl text-white px-5 py-3 flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                          <FileCheck className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div>
                          <div className="text-sm font-black uppercase tracking-wider font-['Montserrat']">
                            Total Quotation Amount
                          </div>
                          <div className="text-[10px] text-cyan-200 font-medium">
                            (Meta/Instagram Combo + Wixfox Service Charges)
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-black font-['Montserrat'] tracking-tight text-white">
                          ₹ {quotation.totalAmount?.toLocaleString('en-IN')} /-
                        </div>
                        <div className="text-[9.5px] text-cyan-200 font-medium">
                          ({quotation.amountInWords || 'Four Thousand Two Hundred Only'})
                        </div>
                      </div>
                    </div>

                    {/* SERVICE BREAKDOWN & AUTHORISED SIGNATURE */}
                    <div className="mt-4 grid grid-cols-12 gap-5 items-start">
                      {/* Left: Service Breakdown */}
                      <div className="col-span-7 bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-[#0D2A68] mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span>Service Breakdown</span>
                        </div>
                        <div className="space-y-1.5 text-[10px] text-slate-700">
                          {(quotation.serviceBreakdown || [
                            { label: 'Meta / Instagram Combo (Setup Charges)', value: '₹ 300' },
                            { label: 'Wixfox Service Charges (Per Day)', value: '₹ 300 / Day' }
                          ]).map((b, bIdx) => (
                            <div key={bIdx} className="flex items-center justify-between">
                              <span className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1A6FD4]"></span>
                                <span>{b.label}</span>
                              </span>
                              <span className="font-bold text-slate-900">{b.value}</span>
                            </div>
                          ))}
                        </div>

                        {/* Pill Badges */}
                        <div className="mt-3 flex items-center gap-2">
                          <div className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[9px] font-bold text-slate-800 flex items-center gap-1">
                            <span className="text-rose-500 font-black">Meta</span>
                            <span>₹ 300 (Setup)</span>
                          </div>
                          <div className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-[9px] font-bold text-slate-800 flex items-center gap-1">
                            <Calendar className="w-3 h-3 text-[#1A6FD4]" />
                            <span>₹ 300 / Day</span>
                          </div>
                        </div>
                      </div>

                      {/* Right: Signature Box */}
                      <div className="col-span-5 text-center">
                        <div className="font-['Caveat',cursive] text-lg font-bold text-[#1A6FD4] leading-tight">
                          Let's Build Your Brand Together!
                        </div>
                        <div className="mt-1 text-[10px] font-bold text-slate-700 uppercase">
                          For Wixfox Technologies
                        </div>

                        {/* Official Handwritten Signature Image */}
                        <div className="my-1 flex justify-center items-center h-14">
                          <img 
                            src={signatureImg} 
                            alt="Authorised Signature Wixfox Technologies" 
                            className="h-14 max-w-[170px] object-contain mix-blend-multiply drop-shadow-sm select-none"
                          />
                        </div>

                        <div className="text-[10px] font-bold text-slate-900 border-t border-slate-300 pt-1">
                          Authorised Signature
                          <div className="text-[9px] font-normal text-slate-500">Wixfox Technologies</div>
                        </div>
                        
                        <div className="mt-2 text-[9px] text-slate-600 flex items-center justify-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>We look forward to helping your business grow.</span>
                        </div>
                      </div>
                    </div>

                    {/* TERMS AND CONDITIONS */}
                    <div className="mt-4 pt-3 border-t border-slate-200">
                      <div className="flex items-center gap-1 text-[10.5px] font-bold text-slate-900 mb-1">
                        <FileCheck className="w-3.5 h-3.5 text-[#1A6FD4]" />
                        <span>Terms & Conditions</span>
                      </div>
                      <ol className="text-[9px] text-slate-600 space-y-0.5 list-decimal list-inside leading-snug">
                        {(quotation.termsAndConditions || []).slice(0, 5).map((term, tIdx) => (
                          <li key={tIdx}>{term}</li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  {/* OFFICIAL WIXFOX BRAND FOOTER */}
                  <div className="-mx-[42px] mt-6 bg-[#0A1C3E] text-white px-8 py-3 flex items-center justify-between border-t-2 border-[#FF6B00]">
                    <div className="flex items-center gap-6 text-[10px] font-medium text-slate-200">
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-cyan-300">📞</span>
                        <span>+91 8511083277</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-cyan-300">✉️</span>
                        <span>info@wixfox.com</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-cyan-300">🌐</span>
                        <span>www.wixfox.com</span>
                      </div>
                    </div>

                    <div className="text-center text-[8.5px] tracking-widest uppercase font-bold text-cyan-200 hidden md:block">
                      MORE VISIBILITY | MORE CUSTOMERS | MORE GROWTH
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full overflow-hidden p-0.5 bg-gradient-to-br from-[#FF6B00] to-[#1A6FD4]">
                        <img src="./wixfox-fox-logo.svg" alt="WixFox" className="w-full h-full object-contain" />
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] font-bold tracking-tight text-white block leading-none">
                          Wixfox
                        </span>
                        <span className="text-[8px] text-cyan-300 block leading-none">
                          Technologies
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
