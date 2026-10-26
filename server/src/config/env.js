import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL || '',
  allowedOrigins: (process.env.ALLOWED_ORIGINS || '*')
    .split(',')
    .map(o => o.trim()),
  dataDir: path.resolve(__dirname, '../../data'),
  uploadsDir: path.resolve(__dirname, '../../uploads'),
  backupIntervalMinutes: parseInt(process.env.BACKUP_INTERVAL_MINUTES || '60', 10),
  autoSnapshot: process.env.AUTO_SNAPSHOT_ON_CHANGE !== 'false'
};
