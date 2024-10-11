import React, { useState } from 'react';
import styles from './Application.module.scss';
import Succespop from '../../Component/Succespop/Succespop'
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../UserContext';

// function to handle application api
const submitApplication = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/applications/createnew', {
      method: 'POST',
      body: formData,
    });

    // Check if the response was successful
    if (!response.ok) {
      throw new Error('Submitting failed');
    }

    // Parse the JSON response body
    const data = await response.json();
    console.log('Response Data:', data);  // This will log the response data

    // Destructure application_id from the response data
    const { application: { application_id } } = data;
    console.log('Application ID:', application_id);  // Log the application_id

    // You can now use the application_id for further logic
    return application_id;  // Return the application_id for further use

  } catch (error) {
    console.error('Error:', error);
    throw error;  // Re-throw the error for further handling
  }
};

// function to handle application api
const submitAcademic = async (academy) => {
  console.log(academy)
  console.log('academy api',academy.application_id)
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
   console.log(workexperience)
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
   const { user } = useUser();
  console.log('usr from context',user)
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

  const [job_id,setJob_id]=useState(id)
  const [applicant_id,setApplicant_id]=useState(user.user_id)
  const [firstname,setFirstname]=useState('')
  const [middlename,setMiddlename]=useState('')
  const [lastname,setLastname]=useState('')
  const [phone,setPhone]=useState('')
  const [email,setEmail]=useState('')
  const [cover_letter,setCover_letter]=useState('')
  const [resume,setResume]=useState('')
  const [handwritten_letter,setHandwritten_letter]=useState('')
  const [status,setStatus]=useState('submitted')


  const [workexperience, setWorkexperience] = useState({
      application_id:'',
      company: null,
      position: '',
      from_date: '',
      to_date: '',
  })

  const [academy, setAcademy] = useState({
    application_id:'',
    highestlevel: '',
    university: '',
    completed_year: '',
    cgpa: '',
    field: '',
  })

  console.log(workexperience)

  console.log(academy)

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


// Add the current work experience to the list and reset the fields
const addWorkExperience = () => {
  submitExprience(workexperience);
  setWorkexperience({ company: '', position: '', from: '', to: '' });
};


  // Add the current academic background to the list and reset the fields
  const addAcademicBackground = () => {
    // setAcademy({
    //   ...academy,
    //   academicBackground: [...academy.academicBackground, currentAcademic],
    // });
    // Clear the current academic fields

    submitAcademic(academy);
    setAcademy({ university: '', completedYear: '', certificate: '' });
    
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
      
    // Append the state values to the FormData object
    formData.append("job_id", job_id);
    formData.append("applicant_id", applicant_id);
    formData.append("firstname", firstname);
    formData.append("middlename", middlename);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("email", email);
    
    // Append the files (assuming they're File objects)
    formData.append("cover_letter", cover_letter);
    formData.append("resume", resume);
    formData.append("handwritten_letter", handwritten_letter);
    
    // Optionally set the status if you want to use it
    formData.append("status", status);
  
    try {
      // Call submitApplication with formData
      const application_id = await submitApplication(formData);
      
      console.log('Application submitted successfully. Application ID:', application_id); // Log the application ID

          // Update the work experience and academy states with the new application_id
    setWorkexperience((prev) => ({ ...prev, application_id }));
    setAcademy((prev) => ({ ...prev, application_id }));
      
    } catch (error) {
      console.error('Error submitting the application:', error);
    }
  };
  

  const handlePopup = (e) =>{
    setShowPopup(true);
  }


  return (
    <div className={styles.applicationContainer}>
      <h1>Job Application</h1>
      <form className={styles.applicationForm}>
        Personal Information
        <fieldset className={styles.fieldset}>
          <legend>Personal Information</legend>
          <div className={styles.formGroup}>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              // value={formData.firstname}
              onChange={(e)=> setFirstname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="middlename">Middle Name</label>
            <input
              type="text"
              id="middlename"
              name="middlename"
              // value={formData.middlename}
              onChange={(e)=> setMiddlename(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              // value={formData.lastname}
              onChange={(e)=> setLastname(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              // value={formData.email}
              onChange={(e)=> setPhone(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              // value={formData.phone}
              onChange={(e)=> setEmail(e.target.value)}
              required
            />
          </div>
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
              onChange={(e)=> setCover_letter(e.target.files[0])}
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
              onChange={(e)=> setResume(e.target.files[0])}
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
              onChange={(e)=> setHandwritten_letter(e.target.files[0])}
              required
            />
          </div>


         <button  className={styles.submitButton} onClick={handleSubmit} type="submit">Add Personal Details</button>

        </fieldset>  




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
                  id="completed_year"
                  name="completed_year"
                  value={academy.completed_year}
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
              value={workexperience.company}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="position">Position</label>
            <input
              type="text"
              id="position"
              name="position"
              value={workexperience.position}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="from">From</label>
            <input
              type="month"
              id="from_date"
              name="from_date"
              value={workexperience.from_date}
              onChange={handleExperienceChange}
              required
            />

            <label htmlFor="to">To</label>
            <input
              type="month"
              id="to_date"
              name="to_date"
              value={workexperience.to_date}
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
