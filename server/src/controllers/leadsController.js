import { db } from '../config/database.js';

export const getLeads = (req, res) => {
  try {
    const leads = db.getLeads();
    res.json({ success: true, count: leads.length, data: leads });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getLead = (req, res) => {
  try {
    const lead = db.getLeadById(req.params.id);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createLead = (req, res) => {
  try {
    const { clientName, phone } = req.body;
    if (!clientName || !phone) {
      return res.status(400).json({ success: false, error: 'clientName and phone are required' });
    }
    const newLead = db.createLead(req.body);
    res.status(201).json({ success: true, data: newLead });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateLead = (req, res) => {
  try {
    const updated = db.updateLead(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteLead = (req, res) => {
  try {
    const deleted = db.deleteLead(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, message: 'Lead deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
