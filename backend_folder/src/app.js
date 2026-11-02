import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validateEnv } from './config/env.js';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import startupRoutes from './routes/startupRoutes.js';
import gigRoutes from './routes/gigRoutes.js';
import proposalRoutes from './routes/proposalRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import { logger } from './utils/logger.js';

validateEnv();

const app = express();

// Middlewares
app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Rate limiter (anti misuse)
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use((req, res, next) => {
  req.requestId = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
  logger.info('Request received', {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
  });
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/startups', startupRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/proposals', proposalRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Backend is running (ES Modules)',
  });
});

const PORT = process.env.PORT || 4000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    logger.info('Backend running', { port: PORT });
  });
};

startServer();
