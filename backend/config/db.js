import sql from "mssql";

const config = {
  user: "sa", // Your database username
  password: "Sql@0411", // Your database password
  server: "localhost", // Your database server
  database: "JobBoardDB", // Your database name
  port: 1433,
  options: {
    encrypt: false, // Use this if you're connecting to Azure
    trustServerCertificate: true, // Change to false in production
  },
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log("Database connected");
    return pool;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Re-throw the error for handling in the calling function
  }
};

// import sql from "mssql";
// import dotenv from "dotenv";

// dotenv.config();

// // Configuration for the database connection
// const config = {
//   user: process.env.DB_USER, // Database username from .env
//   password: process.env.DB_PASSWORD, // Database password from .env
//   server: process.env.DB_SERVER, // Database server from .env
//   database: process.env.DB_NAME, // Database name from .env
//   port: parseInt(process.env.PORT, 10) || 1433, // Port number (fallback to 1433 if not defined)
//   options: {
//     encrypt: false, // Set to true for Azure connections
//     trustServerCertificate: true, // Change to false in production
//   },
// };

// // Function to connect to the database
// export const connectDB = async () => {
//   try {
//     const pool = await sql.connect(config);
//     console.log("Database connected");
//     return pool;
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     throw error; // Re-throw the error for handling in the calling function
//   }
// };
