import express from 'express';
import { createNewjob, getAlljob } from '../controllers/jobsControllers.js';


const router = express.Router();

router.post('/createjobs', createNewjob);
router.get('/jobs', getAlljob);

export default router;