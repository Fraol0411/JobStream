import express from "express";
import {
  createNewApplication,
  getApplicantDetails,
  getapplicationByid,
  updateApplicationStatus,
} from "../controllers/applicationsControllers.js";
import uploads from "../middlewares/uploads.js";

const router = express.Router();

// router.get('/application/:id',getapplicationByapplicationid)
// router.post('/createnew', uploads, createNewApplication)

// Apply the uploads middleware for handling multiple files
router.post(
  "/createnew",
  uploads.fields([
    { name: "cover_letter", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "handwritten_letter", maxCount: 1 },
  ]),
  createNewApplication
);

// router.get('/:id',getapplicationByid)
router.get("/:jobId", getApplicantDetails);
// router.get('/applicants/:jobId', getApplicantDetails);

// Add a route for updating the application status
router.put("/:application_id/status", updateApplicationStatus);

export default router;
