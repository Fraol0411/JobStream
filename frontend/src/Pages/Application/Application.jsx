import React, { useState } from 'react';
import styles from './Application.module.scss';


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
    linkedin: '',
    website: '',
    experienceLevel: '',
    workAuthorization: '',
    workExperiences: [
      { company: '', position: '', from: '', to: '' },
    ],
    academicBackground: [
      { university: '', completedYear: '', certificate: '' },
    ],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleWorkExperienceChange = (index, e) => {
    const updatedWorkExperiences = formData.workExperiences.map((exp, i) =>
      i === index ? { ...exp, [e.target.name]: e.target.value } : exp
    );
    setFormData({ ...formData, workExperiences: updatedWorkExperiences });
  };

  const addWorkExperience = () => {
    setFormData({
      ...formData,
      workExperiences: [...formData.workExperiences, { company: '', position: '', from: '', to: '' }],
    });
  };

  const handleAcademicChange = (index, e) => {
    const updatedAcademicBackground = formData.academicBackground.map((edu, i) =>
      i === index ? { ...edu, [e.target.name]: e.target.value } : edu
    );
    setFormData({ ...formData, academicBackground: updatedAcademicBackground });
  };

  const addAcademicEntry = () => {
    setFormData({
      ...formData,
      academicBackground: [...formData.academicBackground, { university: '', completedYear: '', certificate: '' }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Application Submitted:', formData);
  };

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
          {formData.academicBackground.map((education, index) => (
            <div key={index} className={styles.formGroup}>
              
              <label htmlFor={`highestlevel-${index}`}>Certificate</label>
              <select name="" id="">
                   <option value="">Bsc</option>
                   <option value="">Msc</option>
                   <option value="">Phd</option>
              </select>

              <label htmlFor={`university-${index}`}>University</label>
              <input
                type="text"
                id={`university-${index}`}
                name="university"
                value={education.university}
                onChange={(e) => handleAcademicChange(index, e)}
                required
              />

              <label htmlFor={`completedYear-${index}`}>Year Completed</label>
              <input
                type="number"
                id={`completedYear-${index}`}
                name="completedYear"
                value={education.completedYear}
                onChange={(e) => handleAcademicChange(index, e)}
                required
              />

            </div>
          ))}

        </fieldset>

        {/* Work Experience */}
        <fieldset className={styles.fieldset}>
          <legend>Work Experience</legend>
          {formData.workExperiences.map((experience, index) => (
            <div key={index} className={styles.formGroup}>
              <label htmlFor={`company-${index}`}>Company Name</label>
              <input
                type="text"
                id={`company-${index}`}
                name="company"
                value={experience.company}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
              
              <label htmlFor={`position-${index}`}>Position</label>
              <input
                type="text"
                id={`position-${index}`}
                name="position"
                value={experience.position}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />

              <label htmlFor={`from-${index}`}>From</label>
              <input
                type="month"
                id={`from-${index}`}
                name="from"
                value={experience.from}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />

              <label htmlFor={`to-${index}`}>To</label>
              <input
                type="month"
                id={`to-${index}`}
                name="to"
                value={experience.to}
                onChange={(e) => handleWorkExperienceChange(index, e)}
                required
              />
            </div>
          ))}
          <button type="button" className={styles.addButton} onClick={addWorkExperience}>Add More Experience</button>
        </fieldset>

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
              id="resume"
              name="resume"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChange}
              required
            />
          </div>
        </fieldset>
 
      </form>
      {/* Submit Button */}
      <button className={styles.submitButton} type="submit">Submit Application</button>

      {showPopup && <Succespop onClose={handleClosePopup} />}
    </div>
  );
}
