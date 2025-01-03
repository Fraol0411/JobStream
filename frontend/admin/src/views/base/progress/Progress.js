import React, { useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CListGroup,
  CListGroupItem,
  CButton,
} from '@coreui/react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
const API_BASE_FILEURL = import.meta.env.VITE_API_BASE_FILEURL

// Function to fetch experience data
const fetchExperience = async (applicationId) => {
  const response = await fetch(`${API_BASE_URL}/exprience/${applicationId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch experience data')
  }

  return response.json()
}

// Function to fetch academic data
const fetchAcademic = async (applicationId) => {
  const response = await fetch(`${API_BASE_URL}/academic/${applicationId}`)

  if (!response.ok) {
    throw new Error('Failed to fetch academic data')
  }

  return response.json()
}

// Function to update the application status (general-purpose function)
const updateApplicationStatus = async (applicationId, status) => {
  const response = await fetch(`${API_BASE_URL}/applications/${applicationId}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Failed to update application status')
  }

  return response.json()
}

const Progress = (jobId) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { applicant } = location.state || {} // Get the applicant from the state

  const [activeButton, setActiveButton] = useState(null) // Track the clicked button

  console.log('from params', applicant.job_id)

  // If applicant data is not available, show a message
  if (!applicant) {
    return <p>No applicant data available.</p>
  }

  const applicationId = applicant.application_id

  // Fetch experience data
  const {
    data: experienceData,
    isLoading: isExperienceLoading,
    isError: isExperienceError,
  } = useQuery({
    queryKey: ['experience', applicationId],
    queryFn: () => fetchExperience(applicationId),
    enabled: !!applicationId,
  })

  // Fetch academic data
  const {
    data: academicData,
    isLoading: isAcademicLoading,
    isError: isAcademicError,
  } = useQuery({
    queryKey: ['academic', applicationId],
    queryFn: () => fetchAcademic(applicationId),
    enabled: !!applicationId,
  })

  // Loading states
  if (isExperienceLoading || isAcademicLoading) {
    return <p>Loading applicant data...</p>
  }

  // Error states
  if (isExperienceError || isAcademicError) {
    return <p>Error fetching applicant data.</p>
  }

  // Clean up file paths using split
  const resumeFileName = applicant.resume.split('public/uploads/').pop() // Get the filename
  const coverLetterFileName = applicant.cover_letter.split('public/uploads/').pop()
  const handwrittenLetterFileName = applicant.handwritten_letter.split('public/uploads/').pop()

  // Construct URLs for uploaded files
  const resumePath = `${API_BASE_FILEURL}/${resumeFileName}`
  const coverLetterPath = `${API_BASE_FILEURL}/${coverLetterFileName}`
  const handwrittenLetterPath = `${API_BASE_FILEURL}${handwrittenLetterFileName}`

  console.log('Cleaned Resume File Name path:', resumePath)

  const handlenavigate = () => {
    navigate(`/base/list-groups?job_id=${applicant.job_id}`)
  }

  // Function to handle "Process Further" action
  const handleProcessFurther = async () => {
    try {
      const result = await updateApplicationStatus(applicationId, 'further')
      console.log('Application status updated to In Progress', result)
      // You can handle additional UI updates or navigation here if needed
      setActiveButton('process')
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  // Function to handle "Remove from applicant list" action
  const handleRemoveApplicant = async () => {
    try {
      const result = await updateApplicationStatus(applicationId, 'rejected')
      console.log('Application status updated to Removed', result)
      // You can handle additional UI updates or navigation here if needed
      setActiveButton('remove')
    } catch (error) {
      console.error('Error updating application status:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Applicant Details</CCardHeader>
          <CCardBody>
            <CListGroup>
              <CListGroupItem>
                <strong>Name:</strong>{' '}
                {`${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`}
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
                  'No Prior experience '
                )}
              </CListGroupItem>
              <CListGroupItem>
                <CButton
                  onClick={handleProcessFurther}
                  type="submit"
                  color={activeButton === 'process' ? 'danger' : 'primary'}
                  style={{ marginRight: '10px' }}
                  disabled={activeButton === 'remove'} // Disable if 'Remove' is clicked
                >
                  Process Further
                </CButton>

                <CButton
                  onClick={handleRemoveApplicant}
                  type="submit"
                  color={activeButton === 'remove' ? 'danger' : 'primary'}
                  style={{ marginRight: '10px' }}
                  disabled={activeButton === 'process'} // Disable if 'Process Further' is clicked
                >
                  Remove from applicant list
                </CButton>
              </CListGroupItem>

              <CButton
                type="submit"
                color="primary"
                style={{ marginRight: '10px' }}
                onClick={handlenavigate}
                disabled={!activeButton} // Disable if neither 'Process Further' nor 'Remove' is clicked
              >
                Back to applicant list
              </CButton>
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Progress
