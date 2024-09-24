// import sql from 'mssql';  // Default import from CommonJS module

// const config = {
//     user: 'sa',
//     password: 'Sql@0411',
//     server: 'localhost', // Replace with your server name
//     database: 'JobBoardDB',
//     port: 1433,
//     options: {
//         encrypt: false, // Use encryption if needed
//         enableArithAbort: true // Helps to manage certain arithmetic errors
//     }
// };

// export const connectDB = async () => {
//     try {
//         await sql.connect(config);
//         console.log('Connected to SQL Database');
//     } catch (error) {
//         console.error('Database connection failed:', error);
//         process.exit(1);
//     }
// };


import sql from 'mssql';

const config = {
  user: 'sa',      // Your database username
  password: 'Sql@0411',   // Your database password
  server: 'localhost',         // Your database server
  database: 'JobBoardDB',        // Your database name
  port:1433,
  options: {
    encrypt: false,             // Use this if you're connecting to Azure
    trustServerCertificate: true // Change to false in production
  }
};

export const connectDB = async () => {
  try {
    const pool = await sql.connect(config);
    console.log('Database connected');
    return pool;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error; // Re-throw the error for handling in the calling function
  }
};
