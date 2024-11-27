import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useMutation } from '@tanstack/react-query';
import { useMutation } from "react-query";
import "@fortawesome/fontawesome-free/css/all.min.css";
import styles from "./Login.module.scss";
import { useUser } from "../../UserContext";
// Function to handle login API request
// 'http://localhost:5000/api/auth/login',

const loginUser = async (loginData, setUser) => {
  try {
    const response = await fetch("http://10.1.12.40:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      throw new Error("Login failed: " + response.statusText);
    }

    const data = await response.json(); // Get the response data
    console.log("login data", data.user);

    if (data.user) {
      // Set the user data in context
      // Assuming 'data.user' contains the user object
      console.log("reached here");
    } else {
      throw new Error("User data is missing in response");
    }

    return data.user; // Return data if needed for further use
  } catch (error) {
    console.error("Error during login:", error);
    throw error; // Re-throw the error for further handling
  }
};

// Function to handle registration API request
const registerUser = async (registerData) => {
  const response = await fetch("http://10.1.12.40:5000/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
};

export default function LoginForm() {
  const navigate = useNavigate();
  const activeRef = useRef();
  const { setUser } = useUser();

  // State variables for form inputs and errors
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
    role: "applicant",
    applyfor: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const confirmPassword = useRef(null);

  console.log(registerData);

  // Handle login mutation
  const loginMutation = useMutation(loginUser, {
    onSuccess: (data) => {
      console.log("Login successful:", data);
      // Handle successful login (e.g., redirect, save token)
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/home");
    },

    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  // Handle registration mutation
  const registerMutation = useMutation(registerUser, {
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      // Handle successful registration (e.g., redirect, display success message)
      navigate("/");
      window.location.reload();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const showNavbar = () => {
    activeRef.current.classList.toggle("signupmode");
  };

  // Handle login submission
  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate(loginData); // Call login mutation
  };

  // Handle registration submission
  const handleRegister = (e) => {
    e.preventDefault();

    const confirmPass = confirmPassword.current.value;

    if (confirmPass !== registerData.password) {
      setErrorMessage("Passwords do not match");
      return;
    }

    registerMutation.mutate(registerData);
  };
  return (
    <div className={`${styles.container} ${styles.sinnupmode}`} ref={activeRef}>
      <div className={styles.formcontainer}>
        <div className={styles.signinSingup}>
          {/* Sign in part */}
          <form className={styles.signinForm} onSubmit={handleLogin}>
            <img className={styles.logoimg} src="/images/logo.png" alt="" />
            <h2 className={styles.title}>Sign in</h2>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="email"
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </div>
            <input
              type="submit"
              value="Login"
              className={`${styles.btn} ${styles.solid}`}
            />
          </form>

          {/* Sign up part */}
          <form className={styles.signupForm} onSubmit={handleRegister}>
            <img className={styles.logoimg} src="/images/logo.png" alt="" />
            <h2 className={styles.title}>Sign Up</h2>
            <div className={styles.inputField}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
                }
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </div>
            <div className={styles.inputField}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="name"
                ref={confirmPassword}
              />
            </div>
            <div className={styles.dropdown}>
              <i className="fas fa-file"></i>
              <label htmlFor="">Applicant</label>
              <select
                value={registerData.applyfor} // Set the initial value to "" in the state
                onChange={(e) =>
                  setRegisterData({ ...registerData, applyfor: e.target.value })
                }
              >
                <option
                  value=""
                  disabled
                  style={{ color: "gray", backgroundColor: "blue" }}
                >
                  Select from below
                </option>
                <option value="Fresh Graduate">Fresh Graduate</option>
                <option value="External Applicant">External Applicant</option>
                <option value="Awash Staff">Awash Staff</option>
              </select>
            </div>

            <input
              type="submit"
              value="Sign Up"
              className={`${styles.btn} ${styles.solid}`}
            />
            <p>{errorMessage}</p>
          </form>
        </div>
      </div>
      <div className={styles.panelscontainer}>
        <div className={`${styles.panel} ${styles.leftpanel}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>
              Register for the Awash Insurance job portal and follow up on new
              vacancies.
            </p>
            <button
              onClick={showNavbar}
              className={`${styles.btn} ${styles.transparent}`}
            >
              Sign Up
            </button>
          </div>
          <img src="images/logimg1.svg" className={styles.image} alt="" />
        </div>
        <div className={`${styles.panel} ${styles.rightpanel}`}>
          <div className={styles.content}>
            <h3>One of Us?</h3>
            <p>Already enrolled in the Awash Insurance Job Portal.</p>
            <button
              onClick={showNavbar}
              className={`${styles.btn} ${styles.transparent}`}
            >
              Sign In
            </button>
          </div>
          <img src="images/logimg2.svg" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
}
