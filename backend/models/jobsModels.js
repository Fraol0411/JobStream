import sql from "mssql";
import { connectDB } from "../config/db.js";

//Create NEw job in  the database
//Create NEw job in  the database
export const CreateJobs = async (
  title,
  dutystation,
  description,
  requirements,
  jobtype,
  status,
  created_by,
  salary,
  qualification,
  deadline,
  contact,
  age,
  req_no,
  termof_emp
) => {
  try {
    const pool = await connectDB();
    const query = `
            INSERT INTO Jobs (title, dutystation, description, requirements, jobtype, status, created_by, salary, qualification,  deadline, contact, age, req_no, termof_emp)
            VALUES (@title, @dutystation, @description, @requirements, @jobtype, @status, @created_by, @salary, @qualification,  @deadline, @contact, @age, @req_no, @termof_emp)
        `;

    return await pool
      .request()
      .input("title", sql.VarChar(100), title)

      .input("dutystation", sql.VarChar(100), dutystation)
      .input("description", sql.Text, description) // Use TEXT for larger descriptions
      .input("requirements", sql.Text, requirements) // Use TEXT for larger requirements
      .input("jobtype", sql.VarChar(100), jobtype)
      .input("status", sql.VarChar(10), status) // Adjusted length to 10 to fit active/closed
      .input("created_by", sql.VarChar(255), created_by) // No need for length with INT
      .input("salary", sql.VarChar(200), salary) // Use DECIMAL for salary
      .input("qualification", sql.VarChar(100), qualification) // Adjusted length to 100

      .input("deadline", sql.DateTime, deadline) // Use DATETIME for deadline
      .input("contact", sql.VarChar(100), contact) // Adjusted length to 100

      .input("req_no", sql.Int, req_no) // Adjusted length to 100
      .input("termof_emp", sql.VarChar(255), termof_emp) // Adjusted length to 100
      .input("age", sql.VarChar(255), age) // Adjusted length to 100

      .query(query);
  } catch (error) {
    console.error("Error creating a job", error);
    throw error;
  }
};

// Find all jobs

export const getAllJobs = async () => {
  try {
    const pool = await connectDB();
    const result = await pool.request().query("SELECT * FROM Jobs");
    return result.recordset; // Use recordset to access the rows returned
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Find a user by job-ID
export const getjobwithID = async (job_id) => {
  try {
    const pool = await connectDB();
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id)
      .query("SELECT * FROM Jobs WHERE job_id = @job_id");
    return result.recordset[0]; // Return the job object
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

// // Find a user by job-title
// export const getjobwithNAME = async (title) => {
//   try {
//     const pool = await connectDB(); // Make sure this returns a valid connection
//     const result = await pool.request()
//       .input('title', sql.VarChar, title)
//       .query('SELECT * FROM Jobs WHERE title = @title'); // Ensure 'title' is the correct column name

//     if (result.recordset.length === 0) {
//       console.log('No job found with the given name');
//       return null; // No job found, return null or handle as needed
//     }

//     return result.recordset; // Return the job object if found
//   } catch (error) {
//     console.error('Error fetching job by name:', error);
//     throw error;
//   }
// };

export const getjobwithNAME = async (title) => {
  try {
    const pool = await connectDB(); // Make sure this returns a valid connection
    const result = await pool
      .request()
      .input("title", sql.VarChar, `%${title}%`) // Add wildcards for partial matching
      .query("SELECT * FROM Jobs WHERE title LIKE @title"); // Use LIKE for partial matching

    if (result.recordset.length === 0) {
      console.log("No job found with the given name");
      return null; // No job found, return null or handle as needed
    }

    return result.recordset; // Return the matching job records
  } catch (error) {
    console.error("Error fetching job by name:", error);
    throw error;
  }
};

// Find a user by job-type
export const getjobwithTYPE = async (type) => {
  try {
    const pool = await connectDB(); // Make sure this returns a valid connection
    const result = await pool
      .request()
      .input("type", sql.VarChar, type)
      .query("SELECT * FROM Jobs WHERE jobtype = @type"); // Ensure 'jobtype' is the correct column name

    if (result.recordset.length === 0) {
      console.log("No job found with the given type");
      return []; // Return an empty array instead of null to indicate no jobs found
    }

    return result.recordset; // Return the entire array of job objects if found
  } catch (error) {
    console.error("Error fetching jobs by type:", error);
    throw error;
  }
};

// Update job status by job_id
export const updateJobStatusToClosed = async (job_id) => {
  try {
    const pool = await connectDB(); // Make sure this connects to your DB
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id) // Assuming job_id is an integer
      .input("status", sql.VarChar, "closed") // Set the status to "closed"
      .query("UPDATE Jobs SET status = @status WHERE job_id = @job_id"); // Ensure 'status' and 'job_id' are correct column names

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to closed successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  }
};

// Update job status by job_id
export const updateJobStatusToOpen = async (job_id) => {
  try {
    const pool = await connectDB(); // Make sure this connects to your DB
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id) // Assuming job_id is an integer
      .input("status", sql.VarChar, "active") // Set the status to "closed"
      .query("UPDATE Jobs SET status = @status WHERE job_id = @job_id"); // Ensure 'status' and 'job_id' are correct column names

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to closed successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  }
};
// Update job status by job_id
export const updateJobStatusToRemove = async (job_id) => {
  try {
    const pool = await connectDB(); // Make sure this connects to your DB
    const result = await pool
      .request()
      .input("job_id", sql.Int, job_id) // Assuming job_id is an integer
      .input("status", sql.VarChar, "removed") // Set the status to "closed"
      .query("UPDATE Jobs SET status = @status WHERE job_id = @job_id"); // Ensure 'status' and 'job_id' are correct column names

    // Check if any rows were updated
    if (result.rowsAffected[0] === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to closed successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  }
};

export const reupdateJobsApplicants = async (job_id) => {
  try {
    const pool = await connectDB(); // Connect to the database

    // Start a transaction to ensure both updates happen atomically
    const transaction = new sql.Transaction(pool);
    await transaction.begin();

    try {
      // Update the Jobs table to set the status to 'active'
      const jobUpdateResult = await transaction
        .request()
        .input("job_id", sql.Int, job_id)
        .query("UPDATE Jobs SET status = 'active' WHERE job_id = @job_id");

      // Check if any rows were updated in the Jobs table
      if (jobUpdateResult.rowsAffected[0] === 0) {
        console.log("No job found with the given job_id");
        await transaction.rollback(); // Rollback if no rows were updated
        return false; // Return false to indicate no rows were updated
      }

      await transaction
        .request()
        .input("job_id", sql.Int, job_id)
        .query(
          "UPDATE Applications SET status = 'submitted' WHERE job_id = @job_id AND status <> 'further'"
        );

      await transaction
        .request()
        .input("job_id", sql.Int, job_id)
        .query(
          "UPDATE Applications SET status = 'rejected' WHERE job_id = @job_id AND status = 'further'"
        );

      // Commit the transaction after both updates are successful
      await transaction.commit();
      console.log(
        "Job status updated to active and applications updated to submitted successfully"
      );

      return true; // Return true to indicate success
    } catch (error) {
      // Rollback the transaction in case of any error
      await transaction.rollback();
      console.error("Error during the transaction:", error);
      throw error; // Re-throw error for further handling
    }
  } catch (error) {
    console.error("Error updating job and applications:", error);
    throw error; // Re-throw error for further handling
  }
};
