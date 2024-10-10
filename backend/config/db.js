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
