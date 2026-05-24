import express from 'express';
import fs from 'fs';
import path from 'path';
import routes from './routes';
import { seedDatabase } from './seed';

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// CORS middleware to allow requests from Next.js dev server
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

// Routes
app.use('/api', routes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Start server
const server = app.listen(PORT, () => {
  console.log(`[v0] Express server is running on http://localhost:${PORT}`);
  console.log('[v0] API endpoints available at http://localhost:5000/api/*');

  // Seed database if data.json doesn't exist
  const dbPath = path.join(process.cwd(), 'server', 'data.json');
  if (!fs.existsSync(dbPath)) {
    console.log('[v0] First run detected - seeding database with sample data');
    seedDatabase();
  } else {
    console.log('[v0] Using existing database at', dbPath);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[v0] SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('[v0] Express server closed');
    process.exit(0);
  });
});

export default app;
