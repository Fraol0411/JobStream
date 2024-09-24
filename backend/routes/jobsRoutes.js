import express from 'express';
import { createNewjob } from '../controllers/jobsControllers.js';


const router = express.Router();

router.post('/createjobs', createNewjob);

export default router;