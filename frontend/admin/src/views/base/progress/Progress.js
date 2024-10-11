
import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
} from '@coreui/react';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';




// Function to fetch experience data
const fetchExperience = async (applicationId) => {
  const response = await fetch(`http://localhost:5000/api/exprience/${applicationId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch experience data');
  }
  
  return response.json();
};

// Function to fetch academic data
const fetchAcademic = async (applicationId) => {
  const response = await fetch(`http://localhost:5000/api/academic/${applicationId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch academic data');
  }
  
  return response.json();
};



const Progress = () => {

  const location = useLocation();
  const { applicant } = location.state || {}; // Get the applicant from the state

  // If applicant data is not available, show a message
  if (!applicant) {
    return <p>No applicant data available.</p>;
  }

  const applicationId = applicant.application_id;

  // Fetch experience data
  const { data: experienceData, isLoading: isExperienceLoading, isError: isExperienceError } = useQuery({
    queryKey: ['experience', applicationId],
    queryFn: () => fetchExperience(applicationId),
    enabled: !!applicationId,
  });

  // Fetch academic data
  const { data: academicData, isLoading: isAcademicLoading, isError: isAcademicError } = useQuery({
    queryKey: ['academic', applicationId],
    queryFn: () => fetchAcademic(applicationId),
    enabled: !!applicationId,
  });


  console.log('academic data',academicData)
  console.log('exprience data',experienceData)
  // Loading states
  if (isExperienceLoading || isAcademicLoading) {
    return <p>Loading applicant data...</p>;
  }

  // Error states
  if (isExperienceError || isAcademicError) {
    return <p>Error fetching applicant data.</p>;
  }


  

  // Debugging: Log the original paths
  console.log('Resume Path:', applicant.resume);
  console.log('Cover Letter Path:', applicant.cover_letter);
  console.log('Handwritten Letter Path:', applicant.handwritten_letter);

  // Clean up file paths using split
  const resumeFileName = applicant.resume.split('public/uploads/').pop(); // Get the filename
  const coverLetterFileName = applicant.cover_letter.split('public/uploads/').pop();
  const handwrittenLetterFileName = applicant.handwritten_letter.split('public/uploads/').pop();

  // Debugging: Log the cleaned filenames
  console.log('Cleaned Resume File Name:', resumeFileName);
  console.log('Cleaned Cover Letter File Name:', coverLetterFileName);
  console.log('Cleaned Handwritten Letter File Name:', handwrittenLetterFileName);

  // Construct URLs for uploaded files
  const resumePath = `http://localhost:5000/uploads/${resumeFileName}`;
  const coverLetterPath = `http://localhost:5000/uploads/${coverLetterFileName}`;
  const handwrittenLetterPath = `http://localhost:5000/uploads/${handwrittenLetterFileName}`;



  console.log('Cleaned Resume File Name path:', resumePath);


  
  return (
    <CRow>
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>Applicant Details</CCardHeader>
        <CCardBody>
          <CListGroup>
            <CListGroupItem>
              <strong>Name:</strong> {`${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`}
            </CListGroupItem>
            <CListGroupItem>
              <strong>Email:</strong> {applicant.email}
            </CListGroupItem>
            <CListGroupItem>
              <strong>Phone:</strong> {applicant.phone}
            </CListGroupItem>
            <CListGroupItem>
              <strong>Resume:</strong> 
              <a href={resumePath} target="_blank" rel="noopener noreferrer">
                Download Resume
              </a>
            </CListGroupItem>
            <CListGroupItem>
              <strong>Cover Letter:</strong> 
              <a href={coverLetterPath} target="_blank" rel="noopener noreferrer">
                Download Cover Letter
              </a>
            </CListGroupItem>
            <CListGroupItem>
              <strong>Handwritten Letter:</strong> 
              <a href={handwrittenLetterPath} target="_blank" rel="noopener noreferrer">
                Download Handwritten Letter
              </a>
            </CListGroupItem>
              {/* Render Academic Data */}
              <CListGroupItem>
                <strong>Education:</strong>
                {academicData && academicData.length > 0 ? (
                  <ul>
                    {academicData.map((edu) => (
                      <li key={edu.education_id}>
                        {`${edu.highestlevel} from ${edu.university} (CGPA: ${edu.cgpa})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No education data available'
                )}
              </CListGroupItem>
              {/* Render Experience Data */}
              <CListGroupItem>
                <strong>Experience:</strong>
                {experienceData && experienceData.data.length > 0 ? (
                  <ul>
                    {experienceData.data.map((exp) => (
                      <li key={exp.experience_id}>
                        {`${exp.position} at ${exp.company} (From: ${new Date(exp.from_date).toLocaleDateString()})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  'No experience data available'
                )}
              </CListGroupItem>
          </CListGroup>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  );
};

export default Progress;
