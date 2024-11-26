// /*************************/
// import React, { useEffect, useState } from 'react'
// import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import * as XLSX from 'xlsx'
// import { useTable, useSortBy, useFilters } from 'react-table'

// const ListGroups = () => {
//   const [applicants, setApplicants] = useState([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState(null)

//   const location = useLocation()
//   const searchParams = new URLSearchParams(location.search)
//   const jobId = searchParams.get('job_id')
//   const sourceComponent = searchParams.get('source')
//   const navigate = useNavigate()

//   // Fetching applications data
//   const fetchApplications = async (jobId) => {
//     try {
//       const response = await fetch(`http://10.1.12.40:5000/api/applications/${jobId}`)
//       if (response.status === 404) {
//         setError('No applications found for this job')
//         return
//       }
//       if (!response.ok) throw new Error('Failed to fetch applications')

//       const data = await response.json()

//       // Filter data based on sourceComponent
//       const submittedApplicants =
//         sourceComponent === 'closed'
//           ? data.filter((applicant) => applicant.status === 'further')
//           : data.filter((applicant) => applicant.status === 'submitted')

//       setApplicants(submittedApplicants)

//       console.log('applicabts data list ', submittedApplicants)
//     } catch (error) {
//       setError(error.message)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   useEffect(() => {
//     if (jobId) fetchApplications(jobId)
//   }, [jobId])

//   // Render status badge
//   const renderStatusBadge = (status) => {
//     let color = 'secondary'
//     if (status === 'Approved') color = 'success'
//     else if (status === 'Pending') color = 'warning'
//     else if (status === 'Rejected') color = 'danger'
//     return <CBadge color={color}>{status}</CBadge>
//   }

//   // Export data to Excel
//   const exportToExcel = () => {
//     const exportData = rows.map((row) => ({
//       'Full Name': `${row.original.firstname} ${row.original.middlename} ${row.original.lastname}`,
//       'Applied On': new Date(row.original.applied_at).toLocaleDateString(),
//       Phone: row.original.phone,
//       Email: row.original.email,
//       Age: row.original.age,
//       Gender: row.original.gender,
//       'Experience (Years)': row.original.total_experience_years,
//       'Field of Study': row.original.field,
//       Institution: row.original.university,
//       CGPA: row.original.cgpa,
//       'Year of Graduation': row.original.completed_year,
//       'Institution Type': row.original.university_type,
//     }))

//     const worksheet = XLSX.utils.json_to_sheet(exportData)
//     const workbook = XLSX.utils.book_new()
//     XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Applicants')

//     XLSX.writeFile(workbook, 'filtered_applicants.xlsx')
//   }

//   const filterLessThan = (rows, id, filterValue) => {
//     if (!filterValue) return rows // If filterValue is empty, return all rows
//     return rows.filter((row) => row.values[id] <= filterValue)
//   }

//   const filterGreaterThan = (rows, id, filterValue) => {
//     return rows.filter((row) => row.values[id] >= filterValue)
//   }

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: 'Full Name',
//         accessor: (applicant) =>
//           `${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`,
//       },
//       {
//         Header: 'Applied On',
//         accessor: 'applied_at',
//         Cell: ({ value }) => new Date(value).toLocaleDateString(),
//       },
//       { Header: 'Age', accessor: 'age', filter: filterLessThan },
//       { Header: 'Gender', accessor: 'gender' },
//       {
//         Header: 'Experience (Years)',
//         accessor: 'total_experience_years',
//         filter: filterGreaterThan,
//       },
//       { Header: 'Field of Study', accessor: 'field' },
//       { Header: 'Institution', accessor: 'university' },
//       { Header: 'CGPA', accessor: 'cgpa', filter: filterGreaterThan },
//       { Header: 'Year of Graduation', accessor: 'completed_year', filter: filterGreaterThan },
//       { Header: 'Institution Type', accessor: 'university_type' },
//     ],
//     [],
//   )

//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = useTable(
//     {
//       columns,
//       data: applicants,
//       initialState: { filters: [] },
//     },
//     useFilters,
//     useSortBy,
//   )

//   if (isLoading) return <p>Loading applications...</p>
//   if (error) return <p>{error}</p>
//   if (applicants.length === 0) return <p>No applications found for this job.</p>

