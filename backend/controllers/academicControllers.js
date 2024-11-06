import {
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

//getall highest level of education
export const getInstitution = async (req, res) => {
  try {
    const highestlevel = await getInstitutionplace();
    res.status(200).json(highestlevel);
    console.log(highestlevel);
  } catch (error) {
    res.status(500).json({ message: "server errror while fetching" });
  }
};

//getall highest level of education
export const getFieldofStudy = async (req, res) => {
  try {
    const highestlevel = await getFieldofStudystudied();
    res.status(200).json(highestlevel);
    console.log(highestlevel);
  } catch (error) {
    res.status(500).json({ message: "server errror while fetching" });
  }
};
