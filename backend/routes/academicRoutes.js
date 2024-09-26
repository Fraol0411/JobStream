import express from 'express';
import { createAcademicEntry, getAcademicBackground } from '../controllers/academicControllers.js';

const router = express.Router();

// Route to create a new academic background entry
router.post('/', createAcademicEntry);

// Route to get academic background by application_id
router.get('/:application_id', getAcademicBackground);

export default router;
