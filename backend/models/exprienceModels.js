import sql from "mssql";
import { connectDB } from "../config/pgdb.js";

// Create a new work experience entry
// Insert a new work experience entry
export const createWorkExperience = async (experienceData) => {
  const { application_id, company, position, from_date, to_date } =
    experienceData;

  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query to insert a new work experience
    const query = `
      INSERT INTO WorkExperiences (application_id, company, position, from_date, to_date)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    // Execute the query with the provided data
    const result = await client.query(query, [
      application_id,
      company,
      position,
      from_date,
      to_date,
    ]);

    // Return the inserted row
    return result.rows[0]; // Return the inserted work experience
  } catch (error) {
    console.error("Error creating work experience:", error);
    throw error; // Re-throw the error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Get all work experiences by application_id
export const getWorkExperiencesByApplicationId = async (application_id) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query to retrieve work experiences by application_id
    const query = `
      SELECT * FROM WorkExperiences WHERE application_id = $1;
    `;

    // Execute the query with the provided application_id
    const result = await client.query(query, [application_id]);

    // Return the work experiences data
    return result.rows; // Return an array of rows
  } catch (error) {
    console.error("Error fetching work experiences by application_id:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};
