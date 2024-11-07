// import React, { useEffect, useState } from 'react'
// import {
//   CBadge,
//   CButton,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CCol,
//   CListGroup,
//   CListGroupItem,
//   CRow,
// } from '@coreui/react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import * as XLSX from 'xlsx'

// const ListGroups = () => {
//   const [applicants, setApplicants] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   console.log(applicants)

//   const location = useLocation()
//   const searchParams = new URLSearchParams(location.search)
//   const jobId = searchParams.get('job_id') // Capture the job_id from the URL query params
//   const sourceComponent = searchParams.get('source')
//   console.log('job id for ', jobId)
//   console.log('source component ', sourceComponent)
//   const navigate = useNavigate()

//   // Function to fetch applications for the specific job
//   const fetchApplications = async (jobId) => {
//     try {
//       const response = await fetch(`http://10.1.12.40:5000/api/applications/${jobId}`)

//       if (!response.ok) {
//         throw new Error('Failed to fetch applications')
//       }

//       const data = await response.json()

//       // Filter applications based on the sourceComponent
//       let submittedApplicants
//       if (sourceComponent === 'closed') {
//         submittedApplicants = data.filter((applicant) => applicant.status === 'further')
//       } else {
//         submittedApplicants = data.filter((applicant) => applicant.status === 'submitted')
//       }

//       // Set only the filtered applicants to state
//       setApplicants(submittedApplicants)
//     } catch (error) {
//       setError(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (jobId) {
//       fetchApplications(jobId) // Fetch applications when jobId is available
//     }
//   }, [jobId])

//   // Function to render a badge based on the application status
//   const renderStatusBadge = (status) => {
//     let color = 'secondary'
//     if (status === 'Approved') color = 'success'
//     else if (status === 'Pending') color = 'warning'
//     else if (status === 'Rejected') color = 'danger'

//     return <CBadge color={color}>{status}</CBadge>
//   }

//   const handleNavigate = (applicant) => {
//     if (sourceComponent === 'closed') {
//     } else {
//       navigate('/base/progress', { state: { applicant } })
//     }
//   }

//   if (isLoading) {
//     return <p>Loading applications...</p>
//   }

//   if (error) {
//     return <p>Error fetching applications: {error}</p>
//   }

//   // Function to export applicants to Excel
//   const exportToExcel = (data) => {
//     const exportData = data.map((applicant) => ({
//       Firstname: applicant.firstname,
//       Middlename: applicant.middlename,
//       Lastname: applicant.lastname,
//       Email: applicant.email,
//       Phone: applicant.phone,
//       AppliedAt: applicant.applied_at,
//     }))

//     const worksheet = XLSX.utils.json_to_sheet(exportData)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants')
//     XLSX.writeFile(workbook, 'submitted_applicants.xlsx')
//   }

//   return (
//     <CRow>
//       <CCol xs={12}>
//         <CCard className="mb-4">
//           <CCardHeader>Applicants List</CCardHeader>

//           <CCardBody>
//             <CButton
//               color="primary"
//               onClick={() => exportToExcel(applicants)}
//               style={{ marginBottom: '20px' }}
//             >
//               Export Submitted Applicants
//             </CButton>
//             <CListGroup>
//               {applicants.length > 0 ? (
//                 applicants.map((applicant, index) => (
//                   <CListGroupItem
//                     key={index}
//                     onClick={() => handleNavigate(applicant)}
//                     className="d-flex justify-content-between align-items-center"
//                   >
//                     <div>
//                       <strong>{`${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`}</strong>
//                       <div className="text-muted small">
//                         Applied on: {new Date(applicant.applied_at).toLocaleDateString()}
//                       </div>
//                     </div>
//                     {renderStatusBadge(applicant.status)}
//                   </CListGroupItem>
//                 ))
//               ) : (
//                 <p>No applications found for this job.</p>
//               )}
//             </CListGroup>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default ListGroups

// // export default ListGroups

import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { useTable, useSortBy, useFilters } from 'react-table'

