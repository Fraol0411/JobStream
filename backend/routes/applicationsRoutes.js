import express from 'express';
import { createNewApplication, getapplicationByid } from '../controllers/applicationsControllers.js';
import uploads from '../middlewares/uploads.js';


const router = express.Router();

// router.post('/createnew', uploads, createNewApplication)

// Apply the uploads middleware for handling multiple files
router.post('/createnew', uploads.fields([
    { name: 'cover_letter', maxCount: 1 }, 
    { name: 'resume', maxCount: 1 }, 
    { name: 'handwritten_letter', maxCount: 1 }
 ]), createNewApplication);


router.get('/:id',getapplicationByid)

export default router;