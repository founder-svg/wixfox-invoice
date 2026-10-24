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
  Copy
} from 'lucide-react';
import { downloadQuotationPDF, numberToIndianWords } from '../utils/pdfGenerator';
import { generateWhatsAppLink } from '../utils/whatsapp';

export default function InvoiceStudio({ quotation, setQuotation, companyProfile, servicesCatalog }) {
  const [activeView, setActiveView] = useState('split'); // 'split', 'editor', 'preview'
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
    <div className="flex flex-col h-full overflow-hidden bg-[#0A0C10]">
      {/* Top Toolbar */}
      <div className="border-b border-white/10 bg-[#10141F] px-6 py-3 flex flex-wrap items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/40 rounded-lg p-1 border border-white/10">
            <button
              onClick={() => setActiveView('split')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeView === 'split' ? 'bg-[#FF6B00] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
            <button
              onClick={() => setActiveView('editor')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeView === 'editor' ? 'bg-[#FF6B00] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor Only</span>
            </button>
            <button
              onClick={() => setActiveView('preview')}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeView === 'preview' ? 'bg-[#FF6B00] text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>A4 Print View</span>
            </button>
          </div>

          <div className="h-4 w-px bg-white/10"></div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Doc Type:</span>
            <select
              value={quotation.documentType || 'QUOTATION'}
              onChange={(e) => updateField('documentType', e.target.value)}
              className="bg-black/50 border border-white/10 text-white text-xs rounded-lg px-2.5 py-1.5 focus:border-[#FF6B00] focus:outline-none font-bold"
            >
              <option value="QUOTATION">QUOTATION</option>
              <option value="TAX INVOICE">TAX INVOICE</option>
              <option value="PROFORMA INVOICE">PROFORMA INVOICE</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {statusMsg && (
            <span className="text-xs text-emerald-400 animate-pulse font-medium">
              {statusMsg}
            </span>
          )}

          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/30 transition-all"
            title="Send pre-formatted quotation summary & PDF to client on WhatsApp"
          >
            <Share2 className="w-4 h-4" />
            <span>Send on WhatsApp</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="flex items-center gap-2 text-xs font-bold px-4 py-2 rounded-lg btn-orange-glow transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 transition-colors"
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
          <div className={`overflow-y-auto p-6 space-y-6 border-r border-white/10 bg-[#0E121A] ${
            activeView === 'split' ? 'w-full lg:w-1/2' : 'w-full max-w-4xl mx-auto'
          }`}>
            {/* Document Details Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <FileCheck className="w-4 h-4 text-[#FF6B00]" />
                  <span>Document Meta & Reference</span>
                </div>
                <span className="text-[11px] text-[#4A9FE8] font-bold">
                  {quotation.quotationNo}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 uppercase font-semibold">Doc Number</label>
                  <input
                    type="text"
                    value={quotation.quotationNo || ''}
                    onChange={(e) => updateField('quotationNo', e.target.value)}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 uppercase font-semibold">Issue Date</label>
                  <input
                    type="text"
                    value={quotation.date || ''}
                    onChange={(e) => updateField('date', e.target.value)}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 uppercase font-semibold">Valid Till</label>
                  <input
                    type="text"
                    value={quotation.validTill || ''}
                    onChange={(e) => updateField('validTill', e.target.value)}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-semibold">Header Category Title</label>
                <input
                  type="text"
                  value={quotation.categoryTitle || 'DIGITAL MARKETING SERVICES'}
                  onChange={(e) => updateField('categoryTitle', e.target.value)}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#FF6B00] focus:outline-none font-bold tracking-wider"
                />
              </div>
            </div>

            {/* Client Details Card */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
                <Building2 className="w-4 h-4 text-[#1A6FD4]" />
                <span>Client & Proposal Salutation</span>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-semibold">Client / Company Name</label>
                <input
                  type="text"
                  value={quotation.client?.name || ''}
                  onChange={(e) => updateClientField('name', e.target.value)}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white focus:border-[#1A6FD4] focus:outline-none font-bold text-sm"
                  placeholder="e.g. Client Company Name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] text-slate-400 uppercase font-semibold">Client WhatsApp Number</label>
                  <input
                    type="text"
                    value={quotation.client?.phone || ''}
                    onChange={(e) => updateClientField('phone', e.target.value)}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-emerald-400 focus:border-emerald-500 focus:outline-none font-mono"
                    placeholder="+91 8511083277"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 uppercase font-semibold">Client Email (Optional)</label>
                  <input
                    type="email"
                    value={quotation.client?.email || ''}
                    onChange={(e) => updateClientField('email', e.target.value)}
                    className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white focus:border-[#1A6FD4] focus:outline-none"
                    placeholder="info@client.com"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] text-slate-400 uppercase font-semibold">Salutation Letter Text</label>
                <textarea
                  rows={3}
                  value={quotation.client?.message || ''}
                  onChange={(e) => updateClientField('message', e.target.value)}
                  className="w-full mt-1 bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-slate-300 focus:border-[#1A6FD4] focus:outline-none leading-relaxed"
                />
              </div>
            </div>

            {/* Line Items & Scope */}
            <div className="glass-panel rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sparkles className="w-4 h-4 text-[#FF6B00]" />
                  <span>Itemized Services & Pricing</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddItem()}
                    className="text-xs font-semibold px-2.5 py-1 rounded bg-[#FF6B00]/20 text-[#FF6B00] hover:bg-[#FF6B00]/30 border border-[#FF6B00]/30 transition-all flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Custom Item</span>
                  </button>
                </div>
              </div>

              {/* Quick Template Presets */}
              <div className="bg-black/30 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Add From WixFox Official Service Presets:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(servicesCatalog || []).slice(0, 4).map((srv) => (
                    <button
                      key={srv.id}
                      onClick={() => handleAddItem(srv)}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3 text-[#FF6B00]" />
                      <span>{srv.name} (₹{srv.defaultPrice})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {(quotation.items || []).map((item, index) => (
                  <div key={item.id || index} className="p-4 rounded-xl bg-black/40 border border-white/10 relative group">
                    <button
                      onClick={() => handleDeleteItem(index)}
                      className="absolute top-3 right-3 text-slate-500 hover:text-rose-400 transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3">
                      <div className="md:col-span-1">
                        <label className="text-[10px] text-slate-500 font-bold">SR</label>
                        <div className="text-xs font-bold text-slate-300 mt-1">{item.srNo}</div>
                      </div>
                      <div className="md:col-span-6">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Service Description</label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => updateItem(index, 'title', e.target.value)}
                          className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white font-semibold focus:border-[#FF6B00] focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Duration</label>
                        <input
                          type="text"
                          value={item.duration || ''}
                          onChange={(e) => updateItem(index, 'duration', e.target.value)}
                          className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-slate-300 focus:border-[#FF6B00] focus:outline-none"
                          placeholder="e.g. One Time / Per Day"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Price (INR)</label>
                        <input
                          type="number"
                          value={item.price || 0}
                          onChange={(e) => updateItem(index, 'price', e.target.value)}
                          className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg px-2.5 py-1 text-xs text-emerald-400 font-bold focus:border-[#FF6B00] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Sub-Bullets Details */}
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Deliverable Scope (one per line):</label>
                      <textarea
                        rows={3}
                        value={(item.details || []).join('\n')}
                        onChange={(e) => updateItem(index, 'details', e.target.value.split('\n'))}
                        className="w-full mt-1 bg-black/50 border border-white/10 rounded-lg p-2 text-xs text-slate-300 focus:border-[#FF6B00] focus:outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Calculation Display */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400">Total Calculation:</span>
                  <div className="text-xs text-slate-400 italic mt-0.5 font-medium">
                    {quotation.amountInWords}
                  </div>
                </div>
                <div className="text-xl font-extrabold text-[#FF6B00] font-mono">
                  ₹ {quotation.totalAmount?.toLocaleString('en-IN') || 0} /-
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="glass-panel rounded-2xl p-5 space-y-3">
              <span className="text-sm font-bold text-white block border-b border-white/10 pb-2">
                Terms & Conditions
              </span>
              <textarea
                rows={5}
                value={(quotation.termsAndConditions || []).join('\n')}
                onChange={(e) => updateField('termsAndConditions', e.target.value.split('\n'))}
                className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-xs text-slate-300 focus:border-[#1A6FD4] focus:outline-none leading-relaxed"
              />
            </div>
          </div>
        )}

        {/* Right: Live A4 Document Canvas Preview */}
        {(activeView === 'split' || activeView === 'preview') && (
          <div className={`overflow-y-auto p-6 flex justify-center bg-[#07090D] ${
            activeView === 'split' ? 'w-full lg:w-1/2' : 'w-full'
          }`}>
            <div className="scale-90 lg:scale-[0.82] xl:scale-90 origin-top transition-transform">
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

                      {/* Signature Graphical Stamp */}
                      <div className="my-1 flex justify-center items-center h-12">
                        <svg className="w-32 h-10 text-slate-800" viewBox="0 0 200 60" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 40 Q 50 10, 80 35 T 140 25 Q 160 50, 180 30" />
                          <path d="M60 45 L 120 45" strokeWidth="1.5" />
                          <circle cx="85" cy="25" r="8" fill="none" />
                        </svg>
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
        )}
      </div>
    </div>
  );
}
