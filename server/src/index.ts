import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes.js';
import { seedDatabase } from './seed.js';

const app = express();
const PORT = Number(process.env.PORT ?? 8000);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  console.log(`Express server is running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api/*`);

  // Seed database if data.json doesn't exist
  const dbPath = path.resolve(__dirname, '..', 'data.json');
  if (!fs.existsSync(dbPath)) {
    console.log('First run detected - seeding database with sample data');
    seedDatabase();
  } else {
    console.log('Using existing database at', dbPath);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Express server closed');
    process.exit(0);
  });
});

export default app;
