import { db } from '../config/database.js';

export const getServices = (req, res) => {
  try {
    const services = db.getServices();
    res.json({ success: true, count: services.length, data: services });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createService = (req, res) => {
  try {
    const { name, defaultPrice } = req.body;
    if (!name || defaultPrice === undefined) {
      return res.status(400).json({ success: false, error: 'name and defaultPrice are required' });
    }
    const newService = db.createService(req.body);
    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateService = (req, res) => {
  try {
    const updated = db.updateService(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Service not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteService = (req, res) => {
  try {
    const deleted = db.deleteService(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Service not found' });
    res.json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
