import { db } from '../config/database.js';

export const getCompanyProfile = (req, res) => {
  try {
    const profile = db.getCompanyProfile();
    res.json({ success: true, data: profile });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateCompanyProfile = (req, res) => {
  try {
    const updated = db.updateCompanyProfile(req.body);
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
