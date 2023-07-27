
import React, { useState } from "react";
import axios from "axios";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { setLoginDetails } from "../useRedux/userActions";
import { useDispatch } from "react-redux";
import Logo from "../assets/edu.png";
import Demo from "../assets/smart.png";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { setLoggoedUser } from "../useRedux/user";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [blockedMessage, setBlockedMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/api/login", {
        email,
        password,
      });
      const { status, message, token, role, user } = response.data;

      if (status === "ok") {
        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        console.log("User details:", user);
        dispatch(setLoginDetails(user));
        dispatch(setLoggoedUser(response.data.user));
        console.log("dispatched details", user);

        if (role === "admin") {
          console.log("redirected to admin page");
          navigate("/admin/adminHome");
        } else if (role === "mentor") {
          console.log("redirected into mentor page");
          navigate("/mentor/mentorHome");
        } else {
          console.log("entered into users home");
          navigate("/userHome");
        }
      } else if (status === "blocked") {
        setBlockedMessage(message);
      } else {
        setErrorMessage("User does not exist");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center the-body">
        <MDBCol col="12" lg="6" className="quote-col">
          <div className="image-container">
            <img src={Demo} alt="Education" className="education-image" />
          </div>
        </MDBCol>
        <MDBCol col="12" lg="6">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
              </div>
              <h2 className="fw-bold mb-2 text-center">Log in</h2>
              <form onSubmit={handleLogin}>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}

                {blockedMessage && (
                  <p className="error-message">{blockedMessage}</p>
                )}

                <div className="mb-4 w-100">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="email"
                    type="email"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="password"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <MDBBtn className="login-button" size="lg" type="submit">
                  Login
                </MDBBtn>
              </form>
              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
