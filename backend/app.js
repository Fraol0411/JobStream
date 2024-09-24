import express from 'express'
import authRoutes from './routes/authRoutes.js'; // Default import
import bodyParser from 'body-parser';

const app = express();

//middlewares
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobsRoutes);

export default app;
