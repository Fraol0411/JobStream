import sql from "mssql";
import { connectDB } from "../config/pgdb.js";

export const createAcademic = async (
  application_id,
  highestlevel,
  university,
  cgpa,
  completed_year,
  field
) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query to insert the academic background data
    const query = `
      INSERT INTO AcademicBackground (application_id, highestlevel, university, cgpa, completed_year, field)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    // Execute the query with the provided values
    const result = await client.query(query, [
      application_id,
      highestlevel,
      university,
      cgpa,
      completed_year,
      field,
    ]);

    // Return the inserted academic background entry
    return result.rows[0]; // Return the inserted row
  } catch (error) {
    console.error("Error creating academic background entry:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export const getAcademicByApplicationId = async (application_id) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query to retrieve academic background by application_id
    const query = `
      SELECT * FROM AcademicBackground WHERE application_id = $1;
    `;

    // Execute the query with the provided application_id
    const result = await client.query(query, [application_id]);

    // Return the academic background data
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error(
      "Error fetching academic background by application_id:",
      error
    );
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve highest level of education where status = 1
export const getHIghestlevelofeducation = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM level_of_education WHERE status = $1;
    `;

    const result = await client.query(query, [1]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching highest level of education:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve highest level of education where status = 0
export const getHIghestlevelofeducation0 = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM level_of_education WHERE status = $1;
    `;

    const result = await client.query(query, [0]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error(
      "Error fetching highest level of education (status 0):",
      error
    );
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve institutions where status = 1
export const getInstitutionplace = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM institutions WHERE status = $1;
    `;

    const result = await client.query(query, [1]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching institution place:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve institutions where status = 0
export const getInstitutionplace0 = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM institutions WHERE status = $1;
    `;

    const result = await client.query(query, [0]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching institution place (status 0):", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve fields of study where status = 1
export const getFieldofStudystudied = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM fields_of_study WHERE status = $1;
    `;

    const result = await client.query(query, [1]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching field of study:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Retrieve fields of study where status = 0
export const getFieldofStudystudied0 = async () => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      SELECT * FROM fields_of_study WHERE status = $1;
    `;

    const result = await client.query(query, [0]);
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching field of study (status 0):", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Insert new highest level of education
export const addHighestLevelOfEducation = async (level) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      INSERT INTO level_of_education (level)
      VALUES ($1);
    `;
    const result = await client.query(query, [level]);

    return result.rowCount > 0; // Returns true if insertion was successful
  } catch (error) {
    console.error("Error adding highest level of education:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export const addnewInstitution = async (institutionName, institutionType) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    console.log("Inserting:", { institutionName, institutionType }); // Debug inputs

    const query = `
      INSERT INTO institutions (institution_name, type)
      VALUES ($1, $2)
      RETURNING *; -- Optional: Return the inserted row for confirmation
    `;

    const result = await client.query(query, [
      institutionName,
      institutionType,
    ]);
    console.log("Insert result:", result.rows); // Debug result

    return result.rowCount > 0; // Returns true if insertion was successful
  } catch (error) {
    console.error("Error adding new institution:", error.message, error.stack);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Insert new field of study
export const addnewFieldOfStudy = async (fieldName) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    const query = `
      INSERT INTO fields_of_study (field)
      VALUES ($1);
    `;
    const result = await client.query(query, [fieldName]);

    return result.rowCount > 0; // Returns true if insertion was successful
  } catch (error) {
    console.error("Error adding new field of study:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Update a field value in the fields_of_study table
export const updateFieldValue = async (id, value) => {
  const client = await connectDB(); // Ensure a valid PostgreSQL connection

  try {
    let query = "UPDATE fields_of_study SET status = 1"; // Set status to 1

    // Add field update part if value is provided
    if (value !== null && value !== undefined) {
      query += ", field = $1"; // Use $1 for parameterized query
    }

    query += " WHERE id = $2"; // Ensure the update applies to the specific record

    // Execute the query using the provided parameters
    const result = await client.query(query, [value, id]);

    if (result.rowCount === 0) {
      console.log("No record found with the given id");
      return false; // No update occurred
    }

    console.log("Record updated successfully");
    return true; // Update successful
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

export const updateLevelValue = async (id, value) => {
  const client = await connectDB(); // Ensure a valid PostgreSQL connection

  try {
    let query = "UPDATE level_of_education SET status = 1"; // Set status to 1

    // Add level update part if value is provided
    if (value !== null && value !== undefined) {
      query += ", level = $1"; // Use $1 for parameterized query
    }

    query += " WHERE id = $2"; // Ensure the update applies to the specific record

    // Execute the query using the provided parameters
    const result = await client.query(query, [value, id]);

    if (result.rowCount === 0) {
      console.log("No record found with the given id");
      return false; // No update occurred
    }

    console.log("Record updated successfully");
    return true; // Update successful
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Update an institution's value in the institutions table
export const updateInstitutionValue = async (id, value, value2) => {
  const client = await connectDB(); // Get a PostgreSQL client

  try {
    let query = "UPDATE institutions SET status = 1"; // Set status to 1

    // Add institution_name update part if value is provided
    if (value !== null && value !== undefined) {
      query += ", institution_name = $1"; // Use $1 for parameterized query
    }

    // Add type update part if value2 is provided
    if (value2 !== null && value2 !== undefined) {
      query += ", type = $2"; // Use $2 for parameterized query
    }

    query += " WHERE id = $3"; // Ensure the update applies to the specific record

    // Execute the query using the provided parameters
    const result = await client.query(query, [value, value2, id]);

    if (result.rowCount === 0) {
      console.log("No record found with the given id");
      return false; // No update occurred
    }

    console.log("Record updated successfully");
    return true; // Update successful
  } catch (error) {
    console.error("Error updating record:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};
