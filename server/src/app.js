import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from './config/env.js';
import apiRouter from './routes/api.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security Headers with relaxed cross-origin for local dev & desktop electron
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    contentSecurityPolicy: false
  })
);

// Compression for lightning-fast payloads
app.use(compression());

// Flexible CORS Configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Electron, mobile Capacitor, curl, Postman)
      if (!origin) return callback(null, true);
      if (config.allowedOrigins.includes('*') || config.allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(null, true); // Dev convenience
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Request Logging
if (config.nodeEnv !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api', apiLimiter);

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Uploads Directory
app.use('/uploads', express.static(config.uploadsDir));

// Mount REST API
app.use('/api', apiRouter);

// Root Welcome Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    app: 'WixFox Studio Database & Cloud Server',
    company: 'WixFox Technologies',
    version: '2.1.0',
    documentation: '/api/health',
    endpoints: [
      '/api/leads',
      '/api/projects',
      '/api/quotations',
      '/api/services',
      '/api/company',
      '/api/stats',
      '/api/backup/export'
    ]
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]', err);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal Server Error'
  });
});

export default app;
