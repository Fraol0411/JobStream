import express, { application } from 'express'
import authRoutes from './routes/authRoutes.js'; // Default import
import jobsRoutes from './routes/jobsRoutes.js';
import applicationRoutes from './routes/applicationsRoutes.js'
import bodyParser from 'body-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);
app.use('/api/applications',applicationRoutes);


export default app;
