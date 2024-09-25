import { createApplication, getapplicationwithID } from '../models/applicationsModels.js';


// creating new applications
export const createNewApplication = async (req, res) => {
    const { job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status } = req.body;

    try {
        await createApplication(job_id, applicant_id, firstname, middlename, lastname, phone, email, cover_letter, resume, handwritten_letter, status);
        res.status(201).json({ message: 'Application submitted successfully' });
    } catch (error) {
        console.error('Error submitting application:', error);
        res.status(500).json({ message: 'Server error while submitting application' });
    }
};



//get applications with job id
export const getapplicationByid = async(req,res) =>{
    const { id } = req.params; // Extract ID from request parameters

    try {
        const application = await getapplicationwithID(id); // Call the model function
        if (!application) {
            return res.status(404).json({ message: 'applicaion not found' });
        }
        res.status(200).json(application); // Return the job object
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ message: 'Server error during fetching the job' });
    }
}
