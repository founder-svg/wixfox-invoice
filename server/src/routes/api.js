import express from 'express';
import * as leadsController from '../controllers/leadsController.js';
import * as projectsController from '../controllers/projectsController.js';
import * as quotationsController from '../controllers/quotationsController.js';
import * as servicesController from '../controllers/servicesController.js';
import * as companyController from '../controllers/companyController.js';
import * as backupController from '../controllers/backupController.js';
import { upload, storage } from '../config/storage.js';

const router = express.Router();

// Health & System Telemetry
router.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'WixFox Technologies Database & Cloud Server',
    version: '2.1.0',
    timestamp: new Date().toISOString()
  });
});

// Stats & Dashboard
router.get('/stats', backupController.getStats);

// Leads Pipeline
router.get('/leads', leadsController.getLeads);
router.get('/leads/:id', leadsController.getLead);
router.post('/leads', leadsController.createLead);
router.put('/leads/:id', leadsController.updateLead);
router.delete('/leads/:id', leadsController.deleteLead);

// Projects Tracker
router.get('/projects', projectsController.getProjects);
router.get('/projects/:id', projectsController.getProject);
router.post('/projects', projectsController.createProject);
router.put('/projects/:id', projectsController.updateProject);
router.delete('/projects/:id', projectsController.deleteProject);

// Quotation & Invoicing
router.get('/quotations', quotationsController.getQuotations);
router.get('/quotations/:id', quotationsController.getQuotation);
router.post('/quotations', quotationsController.createQuotation);
router.put('/quotations/:id', quotationsController.updateQuotation);
router.delete('/quotations/:id', quotationsController.deleteQuotation);

// Services Catalog
router.get('/services', servicesController.getServices);
router.post('/services', servicesController.createService);
router.put('/services/:id', servicesController.updateService);
router.delete('/services/:id', servicesController.deleteService);

// Company Profile
router.get('/company', companyController.getCompanyProfile);
router.put('/company', companyController.updateCompanyProfile);

// Database Backup, Snapshots & Cloud GitHub Sync
router.get('/backup/export', backupController.getBackup);
router.post('/backup/snapshot', backupController.createSnapshot);
router.post('/backup/restore', backupController.restoreBackup);

// File & Media Uploads
router.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, error: 'No file uploaded' });
  }
  res.json({
    success: true,
    filename: req.file.filename,
    url: storage.getUploadUrl(req.file.filename),
    size: req.file.size,
    mimetype: req.file.mimetype
  });
});

export default router;
