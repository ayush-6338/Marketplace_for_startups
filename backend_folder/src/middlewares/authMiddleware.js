import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getJwtSecret } from '../config/env.js';
import { logger } from '../utils/logger.js';

export const protect = async (req, res, next) => {
    try {
        const header = req.headers.authorization;

        if (!header || !header.startsWith('Bearer ')) {
            logger.warn('Auth middleware rejected request', {
                requestId: req.requestId,
                path: req.originalUrl,
                reason: 'missing_token',
            });
            return res.status(401).json({ message: 'No token provided' });
        }

        const token = header.split(' ')[1];
        const decoded = jwt.verify(token, getJwtSecret());

        const user = await User.findById(decoded.id).select('-password');

        if (!user) {
            logger.warn('Auth middleware rejected request', {
                requestId: req.requestId,
                path: req.originalUrl,
                userId: decoded.id,
                reason: 'user_not_found',
            });
            return res.status(401).json({ message: 'User not found' });
        }

        if (user.isSuspended) {
            logger.warn('Auth middleware rejected request', {
                requestId: req.requestId,
                path: req.originalUrl,
                userId: user._id,
                reason: 'account_suspended',
            });
            return res.status(403).json({ message: 'Account suspended' });
        }

        req.user = user;
        next();
    } catch (error) {
        logger.warn('Auth middleware rejected request', {
            requestId: req.requestId,
            path: req.originalUrl,
            error: error.message,
            reason: 'invalid_token',
        });
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export default protect;
