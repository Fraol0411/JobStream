import pg from "pg";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const { Pool } = pg;

console.log("Database config:", {
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT, // Change this to a number if it's used for PostgreSQL (e.g., 5432)
};

const pool = new Pool(config);

export const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected");
    client.release();
    return pool;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
