import sql from 'mssql';
import { connectDB } from '../config/db.js';

//Create NEw job in  the database
//Create NEw job in  the database
export const CreateJobs = async (
    title,department,dutystation,description,requirements,jobtype,status,created_by,salary,qualification,
    responsibilities,deadline,contact,benefits
) => {
    try {
        const pool = await connectDB();
        const query = `
            INSERT INTO Jobs (title, department, dutystation, description, requirements, jobtype, status, created_by, salary, qualification, responsibilities, deadline, contact, benefits)
            VALUES (@title, @department, @dutystation, @description, @requirements, @jobtype, @status, @created_by, @salary, @qualification, @responsibilities, @deadline, @contact, @benefits)
        `;
        
        return await pool.request()
            .input('title', sql.VarChar(100), title)
            .input('department', sql.VarChar(100), department) // Adjusted length to 100
            .input('dutystation', sql.VarChar(100), dutystation)
            .input('description', sql.Text, description) // Use TEXT for larger descriptions
            .input('requirements', sql.Text, requirements) // Use TEXT for larger requirements
            .input('jobtype', sql.VarChar(100), jobtype)
            .input('status', sql.VarChar(10), status) // Adjusted length to 10 to fit active/closed
            .input('created_by', sql.Int, created_by) // No need for length with INT
            .input('salary', sql.VarChar(200), salary) // Use DECIMAL for salary
            .input('qualification', sql.VarChar(100), qualification) // Adjusted length to 100
            .input('responsibilities', sql.Text, responsibilities) // Use TEXT for larger text
            .input('deadline', sql.DateTime, deadline) // Use DATETIME for deadline
            .input('contact', sql.VarChar(100), contact) // Adjusted length to 100
            .input('benefits', sql.Text, benefits) // Use TEXT for larger text
            .query(query);

    } catch (error) {
        console.error('Error creating a job', error);
        throw error;
    }
}


// Find all jobs

export const getAllJobs = async () => {
    try {
        const pool = await connectDB();
        const result = await pool.request().query('SELECT * FROM Jobs');
        return result.recordset; // Use recordset to access the rows returned
    } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
    }
};


// Find a user by job-ID
export const getjobwithID = async (job_id)=>{
    try {
      const pool = await connectDB();
      const result = await pool.request()
          .input('job_id', sql.Int, job_id)
          .query('SELECT * FROM Jobs WHERE job_id = @job_id');
      return result.recordset[0]; // Return the job object
    } catch (error) {
        console.error('Error fetching job by ID:', error);
        throw error;
    }
}


// Find a user by job-title
export const getjobwithNAME = async (title) => {
  try {
    const pool = await connectDB(); // Make sure this returns a valid connection
    const result = await pool.request()
      .input('title', sql.VarChar, title)
      .query('SELECT * FROM Jobs WHERE title = @title'); // Ensure 'title' is the correct column name

    if (result.recordset.length === 0) {
      console.log('No job found with the given name');
      return null; // No job found, return null or handle as needed
    }

    return result.recordset; // Return the job object if found
  } catch (error) {
    console.error('Error fetching job by name:', error);
    throw error;
  }
};


// Find a user by job-type
export const getjobwithTYPE = async (type) => {
    try {
        const pool = await connectDB(); // Make sure this returns a valid connection
        const result = await pool.request()
            .input('type', sql.VarChar, type)
            .query('SELECT * FROM Jobs WHERE jobtype = @type'); // Ensure 'jobtype' is the correct column name

        if (result.recordset.length === 0) {
            console.log('No job found with the given type');
            return []; // Return an empty array instead of null to indicate no jobs found
        }

        return result.recordset; // Return the entire array of job objects if found
    } catch (error) {
        console.error('Error fetching jobs by type:', error);
        throw error;
    }
};
