import express from "express";
import {
  createAcademicEntry,
  getAcademicBackground,
  getFieldofStudy,
  getHighestlevel,
  getInstitution,
} from "../controllers/academicControllers.js";

const router = express.Router();

// Route to create a new academic background entry
router.post("/", createAcademicEntry);

// Route to get academic background by application_id
router.get("/:application_id", getAcademicBackground);

// fetch highestlevelof edication
router.get("/highest/level", getHighestlevel);

// fetch highestlevelof edication
router.get("/institution/type", getInstitution);

// fetch highestlevelof edication
router.get("/field/study", getFieldofStudy);

export default router;
