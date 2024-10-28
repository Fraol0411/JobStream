import React, { useState } from "react";
import styles from "./Application.module.scss";
import Succespop from "../../Component/Succespop/Succespop";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../UserContext";

import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
} from "@mui/material";

// function to handle application api
const submitApplication = async (formData) => {
  try {
    const response = await fetch(
      "http://localhost:5000/api/applications/createnew",
      {
        method: "POST",
        body: formData,
      }
    );

    // Check if the response was successful
    if (!response.ok) {
      throw new Error("Submitting failed");
    }

    // Parse the JSON response body
    const data = await response.json();
    console.log("Response Data:", data); // This will log the response data

    // Destructure application_id from the response data
    const {
      application: { application_id },
    } = data;
    console.log("Application ID:", application_id); // Log the application_id

    // You can now use the application_id for further logic
    return application_id; // Return the application_id for further use
  } catch (error) {
    console.error("Error:", error);
    throw error; // Re-throw the error for further handling
  }
};

// function to handle application api
const submitAcademic = async (academy) => {
  console.log(academy);
  console.log("academy api", academy.application_id);
  const response = await fetch("http://localhost:5000/api/academic/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(academy),
  });

  if (!response.ok) {
    throw new Error("Submitting academic background failed");
  }
  return response.json();
};

// function to handle application api
const submitExprience = async (workexperience) => {
  console.log(workexperience);
  const response = await fetch("http://localhost:5000/api/exprience", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(workexperience),
  });

  if (!response.ok) {
    throw new Error("submitting failed");
  }
  return response.json();
};

