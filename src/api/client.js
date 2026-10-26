// WixFox Studio — Real-time API Client & Database Synchronization Engine

const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000/api';

class ApiClient {
  constructor() {
    this.baseUrl = API_BASE_URL;
    this.isOnline = false;
    this.serverEngine = 'Local JSON DB';
  }

  async checkHealth() {
    try {
      const res = await fetch(`${this.baseUrl}/health`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        this.isOnline = true;
        return { online: true, ...data };
      }
    } catch (e) {
      this.isOnline = false;
    }
    return { online: false };
  }

  // Leads
  async getLeads() {
    try {
      const res = await fetch(`${this.baseUrl}/leads`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {}
    return null;
  }

  async createLead(lead) {
    try {
      const res = await fetch(`${this.baseUrl}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  async updateLead(id, updates) {
    try {
      const res = await fetch(`${this.baseUrl}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  async deleteLead(id) {
    try {
      const res = await fetch(`${this.baseUrl}/leads/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(3000)
      });
      return res.ok;
    } catch (e) {}
    return false;
  }

  // Projects
  async getProjects() {
    try {
      const res = await fetch(`${this.baseUrl}/projects`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {}
    return null;
  }

  async createProject(project) {
    try {
      const res = await fetch(`${this.baseUrl}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(project),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  async updateProject(id, updates) {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  async deleteProject(id) {
    try {
      const res = await fetch(`${this.baseUrl}/projects/${id}`, {
        method: 'DELETE',
        signal: AbortSignal.timeout(3000)
      });
      return res.ok;
    } catch (e) {}
    return false;
  }

  // Quotation
  async getQuotations() {
    try {
      const res = await fetch(`${this.baseUrl}/quotations`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {}
    return null;
  }

  async saveQuotation(quote) {
    try {
      const res = await fetch(`${this.baseUrl}/quotations/${quote.id || quote.quotationNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
      // If not existing, create
      const createRes = await fetch(`${this.baseUrl}/quotations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote),
        signal: AbortSignal.timeout(3000)
      });
      if (createRes.ok) {
        const json = await createRes.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  // Company Profile
  async getCompanyProfile() {
    try {
      const res = await fetch(`${this.baseUrl}/company`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  async updateCompanyProfile(profile) {
    try {
      const res = await fetch(`${this.baseUrl}/company`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
        signal: AbortSignal.timeout(3000)
      });
      if (res.ok) {
        const json = await res.json();
        return json.data;
      }
    } catch (e) {}
    return null;
  }

  // Services Catalog
  async getServices() {
    try {
      const res = await fetch(`${this.baseUrl}/services`, { signal: AbortSignal.timeout(3000) });
      if (res.ok) {
        const json = await res.json();
        return json.data || [];
      }
    } catch (e) {}
    return null;
  }

  // Cloud Snapshot trigger
  async triggerCloudSnapshot() {
    try {
      const res = await fetch(`${this.baseUrl}/backup/snapshot`, {
        method: 'POST',
        signal: AbortSignal.timeout(4000)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return null;
  }
}

export const api = new ApiClient();
