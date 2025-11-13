/**
 * Routes Index
 * Binds all route modules to the Express app
 */

import authRoutes from './auth.js';
import coursesRoutes from './courses.js';
import questionsRoutes from './questions.js';
import responsesRoutes from './responses.js';
import notificationsRoutes from './notifications.js';

/**
 * Configures all routes for the application
 * @param {Express} app - Express application instance
 */
const configureRoutes = (app) => {
  // API routes
  app.use('/api/auth', authRoutes);
  app.use('/api/courses', coursesRoutes);
  app.use('/api/questions', questionsRoutes);
  app.use('/api/responses', responsesRoutes);
  app.use('/api/notifications', notificationsRoutes);
};

export default configureRoutes;
