import express from "express";
import {
  closeJobPosting,
  createNewjob,
  getAlljob,
  getjobByid,
  getjobByname,
  getjobBytype,
  openJobPosting,
} from "../controllers/jobsControllers.js";

const router = express.Router();

router.post("/createjobs", createNewjob);
router.get("/alljobs", getAlljob);
router.get("/:id", getjobByid);
router.get("/byname/:title", getjobByname);
router.get("/withtype/:type", getjobBytype);

// Update a job by ID
router.put("/update/:id", closeJobPosting);
router.put("/reupdate/:id", openJobPosting);

export default router;
