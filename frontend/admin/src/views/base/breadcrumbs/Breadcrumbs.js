import React, { useState } from 'react'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
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
  const { user } = useUser()
  const [message, setMessage] = useState(null)
  const [posted, setPosted] = useState(false)
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

  const handleChange = (e) => {
    const { id, value } = e.target
    setJobDetails({ ...jobDetails, [id]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Add default job type
    const jobData = {
      ...jobDetails,
      jobtype: 'External Applicant', // Set default job type
      status: 'active', // Assuming you want to set the status as active by default
      created_by: user.username, // Set the creator's user ID (you may want to fetch this dynamically)
    }

    try {
      const response = await fetch(`${API_BASE_URL}/jobs/createjobs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Job created successfully:', data.message)
        setMessage(data.message)
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

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader style={{ textAlign: 'center' }}>Create New External Vacancy</CCardHeader>
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
                  <CFormLabel htmlFor="requirements">Educational qualification Required</CFormLabel>
                  <CFormTextarea
                    id="requirements"
                    rows="4"
                    placeholder="Enter Educational qualification Required"
                    value={jobDetails.requirements}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="qualifications">Work Exprience</CFormLabel>
                  <CFormTextarea
                    id="qualification"
                    rows="4"
                    placeholder="Enter Work Exprience"
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
                  <CFormLabel htmlFor="skills">Salary And Benefits</CFormLabel>
                  <CFormTextarea
                    id="salary"
                    rows="4"
                    placeholder="Enter Salary And Benefits"
                    value={jobDetails.salary}
                    onChange={handleChange}
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mt-3">
                <CCol md={12}>
                  <CFormLabel htmlFor="skills">Required Number</CFormLabel>
                  <CFormInput
                    id="req_no"
                    type="text"
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
                  <CFormLabel htmlFor="skills">Age</CFormLabel>
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
                    type="date" // Changed type to "date" to show calendar
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
                  {posted && <p>Job Posted successfully</p>}
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
