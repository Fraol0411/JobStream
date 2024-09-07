import React from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import styles from'./Joblist.module.scss'
import Jobcard from '../../Component/Jobcard/Jobcard';
export default function Joblist() {

  const jobs = [
    {
      id: 1,
      title: "Branch Manager",
      location: "Addis Ababa",
      description: "Branch manager needed for Addis Ababa Gotera branch. Must have a minimum of 4+ years of experience.",
    },
    {
      id: 2,
      title: "Software Engineer",
      location: "Bahir Dar",
      description: "We are looking for a software engineer proficient in JavaScript, React, and Node.js. Minimum 3+ years of experience.",
    },
    {
      id: 3,
      title: "Sales Executive",
      location: "Adama",
      description: "Sales executive needed for our new branch in Adama. Must have great communication and negotiation skills.",
    },
    {
      id: 4,
      title: "Marketing Specialist",
      location: "Hawassa",
      description: "Seeking a marketing specialist with experience in digital marketing strategies and SEO. 2+ years of experience required.",
    },
    {
      id: 5,
      title: "Human Resources Manager",
      location: "Dire Dawa",
      description: "HR manager needed to oversee recruitment and employee welfare. 5+ years of experience in HR is a must.",
    },
    {
      id: 6,
      title: "Data Analyst",
      location: "Mekelle",
      description: "Looking for a data analyst to help the company analyze and interpret data trends. Proficiency in Python and SQL required.",
    },
    {
      id: 7,
      title: "Project Manager",
      location: "Gondar",
      description: "Experienced project manager needed to lead large-scale company initiatives. PMP certification preferred.",
    },
    {
      id: 8,
      title: "Customer Support Specialist",
      location: "Jimma",
      description: "Customer support specialist required for our call center in Jimma. Excellent communication skills are essential.",
    },
    {
      id: 9,
      title: "Financial Analyst",
      location: "Harar",
      description: "Seeking a financial analyst with experience in financial modeling and forecasting. 3+ years of experience required.",
    },
    {
      id: 10,
      title: "UX/UI Designer",
      location: "Addis Ababa",
      description: "We are hiring a UX/UI designer to improve our digital products. Experience with Figma or Adobe XD is a plus.",
    }
  ];
  

  return (
    <div className={styles.joblist}>
      <div className={styles.containerrr}>
        <div className={styles.headerarea}>

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
                        <span>Level: </span>
                        <div className={styles.selectdropdown}>
                          <select name="" id="">
                            <option value="">All</option>
                            <option value="">Senior</option>
                            <option value="">Joniur</option>
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
        </div>

        <div className={styles.jobcards}>
          <div className={styles.cardholder}>
            {
              jobs.map((job)=>(
                <Jobcard
                key={job.id}
                title={job.title}
                location={job.location}
                description={job.description}
                />
              ))
            }   
          </div>
        </div>
        
      </div>
    </div>
  )
}