//   const handleNavigate = (applicant) => {
//     if (sourceComponent === 'closed') {
//       // Do nothing if source is "closed"
//     } else {
//       navigate('/base/progress', { state: { applicant } })
//     }
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

//             {/* Render filter section only if sourceComponent is not "closed" */}
//             {sourceComponent !== 'closed' && (
//               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
//                 <div
//                   style={{
//                     display: 'flex',
//                     flexWrap: 'wrap',
//                     gap: '20px',
//                     marginBottom: '20px',
//                     backgroundColor: '#f9f9f9', // Light background for the entire section
//                     padding: '20px', // Padding for the entire filter container
//                     borderRadius: '8px', // Rounded corners
//                     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
//                   }}
//                 >
//                   {[
//                     { label: 'Filter by Age (below):', filter: 'age' },
//                     { label: 'Filter by gender:', filter: 'gender' },
//                     { label: 'Filter by Field of Study:', filter: 'field_of_study' },
//                     { label: 'Filter by Experience (Years):', filter: 'total_experience_years' },
//                     { label: 'Filter by GPA:', filter: 'cgpa' },
//                     { label: 'Filter by Institution:', filter: 'university' },
//                     { label: 'Filter by Year of Graduation:', filter: 'completed_year' },
//                     { label: 'Filter by Institution Type:', filter: 'university_type' },
//                   ].map(({ label, filter }, index) => (
//                     <div
//                       key={index}
//                       style={{
//                         display: 'flex',
//                         flexDirection: 'column',
//                         alignItems: 'flex-start',
//                         padding: '10px',
//                         backgroundColor: '#ffffff', // White background for each filter block
//                         borderRadius: '6px',
//                         boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//                         minWidth: '200px',
//                       }}
//                     >
//                       <label style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
//                         {label}
//                       </label>
//                       <input
//                         type="text"
//                         onChange={(e) =>
//                           setFilter(
//                             filter,
//                             e.target.value
//                               ? filter === 'age' ||
//                                 filter === 'sex' ||
//                                 filter === 'total_experience_years' ||
//                                 filter === 'completed_year' ||
//                                 filter === 'cgpa'
//                                 ? Number(e.target.value)
//                                 : e.target.value
//                               : undefined,
//                           )
//                         }
//                         style={{
//                           width: '100%',
//                           padding: '8px',
//                           fontSize: '14px',
//                           borderRadius: '4px',
//                           border: '1px solid #ccc',
//                         }}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Table */}
//             <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
//               <thead
//                 style={{
//                   backgroundColor: '#f4f4f4',
//                   borderBottom: '2px solid #ddd',
//                   fontWeight: 'bold',
//                 }}
//               >
//                 {headerGroups.map((headerGroup) => (
//                   <tr {...headerGroup.getHeaderGroupProps()}>
//                     {headerGroup.headers.map((column) => (
//                       <th
//                         {...column.getHeaderProps(column.getSortByToggleProps())}
//                         style={{
//                           padding: '10px',
//                           textAlign: 'left',
//                           cursor: 'pointer',
//                         }}
//                       >
//                         {column.render('Header')}
//                         {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody {...getTableBodyProps()} style={{ backgroundColor: '#fff' }}>
//                 {rows.length > 0 ? (
//                   rows.map((row) => {
//                     prepareRow(row)
//                     return (
//                       <tr
//                         {...row.getRowProps()}
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => handleNavigate(row.original)}
//                       >
//                         {row.cells.map((cell) => (
//                           <td
//                             {...cell.getCellProps()}
//                             style={{
//                               padding: '10px',
//                               borderBottom: '1px solid #ddd',
//                             }}
//                           >
//                             {cell.render('Cell')}
//                           </td>
//                         ))}
//                       </tr>
//                     )
//                   })
//                 ) : (
//                   <tr>
//                     <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
//                       No applications yet
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </CCardBody>
//         </CCard>
//       </CCol>
//     </CRow>
//   )
// }

// export default ListGroups

/*******************************************/

/*************************/
import React, { useEffect, useState } from 'react'
import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as XLSX from 'xlsx'
import { useTable, useSortBy, useFilters } from 'react-table'

