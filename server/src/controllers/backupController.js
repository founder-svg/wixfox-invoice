import fs from 'fs';
import path from 'path';
import { db } from '../config/database.js';
import { config } from '../config/env.js';

export const getStats = (req, res) => {
  try {
    const stats = db.getStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getBackup = (req, res) => {
  try {
    const snapshot = db.getDatabaseSnapshot();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="wixfox-backup-${Date.now()}.json"`);
    res.json(snapshot);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const restoreBackup = (req, res) => {
  try {
    const snapshot = req.body;
    if (!snapshot || typeof snapshot !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid snapshot payload' });
    }
    db.importDatabaseSnapshot(snapshot);
    res.json({ success: true, message: 'Database restored successfully from snapshot' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createSnapshot = async (req, res) => {
  try {
    const snapshotsDir = path.join(config.dataDir, 'snapshots');
    await fs.promises.mkdir(snapshotsDir, { recursive: true });

    const snapshot = db.getDatabaseSnapshot();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `wixfox-snapshot-${timestamp}.json`;
    const filePath = path.join(snapshotsDir, filename);

    await fs.promises.writeFile(filePath, JSON.stringify(snapshot, null, 2), 'utf8');

    res.json({
      success: true,
      message: 'Cloud snapshot created and saved to data/snapshots/',
      filename,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
