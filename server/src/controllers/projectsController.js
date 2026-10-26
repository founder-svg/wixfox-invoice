import { db } from '../config/database.js';

export const getProjects = (req, res) => {
  try {
    const projects = db.getProjects();
    res.json({ success: true, count: projects.length, data: projects });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const getProject = (req, res) => {
  try {
    const project = db.getProjectById(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const createProject = (req, res) => {
  try {
    const { projectName, clientName } = req.body;
    if (!projectName || !clientName) {
      return res.status(400).json({ success: false, error: 'projectName and clientName are required' });
    }
    const newProj = db.createProject(req.body);
    res.status(201).json({ success: true, data: newProj });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const updateProject = (req, res) => {
  try {
    const updated = db.updateProject(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export const deleteProject = (req, res) => {
  try {
    const deleted = db.deleteProject(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
