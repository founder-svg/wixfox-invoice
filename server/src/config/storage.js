import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { config } from './env.js';

// Ensure storage directories exist
if (!fs.existsSync(config.uploadsDir)) {
  fs.mkdirSync(config.uploadsDir, { recursive: true });
}

// Multer Storage Configuration
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, safeName);
  }
});

// File filter (images, pdfs, documents)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/svg+xml',
    'application/pdf',
    'application/json'
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`Invalid file type: ${file.mimetype}. Only images, PDFs, and JSON are supported.`));
  }
};

export const upload = multer({
  storage: diskStorage,
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB max
  },
  fileFilter
});

export const storage = {
  getUploadUrl: (filename) => `/uploads/${filename}`,
  deleteFile: async (filename) => {
    const filePath = path.join(config.uploadsDir, filename);
    if (fs.existsSync(filePath)) {
      await fs.promises.unlink(filePath);
      return true;
    }
    return false;
  }
};
