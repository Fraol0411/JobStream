import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Joblist.module.scss";
import Jobcard from "../../Component/Jobcard/Jobcard";
import { useQuery } from "react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { CircleLoader } from "react-spinners";
import { useUser } from "../../UserContext";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch job data from the backend
const fetchJobs = async (title) => {
  const url = title
    ? `${API_BASE_URL}/jobs/byname/${title}`
    : `${API_BASE_URL}/jobs/alljobs`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Failed to fetch jobs");
  }

  // Simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000)); // 1-second delay

  return res.json();
};

export default function Joblist() {
  const { user } = useUser();
  console.log("global user", user);

  // Retrieve title from query params
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get("title");

  // Use React Query to fetch the job data with `title` as a dependency
  const { data, error, isLoading } = useQuery({
    queryKey: ["jobs", title],
    queryFn: () => fetchJobs(title), // Pass the title to fetchJobs
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

  console.log("for search ", title);

  return (
    <div className={styles.joblist}>
      <div className={styles.containerrr}>
        <div className={styles.jobcards}>
          <div className={styles.cardholder}>
            {data
              .filter((job) => job.jobtype === user.applyfor) // Filter jobs where jobtype matches user.applyfor
              .map((job) => (
                <Jobcard
                  key={job.job_id} // Always add a unique key when mapping over elements
                  id={job.job_id}
                  title={job.title}
                  dutystation={job.dutystation}
                  description={job.description}
                  requirements={job.requirements}
                  jobtype={job.jobtype}
                  status={job.status}
                  created_by={job.created_by}
                  salary={job.salary}
                  qualification={job.qualification}
                  deadline={job.deadline}
                  contact={job.contact}
                  age={job.age}
                  req_no={job.req_no}
                  termof_emp={job.termof_emp}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
