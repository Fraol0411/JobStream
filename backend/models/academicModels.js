import sql from "mssql";
import { connectDB } from "../config/db.js";

// Create a new academic background entry
export const createAcademic = async (
  application_id,
  highestlevel,
  university,
  cgpa,
  completed_year,
  field
) => {
  const pool = await connectDB();
  const query = `
    INSERT INTO AcademicBackground (application_id, highestlevel, university, cgpa, completed_year, field)
    VALUES (@application_id, @highestlevel, @university, @cgpa, @completed_year, @field);
  `;
  return pool
    .request()
    .input("application_id", sql.Int, application_id)
    .input("highestlevel", sql.VarChar(100), highestlevel)
    .input("university", sql.VarChar(100), university)
    .input("cgpa", sql.Decimal(4, 2), cgpa) // Change made here for floating-point values
    .input("completed_year", sql.Int, completed_year)
    .input("field", sql.VarChar(100), field)
    .query(query);
};
// Retrieve academic background by application_id
export const getAcademicByApplicationId = async (application_id) => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM AcademicBackground WHERE application_id = @application_id;
  `;
  const result = await pool
    .request()
    .input("application_id", sql.Int, application_id)
    .query(query);

  return result.recordset;
};

// Retrieve academic background by application_id
export const getHIghestlevelofeducation = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM level_of_education where status = 1;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

export const getHIghestlevelofeducation0 = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM level_of_education where status = 0;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

// Retrieve academic background by application_id
export const getInstitutionplace = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM institutions where status = 1;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

export const getInstitutionplace0 = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM institutions where status = 0;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

// Retrieve academic background by application_id
export const getFieldofStudystudied = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM fields_of_study where status = 1;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

export const getFieldofStudystudied0 = async () => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM fields_of_study where status = 0;
  `;
  const result = await pool.request().query(query);

  return result.recordset;
};

// Insert new highest level of education
export const addHighestLevelOfEducation = async (level) => {
  const pool = await connectDB();
  const query = `
    INSERT INTO level_of_education (level)
    VALUES (@level);
  `;
  const result = await pool.request().input("level", level).query(query);

  return result.rowsAffected[0] > 0; // Returns true if insertion was successful
};

// Insert new institution
export const addnewInstitution = async (institutionName, institutionType) => {
  console.log("Institution Name:", institutionName, "Type:", institutionType);
  const pool = await connectDB();

  const query = `
    INSERT INTO institutions (institution_name, type)
    VALUES (@institution_name, @type);
  `;

  const result = await pool
    .request()
    .input("institution_name", institutionName)
    .input("type", institutionType)
    .query(query);

  return result.rowsAffected[0] > 0; // Returns true if insertion was successful
};

// Insert new field of study
export const addnewFieldOfStudy = async (fieldName) => {
  const pool = await connectDB();
  const query = `
    INSERT INTO fields_of_study (field)
    VALUES (@field);
  `;
  const result = await pool.request().input("field", fieldName).query(query);

  return result.rowsAffected[0] > 0; // Returns true if insertion was successful
};

// update after validation value gotten

export const updateFieldValue = async (id, value) => {
  try {
    const pool = await connectDB(); // Ensure this connects to your DB

    // Base query
    let query = "UPDATE fields_of_study SET status = 1";

    // Add the field update part only if value is not null
    if (value !== null && value !== undefined) {
      query += ", field = @value";
    }

    query += " WHERE id = @id"; // Add the WHERE clause

    const request = pool.request().input("id", sql.Int, id); // Always include the id

    // Add the value input only if value is not null
    if (value !== null && value !== undefined) {
      request.input("value", sql.VarChar, value);
    }

    const result = await request.query(query);

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No record found with the given id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Record updated successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  }
};

export const updateLevelValue = async (id, value) => {
  try {
    const pool = await connectDB(); // Ensure this connects to your DB

    // Base query
    let query = "UPDATE level_of_education SET status = 1";

    // Add the field update part only if value is not null
    if (value !== null && value !== undefined) {
      query += ", level = @value";
    }

    query += " WHERE id = @id"; // Add the WHERE clause

    const request = pool.request().input("id", sql.Int, id); // Always include the id

    // Add the value input only if value is not null
    if (value !== null && value !== undefined) {
      request.input("value", sql.VarChar, value);
    }

    const result = await request.query(query);

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No record found with the given id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Record updated successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  }
};

export const updateInstitutionValue = async (id, value, value2) => {
  try {
    const pool = await connectDB(); // Ensure this connects to your DB

    // Base query
    let query = "UPDATE institutions SET status = 1"; // Always set status to 1

    // Add the institution_name update part only if value is not null
    if (value !== null && value !== undefined) {
      query += ", institution_name = @value";
    }

    // Add the type update part only if value2 is not null
    if (value2 !== null && value2 !== undefined) {
      query += ", type = @value2";
    }

    query += " WHERE id = @id"; // Add the WHERE clause

    const request = pool.request().input("id", sql.Int, id); // Always include the id

    // Add the value input only if value is not null
    if (value !== null && value !== undefined) {
      request.input("value", sql.VarChar, value); // Add value for institution_name
    }

    // Add the value2 input only if value2 is not null
    if (value2 !== null && value2 !== undefined) {
      request.input("value2", sql.VarChar, value2); // Add value2 for type
    }

    const result = await request.query(query);

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No record found with the given id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Record updated successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  }
};
