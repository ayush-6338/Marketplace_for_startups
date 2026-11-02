import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env'), quiet: true });

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];

export const validateEnv = () => {
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    logger.error('Missing required environment variables', {
      missingVars,
    });
    process.exit(1);
  }
};

export const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }

  return process.env.JWT_SECRET;
};
