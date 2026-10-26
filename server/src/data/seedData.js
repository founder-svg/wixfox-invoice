// Official WixFox Technologies ERP Seed Data

export const initialCompanyProfile = {
  name: 'Wixfox Technologies',
  tagline: 'Your Growth, Our Technology.',
  subtitle: 'WEBSITES | SOFTWARE | MARKETING | GROWTH SYSTEMS',
  phone: '+91 8511083277',
  email: 'info@wixfox.com',
  website: 'www.wixfox.com',
  address: 'Borichi, Gandhidham, Gujarat 370110, India',
  slogan: 'MORE VISIBILITY | MORE CUSTOMERS | MORE GROWTH',
  servicesList: [
    'Websites & E-commerce',
    'Mobile Apps',
    'CRM & ERP Software',
    'Digital Marketing & Social Media',
    'Business Automation'
  ],
  authorizedSignatory: 'Wixfox Technologies',
  bankDetails: {
    bankName: 'HDFC Bank',
    accountName: 'Wixfox Technologies',
    accountNumber: '50200088992211',
    ifscCode: 'HDFC0001234',
    upiId: 'wixfox@upi'
  }
};

export const initialServicesCatalog = [
  {
    id: 'srv-1',
    category: 'Digital Marketing',
    name: 'Meta / Instagram Combo (Ads Management)',
    shortDesc: 'Complete high-ROI lead generation ad setup on Facebook & Instagram',
    details: [
      'Targeted ad campaign setup',
      'Audience research & targeting',
      'Creative design & ad copy',
      'Performance monitoring & optimization'
    ],
    defaultDuration: 'One Time Setup',
    defaultPrice: 300,
    priceUnit: 'Setup Charges',
    popular: true
  },
  {
    id: 'srv-2',
    category: 'Digital Marketing',
    name: 'Wixfox Service Charges (Management & Support)',
    shortDesc: 'Daily campaign optimization, A/B testing & real-time reporting',
    details: [
      'Ad campaign management',
      'Daily monitoring & reporting',
      'Strategy & optimization',
      'Ongoing support'
    ],
    defaultDuration: 'Per Day',
    defaultPrice: 300,
    priceUnit: 'Day',
    popular: true
  },
  {
    id: 'srv-3',
    category: 'Web Development',
    name: 'High-Converting Corporate Website',
    shortDesc: 'Modern responsive website with fast loading, SEO, and inquiry forms',
    details: [
      'Modern responsive design (Mobile, Tablet, Desktop)',
      'Speed optimization & Google Core Web Vitals',
      'SEO meta tagging and search engine indexing',
      'Integrated WhatsApp chat & Contact capture'
    ],
    defaultDuration: 'One-Time Project',
    defaultPrice: 18500,
    priceUnit: 'Project',
    popular: true
  },
  {
    id: 'srv-4',
    category: 'Mobile Apps',
    name: 'Custom Android & iOS Application',
    shortDesc: 'Native or Flutter cross-platform mobile app with cloud backend',
    details: [
      'User-friendly UI/UX design and wireframing',
      'API integration and real-time database sync',
      'Push notifications and offline capabilities',
      'Play Store & App Store deployment assistance'
    ],
    defaultDuration: 'Milestone Based',
    defaultPrice: 45000,
    priceUnit: 'App',
    popular: false
  },
  {
    id: 'srv-5',
    category: 'Software & ERP',
    name: 'Custom Billing & ERP Software',
    shortDesc: 'Tailored enterprise software for inventory, invoicing & operations',
    details: [
      'Custom workflow automation for daily operations',
      'Invoicing, quotation and GST calculation module',
      'Role-based staff access and audit logs',
      'Automated PDF generation & WhatsApp dispatch'
    ],
    defaultDuration: 'Custom Build',
    defaultPrice: 35000,
    priceUnit: 'System',
    popular: false
  },
  {
    id: 'srv-6',
    category: 'AI & Automation',
    name: 'Custom AI Agent & WhatsApp Bot',
    shortDesc: 'AI-driven lead qualification, customer support & autonomous workflows',
    details: [
      'Gemini / OpenAI API fine-tuned on company knowledge',
      'Automated 24/7 lead qualification and booking',
      'CRM integration for auto-dispatching follow-ups',
      'Multi-channel WhatsApp and Web widget deployment'
    ],
    defaultDuration: 'One-Time Setup + API',
    defaultPrice: 24000,
    priceUnit: 'Agent',
    popular: true
  }
];

