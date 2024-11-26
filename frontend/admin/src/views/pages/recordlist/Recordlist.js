import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CButton,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import { CircleLoader } from 'react-spinners'
import { useQuery } from '@tanstack/react-query'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-body-secondary">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-body-secondary">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

// Fetch job data from the backend
const activeJobs = async () => {
  try {
    const res = await fetch('http://10.1.12.40:5000/api/jobs/alljobs')

    // Log the entire response for debugging
    console.log('Response: ', res)

    // If response is not okay, log the error
    if (!res.ok) {
      console.error('Failed to fetch jobs', res.status)
      throw new Error('Failed to fetch jobs')
    }

    // Ensure the response is JSON
    const data = await res.json()
    console.log('Fetched Data: ', data)
    return data
  } catch (error) {
    console.error('Error fetching jobs: ', error)
    throw error // Ensure React Query can handle this error
  }
}

const closeJob = async (jobId) => {
  console.log('iddddddddd ', jobId)
  try {
    const response = await fetch(`http://10.1.12.40:5000/api/jobs/reupdateapplicants/${jobId}`, {
      // Corrected URL
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: jobId }), // Sending the jobId in the body
    })

    if (response.ok) {
      console.log('Job status updated to closed')
      // Optionally refetch job data or update the UI to reflect the change
    } else {
      console.error('Failed to update job status')
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

const Colors = () => {
  const navigate = useNavigate() // Initialize useNavigate

  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: activeJobs,
    refetchOnWindowFocus: false, // Disable refetching on window focus
  })

  const currentDate = new Date() // Get the current date

  if (isLoading) {
    return (
      <div className="">
        <CircleLoader size={105} color={'#123abc'} />
        <p>Fetching available jobs...</p>
      </div>
    )
  }

  if (error) {
    return <div>Error fetching jobs: {error.message}</div>
  }

  console.log('Job data:', data) // Make sure this logs the data after successful fetch

  const filteredDataa = data.filter((item) => new Date(item.deadline) < currentDate)
  const filteredData = data.filter((item) => item.status === 'removed')
  console.log('filterdata', filteredData)

  // Function to handle row click
  // Function to handle row click and pass job_id to list-groups component
  const handleRowClick = (job_id, sourceComponent) => {
    console.log(job_id)
    // Add sourceComponent to the URL as a query parameter
    navigate(`/base/list-groups?job_id=${job_id}&source=${sourceComponent}`)
  }

  const handleButtonClick = async (jobId) => {
    console.log('Button clicked for job ID:', jobId)

    // Call closeJob to update status
    await closeJob(jobId) // Wait for closeJob to complete

    // Reload the page after the job status is updated
    window.location.reload() // Refresh the page
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Active Vacancy List</CCardHeader>
        <CCardBody>
          {/* Table for listing job vacancies */}
          <CTable align="middle" hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Job Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created_at</CTableHeaderCell>
                <CTableHeaderCell scope="col">Deadline</CTableHeaderCell>
                <CTableHeaderCell scope="col">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredData.map((vacancy) => (
                <CTableRow
                  key={vacancy.id}
                  // onClick={() => handleRowClick(vacancy.job_id, 'closed')}
                  style={{ cursor: 'pointer' }}
                >
                  <CTableDataCell>{vacancy.title}</CTableDataCell>
                  <CTableDataCell>{vacancy.jobtype}</CTableDataCell>
                  <CTableDataCell>{vacancy.created_by}</CTableDataCell>
                  <CTableDataCell>
                    {
                      // Format the SQL date string to a readable format
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(vacancy.created_at))
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    {
                      // Format the SQL date string to a readable format
                      new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      }).format(new Date(vacancy.deadline))
                    }
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      style={{ backgroundColor: 'gray', marginRight: '2px' }}
                      onClick={(e) => {
                        e.stopPropagation() // Prevents triggering the row's onClick
                        handleButtonClick(vacancy.job_id) // Custom button handler
                      }}
                    >
                      Reopen
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  )
}

export default Colors