export default function Application() {
  const navigate = useNavigate();
  const { user } = useUser();
  console.log("usr from context", user);
  const [message, setMessage] = useState("");
  const [messageacc, setMessageacc] = useState("");
  const [messageexp, setMessageexp] = useState("");
  const [error, setError] = useState("");
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
    navigate("/joblist");
  };

  const [job_id, setJob_id] = useState(id);
  const [applicant_id, setApplicant_id] = useState(user.user_id);
  const [firstname, setFirstname] = useState("");
  const [middlename, setMiddlename] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [cover_letter, setCover_letter] = useState("");
  const [resume, setResume] = useState("");
  const [handwritten_letter, setHandwritten_letter] = useState("");
  const [status, setStatus] = useState("submitted");

  const [workexperience, setWorkexperience] = useState({
    application_id: "",
    company: null,
    position: "",
    from_date: "",
    to_date: "",
  });

  const [academy, setAcademy] = useState({
    application_id: "",
    highestlevel: "",
    university: "",
    completed_year: "",
    cgpa: "",
    field: "",
  });

  console.log(workexperience);

  console.log(academy);

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

  // Add the current work experience to the list and reset the fields
  const addWorkExperience = () => {
    submitExprience(workexperience);
    setWorkexperience({ company: "", position: "", from: "", to: "" });
    setMessageexp("work exprience added succesfully | add more(optional)");
  };

  // Add the current academic background to the list and reset the fields
  const addAcademicBackground = () => {
    submitAcademic(academy);
    setAcademy({ university: "", completedYear: "", certificate: "" });
    setMessageacc(
      "accademic background added succesfully | add more(optional)"
    );
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

      console.log(
        "Application submitted successfully. Application ID:",
        application_id
      ); // Log the application ID

      setMessage("personal detail added succesfully");

      // Update the work experience and academy states with the new application_id
      setWorkexperience((prev) => ({ ...prev, application_id }));
      setAcademy((prev) => ({ ...prev, application_id }));
    } catch (error) {
      console.error("Error submitting the application:", error);
    }
  };

  const handlePopup = (e) => {
    setShowPopup(true);
  };

  /// inline style
  const commonDivStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "20px",
  };

  const commonLabelStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  };

  const commonInputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#f9f9f9",
    cursor: "pointer",
    color: "#555",
    fontSize: "14px",
    width: "100%",
    maxWidth: "600px",
  };
  /// inline style

  return (
    <div className={styles.applicationContainer}>
      <form className={styles.applicationForm}>
        {/* personal information */}
        <fieldset className={styles.personal}>
          <div className={styles.personasub}>
            <fieldset className={styles.fieldset}>
              <legend>Personal Information</legend>

              <div className={styles.formGroup}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                  style={{ width: "340px" }}
                />
                <div
                  className={`${styles.mandatoryIndicator} ${
                    firstname ? styles.filled : ""
                  }`}
                ></div>
              </div>

              <div className={styles.formGroup}>
                <TextField
                  label="Middle Name"
                  variant="outlined"
                  fullWidth
                  value={middlename}
                  onChange={(e) => setMiddlename(e.target.value)}
                  required
                />
                <div
                  className={`${styles.mandatoryIndicator} ${
                    middlename ? styles.filled : ""
                  }`}
                ></div>
              </div>

              <div className={styles.formGroup}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
                <div
                  className={`${styles.mandatoryIndicator} ${
                    lastname ? styles.filled : ""
                  }`}
                ></div>
              </div>

              <div className={styles.formGroup}>
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <div
                  className={`${styles.mandatoryIndicator} ${
                    email ? styles.filled : ""
                  }`}
                ></div>
              </div>

              <div className={styles.formGroup}>
                <TextField
                  label="Phone Number"
                  type="tel"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
                <div
                  className={`${styles.mandatoryIndicator} ${
                    phone ? styles.filled : ""
                  }`}
                ></div>
              </div>
            </fieldset>

            {/* Resume and Cover Letter */}
            <fieldset className={styles.fieldset}>
              {/* Resume Upload */}
              <div style={commonDivStyle}>
                <label htmlFor="resume" style={commonLabelStyle}>
                  Upload Resume (PDF or DOC)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  style={commonInputStyle}
                />
              </div>

              {/* Cover Letter Upload */}
              <div style={commonDivStyle}>
                <label htmlFor="coverletter" style={commonLabelStyle}>
                  Upload Cover letter (PDF or DOC)
                </label>
                <input
                  type="file"
                  id="coverletter"
                  name="coverletter"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => setResume(e.target.files[0])}
                  required
                  style={commonInputStyle}
                />
              </div>

              {/* Handwritten Letter Upload */}
              <div style={commonDivStyle}>
                <label htmlFor="handwritten" style={commonLabelStyle}>
                  Upload Handwritten (PDF or DOC)
                </label>
                <input
                  type="file"
                  id="handwritten"
                  name="handwritten"
                  accept=".pdf, .doc, .docx"
                  onChange={(e) => setHandwritten_letter(e.target.files[0])}
                  required
                  style={commonInputStyle}
                />
              </div>
            </fieldset>
          </div>
          <p>{message}</p>
          <button
            className={styles.submitButton}
            onClick={handleSubmit}
            type="submit"
          >
            Add Personal Details
          </button>
          <p>{message}</p>
        </fieldset>

        {/* Academic Background */}
        <fieldset className={styles.fieldforacademy}>
          <legend>Academic Background</legend>
          <div className={styles.formGroup}>
            {/* Highest Level of Education */}
            <FormControl fullWidth required>
              <InputLabel id="highestlevel-label">
                Highest Level of Education
              </InputLabel>
              <Select
                labelId="highestlevel-label"
                id="highestlevel"
                name="highestlevel"
                value={academy.highestlevel}
                label="Highest Level of Education"
                onChange={handleAcademicChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                <MenuItem value="BSC">BSC</MenuItem>
                <MenuItem value="MSC">MSC</MenuItem>
                <MenuItem value="PHD">PHD</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>

            {/* University */}
            <TextField
              fullWidth
              required
              label="University"
              id="university"
              name="university"
              value={academy.university}
              onChange={handleAcademicChange}
              margin="normal"
            />

            {/* Completed Year */}
            <TextField
              fullWidth
              required
              label="Completed Year"
              type="number"
              id="completed_year"
              name="completed_year"
              value={academy.completed_year}
              onChange={handleAcademicChange}
              margin="normal"
            />

            {/* CGPA */}
            <TextField
              fullWidth
              required
              label="CGPA"
              type="number"
              step="0.01"
              id="cgpa"
              name="cgpa"
              value={academy.cgpa}
              onChange={handleAcademicChange}
              margin="normal"
            />

            {/* Field of Study */}
            <TextField
              fullWidth
              required
              label="Field of Study"
              id="field"
              name="field"
              value={academy.field}
              onChange={handleAcademicChange}
              margin="normal"
            />
          </div>
          <p>{messageacc}</p>
          <button
            type="button"
            className={styles.submitButton}
            onClick={addAcademicBackground}
          >
            Add Academic Background
          </button>
        </fieldset>

        {/* Work Experience */}
        <fieldset className={styles.fieldsetforwork}>
          <legend>Work Experience</legend>
          <div className={styles.formGroup}>
            {/* Company Name */}
            <TextField
              fullWidth
              required
              label="Company Name"
              id="company"
              name="company"
              value={workexperience.company}
              onChange={handleExperienceChange}
              margin="normal"
            />

            {/* Position */}
            <TextField
              fullWidth
              required
              label="Position"
              id="position"
              name="position"
              value={workexperience.position}
              onChange={handleExperienceChange}
              margin="normal"
            />

            {/* From Date */}
            <TextField
              fullWidth
              required
              label="From"
              type="month"
              id="from_date"
              name="from_date"
              value={workexperience.from_date}
              onChange={handleExperienceChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* To Date */}
            <TextField
              fullWidth
              required
              label="To"
              type="month"
              id="to_date"
              name="to_date"
              value={workexperience.to_date}
              onChange={handleExperienceChange}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <p>{messageexp}</p>
            <button
              type="button"
              className={styles.submitButton}
              onClick={addWorkExperience}
            >
              Add Experience
            </button>
          </div>
        </fieldset>
      </form>

      {/* Submit Button */}
      <button
        className={styles.submitfinalButton}
        onClick={handlePopup}
        type="submit"
      >
        Submit Application
      </button>

      {showPopup && <Succespop onClose={handleClosePopup} />}
    </div>
  );
}
