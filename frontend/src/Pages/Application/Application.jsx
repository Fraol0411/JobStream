import React, { useState } from 'react';
import styles from './Application.module.scss';
import Succespop from '../../Component/Succespop/Succespop'
import { useNavigate, useParams } from 'react-router-dom';

// function to handle application api
const submitApplication = async(formData) =>{

  const response = await fetch('http://localhost:5000/api/applications/createnew', {
       method:'POST',
       headers: {
        'Content-Type':'application/json',
       },

       body: JSON.stringify(formData),
  });
  console.log(formData)
  if(!response.ok){
    throw new Error('submitting failed')
  }
  return response.json();
};

// function to handle application api
const submitAcademic = async (academy) => {
  console.log('academy api',academy.completedYear)
  const response = await fetch('http://localhost:5000/api/academic/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(academy),
  });

  if (!response.ok) {
    throw new Error('Submitting academic background failed');
  }
  return response.json();
};

// function to handle application api
const submitExprience= async(workexperience) =>{

  const response = await fetch('http://localhost:5000/api/exprience', {
       method:'POST',
       headers: {
        'Content-Type':'application/json',
       },

       body: JSON.stringify(workexperience),
  });

  if(!response.ok){
    throw new Error('submitting failed')
  }
  return response.json();
};




export default function Application() {
   const navigate = useNavigate()


     // Get the id from the URL
  const { id } = useParams();


  // suscesful popup page
  const [showPopup, setShowPopup] = useState(false);

  const handleViewDetailClick = () => {
    submitApplication();
    setShowPopup(true); // Show the popup when button is clicked
  };

  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when close is clicked
    navigate('/joblist')
  };


  const [formData, setFormData] = useState({
    job_id:id,
    applicant_id:4011,
    firstname: '',
    middlename:'',
    lastname: '',
    phone: '',
    email: '',
    cover_letter: 'null',
    resume: 'null',
    handwritten_letter:'null',
    status:'submitted'

  });



  const [workexperience, setWorkexperience] = useState({
      application_id:1004,
      company: null,
      position: '',
      from: '',
      to: '',
  })

  const [academy, setAcademy] = useState({
    applicantion_id:1004,
    highestlevel: '',
    university: '',
    completed_year: 2022,
    cgpa: '',
    field: '',
    certificate: '',
  })


    // Handler for academic background changes
    const handleAcademicChange = (e) => {
      const { name, value } = e.target;
      setAcademy((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  
    // Handler for work experience changes
    const handleExperienceChange = (e) => {
      const { name, value } = e.target;
      setWorkexperience((prev) => ({
        ...prev,
        [name]: value,
      }));
    };






    // Temporary state for the current work experience
    const [currentExperience, setCurrentExperience] = useState({
      company: null,
      position: '',
      from: '',
      to: '',
    });
      // Temporary state for the current academic background
  const [currentAcademic, setCurrentAcademic] = useState({
    highestlevel: '',
    university: '',
    completedYear: '',
    cgpa: '',
    field: '',

  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };
  const handleFileChangeCoverletter = (e) => {
    setFormData({ ...formData, cover_letter: e.target.files[0] });
  };

  const handleFileChangeHandwritten = (e) =>{
    setFormData({...formData, handwritten_letter: e.target.files[0]})
  }




// // Handle current work experience change
// const handleExperienceChange = (e) => {
//   const { name, value } = e.target;
//   setCurrentExperience({ ...currentExperience, [name]: value });
// };

// Add the current work experience to the list and reset the fields
const addWorkExperience = () => {
  setWorkexperience({
    ...workexperience,
    workExperiences: [...workexperience.workExperiences, currentExperience],
  });
  // Clear the current experience fields
  submitExprience();
  setCurrentExperience({ company: '', position: '', from: '', to: '' });
};




  // // Handle current academic background change
  // const handleAcademicChange = (e) => {
  //   const { name, value } = e.target;
  //   setCurrentAcademic({ ...currentAcademic, [name]: value });

  // };

  // Add the current academic background to the list and reset the fields
  const addAcademicBackground = () => {
    // setAcademy({
    //   ...academy,
    //   academicBackground: [...academy.academicBackground, currentAcademic],
    // });
    // Clear the current academic fields

    submitAcademic(academy);
    setCurrentAcademic({ university: '', completedYear: '', certificate: '' });
  };



  const handleSubmit = (e) => {
    e.preventDefault(); // prevent the default form submission behavior
  
    // Call submitApplication with formData
    submitApplication(formData)
      .then(() => {
        // Show the success popup on successful submission
        
      })
      .catch((error) => {
        console.error('Error submitting the application:', error);
      });
  };


  const handlePopup = (e) =>{
    setShowPopup(true);
  }


  return (
    <div className={styles.applicationContainer}>
      <h1>Job Application</h1>
      <form className={styles.applicationForm}>
        Personal Information
        {/* <fieldset className={styles.fieldset}>
          <legend>Personal Information</legend>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="middlename">Middle Name</label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              value={formData.middlename}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
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


        {/* Resume and Cover Letter */}
        {/* <fieldset className={styles.fieldset}>
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

          <div className={styles.formGroup}>
            <label htmlFor="handwritten">Upload Handwritten (PDF or DOC)</label>
            <input
              type="file"
              id="handwritten"
              name="handwritten"
              accept=".pdf, .doc, .docx"
              onChange={handleFileChangeHandwritten}
              required
            />
          </div>


         <button  className={styles.submitButton} onClick={handleSubmit} type="submit">Add Personal Details</button>

        </fieldset>  */}




            {/* Academic Background */}
            <fieldset className={styles.fieldset}>
              <legend>Academic Background</legend>
              <div className={styles.formGroup}>
                
                <label htmlFor="highestlevel">Highest Level of Education</label>
                <select
                  id="highestlevel"
                  name="highestlevel"
                  value={academy.highestlevel}
                  onChange={handleAcademicChange}
                  required
                >
                  <option value="">Select</option>
                  <option value="BSC">BSC</option>
                  <option value="MSC">MSC</option>
                  <option value="PHD">PHD</option>
                  <option value="Other">Other</option>
                </select>

                <label htmlFor="university">University</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  value={academy.university}
                  onChange={handleAcademicChange}
                  required
                />

                <label htmlFor="completedYear">Completed Year</label>
                <input
                  type="number"
                  id="completedYear"
                  name="completedYear"
                  value={academy.completedYear}
                  onChange={handleAcademicChange}
                  required
                />

                <label htmlFor="cgpa">CGPA</label>
                <input
                  type="number"
                  step="0.01"
                  id="cgpa"
                  name="cgpa"
                  value={academy.cgpa}
                  onChange={handleAcademicChange}
                  required
                />

                <label htmlFor="field">Field of Study</label>
                <input
                  type="text"
                  id="field"
                  name="field"
                  value={academy.field}
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
        {/* {academy.academicBackground.filter(acad => acad.university || acad.completedYear || acad.certificate).length > 0 && (
            <fieldset className={styles.fieldset}>
              <legend>Previous Academic Background</legend>
              {academy.academicBackground
                .filter(acad => acad.university || acad.completedYear || acad.certificate)
                .map((acad, index) => (
                  <div key={index} className={styles.previousAcademic}>
                    <p><strong>University:</strong> {acad.university}</p>
                    <p><strong>Completed Year:</strong> {acad.completedYear}</p>
                    <p><strong>Certificate:</strong> {acad.certificate}</p>
                  </div>
                ))}
            </fieldset>
          )} */}




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
        {/* {workexperience.workExperiences.filter(exp => exp.company || exp.position || exp.from || exp.to).length > 0 && (
          <fieldset className={styles.fieldset}>
            <legend>Previous Work Experiences</legend>
            {workexperience.workExperiences
              .filter(exp => exp.company || exp.position || exp.from || exp.to)
              .map((exp, index) => (
                <div key={index} className={styles.previousExperience}> 
                  <p><strong>Company:</strong> {exp.company}</p> 
                  <p><strong>Position:</strong> {exp.position}</p> 
                  <p><strong>From:</strong> {exp.from}</p> 
                  <p><strong>To:</strong> {exp.to}</p> 
                </div>
              ))}
          </fieldset>
        )} */}

 
      </form>

      
      
         {/* Submit Button */}
         <button  className={styles.submitButton} onClick={handlePopup} type="submit">Submit Application</button>
     

      {showPopup && <Succespop onClose={handleClosePopup} />}
    </div>
  );
}