const ListGroups = () => {
  const [applicants, setApplicants] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [deduplicatedApplicants, setDeduplicatedApplicants] = useState([])

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const jobId = searchParams.get('job_id')
  const jobtype = searchParams.get('jobtype')
  const sourceComponent = searchParams.get('source')
  const navigate = useNavigate()

  // Fetching applications data
  const fetchApplications = async (jobId) => {
    try {
      const response = await fetch(`http://10.1.12.40:5000/api/applications/${jobId}`)
      if (response.status === 404) {
        setError('No applications found for this job')
        return
      }
      if (!response.ok) throw new Error('Failed to fetch applications')

      const data = await response.json()

      // Filter data based on sourceComponent
      const submittedApplicants =
        sourceComponent === 'closed'
          ? data.filter((applicant) => applicant.status === 'further')
          : data.filter((applicant) => applicant.status === 'submitted')

      // Deduplicate applications based on application_id
      const uniqueApplications = []
      const seenApplicationIds = new Set()

      submittedApplicants.forEach((applicant) => {
        if (!seenApplicationIds.has(applicant.application_id)) {
          uniqueApplications.push(applicant)
          seenApplicationIds.add(applicant.application_id)
        }
      })

      console.log('Unique Applications Before Setting State:', uniqueApplications)
      setApplicants(submittedApplicants) // Full data for filtering
      setDeduplicatedApplicants(uniqueApplications) // Data for rendering
    } catch (error) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  // Watch deduplicatedApplicants for changes
  useEffect(() => {
    console.log('Updated deduplicatedApplicants:', deduplicatedApplicants)
  }, [deduplicatedApplicants])

  useEffect(() => {
    if (jobId) fetchApplications(jobId)
  }, [jobId])

  // Render status badge
  const renderStatusBadge = (status) => {
    let color = 'secondary'
    if (status === 'Approved') color = 'success'
    else if (status === 'Pending') color = 'warning'
    else if (status === 'Rejected') color = 'danger'
    return <CBadge color={color}>{status}</CBadge>
  }

  // Export data to Excel
  const exportToExcel = () => {
    const exportData = rows.map((row) => ({
      'Full Name': `${row.original.firstname} ${row.original.middlename} ${row.original.lastname}`,
      'Applied On': new Date(row.original.applied_at).toLocaleDateString(),
      Phone: row.original.phone,
      Email: row.original.email,
      Age: row.original.age,
      Gender: row.original.gender,
      'Experience (Years)': row.original.total_experience_years,
      'Field of Study': row.original.field,
      Institution: row.original.university,
      CGPA: row.original.cgpa,
      'Year of Graduation': row.original.completed_year,
      'Institution Type': row.original.university_type,
    }))

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Filtered Applicants')

    XLSX.writeFile(workbook, 'filtered_applicants.xlsx')
  }

  const filterLessThan = (rows, id, filterValue) => {
    if (!filterValue) return rows // If filterValue is empty, return all rows
    return rows.filter((row) => row.values[id] <= filterValue)
  }

  const filterGreaterThan = (rows, id, filterValue) => {
    return rows.filter((row) => row.values[id] >= filterValue)
  }

  const columns = React.useMemo(() => {
    const baseColumns = [
      {
        Header: 'Full Name',
        accessor: (applicant) =>
          `${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`,
      },
      {
        Header: 'Applied On',
        accessor: 'applied_at',
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      { Header: 'Age', accessor: 'age', filter: filterLessThan },
      { Header: 'Gender', accessor: 'gender' },
      {
        Header: 'Experience (Years)',
        accessor: 'total_experience_years',
        filter: filterGreaterThan,
      },
    ]

    // Conditionally include the CGPA column if jobtype === 'freshgraduate'
    if (jobtype === 'Fresh Graduate') {
      baseColumns.push(
        {
          Header: 'CGPA',
          accessor: 'cgpa',
          filter: filterGreaterThan,
        },
        { Header: 'Field of Study', accessor: 'field' },
        { Header: 'Institution', accessor: 'university' },
        { Header: 'Year of Graduation', accessor: 'completed_year', filter: filterGreaterThan },
        { Header: 'Institution Type', accessor: 'university_type' },
      )
    }

    return baseColumns
  }, [jobtype])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, setFilter } = useTable(
    {
      columns,
      data: deduplicatedApplicants,
      initialState: { filters: [] },
    },
    useFilters,
    useSortBy,
  )

  // Filtering logic (operates on full data)
  const filterData = (filters) => {
    const filteredData = applicants.filter((applicant) => {
      // Apply your filtering logic here
      return Object.keys(filters).every((key) => {
        if (!filters[key]) return true
        return String(applicant[key]).toLowerCase().includes(String(filters[key]).toLowerCase())
      })
    })

    // Update deduplicated data after filtering
    const seenApplicationIds = new Set()
    const uniqueFilteredData = filteredData.filter((applicant) => {
      if (!seenApplicationIds.has(applicant.application_id)) {
        seenApplicationIds.add(applicant.application_id)
        return true
      }
      return false
    })

    setDeduplicatedApplicants(uniqueFilteredData)
  }

  if (isLoading) return <p>Loading applications...</p>
  if (error) return <p>{error}</p>
  if (applicants.length === 0) return <p>No applications found for this job.</p>

  const handleNavigate = (applicant) => {
    if (sourceComponent === 'closed') {
      // Do nothing if source is "closed"
    } else {
      navigate('/base/progress', { state: { applicant } })
    }
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

            {/* Render filter section only if sourceComponent is not "closed" */}
            {sourceComponent !== 'closed' && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '20px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '20px',
                    marginBottom: '20px',
                    backgroundColor: '#f9f9f9', // Light background for the entire section
                    padding: '20px', // Padding for the entire filter container
                    borderRadius: '8px', // Rounded corners
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
                  }}
                >
                  {[
                    { label: 'Filter by Age (below):', filter: 'age' },
                    { label: 'Filter by gender:', filter: 'gender' },
                    ...(jobtype === 'Fresh Graduate'
                      ? [
                          { label: 'Filter by Field of Study:', filter: 'field' },
                          { label: 'Filter by GPA:', filter: 'cgpa' },
                          { label: 'Filter by Institution:', filter: 'university' },
                          { label: 'Filter by Year of Graduation:', filter: 'completed_year' },
                          { label: 'Filter by Institution Type:', filter: 'university_type' },
                        ]
                      : []),
                    { label: 'Filter by Experience (Years):', filter: 'total_experience_years' },
                  ].map(({ label, filter }, index) => (
                    <div
                      key={index}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        padding: '10px',
                        backgroundColor: '#ffffff', // White background for each filter block
                        borderRadius: '6px',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        minWidth: '200px',
                      }}
                    >
                      <label style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                        {label}
                      </label>
                      <input
                        type="text"
                        onChange={(e) =>
                          setFilter(
                            filter,
                            e.target.value
                              ? [
                                  'age',
                                  'sex',
                                  'total_experience_years',
                                  'completed_year',
                                  'cgpa',
                                ].includes(filter)
                                ? Number(e.target.value)
                                : e.target.value
                              : undefined,
                          )
                        }
                        style={{
                          width: '100%',
                          padding: '8px',
                          fontSize: '14px',
                          borderRadius: '4px',
                          border: '1px solid #ccc',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Table */}
            <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead
                style={{
                  backgroundColor: '#f4f4f4',
                  borderBottom: '2px solid #ddd',
                  fontWeight: 'bold',
                }}
              >
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        style={{
                          padding: '10px',
                          textAlign: 'left',
                          cursor: 'pointer',
                        }}
                      >
                        {column.render('Header')}
                        {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} style={{ backgroundColor: '#fff' }}>
                {rows.length > 0 ? (
                  rows.map((row) => {
                    prepareRow(row)
                    return (
                      <tr
                        {...row.getRowProps()}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleNavigate(row.original)}
                      >
                        {row.cells.map((cell) => (
                          <td
                            {...cell.getCellProps()}
                            style={{
                              padding: '10px',
                              borderBottom: '1px solid #ddd',
                            }}
                          >
                            {cell.render('Cell')}
                          </td>
                        ))}
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                      No applications yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default ListGroups
