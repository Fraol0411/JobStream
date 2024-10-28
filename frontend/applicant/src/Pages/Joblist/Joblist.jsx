import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Joblist.module.scss";
import Jobcard from "../../Component/Jobcard/Jobcard";
import { useQuery } from "react-query";
import { ClimbingBoxLoader } from "react-spinners";
import { CircleLoader } from "react-spinners";
import { useUser } from "../../UserContext";

// Fetch job data from the backend
const fetchJobs = async (title) => {
  const url = title
    ? `http://localhost:5000/api/jobs/byname/${title}`
    : "http://localhost:5000/api/jobs/alljobs";

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
            {data.map((job) => (
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
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
