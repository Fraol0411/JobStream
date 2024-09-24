import express from 'express';
import { register, login } from '../controllers/authControllers.js'; // Ensure the path is correct

const router = express.Router();

// Routers
router.post('/register', register);
router.post('/login', login);

export default router;
