import sql from "mssql";
import { connectDB } from "../config/pgdb.js";

export const createApplication = async (
  job_id,
  applicant_id,
  firstname,
  middlename,
  lastname,
  phone,
  email,
  cover_letter,
  resume,
  handwritten_letter,
  status,
  age,
  gender
) => {
  const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query with parameterized values
    const query = `
      INSERT INTO Applications 
      (job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status, age, gender) 
      VALUES 
      ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) 
      RETURNING *;`;

    // Execute the query with parameters
    const result = await client.query(query, [
      job_id,
      applicant_id,
      firstname,
      middlename,
      lastname,
      phone,
      email,
      cover_letter,
      resume,
      handwritten_letter,
      status,
      age,
      gender,
    ]);

    // Return the newly inserted application
    return result.rows[0]; // Return the first record from the inserted row
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// get application by job id
export const getapplicationwithID = async (job_id) => {
  const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query with parameterized value
    const query = "SELECT * FROM Applications WHERE job_id = $1";

    // Execute the query with the job_id parameter
    const result = await client.query(query, [job_id]);

    // Return the result rows (applications for the given job_id)
    return result.rows;
  } catch (error) {
    console.error("Error fetching application by job_ID:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to update application status in the database
export const updateApplicationStatusInDB = async (application_id, status) => {
  const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Define the query with parameterized values
    const query = `
      UPDATE Applications
      SET status = $1
      WHERE application_id = $2
      RETURNING *; 
    `;

    console.log(application_id, status);

    // Execute the query with the parameters for application_id and status
    const result = await client.query(query, [status, application_id]);

    // Return the updated application
    console.log("Updated application:", result.rows[0]);
    return result.rows[0]; // Return the first record from the updated row
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  } finally {
    client.release(); // Release the client back to the pool
  }
};

// Function to execute the stored procedure
export const getApplicantsByJobId = async (jobId) => {
  const pool = await connectDB(); // Ensure a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Execute the query to fetch data from the stored procedure
    const query = `
      SELECT * FROM GetApplicantDetailsByJobId($1); -- Assuming the procedure is adjusted to return results
    `;

    // Execute the query and pass the jobId as a parameter
    const result = await client.query(query, [jobId]);

    // Return the applicants' details
    return result.rows; // Returns an array of applicants' data
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};
