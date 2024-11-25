import sql from "mssql";
import { connectDB } from "../config/db.js";

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
  try {
    const pool = await connectDB();
    const query = `
            INSERT INTO Applications 
            (job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status,age,gender) 
            OUTPUT INSERTED.*
            VALUES 
            (@job_id, @applicant_id, @firstname, @middlename, @lastname, @phone, @email, @cover_letter, @resume, @handwritten_letter, @status,@age,@gender);
        `;

    // Executing the query with input parameters and returning the inserted record
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id)
      .input("applicant_id", sql.Int, applicant_id)
      .input("firstname", sql.VarChar(100), firstname)
      .input("middlename", sql.VarChar(100), middlename)
      .input("lastname", sql.VarChar(100), lastname)
      .input("phone", sql.VarChar(100), phone)
      .input("email", sql.VarChar(100), email)
      .input("cover_letter", sql.VarChar(255), cover_letter)
      .input("resume", sql.VarChar(255), resume)
      .input("handwritten_letter", sql.VarChar(255), handwritten_letter)
      .input("status", sql.VarChar(100), status)
      .input("age", sql.Int, age)
      .input("gender", sql.VarChar(255), gender)
      .query(query);

    // Return the newly inserted application
    return result.recordset[0]; // Return the first record from the inserted row
  } catch (error) {
    console.error("Error creating application:", error);
    throw error;
  }
};

// get application by job id
export const getapplicationwithID = async (job_id) => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id)
      .query("SELECT * FROM Applications WHERE job_id = @job_id");
    return result.recordset; // Return the job object
  } catch (error) {
    console.error("Error fetching application by job_ID:", error);
    throw error;
  }
};

// Function to update application status in the database
export const updateApplicationStatusInDB = async (application_id, status) => {
  try {
    const pool = await connectDB();

    const query = `
            UPDATE Applications
            SET status = @status
            OUTPUT INSERTED.*
            WHERE application_id = @application_id;
        `;

    console.log(application_id, status);
    // Execute the update query and return the updated record
    const result = await pool
      .request()
      .input("application_id", sql.Int, application_id)
      .input("status", sql.VarChar(100), status)
      .query(query);

    // Return the updated application
    console.log("here result", result);
    return result.recordset[0]; // Return the first record from the updated row
  } catch (error) {
    console.error("Error updating application status:", error);
    throw error;
  }
};

// Function to execute the stored procedure
export const getApplicantsByJobId = async (jobId) => {
  try {
    const pool = await connectDB();

    const query = `
      EXEC dbo.GetApplicantDetailsByJobId @JobId = @jobId;
    `;

    // Execute the query and return the result
    const result = await pool
      .request()
      .input("jobId", sql.Int, jobId)
      .query(query);

    // Return the applicants' details
    return result.recordset; // Assuming it returns an array of applicants' data
  } catch (error) {
    console.error("Error fetching applicants:", error);
    throw error;
  }
};
