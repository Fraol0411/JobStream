import React, { useState } from 'react'

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
  CFormSelect,
} from '@coreui/react'
import { useUser } from '../../../UserContext'

const Accordion = () => {
  const [posted, setPosted] = useState(false)
  const { user } = useUser()
  const [jobDetails, setJobDetails] = useState({
    title: '',
    dutystation: '',
    description: '',
    requirements: '',
    salary: '',
    qualification: '',
    deadline: '',
    contact: '',
    age: '',
    req_no: '',
    termof_emp: '',
  })

  console.log('job detail entered', jobDetails)
  //  console.log(user)

  const handleChange = (e) => {
    const { id, value } = e.target
    setJobDetails({ ...jobDetails, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add default job type

    const jobData = {
      ...jobDetails,
      jobtype: 'Awash Staff', // Set default job type
      status: 'active', // Assuming you want to set the status as active by default
      created_by: user.username, // Set the creator's user ID (you may want to fetch this dynamically)
    }
    console.log(jobData)

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
          dutystation: '',
          description: '',
          requirements: '',
          salary: '',
          qualification: '',
          deadline: '',
          contact: '',
          age: '',
          req_no: '',
          termof_emp: '',
        })
        setPosted(!posted)
      } else {
        console.error('Failed to create job:', response.statusText)
      }
    } catch (error) {
      console.error('Error creating job:', error)
    }
  }
  // const confirmPost = () => {
  //   setPosted(!posted)
  // }
  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ textAlign: 'center' }}>Create New Internal Vacancy</CCardHeader>
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
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="requirements">Educational Qualification Required</CFormLabel>
                  <CFormTextarea
                    id="requirements"
                    rows="4"
                    placeholder="Enter Educational Qualification Required"
                    value={jobDetails.requirements}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="qualifications">Work Experience</CFormLabel>
                  <CFormTextarea
                    id="qualification"
                    rows="4"
                    placeholder="Enter Work Experience"
                    value={jobDetails.qualification}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="description">Skills and Attributes</CFormLabel>
                  <CFormTextarea
                    id="description"
                    rows="4"
                    placeholder="Enter Skills and Attributes"
                    value={jobDetails.description}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="salary">Salary and Benefits</CFormLabel>
                  <CFormTextarea
                    id="salary"
                    rows="4"
                    placeholder="Enter Salary and Benefits"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="req_no">Required Number</CFormLabel>
                  <CFormInput
                    id="req_no"
                    type="number"
                    placeholder="Enter Required Number"
                    value={jobDetails.req_no}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="termOfEmployment">Term of Employment</CFormLabel>
                  <CFormSelect
                    id="termof_emp"
                    value={jobDetails.termof_emp}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Term of Employment</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </CFormSelect>
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="age">Age</CFormLabel>
                  <CFormInput
                    type="text"
                    id="age"
                    placeholder="Enter Age"
                    value={jobDetails.age}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="dutystation">Place of Work</CFormLabel>
                  <CFormInput
                    type="text"
                    id="dutystation"
                    placeholder="Enter location"
                    value={jobDetails.dutystation}
                    onChange={handleChange}
                    required
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
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={6}>
                  <CFormLabel htmlFor="deadline">Application Deadline</CFormLabel>
                  <CFormInput
                    type="date"
                    id="deadline"
                    placeholder="Enter application deadline"
                    value={jobDetails.deadline}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>
              <CRow className="mt-3">
                <CCol md={12} className="text-end">
                  {posted && <p>Job successfully posted</p>}
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
