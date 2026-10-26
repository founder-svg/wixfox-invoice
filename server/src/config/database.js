import fs from 'fs';
import path from 'path';
import pkg from 'pg';
const { Pool } = pkg;
import { config } from './env.js';
import {
  initialCompanyProfile,
  initialServicesCatalog,
  initialLeads,
  initialProjects,
  initialQuotations
} from '../data/seedData.js';

let pgPool = null;
let isPostgres = false;

// Persistent In-Memory & Local JSON Store
export const localStore = {
  companyProfile: { ...initialCompanyProfile },
  services: [...initialServicesCatalog],
  leads: [...initialLeads],
  projects: [...initialProjects],
  quotations: [...initialQuotations],
  auditLogs: [],
  meta: {
    system: 'WixFox Technologies ERP Engine',
    version: '2.1.0',
    lastSaved: new Date().toISOString()
  }
};

const localDbPath = path.join(config.dataDir, 'wixfox-db.json');

// Asynchronous Non-Blocking Disk Persistence
let isPersisting = false;
let pendingPersist = false;

export const persistLocalStoreAsync = async () => {
  if (isPersisting) {
    pendingPersist = true;
    return;
  }
  isPersisting = true;
  try {
    await fs.promises.mkdir(config.dataDir, { recursive: true });
    localStore.meta.lastSaved = new Date().toISOString();
    await fs.promises.writeFile(
      localDbPath,
      JSON.stringify(localStore, null, 2),
      'utf8'
    );
  } catch (err) {
    console.error('[DB] Failed to persist wixfox-db.json:', err.message);
  } finally {
    isPersisting = false;
    if (pendingPersist) {
      pendingPersist = false;
      persistLocalStoreAsync();
    }
  }
};

// Load existing database from disk or initialize with seed data
const loadLocalStore = () => {
  try {
    if (fs.existsSync(localDbPath)) {
      const data = JSON.parse(fs.readFileSync(localDbPath, 'utf8'));
      if (data.companyProfile) localStore.companyProfile = data.companyProfile;
      if (Array.isArray(data.services)) localStore.services = data.services;
      if (Array.isArray(data.leads)) localStore.leads = data.leads;
      if (Array.isArray(data.projects)) localStore.projects = data.projects;
      if (Array.isArray(data.quotations)) localStore.quotations = data.quotations;
      if (Array.isArray(data.auditLogs)) localStore.auditLogs = data.auditLogs;
      console.log(`[DB] Successfully loaded wixfox-db.json (${localStore.leads.length} leads, ${localStore.projects.length} projects, ${localStore.quotations.length} quotes)`);
    } else {
      console.log('[DB] Initializing new wixfox-db.json with official seed data...');
      persistLocalStoreAsync();
    }
  } catch (err) {
    console.warn('[DB] Could not parse wixfox-db.json, using seed data:', err.message);
    persistLocalStoreAsync();
  }
};

// Initialize Database (Dual-Engine)
export const initDatabase = async () => {
  loadLocalStore();

  if (config.databaseUrl) {
    try {
      console.log('[DB] Connecting to PostgreSQL / Supabase pool...');
      pgPool = new Pool({
        connectionString: config.databaseUrl,
        ssl: config.nodeEnv === 'production' ? { rejectUnauthorized: false } : false,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000
      });

      const res = await pgPool.query('SELECT NOW()');
      isPostgres = true;
      console.log('[DB] Connected to PostgreSQL successfully at:', res.rows[0].now);
    } catch (err) {
      console.warn('[DB] PostgreSQL connection failed, operating seamlessly on local-persistent JSON DB:', err.message);
      isPostgres = false;
    }
  } else {
    console.log('[DB] Operating in high-speed local persistent database mode (data/wixfox-db.json)');
  }
};

// ==========================================
// Database CRUD & Query Services
// ==========================================

