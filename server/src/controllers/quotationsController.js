import { db } from '../config/database.js';

export const getQuotations = (req, res) => {
  try {
    const quotations = db.getQuotations();
    res.json({ success: true, count: quotations.length, data: quotations });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getQuotation = (req, res) => {
  try {
    const quotation = db.getQuotationById(req.params.id);
    if (!quotation) return res.status(404).json({ success: false, error: 'Quotation not found' });
    res.json({ success: true, data: quotation });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createQuotation = (req, res) => {
  try {
    const newQuote = db.createQuotation(req.body);
    res.status(201).json({ success: true, data: newQuote });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateQuotation = (req, res) => {
  try {
    const updated = db.updateQuotation(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Quotation not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteQuotation = (req, res) => {
  try {
    const deleted = db.deleteQuotation(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Quotation not found' });
    res.json({ success: true, message: 'Quotation deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
