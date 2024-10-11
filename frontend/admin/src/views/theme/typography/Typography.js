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

const Colors = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Sample data for job vacancies
  const vacancies = [
    { id: 1, title: 'Software Developer', department: 'IT', location: 'New York', status: 'Active', check:'VIew' },
    { id: 2, title: 'Product Manager', department: 'Management', location: 'San Francisco', status: 'Active' , check:'VIew' },
    { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Los Angeles', status: 'Active' , check:'VIew'},
    { id: 4, title: 'Data Analyst', department: 'Analytics', location: 'Chicago', status: 'Active', check:'VIew' },
    { id: 5, title: 'DevOps Engineer', department: 'IT', location: 'Seattle', status: 'Active', check:'VIew' },
    { id: 6, title: 'Marketing Specialist', department: 'Marketing', location: 'Boston', status: 'Active' , check:'VIew'},
    { id: 7, title: 'HR Manager', department: 'HR', location: 'Austin', status: 'Active' , check:'VIew'},
    { id: 8, title: 'Sales Executive', department: 'Sales', location: 'Denver', status: 'Active' , check:'VIew' },
    { id: 9, title: 'Customer Support', department: 'Support', location: 'Houston', status: 'Active' , check:'VIew'},
    { id: 10, title: 'Network Engineer', department: 'IT', location: 'Phoenix', status: 'Active' , check:'VIew'},
  ];

  // Function to handle row click
  const handleRowClick = () => {
    navigate('/base/list-groups');
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
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                <CTableHeaderCell scope="col">Department</CTableHeaderCell>
                <CTableHeaderCell scope="col">Location</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {vacancies.map((vacancy) => (
                <CTableRow key={vacancy.id} onClick={handleRowClick} style={{ cursor: 'pointer' }}>
                  <CTableDataCell>{vacancy.id}</CTableDataCell>
                  <CTableDataCell>{vacancy.title}</CTableDataCell>
                  <CTableDataCell>{vacancy.department}</CTableDataCell>
                  <CTableDataCell>{vacancy.location}</CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="success">{vacancy.status}</CBadge>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CBadge color="danger">{vacancy.check}</CBadge>
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
