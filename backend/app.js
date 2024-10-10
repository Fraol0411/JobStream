import express, { application } from 'express'
import authRoutes from './routes/authRoutes.js'; // Default import
import jobsRoutes from './routes/jobsRoutes.js';
import applicationRoutes from './routes/applicationsRoutes.js'
import academicRoutes from './routes/academicRoutes.js'
import exprienceRoutes from './routes/exprienceRoutes.js'
import bodyParser from 'body-parser';
import cors from 'cors';
import multer from 'multer';
import path from 'path'




const app = express();

// Use CORS middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow requests from your frontend






//middlewares
app.use(express.json());
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your React app's URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable credentials if needed
}));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications',applicationRoutes);
app.use('/api/academic',academicRoutes)
app.use('/api/exprience',exprienceRoutes)




export default app;
