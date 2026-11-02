import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { getJwtSecret } from '../config/env.js';
import { logger } from '../utils/logger.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, getJwtSecret(), {
    expiresIn: '7d'
  });
};

const allowedRoles = ['startup', 'freelancer', 'client'];

const sanitizeEmail = (email = '') => email.trim().toLowerCase();

const toPublicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
});

// SIGNUP
export const signup = async (req, res) => {
  const requestId = req.requestId;

  try {
    const name = req.body?.name?.trim();
    const email = sanitizeEmail(req.body?.email);
    const password = req.body?.password;
    const role = req.body?.role || 'client';

    logger.info('Signup attempt', { requestId, email, role });

    if (!name || !email || !password) {
      logger.warn('Signup validation failed', { requestId, email, reason: 'missing_fields' });
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (password.length < 6) {
      logger.warn('Signup validation failed', { requestId, email, reason: 'short_password' });
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (!allowedRoles.includes(role)) {
      logger.warn('Signup validation failed', { requestId, email, role, reason: 'invalid_role' });
      return res.status(400).json({ message: 'Invalid account role' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      logger.warn('Signup blocked for existing email', { requestId, email });
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role
    });

    const token = generateToken(user._id);

    logger.info('Signup successful', { requestId, userId: user._id, email, role: user.role });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) {
      logger.warn('Signup blocked by duplicate key', { requestId, keyPattern: error.keyPattern });
      return res.status(409).json({ message: 'Email already registered' });
    }

    logger.error('Signup failed', {
      requestId,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Signup failed. Please try again later.' });
  }
};

// LOGIN
export const login = async (req, res) => {
  const requestId = req.requestId;

  try {
    const email = sanitizeEmail(req.body?.email);
    const password = req.body?.password;

    logger.info('Login attempt', { requestId, email });

    if (!email || !password) {
      logger.warn('Login validation failed', { requestId, email, reason: 'missing_fields' });
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      logger.warn('Login failed', { requestId, email, reason: 'user_not_found' });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.isSuspended) {
      logger.warn('Login blocked for suspended account', { requestId, userId: user._id, email });
      return res.status(403).json({ message: 'Your account has been suspended' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      logger.warn('Login failed', { requestId, userId: user._id, email, reason: 'password_mismatch' });
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    logger.info('Login successful', { requestId, userId: user._id, email });

    res.json({
      message: 'Login successful',
      token,
      user: toPublicUser(user),
    });
  } catch (error) {
    logger.error('Login failed', {
      requestId,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
};
// GET ME
export const getMe = async (req, res) => {
  const requestId = req.requestId;

  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      logger.warn('Get current user failed', { requestId, userId: req.user.id, reason: 'user_not_found' });
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    logger.error('Get current user failed', {
      requestId,
      userId: req.user?.id,
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

