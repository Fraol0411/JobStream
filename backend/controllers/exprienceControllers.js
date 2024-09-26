import { createWorkExperience, getWorkExperiencesByApplicationId } from '../models/exprienceModels.js';

// Controller to handle creating a new work experience
export const addWorkExperience = async (req, res) => {
  const experienceData = req.body;
  try {
    const newExperience = await createWorkExperience(experienceData);
    res.status(201).json({ message: 'Work experience added successfully', data: newExperience });
  } catch (error) {
    console.error('Error adding work experience:', error);
    res.status(500).json({ message: 'Server error while adding work experience' });
  }
};

// Controller to handle fetching work experiences by application_id
export const getExperiencesByApplicationId = async (req, res) => {
  const { application_id } = req.params;
  try {
    const experiences = await getWorkExperiencesByApplicationId(application_id);
    res.status(200).json({ data: experiences });
  } catch (error) {
    console.error('Error fetching work experiences:', error);
    res.status(500).json({ message: 'Server error while fetching work experiences' });
  }
};
