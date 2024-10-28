// import React from "react";
// import { useState } from "react";
// import styles from "./Jobcard.module.scss";
// import JobDetailPopup from "../Jobdeatail/JobDetailPopup";
// import { useNavigate } from "react-router-dom";

// export default function Jobcard({
//   id,
//   title,
//   department,
//   dutystation,
//   description,
//   requirements,
//   jobtype,
//   status,
//   created_by,
//   salary,
//   qualification,
//   responsibilities,
//   deadline,
//   contact,
//   benefits,
// }) {
//   const navigate = useNavigate();

//   const [showPopup, setShowPopup] = useState(false);

//   const handleViewDetailClick = () => {
//     setShowPopup(true); // Show the popup when button is clicked
//   };

//   const handleClosePopup = () => {
//     setShowPopup(false); // Hide the popup when close is clicked
//   };

//   const hanldleNaviagtion = () => {
//     navigate("/application");
//   };
//   return (
//     <div className={styles.card}>
//       <div className={styles.holder}>
//         <div className={styles.head}>
//           <h1>{title}</h1>
//           <h3>{dutystation}</h3>
//         </div>

//         <div className={styles.desc}>
//           <p>
//             <strong>department: </strong>
//             {department}
//           </p>
//           {description}
//         </div>
//         <div className={styles.buttons}>
//           <button onClick={handleViewDetailClick}>View detail</button>
//           {/* <button onClick={hanldleNaviagtion}>Apply Now</button> */}
//         </div>
//       </div>

//       {showPopup && (
//         <JobDetailPopup
//           job={{
//             id,
//             title,
//             department,
//             dutystation,
//             description,
//             requirements,
//             jobtype,
//             status,
//             created_by,
//             salary,
//             qualification,
//             responsibilities,
//             deadline,
//             contact,
//             benefits,
//           }} // Passing the job object
//           onClose={handleClosePopup}
//         />
//       )}
//     </div>
//   );
// }

import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: "rotate(0deg)",
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: "rotate(180deg)",
      },
    },
  ],
}));

export default function Jobcard({
  id,
  title,
  department,
  dutystation,
  description,
  requirements,
  jobtype,
  status,
  created_by,
  salary,
  qualification,
  responsibilities,
  deadline,
  contact,
  benefits,
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const navigate = useNavigate();

  const hanldleNaviagtion = () => {
    navigate(`/application/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Check if the date is valid
    if (isNaN(date)) return dateString;

    return date.toLocaleDateString("en-GB"); // en-GB format is dd-mm-yyyy
  };

  return (
    <Card sx={{ maxWidth: 345 }} style={{ border: "03px solid #f5f5f5" }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            -
          </Avatar>
        }
        action={<IconButton aria-label="settings"></IconButton>}
        title={
          <span style={{ fontWeight: "bold", color: "#333", fontSize: "16px" }}>
            {title}
          </span> // Inline styling for title
        }
        subheader={
          <span style={{ color: "#888", fontSize: "14px" }}>
            {`Deadline: ${formatDate(deadline)}`}
          </span> // Inline styling for subheader
        }
      />

      <CardMedia
        component="img"
        width="100"
        height="100"
        image="images/logo.png"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          <p>job description</p>
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          variant="contained"
          color="primary"
          onClick={hanldleNaviagtion} // Replace with your apply function
        >
          Apply
        </Button>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Requirments:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{requirements}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Qualifications:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{qualification}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Responsibilities:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{responsibilities}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Salary:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{salary}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Benefits:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{benefits}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Contact Information:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>{contact}</Typography>

          <Typography style={{ fontWeight: "bolder" }} sx={{ marginBottom: 1 }}>
            Application Deadline:
          </Typography>
          <Typography sx={{ marginBottom: 3 }}>
            {formatDate(deadline)}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
