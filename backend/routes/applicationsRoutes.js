import express from 'express';
import { createNewApplication, getapplicationByid } from '../controllers/applicationsControllers.js';


const router = express.Router();

router.post('/createnew',createNewApplication)
router.get('/:id',getapplicationByid)

export default router;