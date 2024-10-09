import sql from 'mssql';
import { connectDB } from '../config/db.js';

// Create a new academic background entry
export const createAcademic = async (application_id, highestlevel, university, cgpa, completed_year,field) => {
  const pool = await connectDB();
  const query = `
    INSERT INTO AcademicBackground (application_id, highestlevel, university,  cgpa,  completed_year,field)
    VALUES (@application_id, @highestlevel, @university, @cgpa, @completed_year,@field);
  `;
  return pool.request()
    .input('application_id', sql.Int, application_id)
    .input('highestlevel', sql.VarChar(100), highestlevel)
    .input('university', sql.VarChar(100), university)
    .input('cgpa', sql.Int, cgpa)
    .input('completed_year', sql.Int, completed_year)
    .input('field', sql.VarChar(100), field)
    .query(query);
};

// Retrieve academic background by application_id
export const getAcademicByApplicationId = async (application_id) => {
  const pool = await connectDB();
  const query = `
    SELECT * FROM AcademicBackground WHERE application_id = @application_id;
  `;
  const result = await pool.request()
    .input('application_id', sql.Int, application_id)
    .query(query);

  return result.recordset;
};
