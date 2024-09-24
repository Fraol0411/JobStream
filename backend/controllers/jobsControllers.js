import { CreateJobs, getAllJobs } from "../models/jobsModels.js";


// Handle Jobs Creation
export const createNewjob = async(req,res)=>{
    const { title, department, dutystation, description, requirements, jobtype, created_by } = req.body;

    try {
        await CreateJobs(title, department, dutystation, description, requirements, jobtype, created_by);
        res.status(201).json({message: 'new job succefully created'})
    } catch (error) {
        console.error("Error Creating Jobs",error);
        res.status(500).json({message:'server error during creating the job'})
    }
}


// Fetch all jobs

export const getAlljob = async(req,res)=>{
    try {
        await getAllJobs();
        res.status(201).json({message: 'all posted jobs'})
    } catch (error) {
        console.error("Error fetching Jobs",error);
        res.status(500).json({message:'server error during fetching the job'})
    }
}