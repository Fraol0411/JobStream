import React, { useState } from "react";
import styles from "./Application.module.scss";
import Succespop from "../../Component/Succespop/Succespop";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../UserContext";
import { useQueries, useQuery } from "react-query";

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
      "http://10.1.12.40:5000/api/applications/createnew",
      {
        method: "POST",
        body: formData,
      }
    );
    if (!response.ok) {
      throw new Error("Submitting failed");
    }
    const data = await response.json();
    const {
      application: { application_id },
    } = data;
    return application_id;
  } catch (error) {
    throw error;
  }
};

// function to handle application api
const submitAcademic = async (academy) => {
  const response = await fetch("http://10.1.12.40:5000/api/academic/", {
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
  const response = await fetch("http://10.1.12.40:5000/api/exprience", {
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

// Your fetch functions
const fetchEducationLevels = async () => {
  const response = await fetch(
    "http://10.1.12.40:5000/api/academic/highest/level"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch education levels");
  }
  return response.json();
};

const fetchInstitutions = async () => {
  const response = await fetch(
    "http://10.1.12.40:5000/api/academic/institution/type"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch institutions");
  }
  return response.json();
};

const fetchFieldsOfStudy = async () => {
  const response = await fetch(
    "http://10.1.12.40:5000/api/academic/field/study"
  );
  if (!response.ok) {
    throw new Error("Failed to fetch fields of study");
  }
  return response.json();
};

// application below //
export default function Application() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [message, setMessage] = useState("");
  const [messageacc, setMessageacc] = useState("");
  const [messageexp, setMessageexp] = useState("");

  const { applicationId, setApplicationId } = useUser();

  const [isOtherSelected, setIsOtherSelected] = useState(false);
  const [customEducationLevel, setCustomEducationLevel] = useState("");
  //button managment
  const [isPersonalDetailsAdded, setIsPersonalDetailsAdded] = useState(false);
  const [isAcademicBackgroundAdded, setIsAcademicBackgroundAdded] =
    useState(false);

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
  const [age, setAge] = useState();

  const [workexperience, setWorkexperience] = useState({
    application_id: applicationId,
    company: null,
    position: "",
    from_date: "",
    to_date: "",
  });

  const [academy, setAcademy] = useState({
    application_id: applicationId,
    highestlevel: "",
    university: "ggggagagagaga",
    completed_year: "",
    cgpa: "",
    field: "",
  });

  /**************/
  // for dropdowm menu
  const queries = useQueries([
    {
      queryKey: ["educationLevels"],
      queryFn: fetchEducationLevels,
    },
    {
      queryKey: ["institutions"],
      queryFn: fetchInstitutions,
    },
    {
      queryKey: ["fieldsOfStudy"],
      queryFn: fetchFieldsOfStudy,
    },
  ]);

  // Destructure the results
  const [educationLevelsResult, institutionsResult, fieldsOfStudyResult] =
    queries;

  // Check loading and error states
  if (
    educationLevelsResult.isLoading ||
    institutionsResult.isLoading ||
    fieldsOfStudyResult.isLoading
  ) {
    return <div>Loading...</div>;
  }

  if (
    educationLevelsResult.isError ||
    institutionsResult.isError ||
    fieldsOfStudyResult.isError
  ) {
    return <div>Error loading data</div>;
  }
  /**********************/

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setIsOtherSelected(selectedValue === "Other");

    if (selectedValue !== "Other") {
      // Update academy's highestlevel directly with the selected dropdown value
      setAcademy((prev) => ({ ...prev, highestlevel: selectedValue }));
      setCustomEducationLevel(""); // Clear custom level if another option is selected
    }
  };

  const handleCustomLevelChange = (event) => {
    const newCustomValue = event.target.value;
    setCustomEducationLevel(newCustomValue);

    // Update academy's highestlevel with the custom input
    setAcademy((prev) => ({ ...prev, highestlevel: newCustomValue }));
  };

  /***********************/
  // Handler for academic and exprience changes
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

  const addWorkExperience = () => {
    const { company, position, from_date, to_date } = workexperience;
    if (!company || !position || !from_date || !to_date) {
      setMessageexp("Please fill in all fields.");
      return;
    }
    submitExprience(workexperience);
    setWorkexperience({
      company: "",
      position: "",
      from_date: "",
      to_date: "",
    });
    setMessageexp("Work experience added successfully | add more (optional)");
  };

  const addAcademicBackground = () => {
    const {
      application_id,
      highestlevel,
      university,
      completed_year,
      cgpa,
      field,
    } = academy;
    if (
      !highestlevel.trim() ||
      !university.trim() ||
      !completed_year.trim() ||
      !cgpa.trim() ||
      !field.trim()
    ) {
      setMessageacc("Enter all fields");
    } else {
      submitAcademic(academy);
      setAcademy({
        highestlevel: " ",
        university: " ",
        completed_year: " ",
        cgpa: " ",
        field: " ",
      });
      setMessageacc(
        "Academic background added successfully | Add more (optional)"
      );
      setIsAcademicBackgroundAdded(true);
    }
  };
  /***********************/

  /***********************/
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !job_id ||
      !applicant_id ||
      !firstname ||
      !lastname ||
      !phone ||
      !email ||
      !cover_letter ||
      !resume ||
      !handwritten_letter ||
      !age
    ) {
      setMessage("Please fill out all required fields."); // Set an error message
      return; // Stop execution if any required field is missing
    }

    const formData = new FormData();

    formData.append("job_id", job_id);
    formData.append("applicant_id", applicant_id);
    formData.append("firstname", firstname);
    formData.append("middlename", middlename);
    formData.append("lastname", lastname);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("cover_letter", cover_letter);
    formData.append("resume", resume);
    formData.append("handwritten_letter", handwritten_letter);
    formData.append("status", status);
    formData.append("age", age);

    try {
      const newApplicationId = await submitApplication(formData);

      setApplicationId(newApplicationId);
      setMessage("personal detail added succesfully");
      // Update the work experience and academy states with the new application_id
      setWorkexperience((prev) => ({
        ...prev,
        application_id: applicationId,
      }));
      setAcademy((prev) => ({ ...prev, application_id: newApplicationId }));
      setIsPersonalDetailsAdded(!isPersonalDetailsAdded);
    } catch (error) {
      console.error("Error submitting the application:", error);
    }
  };

  const handlePopup = (e) => {
    setShowPopup(true);
  };

  /***********************/

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

  console.log(" academic", academy);
  console.log("work exprience", workexperience);
  console.log("permanent id", applicationId);

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
                  value={firstname ?? ""}
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
                  value={middlename ?? ""}
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
                  value={lastname ?? ""}
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
                  value={email ?? ""}
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
                  value={phone ?? ""}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />

                <div
                  className={`${styles.mandatoryIndicator} ${
                    phone ? styles.filled : ""
                  }`}
                ></div>
              </div>

              <div className={styles.formGroup}>
                <TextField
                  label="Enter Your Age"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />

                <div
                  className={`${styles.mandatoryIndicator} ${
                    age ? styles.filled : ""
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
                  onChange={(e) => setCover_letter(e.target.files[0])}
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
        </fieldset>

        {/* Academic Background */}
        <fieldset className={styles.fieldforacademy}>
          <legend>Academic Background</legend>
          <div className={styles.formGroup}>
            {/* Highest Level of Education */}
            <div>
              <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                <InputLabel id="highestlevel-label">
                  Highest Level of Education
                </InputLabel>
                <Select
                  labelId="highestlevel-label"
                  id="highestlevel"
                  name="highestlevel"
                  value={isOtherSelected ? "Other" : academy.highestlevel}
                  label="Highest Level of Education"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="">
                    <em>Select</em>
                  </MenuItem>
                  {educationLevelsResult.data?.map((level) => (
                    <MenuItem key={level.id} value={level.level}>
                      {level.level}
                    </MenuItem>
                  ))}
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>

              {/* Show custom input field if "Other" is selected */}
              {isOtherSelected && (
                <TextField
                  fullWidth
                  required
                  label="Specify Other Education Level"
                  value={customEducationLevel}
                  onChange={handleCustomLevelChange}
                  sx={{ marginBottom: 2 }}
                />
              )}
            </div>

            {/* University */}
            <FormControl fullWidth required sx={{ marginBottom: 2 }}>
              <InputLabel id="highestlevel-label">University</InputLabel>
              <Select
                labelId="University-label"
                id="university"
                name="university"
                value={academy.university}
                label="University"
                onChange={handleAcademicChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {institutionsResult.data?.map((level) => (
                  <MenuItem key={level.id} value={level.institution_name}>
                    {level.institution_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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
              id="cgpa"
              name="cgpa"
              value={academy.cgpa}
              onChange={handleAcademicChange}
              margin="normal"
            />

            {/* Field of Study */}
            <FormControl fullWidth required sx={{ marginBottom: 2 }}>
              <InputLabel id="highestlevel-label">Field of Study</InputLabel>
              <Select
                labelId="Field of Study"
                id="field"
                name="field"
                value={academy.field}
                label="field"
                onChange={handleAcademicChange}
              >
                <MenuItem value="">
                  <em>Select</em>
                </MenuItem>
                {fieldsOfStudyResult.data?.map((level) => (
                  <MenuItem key={level.id} value={level.field}>
                    {level.field}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <p>{messageacc}</p>
          <button
            type="button"
            className={`${styles.submitButton} ${
              !isPersonalDetailsAdded && styles.disabledButton
            }`}
            onClick={addAcademicBackground}
            disabled={!isPersonalDetailsAdded}
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
        className={`${styles.submitfinalButton} ${
          !isAcademicBackgroundAdded && styles.disabledButtonn
        }`}
        onClick={handlePopup}
        type="submit"
        disabled={!(isPersonalDetailsAdded && isAcademicBackgroundAdded)}
      >
        Submit Application
      </button>

      {showPopup && <Succespop onClose={handleClosePopup} />}
    </div>
  );
}
