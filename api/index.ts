import type { VercelRequest, VercelResponse } from '@vercel/node';
import path from 'path';
import { createServer } from '../server/index';
import * as express from 'express';

const app = createServer();

// Serve static files from the built SPA
const distPath = path.join(process.cwd(), 'dist/spa');
app.use(express.static(distPath));

// Handle React Router - serve index.html for all non-API routes
app.get('*', (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith('/api/') || req.path.startsWith('/health')) {
    return res.status(404).json({ error: 'API endpoint not found' });
  }

  res.sendFile(path.join(distPath, 'index.html'));
});

// Export the Express app as a Vercel serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve, reject) => {
    // Convert Vercel request/response to Express format
    const expressReq = req as any;
    const expressRes = res as any;
    
    // Handle the request through Express
    app(expressReq, expressRes, (err: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
} 