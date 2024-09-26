import sql from 'mssql';
import { connectDB } from '../config/db.js';

// Create a new work experience entry
export const createWorkExperience = async (experienceData) => {
  const { application_id, company, position, from_date, to_date } = experienceData;
  const pool = await connectDB();
  const query = `
    INSERT INTO WorkExperiences (application_id, company, position, from_date, to_date)
    VALUES (@application_id, @company, @position, @from_date, @to_date)
  `;
  const result = await pool.request()
    .input('application_id', sql.Int, application_id)
    .input('company', sql.VarChar(100), company)
    .input('position', sql.VarChar(100), position)
    .input('from_date', sql.Date, from_date)
    .input('to_date', sql.Date, to_date)
    .query(query);

  return result.recordset;
};

// Get all work experiences by application_id
export const getWorkExperiencesByApplicationId = async (application_id) => {
  const pool = await connectDB();
  const query = `SELECT * FROM WorkExperiences WHERE application_id = @application_id`;
  const result = await pool.request()
    .input('application_id', sql.Int, application_id)
    .query(query);

  return result.recordset;
};