export const initialLeads = [
  {
    id: 'lead-1',
    clientName: 'Aavad Krupa Construction & Consultancy',
    contactPerson: 'Mr. Haresh Patel',
    phone: '+91 8511083277',
    email: 'info@aavadkrupa.com',
    serviceInterest: 'Digital Marketing & Meta Ads',
    estimatedBudget: 4200,
    status: 'Proposal Sent',
    source: 'Instagram Ad',
    lastContactDate: '2026-10-09',
    notes: 'Quotation WTX/2026/001 shared via WhatsApp for Meta ads + daily management.'
  },
  {
    id: 'lead-2',
    clientName: 'Sunrise Kandla Logistics',
    contactPerson: 'Rajesh Vora',
    phone: '+91 9825012345',
    email: 'operations@sunriselogistics.in',
    serviceInterest: 'Custom Billing & ERP Software',
    estimatedBudget: 45000,
    status: 'In Discussion',
    source: 'Referral',
    lastContactDate: '2026-10-18',
    notes: 'Needs custom container tracking & GST invoicing for Kandla port operations.'
  },
  {
    id: 'lead-3',
    clientName: 'Kutch Heritage Handlooms',
    contactPerson: 'Pooja Mehta',
    phone: '+91 9426098765',
    email: 'sales@kutchhandlooms.com',
    serviceInterest: 'Websites & E-commerce',
    estimatedBudget: 28000,
    status: 'Won',
    source: 'Website Inquiry',
    lastContactDate: '2026-10-22',
    notes: 'Project started. E-commerce website with Razorpay payment gateway.'
  },
  {
    id: 'lead-4',
    clientName: 'Apex Health Clinic Gandhidham',
    contactPerson: 'Dr. S. K. Shah',
    phone: '+91 9724011223',
    email: 'drshah@apexclinic.org',
    serviceInterest: 'AI & WhatsApp Bot',
    estimatedBudget: 22000,
    status: 'New',
    source: 'Google Search',
    lastContactDate: '2026-10-24',
    notes: 'Inquired for automatic appointment booking WhatsApp bot.'
  }
];

export const initialProjects = [
  {
    id: 'proj-1',
    projectName: 'Aavad Krupa Digital Growth Campaign',
    clientName: 'Aavad Krupa Construction & Consultancy',
    phone: '+91 8511083277',
    services: ['Meta / Instagram Combo', 'Wixfox Service Charges'],
    totalPrice: 4200,
    paidAmount: 2100,
    startDate: '2026-10-10',
    deadline: '2026-10-24',
    status: 'In Progress',
    progressPercent: 70,
    deliverables: 'Ad creative designed, 4 ad sets launched, generating 18 qualified inquiries.'
  },
  {
    id: 'proj-2',
    projectName: 'Kutch Heritage E-Commerce Store',
    clientName: 'Kutch Heritage Handlooms',
    phone: '+91 9426098765',
    services: ['Websites & E-commerce'],
    totalPrice: 28000,
    paidAmount: 14000,
    startDate: '2026-10-15',
    deadline: '2026-11-05',
    status: 'In Progress',
    progressPercent: 45,
    deliverables: 'Catalog structure completed, homepage UI approved.'
  },
  {
    id: 'proj-3',
    projectName: 'Mundra Port Logistics ERP Beta',
    clientName: 'Oceanic Freight Solutions',
    phone: '+91 9898012399',
    services: ['CRM & ERP Software', 'Business Automation'],
    totalPrice: 65000,
    paidAmount: 65000,
    startDate: '2026-09-01',
    deadline: '2026-10-15',
    status: 'Completed',
    progressPercent: 100,
    deliverables: 'Billing module live, drivers portal deployed, final sign-off received.'
  }
];

export const initialQuotations = [
  {
    id: 'quote-1',
    quotationNo: 'WTX/2026/001',
    documentType: 'QUOTATION',
    categoryTitle: 'DIGITAL MARKETING SERVICES',
    date: '2026-10-09',
    validTill: '2026-10-23',
    client: {
      name: 'AAVAD KRUPA CONSTRUCTION & CONSULTANCY',
      phone: '+91 8511083277',
      email: 'info@aavadkrupa.com',
      salutation: 'Dear Sir/Madam,',
      message:
        'Thank you for giving us the opportunity to be a part of your growth journey. We are pleased to share our quotation for Digital Marketing Services for AAVAD KRUPA CONSTRUCTION & CONSULTANCY.'
    },
    items: [
      {
        id: 'item-1',
        srNo: 1,
        title: 'Meta / Instagram Combo (Ads Management)',
        details: [
          'Targeted ad campaign setup',
          'Audience research & targeting',
          'Creative design & ad copy',
          'Performance monitoring & optimization'
        ],
        duration: 'One Time Setup',
        price: 300,
        priceLabel: 'Setup Charges',
        badgeIcon: 'meta'
      },
      {
        id: 'item-2',
        srNo: 2,
        title: 'Wixfox Service Charges (Management & Support)',
        details: [
          'Ad campaign management',
          'Daily monitoring & reporting',
          'Strategy & optimization',
          'Ongoing support'
        ],
        duration: '₹ 300 / Day (Service Charges)',
        price: 3900,
        priceLabel: '₹ 300 / Day (Service Charges)',
        badgeIcon: 'calendar'
      }
    ],
    totalAmount: 4200,
    amountInWords: 'Four Thousand Two Hundred Only',
    serviceBreakdown: [
      {
        label: 'Meta / Instagram Combo (Setup Charges)',
        value: '₹ 300',
        badge: '₹ 300 (Setup)',
        icon: 'meta'
      },
      {
        label: 'Wixfox Service Charges (Per Day)',
        value: '₹ 300 / Day',
        badge: '₹ 300 / Day',
        icon: 'calendar'
      }
    ],
    termsAndConditions: [
      'Payment to be made in advance / as agreed.',
      'The above quotation is valid for 15 days from the date of issue.',
      'Any additional changes or extra work will be charged separately.',
      'Ad performance may vary based on audience response, product/service and market conditions.',
      'This quotation is for digital marketing services only and does not include printing or offline marketing costs.'
    ]
  }
];
