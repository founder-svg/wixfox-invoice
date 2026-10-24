import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import LeadsManager from './components/LeadsManager';
import ProjectsTracker from './components/ProjectsTracker';
import InvoiceStudio from './components/InvoiceStudio';
import ServicesCatalog from './components/ServicesCatalog';
import SettingsModal from './components/SettingsModal';
import { 
  INITIAL_COMPANY_PROFILE, 
  INITIAL_SERVICES_CATALOG, 
  INITIAL_LEADS, 
  INITIAL_PROJECTS, 
  INITIAL_QUOTATION 
} from './data/initialData';
import { numberToIndianWords } from './utils/pdfGenerator';

export default function App() {
  const [activeTab, setActiveTab] = useState('quotation'); // default to quotation studio for immediate inspection!

  // Persistent LocalStorage State
  const [companyProfile, setCompanyProfile] = useState(() => {
    const saved = localStorage.getItem('wixfox_profile');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_PROFILE;
  });

  const [servicesCatalog, setServicesCatalog] = useState(() => {
    const saved = localStorage.getItem('wixfox_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES_CATALOG;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('wixfox_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem('wixfox_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [quotation, setQuotation] = useState(() => {
    const saved = localStorage.getItem('wixfox_quotation');
    return saved ? JSON.parse(saved) : INITIAL_QUOTATION;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('wixfox_profile', JSON.stringify(companyProfile));
  }, [companyProfile]);

  useEffect(() => {
    localStorage.setItem('wixfox_services', JSON.stringify(servicesCatalog));
  }, [servicesCatalog]);

  useEffect(() => {
    localStorage.setItem('wixfox_leads', JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem('wixfox_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('wixfox_quotation', JSON.stringify(quotation));
  }, [quotation]);

  // Actions
  const handleCreateQuotationForLead = (lead) => {
    const dateStr = new Date().toISOString().split('T')[0];
    const validTillDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newQuote = {
      id: `quote-${Date.now()}`,
      quotationNo: `WTX/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 900) + 100)}`,
      documentType: 'QUOTATION',
      categoryTitle: lead.serviceInterest ? `${lead.serviceInterest.toUpperCase()} PROPOSAL` : 'DIGITAL SOLUTIONS PROPOSAL',
      date: dateStr,
      validTill: validTillDate,
      client: {
        name: lead.clientName,
        phone: lead.phone,
        email: lead.email,
        salutation: `Dear ${lead.contactPerson || 'Sir/Madam'},`,
        message: `Thank you for giving us the opportunity to be a part of your growth journey. We are pleased to share our quotation for ${lead.serviceInterest || 'Digital Solutions'} for ${lead.clientName}.`
      },
      items: [
        {
          id: `item-${Date.now()}`,
          srNo: 1,
          title: lead.serviceInterest || 'Agency Service Package',
          details: [
            lead.notes || 'Full scope design, execution, testing and delivery',
            'Quality assurance and ongoing agency support'
          ],
          duration: 'Agreed Timeline',
          price: lead.estimatedBudget || 5000,
          priceLabel: 'Package Cost',
          badgeIcon: 'calendar'
        }
      ],
      totalAmount: lead.estimatedBudget || 5000,
      amountInWords: numberToIndianWords(lead.estimatedBudget || 5000),
      serviceBreakdown: [
        {
          label: `${lead.serviceInterest || 'Agency Service'} (Fixed Scope)`,
          value: `₹ ${(lead.estimatedBudget || 5000).toLocaleString('en-IN')}`
        }
      ],
      termsAndConditions: INITIAL_QUOTATION.termsAndConditions
    };

    setQuotation(newQuote);
    setActiveTab('quotation');
  };

  const handleConvertLeadToProject = (lead) => {
    const newProj = {
      id: `proj-${Date.now()}`,
      projectName: `${lead.clientName} - Implementation`,
      clientName: lead.clientName,
      phone: lead.phone,
      services: [lead.serviceInterest || 'General Digital Services'],
      totalPrice: lead.estimatedBudget || 10000,
      paidAmount: Math.round((lead.estimatedBudget || 10000) * 0.4),
      startDate: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'In Progress',
      progressPercent: 15,
      deliverables: lead.notes || 'Project initialized from converted lead inquiry.'
    };

    setProjects(prev => [newProj, ...prev]);
    setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'Won' } : l));
    setActiveTab('projects');
  };

  const handleGenerateInvoiceForProject = (project) => {
    const balance = (project.totalPrice || 0) - (project.paidAmount || 0);
    const dateStr = new Date().toISOString().split('T')[0];

    const invoiceDoc = {
      id: `inv-${Date.now()}`,
      quotationNo: `INV/${new Date().getFullYear()}/${String(Math.floor(Math.random() * 900) + 100)}`,
      documentType: 'TAX INVOICE',
      categoryTitle: `${(project.services?.[0] || 'SOFTWARE & WEB').toUpperCase()} INVOICE`,
      date: dateStr,
      validTill: 'Payment Due Upon Receipt',
      client: {
        name: project.clientName,
        tagline: 'OFFICIAL INVOICE BILL',
        phone: project.phone,
        email: '',
        salutation: 'Dear Accounts Team,',
        message: `Thank you for choosing Wixfox Technologies. Below is the official tax invoice for project ${project.projectName}.`
      },
      items: [
        {
          id: `item-${Date.now()}`,
          srNo: 1,
          title: project.projectName,
          details: [
            project.deliverables || 'Service milestones completed and delivered',
            `Covered services: ${(project.services || []).join(', ')}`
          ],
          duration: 'Milestone Delivery',
          price: project.totalPrice,
          priceLabel: 'Total Agreed Cost',
          badgeIcon: 'calendar'
        }
      ],
      totalAmount: project.totalPrice,
      amountInWords: numberToIndianWords(project.totalPrice),
      serviceBreakdown: [
        { label: 'Total Invoiced Amount', value: `₹ ${project.totalPrice?.toLocaleString('en-IN')}` },
        { label: 'Amount Already Received', value: `₹ ${project.paidAmount?.toLocaleString('en-IN')}` },
        { label: 'Pending Balance Due', value: `₹ ${balance?.toLocaleString('en-IN')}` }
      ],
      termsAndConditions: [
        'Payment to be made via Bank Transfer / UPI / Cheque in favor of Wixfox Technologies.',
        'Please quote invoice number in all payment references.',
        'Warranty & code maintenance begins from date of final settlement.',
        'Thank you for your business!'
      ]
    };

    setQuotation(invoiceDoc);
    setActiveTab('quotation');
  };

  const handleAddServiceToQuote = (service) => {
    const newItem = {
      id: `item-${Date.now()}`,
      srNo: (quotation.items?.length || 0) + 1,
      title: service.name,
      details: [...service.details],
      duration: service.defaultDuration,
      price: service.defaultPrice,
      priceLabel: service.priceUnit,
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

    setActiveTab('quotation');
  };

  const handleResetAllData = () => {
    if (window.confirm('Reset all leads, projects, and quotation to initial WixFox sample data?')) {
      setCompanyProfile(INITIAL_COMPANY_PROFILE);
      setServicesCatalog(INITIAL_SERVICES_CATALOG);
      setLeads(INITIAL_LEADS);
      setProjects(INITIAL_PROJECTS);
      setQuotation(INITIAL_QUOTATION);
      localStorage.clear();
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0C10] text-slate-100">
      {/* Top Windows App Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewQuotation={() => setActiveTab('quotation')}
        onNewLead={() => setActiveTab('leads')}
        companyProfile={companyProfile}
      />

      {/* Main Body with Sidebar + Tab Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={{
            leads: leads.length,
            projects: projects.length,
            quotations: '1'
          }}
        />

        <main className="flex-1 overflow-hidden relative">
          {activeTab === 'dashboard' && (
            <Dashboard
              leads={leads}
              projects={projects}
              quotation={quotation}
              setActiveTab={setActiveTab}
              companyProfile={companyProfile}
            />
          )}

          {activeTab === 'quotation' && (
            <InvoiceStudio
              quotation={quotation}
              setQuotation={setQuotation}
              companyProfile={companyProfile}
              servicesCatalog={servicesCatalog}
            />
          )}

          {activeTab === 'leads' && (
            <LeadsManager
              leads={leads}
              setLeads={setLeads}
              onCreateQuotationForLead={handleCreateQuotationForLead}
              onConvertLeadToProject={handleConvertLeadToProject}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsTracker
              projects={projects}
              setProjects={setProjects}
              onGenerateInvoiceForProject={handleGenerateInvoiceForProject}
            />
          )}

          {activeTab === 'services' && (
            <ServicesCatalog
              services={servicesCatalog}
              setServices={setServicesCatalog}
              onAddServiceToQuote={handleAddServiceToQuote}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsModal
              companyProfile={companyProfile}
              setCompanyProfile={setCompanyProfile}
              onResetAllData={handleResetAllData}
            />
          )}
        </main>
      </div>
    </div>
  );
}
