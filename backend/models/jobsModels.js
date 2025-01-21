import { connectDB } from "../config/pgdb.js";

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
    const pool = await connectDB(); // Ensure this returns a PostgreSQL `pg.Pool` instance
    const query = `
      INSERT INTO Jobs (
        title, dutystation, description, requirements, jobtype, status,
        created_by, salary, qualification, deadline, contact, age, req_no, termof_emp
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12, $13, $14
      ) RETURNING *;
    `;

    const values = [
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
      termof_emp,
    ];

    const result = await pool.query(query, values);

    return result.rows[0]; // Return the newly created job
  } catch (error) {
    console.error("Error creating a job:", error);
    throw error;
  }
};

export const getAllJobs = async () => {
  try {
    const pool = await connectDB();
    console.log("Database connected successfully.");

    const query = "SELECT * FROM Jobs";
    const result = await pool.query(query);

    console.log("Query executed successfully:", result);
    console.log("Jobs list:", result.rows); // Log rows to verify content

    return result.rows; // Return the rows
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

// Find a user by job-ID
export const getjobwithID = async (job_id) => {
  try {
    const pool = await connectDB(); // Ensure connectDB returns a PostgreSQL Pool instance

    const query = "SELECT * FROM Jobs WHERE job_id = $1"; // Use parameterized query
    const values = [job_id]; // Parameterized values

    const result = await pool.query(query, values); // PostgreSQL's query method
    return result.rows[0]; // Return the first job object (or undefined if not found)
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
    const pool = await connectDB(); // Ensure this returns a valid PostgreSQL connection
    const query = "SELECT * FROM Jobs WHERE title ILIKE $1"; // Use ILIKE for case-insensitive partial matching
    const values = [`%${title}%`]; // Add wildcards for partial matching

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No job found with the given name");
      return null; // No job found, return null or handle as needed
    }

    return result.rows; // Return the matching job records
  } catch (error) {
    console.error("Error fetching job by name:", error);
    throw error;
  }
};

// Find a user by job-type
export const getjobwithTYPE = async (type) => {
  try {
    const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
    const query = "SELECT * FROM Jobs WHERE jobtype = $1"; // Parameterized query to prevent SQL injection
    const values = [type]; // Parameters for the query

    const result = await pool.query(query, values);

    if (result.rows.length === 0) {
      console.log("No job found with the given type");
      return []; // Return an empty array to indicate no matching jobs
    }

    return result.rows; // Return all matching job objects
  } catch (error) {
    console.error("Error fetching jobs by type:", error);
    throw error;
  }
};

// Update job status by job_id
export const updateJobStatusToClosed = async (job_id) => {
  try {
    const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
    const query = "UPDATE Jobs SET status = $1 WHERE job_id = $2 RETURNING *"; // Parameterized query to update job status
    const values = ["closed", job_id]; // Parameters for the query

    const result = await pool.query(query, values);

    // Check if any rows were updated
    if (result.rowCount === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to closed successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  } finally {
    pool.end(); // Close the pool when you're done
  }
};

// Update job status by job_id
export const updateJobStatusToOpen = async (job_id) => {
  try {
    const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
    const query = "UPDATE Jobs SET status = $1 WHERE job_id = $2 RETURNING *"; // Parameterized query to update job status
    const values = ["active", job_id]; // Parameters for the query

    const result = await pool.query(query, values);

    // Check if any rows were updated
    if (result.rowCount === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to active successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  } finally {
    pool.end(); // Close the pool when you're done
  }
};

// Update job status by job_id
export const updateJobStatusToRemove = async (job_id) => {
  try {
    const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
    const query = "UPDATE Jobs SET status = $1 WHERE job_id = $2 RETURNING *"; // Parameterized query to update job status
    const values = ["removed", job_id]; // Parameters for the query

    const result = await pool.query(query, values);

    // Check if any rows were updated
    if (result.rowCount === 0) {
      console.log("No job found with the given job_id");
      return false; // Return false to indicate no rows were updated
    }

    console.log("Job status updated to removed successfully");
    return true; // Return true to indicate success
  } catch (error) {
    console.error("Error updating job status:", error);
    throw error; // Re-throw error for further handling
  } finally {
    pool.end(); // Close the pool when you're done
  }
};

export const reupdateJobsApplicants = async (job_id) => {
  const pool = await connectDB(); // Ensure this establishes a valid PostgreSQL connection
  const client = await pool.connect(); // Get a client from the pool

  try {
    // Start a transaction
    await client.query("BEGIN");

    // Update the Jobs table to set the status to 'active'
    const jobUpdateResult = await client.query(
      "UPDATE Jobs SET status = $1 WHERE job_id = $2 RETURNING *",
      ["active", job_id]
    );

    // Check if any rows were updated in the Jobs table
    if (jobUpdateResult.rowCount === 0) {
      console.log("No job found with the given job_id");
      await client.query("ROLLBACK"); // Rollback if no rows were updated
      return false; // Return false to indicate no rows were updated
    }

    // Update the Applications table to set status to 'submitted' for rejected applicants
    await client.query(
      "UPDATE Applications SET status = $1 WHERE job_id = $2 AND status = $3",
      ["submitted", job_id, "rejected"]
    );

    // Commit the transaction after both updates are successful
    await client.query("COMMIT");
    console.log(
      "Job status updated to active and applications updated to submitted successfully"
    );
    return true; // Return true to indicate success
  } catch (error) {
    // Rollback the transaction in case of any error
    await client.query("ROLLBACK");
    console.error("Error during the transaction:", error);
    throw error; // Re-throw error for further handling
  } finally {
    client.release(); // Release the client back to the pool
  }
};
