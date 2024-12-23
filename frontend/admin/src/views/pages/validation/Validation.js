import React, { useEffect, useState, createRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
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
  CDropdownToggle,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CHeader,
  CContainer,
  CFormInput,
  CFormCheck,
} from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { useNavigate } from 'react-router-dom' // Import useNavigate from react-router-dom
import { CircleLoader } from 'react-spinners'

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

const fetchEducationLevels = async () => {
  const response = await fetch(`${API_BASE_URL}/academic/highest/level`)
  if (!response.ok) {
    throw new Error('Failed to fetch education levels')
  }
  return response.json()
}

const fetchFieldsOfStudy = async () => {
  const response = await fetch(`${API_BASE_URL}/academic/field/study`)
  if (!response.ok) {
    throw new Error('Failed to fetch fields of study')
  }

  return response.json()
}

const Colors = () => {
  const [university, setUniversity] = useState([])
  const [field, setField] = useState([])
  const [highest, setHighest] = useState([])
  const [selectedItem, setSelectedItem] = useState('')
  const [editing, setEditing] = useState(false)
  const [editedValue, setEditedValue] = useState()
  const [editingId, setEditingId] = useState(null)
  const [type, setType] = useState()

  console.log('data', university)
  console.log('data1', field)
  console.log('data2', highest)
  console.log('type', type)

  const handleItemClick = (item) => {
    setSelectedItem(item)
  }

  /********************************* */
  const fetchInstitutions = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academic/institution0/type`)
      if (!response.ok) {
        throw new Error('Failed to fetch institutions')
      }

      const data = await response.json() // Parse response to JSON
      setUniversity(data) // Use the parsed data to set state
    } catch (error) {
      console.error('Error fetching institutions:', error)
    }
  }

  const fetchFieldsOfStudy = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academic/field0/study`)
      if (!response.ok) {
        throw new Error('failed to fetch')
      }
      const data = await response.json()
      setField(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const fetchEducationLevels = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academic/highest0/level`)
      if (!response.ok) {
        throw new Error('failed to fetch')
      }
      const data = await response.json()
      setHighest(data)
    } catch (error) {
      console.log('error', error)
    }
  }

  const updateValidation = async (value, id) => {
    console.log('editedf', value, id)
    const jobId = id
    if (selectedItem === 'field of study') {
      try {
        const response = await fetch(`${API_BASE_URL}/academic/updatefield/${jobId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: jobId, // Sending the jobId
            value: editedValue, // Sending the updated value
          }),
        })

        if (response.ok) {
          console.log('Job field updated successfully')
          // Optionally refetch the data or update the UI
        } else {
          console.error('Failed to update the job field')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    } else if (selectedItem === 'Institution') {
      try {
        const response = await fetch(`${API_BASE_URL}/academic/updateinstitution/${jobId}`, {
          // Corrected URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: jobId,
            value: editedValue,
            value2: type,
          }), // Sending the jobId in the body
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
    } else {
      try {
        const response = await fetch(`${API_BASE_URL}/academic/updatelevel/${jobId}`, {
          // Corrected URL
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: jobId, value: editedValue }), // Sending the jobId in the body
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
  }

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchInstitutions()
    fetchEducationLevels()
    fetchFieldsOfStudy()
  }, [])

  /*********************************** */

  const handleEdit = (value, id) => {
    setEditing(!editing)
    setEditingId(id)
  }

  const handleupdate = async (id) => {
    await updateValidation(editedValue, id) // Update the data on the backend
    setEditing(!editing) // Toggle the editing state
    fetchInstitutions()
    fetchEducationLevels()
    fetchFieldsOfStudy()
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Dropdown Data Correction page</CCardHeader>
        <CContainer>
          <CHeader className="mb-4">Selected: {selectedItem || 'None'} </CHeader>
          <CDropdown>
            <CDropdownToggle color="primary">Select an Institution</CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem onClick={() => handleItemClick('Institution')}>
                Correct Institution
              </CDropdownItem>
              <CDropdownItem onClick={() => handleItemClick('highest level')}>
                Correct Highest Level Of Education
              </CDropdownItem>
              <CDropdownItem onClick={() => handleItemClick('field of study')}>
                Correct Field of Study
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CContainer>

        {/* Conditional rendering based on selectedItem */}
        {selectedItem === 'Institution' && (
          <CCardBody>
            <CTable align="middle" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Institution Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Institution Type</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Update</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {university.map((data) => (
                  <CTableRow key={data.id} style={{ cursor: 'pointer' }}>
                    <CTableDataCell>{data.institution_name}</CTableDataCell>
                    <CTableDataCell>
                      {editingId == data.id ? (
                        <>
                          <CFormInput
                            value={editingId === data.id ? editedValue : ''}
                            onChange={(e) => {
                              if (editingId === data.id) {
                                setEditedValue(e.target.value)
                              }
                            }}
                            placeholder={data.institution_name}
                          />
                          <div>
                            <CFormCheck
                              type="checkbox"
                              id={`governmentCheckbox-${data.id}`} // Unique ID for each row
                              label="Government"
                              checked={type === 'Government'} // Check only if editing this row and type matches
                              onChange={() => {
                                setType('Government')
                              }}
                            />
                            <CFormCheck
                              type="checkbox"
                              id={`privateCheckbox-${data.id}`} // Unique ID for each row
                              label="Private"
                              checked={type === 'Private'} // Check only if editing this row and type matches
                              onChange={() => {
                                setType('Private')
                              }}
                            />
                          </div>
                        </>
                      ) : (
                        <CButton
                          style={{ backgroundColor: 'lightgray', marginRight: '6px' }}
                          onClick={() => {
                            handleEdit(data.field, data.id)
                          }}
                        >
                          Edit
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        style={{ backgroundColor: 'gray', marginRight: '6px' }}
                        onClick={() => {
                          handleupdate(data.id)
                        }}
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        )}

        {selectedItem === 'highest level' && (
          <CCardBody>
            <CTable align="middle" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Highest Education Level</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {highest.map((data) => (
                  <CTableRow key={data.id} style={{ cursor: 'pointer' }}>
                    <CTableDataCell>{data.level}</CTableDataCell>
                    <CTableDataCell>
                      {editingId == data.id ? (
                        <CFormInput
                          value={editingId === data.id ? editedValue : ''}
                          onChange={(e) => {
                            if (editingId === data.id) {
                              setEditedValue(e.target.value)
                            }
                          }}
                          placeholder={data.level}
                        />
                      ) : (
                        <CButton
                          style={{ backgroundColor: 'lightgray', marginRight: '6px' }}
                          onClick={() => {
                            handleEdit(data.field, data.id)
                          }}
                        >
                          Edit
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        style={{ backgroundColor: 'gray', marginRight: '6px' }}
                        onClick={() => {
                          handleupdate(data.id)
                        }}
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        )}

        {selectedItem === 'field of study' && (
          <CCardBody>
            <CTable align="middle" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">Field of Study</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {field.map((data) => (
                  <CTableRow key={data.id} style={{ cursor: 'pointer' }}>
                    <CTableDataCell>{data.field}</CTableDataCell>
                    <CTableDataCell>
                      {editingId == data.id ? (
                        <CFormInput
                          value={editedValue}
                          onChange={(e) => {
                            if (editingId === data.id) {
                              setEditedValue(e.target.value)
                            }
                          }}
                          placeholder={data.field}
                        />
                      ) : (
                        <CButton
                          style={{ backgroundColor: 'lightgray', marginRight: '6px' }}
                          onClick={() => {
                            handleEdit(data.field, data.id)
                          }}
                        >
                          Edit
                        </CButton>
                      )}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        style={{ backgroundColor: 'gray', marginRight: '6px' }}
                        onClick={() => {
                          handleupdate(data.id)
                        }}
                      >
                        Update
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          </CCardBody>
        )}
      </CCard>
    </>
  )
}

export default Colors
