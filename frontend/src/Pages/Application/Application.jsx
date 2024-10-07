import React, { useState } from 'react';
import styles from './Application.module.scss';
import Succespop from '../../Component/Succespop/Succespop';


export default function Application() {


  // suscesful popup page
  const [showPopup, setShowPopup] = useState(false);

  const handleViewDetailClick = () => {
    setShowPopup(true); // Show the popup when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when close is clicked
  };


  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,

  });

  const [workexperience, setWorkexperience] = useState({
    workExperiences: [
      { company: '', position: '', from: '', to: '' },
    ],
  })

  const [academy, setAcademy] = useState({
    academicBackground: [
      { university: '', completedYear: '', certificate: '' },
    ],
  })

    // Temporary state for the current work experience
    const [currentExperience, setCurrentExperience] = useState({
      company: '',
      position: '',
      from: '',
      to: '',
    });
      // Temporary state for the current academic background
    const [currentAcademic, setCurrentAcademic] = useState({
      university: '',
      completedYear: '',
      certificate: '',
    });




  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  const handleFileChangeCoverletter = (e) => {
    setFormData({ ...formData, coverLetter: e.target.files[0] });
  };




// Handle current work experience change
const handleExperienceChange = (e) => {
  const { name, value } = e.target;
  setCurrentExperience({ ...currentExperience, [name]: value });
};

// Add the current work experience to the list and reset the fields
const addWorkExperience = () => {
  setWorkexperience({
    ...workexperience,
    workExperiences: [...formData.workExperiences, currentExperience],
  });
  // Clear the current experience fields
  setCurrentExperience({ company: '', position: '', from: '', to: '' });
};




  // Handle current academic background change
  const handleAcademicChange = (e) => {
    const { name, value } = e.target;
    setCurrentAcademic({ ...currentAcademic, [name]: value });
  };

  // Add the current academic background to the list and reset the fields
  const addAcademicBackground = () => {
    setAcademy({
      ...academy,
      academicBackground: [...formData.academicBackground, currentAcademic],
    });
    // Clear the current academic fields
    setCurrentAcademic({ university: '', completedYear: '', certificate: '' });
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application Submitted:', formData);
  };



  //consoling the result
  console.log(formData)
  return (
    <div className={styles.applicationContainer}>
      <h1>Job Application</h1>
      <form className={styles.applicationForm} onSubmit={handleSubmit}>
        {/* Personal Information */}
        <fieldset className={styles.fieldset}>
          <legend>Personal Information</legend>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
        </fieldset>




            {/* Academic Background */}
        <fieldset className={styles.fieldset}>
          <legend>Academic Background</legend>
          <div className={styles.formGroup}>
            <label htmlFor="university">University</label>
            <input
              type="text"
              id="university"
              name="university"
              value={currentAcademic.university}
              onChange={handleAcademicChange}
              required
            />

            <label htmlFor="completedYear">Completed Year</label>
            <input
              type="number"
              id="completedYear"
              name="completedYear"
              value={currentAcademic.completedYear}
              onChange={handleAcademicChange}
              required
            />

            <label htmlFor="certificate">Certificate</label>
            <input
              type="text"
              id="certificate"
              name="certificate"
              value={currentAcademic.certificate}
              onChange={handleAcademicChange}
              required
            />
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={addAcademicBackground}
          >
            Add Academic Background
          </button>
        </fieldset>

        {/* Previous Academic Background */}
        {academy.academicBackground.length > 0 && (
          <fieldset className={styles.fieldset}>
            <legend>Previous Academic Background</legend>
            {academy.academicBackground.map((acad, index) => (
              <div key={index} className={styles.previousAcademic}>
                <p>
                  <strong>University:</strong> {acad.university}
                </p>
                <p>
                  <strong>Completed Year:</strong> {acad.completedYear}
                </p>
                <p>
                  <strong>Certificate:</strong> {acad.certificate}
                </p>
              </div>
            ))}
          </fieldset>
        )}




    {/* Work Experience */}
    <fieldset className={styles.fieldset}>
          <legend>Work Experience</legend>
          <div className={styles.formGroup}>
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={currentExperience.company}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={currentExperience.position}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="from">From</label>
            <input
              type="month"
              id="from"
              name="from"
              value={currentExperience.from}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="to">To</label>
            <input
              type="month"
              id="to"
              name="to"
              value={currentExperience.to}
              onChange={handleExperienceChange}
              required
            />
          </div>
          <button
            type="button"
            className={styles.addButton}
            onClick={addWorkExperience}
          >
            Add Experience
          </button>
        </fieldset>

        {/* Previous Work Experience */}
        {workexperience.workExperiences.length > 0 && (
          <fieldset className={styles.fieldset}>
            <legend>Previous Work Experiences</legend>
            {workexperience.workExperiences.map((exp, index) => (
              <div key={index} className={styles.previousExperience}>
                <p>
                  <strong>Company:</strong> {exp.company}
                </p>
                <p>
                  <strong>Position:</strong> {exp.position}
                </p>
                <p>
                  <strong>From:</strong> {exp.from}
                </p>
                <p>
                  <strong>To:</strong> {exp.to}
                </p>
              </div>
            ))}
          </fieldset>
        )}



        {/* Resume and Cover Letter */}
        <fieldset className={styles.fieldset}>
          <legend>Resume and Cover Letter</legend>
          <div className={styles.formGroup}>
            <label htmlFor="resume">Upload Resume (PDF or DOC)</label>
            <input
              type="file"
              id="resume"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="resume">Upload Cover letter (PDF or DOC)</label>
            <input
              type="file"
              id="coverletter"
              name="coverletter"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChangeCoverletter}
              required
            />
          </div>
        </fieldset>
 
      </form>
      {/* Submit Button */}
      <button onClick={handleViewDetailClick} className={styles.submitButton} type="submit">Submit Application</button>

      {showPopup && <Succespop onClose={handleClosePopup} />}
    </div>
  );
}