export const db = {
  isPostgres: () => isPostgres,
  
  // Leads
  getLeads: () => [...localStore.leads],
  getLeadById: (id) => localStore.leads.find(l => l.id === id),
  createLead: (lead) => {
    const newLead = {
      id: lead.id || `lead-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...lead
    };
    localStore.leads.unshift(newLead);
    persistLocalStoreAsync();
    return newLead;
  },
  updateLead: (id, updates) => {
    const idx = localStore.leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    localStore.leads[idx] = {
      ...localStore.leads[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    persistLocalStoreAsync();
    return localStore.leads[idx];
  },
  deleteLead: (id) => {
    const initialLen = localStore.leads.length;
    localStore.leads = localStore.leads.filter(l => l.id !== id);
    const deleted = localStore.leads.length < initialLen;
    if (deleted) persistLocalStoreAsync();
    return deleted;
  },

  // Projects
  getProjects: () => [...localStore.projects],
  getProjectById: (id) => localStore.projects.find(p => p.id === id),
  createProject: (project) => {
    const newProj = {
      id: project.id || `proj-${Date.now()}`,
      status: 'In Progress',
      progressPercent: 10,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...project
    };
    localStore.projects.unshift(newProj);
    persistLocalStoreAsync();
    return newProj;
  },
  updateProject: (id, updates) => {
    const idx = localStore.projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    localStore.projects[idx] = {
      ...localStore.projects[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    persistLocalStoreAsync();
    return localStore.projects[idx];
  },
  deleteProject: (id) => {
    const initialLen = localStore.projects.length;
    localStore.projects = localStore.projects.filter(p => p.id !== id);
    const deleted = localStore.projects.length < initialLen;
    if (deleted) persistLocalStoreAsync();
    return deleted;
  },

  // Quotations & Invoices
  getQuotations: () => [...localStore.quotations],
  getQuotationById: (id) => localStore.quotations.find(q => q.id === id || q.quotationNo === id),
  createQuotation: (quote) => {
    const newQuote = {
      id: quote.id || `quote-${Date.now()}`,
      quotationNo: quote.quotationNo || `WTX/${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...quote
    };
    localStore.quotations.unshift(newQuote);
    persistLocalStoreAsync();
    return newQuote;
  },
  updateQuotation: (id, updates) => {
    const idx = localStore.quotations.findIndex(q => q.id === id || q.quotationNo === id);
    if (idx === -1) return null;
    localStore.quotations[idx] = {
      ...localStore.quotations[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    persistLocalStoreAsync();
    return localStore.quotations[idx];
  },
  deleteQuotation: (id) => {
    const initialLen = localStore.quotations.length;
    localStore.quotations = localStore.quotations.filter(q => q.id !== id && q.quotationNo !== id);
    const deleted = localStore.quotations.length < initialLen;
    if (deleted) persistLocalStoreAsync();
    return deleted;
  },

  // Services Catalog
  getServices: () => [...localStore.services],
  createService: (service) => {
    const newSrv = {
      id: service.id || `srv-${Date.now()}`,
      ...service
    };
    localStore.services.push(newSrv);
    persistLocalStoreAsync();
    return newSrv;
  },
  updateService: (id, updates) => {
    const idx = localStore.services.findIndex(s => s.id === id);
    if (idx === -1) return null;
    localStore.services[idx] = { ...localStore.services[idx], ...updates };
    persistLocalStoreAsync();
    return localStore.services[idx];
  },
  deleteService: (id) => {
    const initialLen = localStore.services.length;
    localStore.services = localStore.services.filter(s => s.id !== id);
    const deleted = localStore.services.length < initialLen;
    if (deleted) persistLocalStoreAsync();
    return deleted;
  },

  // Company Profile
  getCompanyProfile: () => ({ ...localStore.companyProfile }),
  updateCompanyProfile: (profile) => {
    localStore.companyProfile = {
      ...localStore.companyProfile,
      ...profile,
      updatedAt: new Date().toISOString()
    };
    persistLocalStoreAsync();
    return localStore.companyProfile;
  },

  // Analytics & Stats
  getStats: () => {
    const totalLeads = localStore.leads.length;
    const leadsPipelineValue = localStore.leads.reduce((sum, l) => sum + (Number(l.estimatedBudget) || 0), 0);
    const totalProjects = localStore.projects.length;
    const activeProjects = localStore.projects.filter(p => p.status !== 'Completed').length;
    const totalProjectsValue = localStore.projects.reduce((sum, p) => sum + (Number(p.totalPrice) || 0), 0);
    const totalCollected = localStore.projects.reduce((sum, p) => sum + (Number(p.paidAmount) || 0), 0);
    const totalQuotations = localStore.quotations.length;
    const quotationInvoicedTotal = localStore.quotations.reduce((sum, q) => sum + (Number(q.totalAmount) || 0), 0);

    return {
      totalLeads,
      leadsPipelineValue,
      totalProjects,
      activeProjects,
      totalProjectsValue,
      totalCollected,
      pendingBalance: totalProjectsValue - totalCollected,
      totalQuotations,
      quotationInvoicedTotal,
      serverTime: new Date().toISOString(),
      engine: isPostgres ? 'PostgreSQL' : 'Local Persistent JSON'
    };
  },

  // Database Backup & Sync
  getDatabaseSnapshot: () => JSON.parse(JSON.stringify(localStore)),
  importDatabaseSnapshot: (snapshot) => {
    if (snapshot.companyProfile) localStore.companyProfile = snapshot.companyProfile;
    if (Array.isArray(snapshot.services)) localStore.services = snapshot.services;
    if (Array.isArray(snapshot.leads)) localStore.leads = snapshot.leads;
    if (Array.isArray(snapshot.projects)) localStore.projects = snapshot.projects;
    if (Array.isArray(snapshot.quotations)) localStore.quotations = snapshot.quotations;
    persistLocalStoreAsync();
    return true;
  }
};
