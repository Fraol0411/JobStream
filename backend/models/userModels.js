import sql from 'mssql';
import { connectDB } from '../config/db.js';

// Register a new user in the database
export const registerUser = async (username,hashedPassword, email, role, applyfor) => {
  try {
    const pool = await connectDB();
    const query = `
      INSERT INTO Users (username, email, password, role, applyfor)
      VALUES (@username, @password, @email, @role, @applyfor);
    `;
    
    return await pool.request()
      .input('username', sql.VarChar(50), username)
      .input('password', sql.VarChar(255), hashedPassword)
      .input('email', sql.VarChar(100), email)
      .input('role', sql.VarChar(10), role)
      .input('applyfor', sql.VarChar(100), applyfor)
      .query(query);
  } catch (error) {
    console.error('Error registering user:', error);
    throw error; // Re-throw the error after logging it
  }
};

// Find a user by email
export const findUserByEmail = async (email) => {
  console.log(email)
  const pool = await connectDB();
  const query = 'SELECT * FROM Users WHERE email = @Email';
  const result = await pool.request()
    .input('Email', sql.VarChar(100), email)
    .query(query);
  return result.recordset[0];
};
