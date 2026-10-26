import app from './app.js';
import { config } from './config/env.js';
import { initDatabase, persistLocalStoreAsync, db } from './config/database.js';

let server;

async function startServer() {
  try {
    // 1. Initialize Dual-Engine Database
    await initDatabase();

    // 2. Start HTTP Server
    server = app.listen(config.port, () => {
      console.log('====================================================');
      console.log(`🚀 WixFox Studio Database Server Running!`);
      console.log(`📡 URL: http://localhost:${config.port}`);
      console.log(`📊 Health: http://localhost:${config.port}/api/health`);
      console.log(`💾 Mode: ${db.isPostgres() ? 'PostgreSQL/Supabase' : 'Local Persistent JSON (data/wixfox-db.json)'}`);
      console.log(`⏰ Time: ${new Date().toLocaleString()}`);
      console.log('====================================================');
    });

    // 3. Periodic Cloud/Local Snapshot (Every N minutes)
    if (config.backupIntervalMinutes > 0) {
      setInterval(async () => {
        try {
          await persistLocalStoreAsync();
          console.log(`[Backup Engine] Database verified and persisted at ${new Date().toLocaleTimeString()}`);
        } catch (err) {
          console.error('[Backup Engine] Periodic persist failed:', err.message);
        }
      }, config.backupIntervalMinutes * 60 * 1000);
    }
  } catch (err) {
    console.error('Fatal Server Startup Error:', err);
    process.exit(1);
  }
}

// Graceful Shutdown
const handleShutdown = async (signal) => {
  console.log(`\n[Server] Received ${signal}. Gracefully shutting down...`);
  if (server) {
    server.close(async () => {
      console.log('[Server] HTTP server closed.');
      await persistLocalStoreAsync();
      console.log('[Server] Final database state flushed to disk.');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

process.on('SIGTERM', () => handleShutdown('SIGTERM'));
process.on('SIGINT', () => handleShutdown('SIGINT'));

startServer();
