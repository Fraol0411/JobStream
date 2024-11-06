import express, { application } from "express";
import authRoutes from "./routes/authRoutes.js"; // Default import
import jobsRoutes from "./routes/jobsRoutes.js";
import applicationRoutes from "./routes/applicationsRoutes.js";
import academicRoutes from "./routes/academicRoutes.js";
import exprienceRoutes from "./routes/exprienceRoutes.js";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import path from "path";
import corsMiddleware from "./middlewares/cors.js";

import { fileURLToPath } from "url";

const app = express();

// Use the CORS middleware
app.use(corsMiddleware);

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "")));

//middlewares
app.use(express.json());
app.use(bodyParser.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/academic", academicRoutes);
app.use("/api/exprience", exprienceRoutes);

export default app;
