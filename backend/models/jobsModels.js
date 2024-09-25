import sql from 'mssql';
import { connectDB } from '../config/db.js';

//Create NEw job in  the database
export const CreateJobs = async(title, department, dutystation, description, requirements, jobtype,status,created_by) => {
    try {
        const pool = await connectDB();
        const query= `
           INSERT INTO Jobs (title, department, dutystation, description, requirements, jobtype,status, created_by)
           VALUES(@title, @department, @dutystation, @description, @requirements, @jobtype,@status ,@created_by)
        `;
        return await pool.request()
           .input('title', sql.VarChar(100),title)
           .input('department', sql.VarChar(1000),department)
           .input('dutystation', sql.VarChar(100),dutystation)
           .input('description', sql.VarChar(1000),description)
           .input('requirements', sql.VarChar(1000),requirements)
           .input('jobtype', sql.VarChar(100),jobtype)
           .input('status', sql.VarChar(100),status)
           .input('created_by', sql.Int(100),created_by)
           .query(query);
           

    } catch (error) {
        console.error('Error creating a jobs', error);
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