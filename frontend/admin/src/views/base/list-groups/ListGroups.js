import React, { useEffect, useState } from 'react';
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
} from '@coreui/react';
import { useNavigate, useLocation } from 'react-router-dom';

import * as XLSX from 'xlsx';

const ListGroups = () => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(applicants)

  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('job_id'); // Capture the job_id from the URL query params
  const sourceComponent = searchParams.get('source')
  console.log('job id for ',jobId)
  console.log('source component ',sourceComponent)
  const navigate = useNavigate();

  // Function to fetch applications for the specific job
  const fetchApplications = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${jobId}`);
  
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }
  
      const data = await response.json();
  
      // Filter applications based on the sourceComponent
      let submittedApplicants;
      if (sourceComponent === 'closed') {
        submittedApplicants = data.filter(applicant => applicant.status === 'further');
      } else {
        submittedApplicants = data.filter(applicant => applicant.status === 'submitted');
      }
  
      // Set only the filtered applicants to state
      setApplicants(submittedApplicants);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    if (jobId) {
      fetchApplications(jobId);  // Fetch applications when jobId is available
    }
  }, [jobId]);

  // Function to render a badge based on the application status
  const renderStatusBadge = (status) => {
    let color = 'secondary';
    if (status === 'Approved') color = 'success';
    else if (status === 'Pending') color = 'warning';
    else if (status === 'Rejected') color = 'danger';

    return <CBadge color={color}>{status}</CBadge>;
  };

  const handleNavigate = (applicant) => {
    navigate('/base/progress', { state: { applicant} });
  };
  

  if (isLoading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p>Error fetching applications: {error}</p>;
  }


   // Function to export applicants to Excel
   const exportToExcel = (data) => {
    const exportData = data.map(applicant => ({
      Firstname: applicant.firstname,
      Middlename: applicant.middlename,
      Lastname: applicant.lastname,
      Email: applicant.email,
      Phone: applicant.phone,
      AppliedAt: applicant.applied_at,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Applicants');
    XLSX.writeFile(workbook, 'submitted_applicants.xlsx');
  };




  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            Applicants List
          </CCardHeader>

          <CCardBody>
          <CButton
              color="primary"
              onClick={() => exportToExcel(applicants)}
              style={{ marginBottom: '20px' }}
            >
              Export Submitted Applicants
            </CButton>
            <CListGroup>
              {applicants.length > 0 ? (
                applicants.map((applicant, index) => (
                  <CListGroupItem
                    key={index}
                    onClick={() => handleNavigate(applicant)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                    <strong>{`${applicant.firstname} ${applicant.middlename} ${applicant.lastname}`}</strong>
                      <div className="text-muted small">Applied on: {applicant.applied_at}</div>
                    </div>
                    {renderStatusBadge(applicant.status)}
                  </CListGroupItem>
                ))
              ) : (
                <p>
                  No applications found for this job.
                </p>
              )}
            </CListGroup>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default ListGroups;

