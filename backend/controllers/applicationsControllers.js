// import { createApplication, getapplicationwithID } from '../models/applicationsModels.js';

// // Creating new applications
// export const createNewApplication = async (req, res) => {
//     // Destructure required fields from req.body
//     const { job_id, applicant_id, firstname, middlename, lastname, phone, email, status } = req.body;

//     // Access the uploaded files
//     const cover_letter = req.files.cover_letter[0]?.path;  // Path for cover letter
//     const resume = req.files.resume[0]?.path;              // Path for resume
//     const handwritten_letter = req.files.handwritten_letter[0]?.path; // Path for handwritten letter

//     try {
//         await createApplication(
//             job_id,
//             applicant_id,
//             firstname,
//             middlename,
//             lastname,
//             phone,
//             email,
//             cover_letter,
//             resume,
//             handwritten_letter,
//             status
//         );
//         res.status(201).json({ message: 'Application submitted successfully' });
//     } catch (error) {
//         console.error('Error submitting application:', error);
//         res.status(500).json({ message: 'Server error while submitting application' });
//     }
// };

// //get applications with job id
// export const getapplicationByid = async(req,res) =>{
//     const { id } = req.params; // Extract ID from request parameters

//     try {
//         const application = await getapplicationwithID(id); // Call the model function
//         if (!application) {
//             return res.status(404).json({ message: 'applicaion not found' });
//         }
//         res.status(200).json(application); // Return the job object
//     } catch (error) {
//         console.error("Error fetching job:", error);
//         res.status(500).json({ message: 'Server error during fetching the job' });
//     }
// }

////-----------------------------------////

// Creating new applications

import { application } from "express";
import {
  createApplication,
  getApplicantsByJobId,
  getapplicationwithID,
  updateApplicationStatusInDB,
} from "../models/applicationsModels.js";

export const createNewApplication = async (req, res) => {
  const {
    job_id,
    applicant_id,
    firstname,
    middlename,
    lastname,
    phone,
    email,
    status,
    age,
    gender,
  } = req.body;

  console.log("Files received:", req.files);
  console.log("Request body:", req.body);

  // Ensure files are correctly processed with null checks
  const cover_letter = req.files?.cover_letter
    ? req.files.cover_letter[0].path
    : null;
  const resume = req.files?.resume ? req.files.resume[0].path : null;
  const handwritten_letter = req.files?.handwritten_letter
    ? req.files.handwritten_letter[0].path
    : null;

  try {
    // Validate if required fields are present
    if (
      !job_id ||
      !applicant_id ||
      !firstname ||
      !middlename ||
      !lastname ||
      !phone ||
      !email ||
      !age ||
      !gender
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled." });
    }

    console.log("Is there a cover letter");

    // Insert the application into the database and return the new application details
    const application = await createApplication(
      job_id,
      applicant_id,
      firstname,
      middlename,
      lastname,
      phone,
      email,
      cover_letter,
      resume,
      handwritten_letter,
      status,
      age,
      gender
    );

    // Return the newly created application data as response
    res.status(201).json({
      message: "Application submitted successfully",
      application: application, // Send the newly created application details
    });
    console.log(application);
  } catch (error) {
    console.error("Error submitting application:", error);
    res
      .status(500)
      .json({ message: "Server error while submitting application" });
  }
};

// Get applications with job ID
export const getapplicationByid = async (req, res) => {
  const { id } = req.params; // Extract ID from request parameters

  try {
    const application = await getapplicationwithID(id); // Call the model function
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }
    res.status(200).json(application); // Return the application object
  } catch (error) {
    console.error("Error fetching application:", error);
    res
      .status(500)
      .json({ message: "Server error during fetching the application" });
  }
};

// //get applications with job id
// export const getapplicationByapplicationid = async(req,res) =>{
//    const { id } = req.params; // Extract ID from request parameters

//    try {
//        const application = await getapplicationwithAppID(id); // Call the model function
//        if (!application) {
//            return res.status(404).json({ message: 'applicaion not found' });
//        }
//        res.status(200).json(application); // Return the job object
//    } catch (error) {
//        console.error("Error fetching job:", error);
//        res.status(500).json({ message: 'Server error during fetching the job' });
//    }
// }

// Controller for updating application status
export const updateApplicationStatus = async (req, res) => {
  const { application_id } = req.params; // Extract application ID from request parameters
  const { status } = req.body; // Extract status from the request body

  try {
    // Validate if the status is provided
    if (!status) {
      return res.status(400).json({ message: "Status is required." });
    }

    // Update the application status in the database
    const updatedApplication = await updateApplicationStatusInDB(
      application_id,
      status
    );

    console.log("here ??", updatedApplication);
    // If the application is not found
    if (!updatedApplication) {
      return res.status(404).json({ message: "Application not found." });
    }

    // Send success response with the updated application details
    res.status(200).json({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res
      .status(500)
      .json({ message: "Server error while updating application status" });
  }
};

// controller for executing stored procedure
export const getApplicantDetails = async (req, res) => {
  const { jobId } = req.params; // Extract jobId from URL parameter

  try {
    const applicants = await getApplicantsByJobId(jobId);
    if (!applicants || applicants.length === 0) {
      return res
        .status(404)
        .json({ message: "No applicants found for this job" });
    }
    // Return the applicants' data as JSON
    res.json(applicants);
  } catch (error) {
    console.error("Error fetching applicants:", error);
    res.status(500).json({ message: "Error fetching applicants" });
  }
};
