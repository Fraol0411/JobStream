import express from "express";
import {
  addFieldOfStudy,
  addHighestLevel,
  addInstitution,
  createAcademicEntry,
  getAcademicBackground,
  getFieldofStudy,
  getFieldofStudy0,
  getHighestlevel,
  getHighestlevel0,
  getInstitution,
  getInstitution0,
  updateFieldValueNew,
  updateInstitutionNew,
  updateLevelValueNew,
} from "../controllers/academicControllers.js";

const router = express.Router();

// Route to create a new academic background entry
router.post("/", createAcademicEntry);

// Route to get academic background by application_id
router.get("/:application_id", getAcademicBackground);

// fetch highestlevelof edication
router.get("/highest/level", getHighestlevel);
router.get("/highest0/level", getHighestlevel0);

// fetch highestlevelof edication
router.get("/institution/type", getInstitution);
router.get("/institution0/type", getInstitution0);

// fetch highestlevelof edication
router.get("/field/study", getFieldofStudy);
router.get("/field0/study", getFieldofStudy0);

// insert highestlevelof edication
router.post("/highest/level", addHighestLevel);

// insert highestlevelof edication
router.post("/institution/type", addInstitution);

// insert highestlevelof edication
router.post("/field/study", addFieldOfStudy);

//post
router.put("/updatefield/:id", updateFieldValueNew);
router.put("/updatelevel/:id", updateLevelValueNew);
router.put("/updateinstitution/:id", updateInstitutionNew);

export default router;
