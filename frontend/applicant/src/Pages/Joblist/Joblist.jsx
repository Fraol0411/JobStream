import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from'./Joblist.module.scss'
import Jobcard from '../../Component/Jobcard/Jobcard';
import { useQuery } from 'react-query';
import { ClimbingBoxLoader } from 'react-spinners';
import { CircleLoader } from 'react-spinners';
import { useUser } from '../../UserContext';


// Fetch job data from the backend
const fetchJobs = async () => {
  // console.log('first or letter',user)
  const res = await fetch('http://localhost:5000/api/jobs/alljobs');
  console.log("check")
  console.log(res)
  if (!res.ok) {
    throw new Error('Failed to fetch jobs');
  }

    // Simulate a delay
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2-second delay


  return res.json();
};

export default function Joblist() {
  
  const { user } = useUser();
  console.log('global user',user)

  // Use React Query to fetch the job data
  const { data, error, isLoading } = useQuery({
    queryKey: ['jobs'],    // The key for this query
    queryFn: fetchJobs      // The function to fetch the data
  });

  if (isLoading) {
    return (
      <div className={styles.loader}>
        <CircleLoader size={105} color={"#123abc"} />
        <p>featching available jobs </p>
      </div>
    );
  }
  if (error) {
    return <div>Error fetching jobs: {error.message}</div>;
  }
  


  return (
    <div className={styles.joblist}>
      <div className={styles.containerrr}>
        {/* <div className={styles.headerarea}>

          <div className={styles.filterarea}>
             
                  <div className={styles.filterby}>
                      <div className={styles.typedrop}>
                        <span>sortby: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Full-Time</option>
                            <option value="">Part-Time</option>
                            <option value="">Contrat</option> 
                          </select>
                        </div>
                      </div>

                      <div className={styles.typedrop}>
                        <span>Role: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Manager</option>
                            <option value="">Underwriter</option>
                            <option value="">information technology</option>
                          </select>                          
                        </div>

                      </div>

                      <div className={styles.filterbtn}>
                        <button>Search</button>
                      </div>
                 
                </div>
          </div>
        </div> */}

        <div className={styles.jobcards}>
          <div className={styles.cardholder}>
            {
              data.map((job)=>(
                <Jobcard
                id={job.job_id}
                title={job.title}
                department={job.department}
                dutystation={job.dutystation}
                description={job.description}
                requirements={job.requirements}
                jobtype={job.jobtype}
                status={job.status}
                created_by={job.created_by}
                salary={job.salary}
                qualification={job.qualification}
                responsibilities={job.responsibilities}
                deadline={job.deadline}
                contact={job.contact}
                benefits={job.benefits}
                />
              ))
            }   
          </div>
        </div>
        
      </div>
    </div>
  )
}
