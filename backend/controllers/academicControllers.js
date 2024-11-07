import {
  addHighestLevelOfEducation,
  addnewFieldOfStudy,
  addnewInstitution,
  createAcademic,
  getAcademicByApplicationId,
  getFieldofStudystudied,
  getHIghestlevelofeducation,
  getInstitutionplace,
} from "../models/academicModels.js";

// Handle creating a new academic background
export const createAcademicEntry = async (req, res) => {
  const {
    application_id,
    highestlevel,
    university,
    cgpa,
    completed_year,
    field,
  } = req.body;

  try {
    await createAcademic(
      application_id,
      highestlevel,
      university,
      cgpa,
      completed_year,
      field
    );
    res
      .status(201)
      .json({ message: "Academic background created successfully" });
  } catch (error) {
    console.error("Error creating academic background:", error);
    res
      .status(500)
      .json({ message: "Server error while creating academic background" });
  }
};

// Handle fetching academic background by application_id
export const getAcademicBackground = async (req, res) => {
  const { application_id } = req.params;

  try {
    const academicBackground = await getAcademicByApplicationId(application_id);
    if (academicBackground.length === 0) {
      return res.status(404).json({
        message: "No academic background found for this application ID",
      });
    }
    res.status(200).json(academicBackground);
  } catch (error) {
    console.error("Error fetching academic background:", error);
    res
      .status(500)
      .json({ message: "Server error while fetching academic background" });
  }
};

//getall highest level of education
export const getHighestlevel = async (req, res) => {
  try {
    const highestlevel = await getHIghestlevelofeducation();
    res.status(200).json(highestlevel);
    console.log(highestlevel);
  } catch (error) {
    res.status(500).json({ message: "server errror while fetching" });
  }
};

//getall institution
export const getInstitution = async (req, res) => {
  try {
    const highestlevel = await getInstitutionplace();
    res.status(200).json(highestlevel);
    console.log(highestlevel);
  } catch (error) {
    res.status(500).json({ message: "server errror while fetching" });
  }
};

//getall field of study
export const getFieldofStudy = async (req, res) => {
  try {
    const highestlevel = await getFieldofStudystudied();
    res.status(200).json(highestlevel);
    console.log(highestlevel);
  } catch (error) {
    res.status(500).json({ message: "server errror while fetching" });
  }
};

// Insert new highest level of education
export const addHighestLevel = async (req, res) => {
  try {
    const { level } = req.body; // Expecting the new level of education in the request body
    const result = await addHighestLevelOfEducation(level);
    if (result) {
      res
        .status(201)
        .json({ message: "Highest level of education added successfully." });
    } else {
      res
        .status(400)
        .json({ message: "Failed to add highest level of education." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Server error while adding highest level of education.",
    });
  }
};

// Insert new institution
export const addInstitution = async (req, res) => {
  try {
    const { institutionName, institutionType } = req.body; // Expecting both institution name and type in the request body
    console.log("Institution Name:", institutionName, "Type:", institutionType);

    const result = await addnewInstitution(institutionName, institutionType);

    if (result) {
      res.status(201).json({ message: "Institution added successfully." });
    } else {
      res.status(400).json({ message: "Failed to add institution." });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error while adding institution." });
  }
};

// Insert new field of study
export const addFieldOfStudy = async (req, res) => {
  try {
    const { fieldName } = req.body; // Expecting the field of study in the request body
    console.log(fieldName);
    const result = await addnewFieldOfStudy(fieldName);
    if (result) {
      res.status(201).json({ message: "Field of study added successfully." });
    } else {
      res.status(400).json({ message: "Failed to add field of study." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while adding field of study." });
  }
};
