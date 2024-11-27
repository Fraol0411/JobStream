import {
  addHighestLevelOfEducation,
  addnewFieldOfStudy,
  addnewInstitution,
  createAcademic,
  getAcademicByApplicationId,
  getFieldofStudystudied,
  getFieldofStudystudied0,
  getHIghestlevelofeducation,
  getHIghestlevelofeducation0,
  getInstitutionplace,
  getInstitutionplace0,
  updateFieldValue,
  updateInstitutionValue,
  updateLevelValue,
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

export const getHighestlevel0 = async (req, res) => {
  try {
    const highestlevel = await getHIghestlevelofeducation0();
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

export const getInstitution0 = async (req, res) => {
  try {
    const highestlevel = await getInstitutionplace0();
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

export const getFieldofStudy0 = async (req, res) => {
  try {
    const highestlevel = await getFieldofStudystudied0();
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

// for update part
export const updateFieldValueNew = async (req, res) => {
  const { id } = req.params; // Extract 'id' from route parameters
  const { value } = req.body; // Extract 'value' from the request body

  try {
    // Call the model function to update the field and status
    const success = await updateFieldValue(id, value);

    if (success) {
      res.status(200).json({
        message: "Field and status updated successfully.",
      });
    } else {
      res.status(404).json({
        message: "No record found with the given id.",
      });
    }
  } catch (error) {
    console.error("Error in updateFieldValueNew controller:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const updateLevelValueNew = async (req, res) => {
  const { id } = req.params; // Extract 'id' from route parameters
  const { value } = req.body; // Extract 'value' from the request body

  try {
    // Call the model function to update the field and status
    const success = await updateLevelValue(id, value);

    if (success) {
      res.status(200).json({
        message: "Field and status updated successfully.",
      });
    } else {
      res.status(404).json({
        message: "No record found with the given id.",
      });
    }
  } catch (error) {
    console.error("Error in updateFieldValueNew controller:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};

export const updateInstitutionNew = async (req, res) => {
  const { id, value, value2 } = req.body;

  try {
    // Call the model function to update the field and status
    const success = await updateInstitutionValue(id, value, value2);

    if (success) {
      res.status(200).json({
        message: "Field and status updated successfully.",
      });
    } else {
      res.status(404).json({
        message: "No record found with the given id.",
      });
    }
  } catch (error) {
    console.error("Error in updateFieldValueNew controller:", error);
    res.status(500).json({
      message: "Internal server error.",
    });
  }
};
