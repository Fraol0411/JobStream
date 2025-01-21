import { connectDB } from "../config/pgdb.js";

// Register a new user in the database
export const registerUser = async (
  username,
  email,
  hashedPassword,
  role,
  applyfor
) => {
  try {
    const pool = await connectDB(); // Get the database connection pool

    console.log("Registering user with values:", {
      username,
      email,
      hashedPassword,
      role,
      applyfor,
    });

    const query = `
      INSERT INTO Users (username, email, password, role, applyfor)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const values = [username, email, hashedPassword, role, applyfor];

    // Execute the query using the pool
    const result = await pool.query(query, values);
    console.log("User registered successfully:", result.rows[0]);
    return result.rows[0]; // Return the newly registered user
  } catch (error) {
    console.error("Error registering user:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// Find a user by email
export const findUserByEmail = async (email) => {
  try {
    const pool = await connectDB(); // Get the database connection pool

    const query = "SELECT * FROM Users WHERE email = $1;";
    const values = [email];

    // Execute the query using the pool
    const result = await pool.query(query, values);

    console.log("User found:", result.rows[0]);
    return result.rows[0]; // Return the first user found, or undefined if no user is found
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw error; // Re-throw the error after logging it
  }
};
