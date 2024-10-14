import express from 'express';
import { createNewjob, getAlljob, getjobByid, getjobByname, getjobBytype } from '../controllers/jobsControllers.js';


const router = express.Router();

router.post('/createjobs', createNewjob);
router.get('/alljobs', getAlljob);
router.get('/:id', getjobByid);
router.get('/byname/:title', getjobByname);
router.get('/withtype/:type', getjobBytype);

export default router;