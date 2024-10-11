import React, { useEffect, useState, createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
} from '@coreui/react';
import { rgbToHex } from '@coreui/utils';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { CircleLoader } from 'react-spinners';
import { useQuery } from '@tanstack/react-query';



const ThemeView = () => {

  const [color, setColor] = useState('rgb(255, 255, 255)');
  const ref = createRef();

  useEffect(() => {
    const el = ref.current.parentNode.firstChild;
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color');
    setColor(varColor);
  }, [ref]);

  

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
  );
};

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3');
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  );
};

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};



// Fetch job data from the backend
const activeJobs = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/jobs/alljobs');
    
    // Log the entire response for debugging
    console.log("Response: ", res);

    // If response is not okay, log the error
    if (!res.ok) {
      console.error('Failed to fetch jobs', res.status);
      throw new Error('Failed to fetch jobs');
    }

    // Ensure the response is JSON
    const data = await res.json();
    console.log("Fetched Data: ", data);
    return data;
    
  } catch (error) {
    console.error("Error fetching jobs: ", error);
    throw error;  // Ensure React Query can handle this error
  }
};





const Colors = () => {
  const navigate = useNavigate(); // Initialize useNavigate


  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],
    queryFn: activeJobs,
    refetchOnWindowFocus: false,  // Disable refetching on window focus
  });
  
  if (isLoading) {
    return (
      <div className=''>
        <CircleLoader size={105} color={"#123abc"} />
        <p>Fetching available jobs...</p>
      </div>
    );
  }
  
  if (error) {
    return <div>Error fetching jobs: {error.message}</div>;
  }
  
  console.log("Job data:", data); // Make sure this logs the data after successful fetch
  

  // Function to handle row click
// Function to handle row click and pass job_id to list-groups component
const handleRowClick = (job_id) => {
  console.log(job_id)
  navigate(`/base/list-groups?job_id=${job_id}`);
};


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
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Description</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((vacancy) => (
                  <CTableRow key={vacancy.id} onClick={() => handleRowClick(vacancy.job_id)} style={{ cursor: 'pointer' }}>
                      <CTableDataCell>{vacancy.title}</CTableDataCell>
                      <CTableDataCell>{vacancy.department}</CTableDataCell>
                      <CTableDataCell>{vacancy.description}</CTableDataCell>
                      <CTableDataCell>{vacancy.dutystation}</CTableDataCell>
                      <CTableDataCell>
                        <CBadge style={{ backgroundColor: 'white', color: 'black' }}>
                          {vacancy.status}
                        </CBadge>
                      </CTableDataCell>
                  </CTableRow>

              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </>
  );
};

export default Colors;