const ListGroups = () => {
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterDate, setFilterDate] = useState('')

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const jobId = searchParams.get('job_id') // Capture the job_id from the URL query params
  const sourceComponent = searchParams.get('source')
  const navigate = useNavigate()

  console.log('applicants data', applicants)
  // Function to fetch applications for the specific job
  const fetchApplications = async (jobId) => {
    try {
      const response = await fetch(`http://10.1.12.40:5000/api/applications/${jobId}`)
      if (!response.ok) {
        throw new Error('Failed to fetch applications')
      }
      const data = await response.json()

      // Filter applications based on the sourceComponent
      let submittedApplicants
      if (sourceComponent === 'closed') {
        submittedApplicants = data.filter((applicant) => applicant.status === 'further')
      } else {
        submittedApplicants = data.filter((applicant) => applicant.status === 'submitted')
      }
      setApplicants(submittedApplicants)
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (jobId) {
      fetchApplications(jobId) // Fetch applications when jobId is available
    }
  }, [jobId])

  // Function to render a badge based on the application status
  const renderStatusBadge = (status) => {
    let color = 'secondary'
    if (status === 'Approved') color = 'success'
    else if (status === 'Pending') color = 'warning'
    else if (status === 'Rejected') color = 'danger'

    return <CBadge color={color}>{status}</CBadge>
  }

  const handleNavigate = (applicant) => {
    if (sourceComponent === 'closed') {
    } else {
      navigate('/base/progress', { state: { applicant } })
    }
  }

  // Function to export applicants to Excel
  const exportToExcel = (data) => {
    const exportData = data.map((applicant) => ({
      Firstname: applicant.firstname,
      Middlename: applicant.middlename,
      Lastname: applicant.lastname,
      Email: applicant.email,
      Phone: applicant.phone,
      AppliedAt: applicant.applied_at,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants')
    XLSX.writeFile(workbook, 'submitted_applicants.xlsx')
  }

  // Date filter function
  const filterByDate = (rows, id, filterValue) => {
    return rows.filter((row) => {
      const dateApplied = row.values.applied_at.split('T')[0] // Assuming 'applied_at' is in ISO format
      return dateApplied === filterValue
    })
  }

  // Define the table columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'Full Name',
        accessor: (applicant) =>
          `${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`,
        sortType: 'basic',
      },
      {
        Header: 'Applied On',
        accessor: 'applied_at',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
        disableFilters: false,
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => renderStatusBadge(value),
      },
      {
        Header: 'Age',
        accessor: (applicant) => {
          applicant.age
        },
        sortType: 'basic',
      },
    ],
    [],
  )

  // Use React Table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
    state: { sortBy },
  } = useTable(
    {
      columns,
      data: applicants,
      initialState: {
        sortBy: [{ id: 'Full Name', desc: false }],
        filters: [],
      },
      filterTypes: {
        date: filterByDate,
      },
    },
    useFilters, // For filtering
    useSortBy, // For sorting
  )

  // Handle date filter change
  const handleDateChange = (event) => {
    setFilter('applied_at', event.target.value)
    setFilterDate(event.target.value)
  }

  if (isLoading) {
    return <p>Loading applications...</p>
  }

  if (error) {
    return <p>Error fetching applications: {error}</p>
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>Applicants List</CCardHeader>

          <CCardBody>
            <CButton
              color="primary"
              onClick={() => exportToExcel(applicants)}
              style={{ marginBottom: '20px' }}
            >
              Export Submitted Applicants
            </CButton>

            {/* Date Filter Input */}
            <div style={{ marginBottom: '10px' }}>
              <label htmlFor="date-filter">Filter by Applied Date:</label>
              <input
                type="date"
                id="date-filter"
                value={filterDate}
                onChange={handleDateChange}
                style={{ marginLeft: '10px' }}
              />
            </div>

            <table {...getTableProps()} style={{ width: '100%' }}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          cursor: 'pointer',
                          padding: '8px',
                          textAlign: 'left',
                        }}
                      >
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row)
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} style={{ padding: '8px' }}>
                          {cell.render('Cell')}
                        </td>
                      ))}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListGroups
