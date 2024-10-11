
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



// Function to fetch application by ID using fetch
const fetchApplicationById = async (applicationId) => {
  const response = await fetch(`http://localhost:5000/api/applications/application/${applicationId}`);
  
  // Handle errors if the response is not OK
  if (!response.ok) {
    throw new Error('Failed to fetch application data');
  }
  
  const data = await response.json();
  return data;
};

// Function to fetch application by ID using fetch
const Experience = async (applicationId) => {
  const response = await fetch(`http://localhost:5000/api/exprience/${applicationId}`);
  
  // Handle errors if the response is not OK
  if (!response.ok) {
    throw new Error('Failed to fetch application data');
  }
  
  const data = await response.json();
  console.log('aexprience',data)
  return data;
};

// Function to fetch application by ID using fetch
const Academic = async (applicationId) => {
  const response = await fetch(`http://localhost:5000/api/academic/${applicationId}`);
  
  // Handle errors if the response is not OK
  if (!response.ok) {
    throw new Error('Failed to fetch application data');
  }
  
  const data = await response.json();
  console.log('academy',data)
  return data;
};




const Progress = () => {

  const location = useLocation();
  const { applicant } = location.state || {}; // Get the applicant from the state

  // If applicant data is not available, show a message
  if (!applicant) {
    return <p>No applicant data available.</p>;
  }

  const applicationId = applicant.application_id;

  // Fetch application details
  const { data: applicationDetails, isLoading, isError } = useQuery({
    queryKey: ['application', applicationId],
    queryFn: () => fetchApplicationById(applicationId),
    enabled: !!applicationId,
  });

  // Loading state
  if (isLoading) {
    return <p>Loading applicant data...</p>;
  }

  // Error state
  if (isError) {
    return <p>Error fetching applicant data.</p>;
  }

  console.log(Academic(applicationId));
  Experience(applicationId);



  

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
              <CListGroupItem>
                <strong>Education:</strong> {applicant.education}
              </CListGroupItem>
              <CListGroupItem>
                <strong>Experience:</strong> {applicant.experience}
              </CListGroupItem>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default Progress;
