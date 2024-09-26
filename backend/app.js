import express, { application } from 'express'
import authRoutes from './routes/authRoutes.js'; // Default import
import jobsRoutes from './routes/jobsRoutes.js';
import applicationRoutes from './routes/applicationsRoutes.js'
import academicRoutes from './routes/academicRoutes.js'
import exprienceRoutes from './routes/exprienceRoutes.js'
import bodyParser from 'body-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications',applicationRoutes);
app.use('/api/academic',academicRoutes)
app.use('/api/exprience',exprienceRoutes)


export default app;
