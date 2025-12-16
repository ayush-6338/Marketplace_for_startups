import express from 'express';
import { signup, login } from '../controllers/authController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

// protected test route
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    message: 'Protected route accessed',
    user: req.user
  });
});

export default router;
