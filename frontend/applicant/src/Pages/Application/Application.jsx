import React, { useState } from "react";
import styles from "./Application.module.scss";
import Succespop from "../../Component/Succespop/Succespop";
import { useNavigate, useParams } from "react-router-dom";
import { useUser } from "../../UserContext";
import { useQueries, useQuery } from "react-query";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Button,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

// function to handle application api
const submitApplication = async (formData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/createnew`, {
      method: "POST",
      body: formData,
    });
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
  const response = await fetch(`${API_BASE_URL}/academic/`, {
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
  const response = await fetch(`${API_BASE_URL}/exprience`, {
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
  const response = await fetch(`${API_BASE_URL}/academic/highest/level`);
  if (!response.ok) {
    throw new Error("Failed to fetch education levels");
  }
  return response.json();
};

const fetchInstitutions = async () => {
  const response = await fetch(`${API_BASE_URL}/academic/institution/type`);
  if (!response.ok) {
    throw new Error("Failed to fetch institutions");
  }
  return response.json();
};

const fetchFieldsOfStudy = async () => {
  const response = await fetch(`${API_BASE_URL}/academic/field/study`);
  if (!response.ok) {
    throw new Error("Failed to fetch fields of study");
  }
  return response.json();
};

// post new academic states

const insertHighestLevel = async (level) => {
  const response = await fetch(`${API_BASE_URL}/academic/highest/level`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ level }), // Sending level as the body
  });

  if (!response.ok) {
    throw new Error("Failed to insert highest level of education");
  }
  return response.json();
};

const insertInstitution = async (institutionName, institutionType) => {
  const response = await fetch(`${API_BASE_URL}/academic/institution/type`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ institutionName, institutionType }), // Sending both institutionName and institutionType
  });

  if (!response.ok) {
    throw new Error("Failed to insert institution");
  }
  return response.json();
};

const insertFieldOfStudy = async (fieldName) => {
  const response = await fetch(`${API_BASE_URL}/academic/field/study`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fieldName }), // Sending field name as the body
  });

  if (!response.ok) {
    throw new Error("Failed to insert field of study");
  }
  return response.json();
};

// application below //
export default function Application() {
  const navigate = useNavigate();

  //context
  const { user } = useUser();
  const { setApplicationId } = useUser();
  //context

  //usestate
  const [message, setMessage] = useState("");
  const [messageacc, setMessageacc] = useState("");
  const [messageexp, setMessageexp] = useState("");
  const [isOtherEducationLevel, setIsOtherEducationLevel] = useState(false);
  const [isOtherUniversity, setIsOtherUniversity] = useState(false);
  const [isOtherFieldOfStudy, setIsOtherFieldOfStudy] = useState(false);
  const [customEducationLevel, setCustomEducationLevel] = useState("");
  const [customUniversity, setCustomUniversity] = useState("");
  const [customFieldOfStudy, setCustomFieldOfStudy] = useState("");
  const [customUniversityType, setCustomUniversityType] = useState("");
  //usestate

  //button managment
  const [isPersonalDetailsAdded, setIsPersonalDetailsAdded] = useState(false);
  const [isAcademicBackgroundAdded, setIsAcademicBackgroundAdded] =
    useState(false);
  //button managment

  // Get the id from the URL
  const { id } = useParams();

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
  const [gender, setGender] = useState();

  // suscesful popup page
  const [showPopup, setShowPopup] = useState(false);
  const handleClosePopup = () => {
    setShowPopup(false); // Hide the popup when close is clicked
    navigate("/joblist");
  };

  /**************** */
  const { application_id } = useUser(); // Access application_id from UserContext

  const [workexperience, setWorkexperience] = useState({
    application_id: null,
    company: null,
    position: "",
    from_date: "",
    to_date: "",
  });

  const [academy, setAcademy] = useState({
    application_id: null,
    highestlevel: "",
    university: "",
    completed_year: "",
    cgpa: "",
    field: "",
  });
  /**************** */

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

  /***************************/

  const handleSelectChange = (e, type) => {
    const value = e.target.value;

    console.log("value here ", value);

    if (type === "highestlevel") {
      setIsOtherEducationLevel(value === "Other");
      setAcademy((prev) => ({
        ...prev,
        highestlevel: value === "Other" ? customEducationLevel : value,
      }));
    } else if (type === "university") {
      // if (value === "Other") {
      //   setIsOtherUniversity("display");
      // }
      setIsOtherUniversity(value === "Other");
      setAcademy((prev) => ({
        ...prev,
        university: value === "Other" ? customUniversity : value,
      }));
    } else if (type === "field") {
      setIsOtherFieldOfStudy(value === "Other");
      setAcademy((prev) => ({
        ...prev,
        field: value === "Other" ? customFieldOfStudy : value,
      }));
    }
  };

  // Called when custom input (Other) is completed
  const handleCustomInputChange = (e, type) => {
    const value = e.target.value;

    if (type === "highestlevel") {
      setCustomEducationLevel(value);
      setAcademy((prev) => ({ ...prev, highestlevel: value }));
    } else if (type === "university") {
      // setCustomUniversity((prev) => ({
      //   ...prev,
      //   newunv: value,
      // }));
      setCustomUniversity(value);
      setAcademy((prev) => ({ ...prev, university: value }));
    } else if (type === "field") {
      setCustomFieldOfStudy(value);
      setAcademy((prev) => ({ ...prev, field: value }));
    }
  };

  // Trigger this when the user finishes typing and submits the custom "Other" input
  const handleSubmitOther = (type) => {
    if (type === "highestlevel" && customEducationLevel) {
      console.log("Submitting highest level:", customEducationLevel);

      // Insert the custom level (backend call or local logic)
      insertHighestLevel(customEducationLevel);

      // Update the academy state with the new custom level
      setAcademy((prev) => ({
        ...prev,
        highestlevel: customEducationLevel,
      }));

      // Reset the custom input field
      setCustomEducationLevel("");

      // Disable the custom input section
      setIsOtherEducationLevel(false);
    } else if (type === "university" && customUniversity) {
      console.log("Submitting university:", customUniversity);

      // Insert the custom university (backend call or local logic)
      insertInstitution(customUniversity, customUniversityType);

      // Update the academy state with the new custom university
      setAcademy((prev) => ({
        ...prev,
        university: customUniversity,
      }));

      // Reset the custom input field
      setCustomUniversity("");
      setIsOtherUniversity(false);
    } else if (type === "field" && customFieldOfStudy) {
      console.log("Submitting field of study:", customFieldOfStudy);

      // Insert the custom field of study (backend call or local logic)
      insertFieldOfStudy(customFieldOfStudy);

      // Update the academy state with the new custom field
      setAcademy((prev) => ({
        ...prev,
        field: customFieldOfStudy,
      }));

      // Reset the custom input field
      setCustomFieldOfStudy("");
      setIsOtherFieldOfStudy(false);
    }
  };

  /***************************/

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

  /********************* */
  const addWorkExperience = () => {
    const { application_id, company, position, from_date, to_date } =
      workexperience;
    if (!company || !position || !from_date || !to_date) {
      setMessageexp("Please fill in all fields.");
      return;
    }
    submitExprience(workexperience);
    setWorkexperience({
      application_id: application_id,
      company: "",
      position: "",
      from_date: "",
      to_date: "",
    });
    setMessageexp("Work experience added successfully | add more (optional)");
  };
  /********************* */

  /********************* */
  // Function to add academic background
  const addAcademicBackground = () => {
    const {
      application_id,
      highestlevel,
      university,
      completed_year,
      cgpa,
      field,
    } = academy;

    // Ensure all fields are filled out
    if (
      !highestlevel.trim() ||
      !university.trim() ||
      !completed_year.trim() ||
      !cgpa.trim() ||
      !field.trim()
    ) {
      setMessageacc("Enter all fields");
      return;
    }

    // Submit the academic background
    submitAcademic(academy);

    // Reset the academic fields
    setAcademy({
      application_id: application_id, // Retain the application ID
      highestlevel: "",
      university: "",
      completed_year: "",
      cgpa: "",
      field: "",
    });

    setMessageacc(
      "Academic background added successfully | Add more (optional)"
    );
    setIsAcademicBackgroundAdded(true);
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
    formData.append("gender", gender);

    try {
      const newApplicationId = await submitApplication(formData);
      setApplicationId(newApplicationId); // Save to context

      setAcademy((prev) => ({
        ...prev,
        application_id: newApplicationId,
      }));
      setMessage("Personal details added successfully");
      setIsPersonalDetailsAdded(!isPersonalDetailsAdded);

      // /************* */
      setWorkexperience((prev) => ({
        ...prev,
        application_id: newApplicationId,
      }));
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
  console.log("permanent id", application_id);
  console.log("is other univesity ", isOtherUniversity);
  console.log("custom universyt ", customUniversity);
  console.log("custom universyt state ", isOtherUniversity === "ndisplay");

  return (
    <div className={styles.applicationContainer}>
      {user.role === "applicant" ? (
        <>
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

                  <div className={styles.formGroup}>
                    <TextField
                      select
                      label="Select Your Gender"
                      variant="outlined"
                      fullWidth
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </TextField>

                    <div
                      className={`${styles.mandatoryIndicator} ${
                        gender ? styles.filled : ""
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
              <p style={{}}>{message}</p>

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
                <div>
                  {/* Highest Level of Education */}
                  <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                    <InputLabel id="highestlevel-label">
                      Highest Level of Education
                    </InputLabel>
                    <Select
                      labelId="highestlevel-label"
                      id="highestlevel"
                      name="highestlevel"
                      value={
                        isOtherEducationLevel
                          ? customEducationLevel
                          : academy.highestlevel
                      }
                      label="Highest Level of Education"
                      onChange={(e) => handleSelectChange(e, "highestlevel")}
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
                      {/* Add the custom value dynamically to the dropdown */}
                      {academy.highestlevel &&
                        !educationLevelsResult.data?.find(
                          (level) => level.level === academy.highestlevel
                        ) && (
                          <MenuItem value={academy.highestlevel}>
                            {academy.highestlevel}
                          </MenuItem>
                        )}
                    </Select>
                  </FormControl>
                  {isOtherEducationLevel && (
                    <>
                      <TextField
                        fullWidth
                        required
                        label="Specify Other Education Level"
                        value={customEducationLevel}
                        onChange={(e) =>
                          handleCustomInputChange(e, "highestlevel")
                        }
                        sx={{ marginBottom: 2 }}
                      />
                      <Button onClick={() => handleSubmitOther("highestlevel")}>
                        Submit Custom Level
                      </Button>
                    </>
                  )}

                  {/* University */}
                  <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                    <InputLabel id="university-label">Institution</InputLabel>
                    <Select
                      labelId="university-label"
                      id="university"
                      name="university"
                      value={
                        isOtherUniversity
                          ? customUniversity
                          : academy.university
                      }
                      label="University"
                      onChange={(e) => handleSelectChange(e, "university")}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {institutionsResult.data?.map((university) => (
                        <MenuItem
                          key={university.id}
                          value={university.institution_name}
                        >
                          {university.institution_name}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                      {/* Add the custom value dynamically to the dropdown */}
                      {academy.university &&
                        !institutionsResult.data?.find(
                          (university) =>
                            university.institution_name === academy.university
                        ) && (
                          <MenuItem value={academy.university}>
                            {academy.university}
                          </MenuItem>
                        )}
                    </Select>
                  </FormControl>
                  {isOtherUniversity && (
                    <>
                      <TextField
                        fullWidth
                        required
                        label="Specify Other University"
                        value={customUniversity}
                        onChange={(e) =>
                          handleCustomInputChange(e, "university")
                        }
                        sx={{ marginBottom: 2 }}
                      />

                      {/* Checkbox Group for Government or Private Selection */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginBottom: "16px",
                        }}
                      >
                        <label style={{ marginRight: "10px" }}>
                          Select Type:
                        </label>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={customUniversityType === "Government"}
                              onChange={(e) =>
                                setCustomUniversityType("Government")
                              }
                            />
                          }
                          label="Government"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={customUniversityType === "Private"}
                              onChange={(e) =>
                                setCustomUniversityType("Private")
                              }
                            />
                          }
                          label="Private"
                        />
                      </div>

                      <Button onClick={() => handleSubmitOther("university")}>
                        Submit Custom University
                      </Button>
                    </>
                  )}

                  {/* Field of Study */}
                  <FormControl fullWidth required sx={{ marginBottom: 2 }}>
                    <InputLabel id="field-label">Field of Study</InputLabel>
                    <Select
                      labelId="field-label"
                      id="field"
                      name="field"
                      value={
                        isOtherFieldOfStudy ? customFieldOfStudy : academy.field
                      }
                      label="Field of Study"
                      onChange={(e) => handleSelectChange(e, "field")}
                    >
                      <MenuItem value="">
                        <em>Select</em>
                      </MenuItem>
                      {fieldsOfStudyResult.data?.map((field) => (
                        <MenuItem key={field.id} value={field.field}>
                          {field.field}
                        </MenuItem>
                      ))}
                      <MenuItem value="Other">Other</MenuItem>
                      {/* Add the custom value dynamically to the dropdown */}
                      {academy.field &&
                        !fieldsOfStudyResult.data?.find(
                          (field) => field.field === academy.field
                        ) && (
                          <MenuItem value={academy.field}>
                            {academy.field}
                          </MenuItem>
                        )}
                    </Select>
                  </FormControl>
                  {isOtherFieldOfStudy && (
                    <>
                      <TextField
                        fullWidth
                        required
                        label="Specify Other Field of Study"
                        value={customFieldOfStudy}
                        onChange={(e) => handleCustomInputChange(e, "field")}
                        sx={{ marginBottom: 2 }}
                      />
                      <Button onClick={() => handleSubmitOther("field")}>
                        Submit Custom Field of Study
                      </Button>
                    </>
                  )}
                </div>

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
              </div>

              <p style={{}}>{messageacc}</p>

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
            {user.applyfor !== "Fresh Graduate" && (
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
                    type="DATE"
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
                    type="DATE"
                    id="to_date"
                    name="to_date"
                    value={workexperience.to_date}
                    onChange={handleExperienceChange}
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <p style={{}}>{messageexp}</p>
                  <button
                    type="button"
                    className={`${styles.submitButton} ${
                      !isPersonalDetailsAdded && styles.disabledButton
                    }`}
                    onClick={addWorkExperience}
                    disabled={!isPersonalDetailsAdded}
                  >
                    Add Experience
                  </button>
                </div>
              </fieldset>
            )}
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
        </>
      ) : (
        <>Only for applicant</>
      )}
    </div>
  );
}
