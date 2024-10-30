import React, { useState } from 'react'
import { useUser } from '../../../../../applicant/src/UserContext'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormLabel,
  CFormInput,
  CButton,
  CForm,
  CFormTextarea,
} from '@coreui/react'

const Accordion = () => {
  const [jobDetails, setJobDetails] = useState({
    title: '',
    department: '',
    dutystation: '',
    description: '',
    requirements: '',
    salary: '',
    qualification: '',
    responsibilities: '',
    deadline: '',
    contact: '',
    benefits: '',
  })

  console.log(jobDetails)

  const handleChange = (e) => {
    const { id, value } = e.target
    setJobDetails({ ...jobDetails, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add default job type
    const jobData = {
      ...jobDetails,
      jobtype: 'Fresh Graduate', // Set default job type
      status: 'active', // Assuming you want to set the status as active by default
      created_by: 5012, // Set the creator's user ID (you may want to fetch this dynamically)
    }

    try {
      const response = await fetch('http://10.1.12.40:5000/api/jobs/createjobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Job created successfully:', data)
        // Optionally, reset the form or provide feedback to the user
        setJobDetails({
          title: '',
          department: '',
          dutystation: '',
          description: '',
          requirements: '',
          qualifications: '',
          responsibilities: '',
          skills: '',
          benefits: '',
          contact: '',
          deadline: '',
        })
      } else {
        console.error('Failed to create job:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating job:', error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ textAlign: 'center' }}>
            Create New Fresh Graduate Vacancy
          </CCardHeader>
          <CCardBody>
            {/* Job Vacancy Posting Form */}
            <CForm onSubmit={handleSubmit}>
              <CRow>
                <CCol md={6}>
                  <CFormLabel htmlFor="title">Job Title</CFormLabel>
                  <CFormInput
                    type="text"
                    id="title"
                    placeholder="Enter job title"
                    value={jobDetails.title}
                    onChange={handleChange}
                  />
                </CCol>
                <CCol md={6}>
                  <CFormLabel htmlFor="department">Department</CFormLabel>
                  <CFormInput
                    type="text"
                    id="department"
                    placeholder="Enter department"
                    value={jobDetails.department}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="dutystation">Duty Station</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dutystation"
                    placeholder="Enter location"
                    value={jobDetails.dutystation}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Job Description</CFormLabel>
                  <CFormTextarea
                    id="description"
                    rows="4"
                    placeholder="Enter job description"
                    value={jobDetails.description}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="requirements">Job Requirements</CFormLabel>
                  <CFormTextarea
                    id="requirements"
                    rows="4"
                    placeholder="Enter job requirements"
                    value={jobDetails.requirements}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="qualifications">Job Qualifications</CFormLabel>
                  <CFormTextarea
                    id="qualification"
                    rows="4"
                    placeholder="Enter job qualifications"
                    value={jobDetails.qualification}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="responsibilities">Job Responsibilities</CFormLabel>
                  <CFormTextarea
                    id="responsibilities"
                    rows="4"
                    placeholder="Enter job responsibilities"
                    value={jobDetails.responsibilities}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="skills">Salary</CFormLabel>
                  <CFormInput
                    type="text"
                    id="salary"
                    placeholder="Enter benefits"
                    value={jobDetails.salary}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="benefits">Benefits</CFormLabel>
                  <CFormInput
                    type="text"
                    id="benefits"
                    placeholder="Enter benefits"
                    value={jobDetails.benefits}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="contact">Contact Information</CFormLabel>
                  <CFormInput
                    type="text"
                    id="contact"
                    placeholder="Enter contact information"
                    value={jobDetails.contact}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="deadline">Application Deadline</CFormLabel>
                  <CFormInput
                    type="text"
                    id="deadline"
                    placeholder="Enter application deadline"
                    value={jobDetails.deadline}
                    onChange={handleChange}
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12} className="text-end">
                  <CButton type="submit" color="primary">
                    Post Job
                  </CButton>
                </CCol>
              </CRow>
            </CForm>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
