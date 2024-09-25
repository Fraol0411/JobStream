import express from 'express';
import { createNewjob, getAlljob, getjobByid } from '../controllers/jobsControllers.js';


const router = express.Router();

router.post('/createjobs', createNewjob);
router.get('/alljobs', getAlljob);
router.get('/:id', getjobByid);

export default router;