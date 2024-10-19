import React, { useEffect, useState } from 'react';
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CListGroup,
  CListGroupItem,
  CRow,
} from '@coreui/react';
import { useNavigate, useLocation } from 'react-router-dom';

const ListGroups = () => {
  const [applicants, setApplicants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(applicants)

  const location = useLocation();
  
  const searchParams = new URLSearchParams(location.search);
  const jobId = searchParams.get('job_id'); // Capture the job_id from the URL query params
  console.log('job id for ',jobId)
  const navigate = useNavigate();

  // Function to fetch applications for the specific job
  const fetchApplications = async (jobId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/applications/${jobId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch applications');
      }

      const data = await response.json();
      setApplicants(data);  // Set fetched applicants to state
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

  const handleNavigate = (applicant,jobId) => {
    navigate('/base/progress', { state: { applicant,jobId } });
  };
  

  if (isLoading) {
    return <p>Loading applications...</p>;
  }

  if (error) {
    return <p>Error fetching applications: {error}</p>;
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            Applicants List
          </CCardHeader>
          <CCardBody>
            <CListGroup>
              {applicants.length > 0 ? (
                applicants.map((applicant, index) => (
                  <CListGroupItem
                    key={index}
                    onClick={() => handleNavigate(applicant,jobId)}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                    <strong>{`${applicant.firstname} ${applicant.lastname}`}</strong>
                      <div className="text-muted small">Applied on: {applicant.applied_at}</div>
                    </div>
                    {renderStatusBadge(applicant.email)}
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

