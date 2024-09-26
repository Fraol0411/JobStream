import express from 'express';
import { addWorkExperience, getExperiencesByApplicationId } from '../controllers/exprienceControllers.js';

const router = express.Router();

// Route to add a new work experience
router.post('/', addWorkExperience);

// Route to get all work experiences by application ID
router.get('/:application_id', getExperiencesByApplicationId);

export default router;
