import sql from 'mssql';
import { connectDB } from '../config/db.js';

// Create a new application
export const createApplication = async (job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status) => {
    try {
        const pool = await connectDB();
        const query = `
            INSERT INTO Applications 
            (job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status) 
            VALUES 
            (@job_id, @applicant_id, @firstname, @middlename, @lastname, @phone, @email, @cover_letter, @resume, @handwritten_letter, @status);
        `;

        // Executing the query with input parameters
        return await pool.request()
            .input('job_id', sql.Int, job_id)
            .input('applicant_id', sql.Int, applicant_id)
            .input('firstname', sql.VarChar(100), firstname)
            .input('middlename', sql.VarChar(100), middlename)
            .input('lastname', sql.VarChar(100), lastname)
            .input('phone', sql.VarChar(100), phone)
            .input('email', sql.VarChar(100), email)
            .input('cover_letter', sql.VarChar(255), cover_letter)
            .input('resume', sql.VarChar(255), resume)
            .input('handwritten_letter', sql.VarChar(255), handwritten_letter)
            .input('status', sql.VarChar(100), status)
            .query(query);
    } catch (error) {
        console.error('Error creating application:', error);
        throw error;
    }
};


// get application by job id
export const getapplicationwithID = async (job_id)=>{
    try {
      const pool = await connectDB();
      const result = await pool.request()
          .input('job_id', sql.Int, job_id)
          .query('SELECT * FROM Applications WHERE job_id = @job_id');
      return result.recordset; // Return the job object
    } catch (error) {
        console.error('Error fetching application by job_ID:', error);
        throw error;
    }
}