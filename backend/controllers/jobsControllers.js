import {
  CreateJobs,
  getAllJobs,
  getjobwithID,
  getjobwithNAME,
  getjobwithTYPE,
  reupdateJobsApplicants,
  updateJobStatusToClosed,
  updateJobStatusToOpen,
  updateJobStatusToRemove,
} from "../models/jobsModels.js";

// Handle Jobs Creation
export const createNewjob = async (req, res) => {
  const {
    title,
    dutystation,
    description,
    requirements,
    jobtype,
    status,
    created_by,
    salary,
    qualification,
    deadline,
    contact,
    age,
    req_no,
    termof_emp,
  } = req.body;

  try {
    await CreateJobs(
      title,
      dutystation,
      description,
      requirements,
      jobtype,
      status,
      created_by,
      salary,
      qualification,
      deadline,
      contact,
      age,
      req_no,
      termof_emp
    );
    res.status(201).json({ message: "New job successfully created" });
  } catch (error) {
    console.error("Error Creating Jobs", error);
    res.status(500).json({ message: "Server error during creating the job" });
  }
};

// Fetch all jobs
export const getAlljob = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    console.log("Fetched jobs:", jobs); // Log the fetched jobs
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching Jobs", error);
    res.status(500).json({ message: "server error during fetching the job" });
  }
};

//Fetch Specific Jobs with their job ID
export const getjobByid = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const job = await getjobwithID(id); // Call the model function
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job); // Return the job object
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error during fetching the job" });
  }
};

//Fetch Specific Jobs with their job NAME
export const getjobByname = async (req, res) => {
  const { title } = req.params; // Extract ID from request parameters
  console.log("titilee", title);
  try {
    const job = await getjobwithNAME(title); // Call the model function
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job); // Return the job object
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error during fetching the job" });
  }
};

//Fetch Specific Jobs with their job TYPE
export const getjobBytype = async (req, res) => {
  const { type } = req.params; // Extract ID from request parameters
  console.log("type", type);
  try {
    const job = await getjobwithTYPE(type); // Call the model function
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json(job); // Return the job object
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ message: "Server error during fetching the job" });
  }
};

//update controller
export const closeJobPosting = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Call the model function to update the job status
    const success = await updateJobStatusToClosed(id);

    if (success) {
      res
        .status(200)
        .json({ message: "Job status updated to closed successfully." });
    } else {
      res.status(404).json({ message: "No job found with the given job_id." });
    }
  } catch (error) {
    console.error("Error in closeJobPosting controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//open controller
export const openJobPosting = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Call the model function to update the job status
    const success = await updateJobStatusToOpen(id);

    if (success) {
      res
        .status(200)
        .json({ message: "Job status updated to closed successfully." });
    } else {
      res.status(404).json({ message: "No job found with the given job_id." });
    }
  } catch (error) {
    console.error("Error in closeJobPosting controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const removeJobPosting = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Call the model function to update the job status
    const success = await updateJobStatusToRemove(id);

    if (success) {
      res
        .status(200)
        .json({ message: "Job status updated to closed successfully." });
    } else {
      res.status(404).json({ message: "No job found with the given job_id." });
    }
  } catch (error) {
    console.error("Error in closeJobPosting controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export const reupdatejobapplicants = async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    // Call the model function to update the job status
    const success = await reupdateJobsApplicants(id);

    if (success) {
      res
        .status(200)
        .json({ message: "Job status updated to closed successfully." });
    } else {
      res.status(404).json({ message: "No job found with the given job_id." });
    }
  } catch (error) {
    console.error("Error in closeJobPosting controller:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
