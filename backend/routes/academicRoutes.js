import express from "express";
import {
  addFieldOfStudy,
  addHighestLevel,
  addInstitution,
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

// insert highestlevelof edication
router.post("/highest/level", addHighestLevel);

// insert highestlevelof edication
router.post("/institution/type", addInstitution);

// insert highestlevelof edication
router.post("/field/study", addFieldOfStudy);

export default router;
