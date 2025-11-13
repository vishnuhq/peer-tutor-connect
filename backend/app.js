/**
 * Express Application Setup
 * Main entry point for the backend server
 */

import express from 'express';
import session from 'express-session';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectToDb } from './database_config/index.js';
import configureRoutes from './routes/index.js';
import { requestLogger, errorHandler, notFoundHandler } from './middlewares.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());

// CORS configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true, // Allow cookies
  })
);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'dev-secret-change-in-production',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // HTTPS only in production
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 48, // 48 hours
    },
  })
);

// Request logging
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Configure all routes
configureRoutes(app);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
  const startServer = async () => {
    try {
      // Connect to MongoDB
      await connectToDb();

      // Start Express server
      app.listen(PORT, () => {
        console.log(`
          Peer-Tutor Connect Backend Server     
          Running on http://localhost:${PORT}       
          Environment: ${process.env.NODE_ENV || 'development'}             
        `);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\nShutting down gracefully...');
    const { closeConnection } = await import('./database_config/index.js');
    await closeConnection();
    process.exit(0);
  });

  // Start the server
  startServer();
}

export default app;
