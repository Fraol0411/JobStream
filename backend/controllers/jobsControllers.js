import { CreateJobs, getAllJobs, getjobwithID } from "../models/jobsModels.js";



// Handle Jobs Creation
export const createNewjob = async(req,res)=>{
    const { title, department, dutystation, description, requirements, jobtype,status, created_by } = req.body;

    try {
        await CreateJobs(title, department, dutystation, description, requirements, jobtype,status, created_by);
        res.status(201).json({message: 'new job succefully created'})
    } catch (error) {
        console.error("Error Creating Jobs",error);
        res.status(500).json({message:'server error during creating the job'})
    }
}


// Fetch all jobs
export const getAlljob = async (req, res) => {
    try {
        const jobs = await getAllJobs();
        console.log('Fetched jobs:', jobs); // Log the fetched jobs
        res.status(200).json(jobs);
    } catch (error) {
        console.error("Error fetching Jobs", error);
        res.status(500).json({ message: 'server error during fetching the job' });
    }
};

//Fetch Specific Jobs with their job ID
export const getjobByid = async(req,res) =>{
    const { id } = req.params; // Extract ID from request parameters

    try {
        const job = await getjobwithID(id); // Call the model function
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        res.status(200).json(job); // Return the job object
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: 'Server error during fetching the job' });
    }
}
