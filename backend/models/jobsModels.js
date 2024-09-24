import sql from 'mssql';
import { connectDB } from '../config/db.js';

//Create NEw job in  the database
export const CreateJobs = async(title, department, dutystation, description, requirements, jobtype, created_by) => {
    try {
        const pool = await connectDB();
        const query= `
           INSERT INTO Jobs (title, department, dutystation, description, requirements, jobtype, created_by)
           VALUES(@title, @department, @dutystation, @description, @requirements, @jobtype, @created_by)
        `;
        return await pool.request()
           .input('title', sql.VarChar(100),title)
           .input('department', sql.VarChar(1000),department)
           .input('dutystation', sql.VarChar(100),dutystation)
           .input('description', sql.VarChar(1000),description)
           .input('requirements', sql.VarChar(1000),requirements)
           .input('jobtype', sql.VarChar(100),jobtype)
           .input('created_by', sql.VarChar(100),created_by)
           .query(query);
           console.log(title)

    } catch (error) {
        console.error('Error creating a jobs', error);
        throw error;
    }
}


// Find all jobs