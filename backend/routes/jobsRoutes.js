import express from "express";
import {
  closeJobPosting,
  createNewjob,
  getAlljob,
  getjobByid,
  getjobByname,
  getjobBytype,
  openJobPosting,
  removeJobPosting,
  reupdatejobapplicants,
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
router.put("/remove/:id", removeJobPosting);
router.put("/reupdateapplicants/:id", reupdatejobapplicants);

export default router;
