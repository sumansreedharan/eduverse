// import React, { useState } from "react";
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import {useNavigate} from "react-router-dom"
// import "./sign.scss";
// import Sample from "../assets/regImage.png"
// import Logo from "../assets/edu.png";
// import {
//   MDBBtn,
//   MDBContainer,
//   MDBRow,
//   MDBCol,
//   MDBCard,
//   MDBCardBody,
//   MDBInput,
// } from "mdb-react-ui-kit";

// function Signup() {
//   const [showOTP, setShowOTP] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
//   const navigate = useNavigate();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   const onSubmit = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/register",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setShowOTP(true);
//       setErrorMessage("");
//       setSuccessMessage("");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Registration failed. Please try again.");
//     }
//   };

//   const onVerifyOTP = async (data) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/verifyOtp",
//         data,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setSuccessMessage("OTP matched successfully.");
//       setErrorMessage("");
//         navigate("/login")
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <MDBContainer fluid>
//       <MDBRow className="d-flex justify-content-center align-items-center h-100 the-body">
//         <MDBCol col="12">
//         <div className="image-container">
//         <img src={Sample} alt="Education" className="educational-image"/>
//           </div>
//           <MDBCard
//             className="bg-white my-5 mx-auto"
//             style={{ borderRadius: "1rem", maxWidth: "500px" }}
//           >
//             <MDBCardBody className="p-5 w-100 d-flex flex-column">
//             <div className="logo-container">
//                 <img src={Logo} alt="Logo" className="logo" />
//               </div>
//               <h2 className="fw-bold mb-2 text-center">Register</h2>
//               <p className="text-white-50 mb-3">Please Register</p>

//               <form onSubmit={handleSubmit(showOTP ? onVerifyOTP : onSubmit)}>
//                 {errorMessage && (
//                   <p className="error-message">{errorMessage}</p>
//                 )}
//                 {successMessage && (
//                   <p className="success-message">{successMessage}</p>
//                 )}

//                 <div className="mb-4 w-100">
//                   <label htmlFor="name" className="form-label">
//                     Name
//                   </label>
//                   <MDBInput
//                     wrapperClass="w-100"
//                     id="name"
//                     type="text"
//                     size="lg"
//                     {...register("name", { required: true })}
//                   />
//                   {errors.name && (
//                     <p className="error-message">Name is required</p>
//                   )}
//                 </div>

//                 <div className="mb-4 w-100">
//                   <label htmlFor="email" className="form-label">
//                     Email
//                   </label>
//                   <MDBInput
//                     wrapperClass="w-100"
//                     id="email"
//                     type="email"
//                     size="lg"
//                     {...register("email", {
//                       required: true,
//                       pattern: /^\S+@\S+$/i,
//                     })}
//                   />
//                   {errors.email && errors.email.type === "required" && (
//                     <p className="error-message">Email is required</p>
//                   )}
//                   {errors.email && errors.email.type === "pattern" && (
//                     <p className="error-message">Invalid email format</p>
//                   )}
//                 </div>

//                 <div className="mb-4 w-100">
//                   <label htmlFor="mobile" className="form-label">
//                     Mobile
//                   </label>
//                   <MDBInput
//                     wrapperClass="w-100"
//                     id="mobile"
//                     type="password"
//                     size="lg"
//                     {...register("mobile", { required: true })}
//                   />
//                   {errors.mobile && (
//                     <p className="error-message">Mobile is required</p>
//                   )}
//                 </div>

//                 <div className="mb-4 w-100">
//                   <label htmlFor="password" className="form-label">
//                     Password
//                   </label>
//                   <MDBInput
//                     wrapperClass="w-100"
//                     id="password"
//                     type="password"
//                     size="lg"
//                     {...register("password", { required: true })}
//                   />
//                   {errors.password && (
//                     <p className="error-message">Password is required</p>
//                   )}
//                 </div>

//                 <div className="mb-4 w-100">
//                   <label htmlFor="confirmPassword" className="form-label">
//                     Confirm password
//                   </label>
//                   <MDBInput
//                     wrapperClass="w-100"
//                     id="confirmPassword"
//                     type="password"
//                     size="lg"
//                     {...register("confirmPassword", { required: true })}
//                   />
//                   {errors.confirmPassword && (
//                     <p className="error-message">
//                       Confirm Password is required
//                     </p>
//                   )}
//                 </div>

//                 <div className="mb-4 w-100">
//                   <label htmlFor="roleSelect" className="form-label">
//                     Role
//                   </label>
//                   <select
//                     className="form-select"
//                     id="roleSelect"
//                     aria-label="Role"
//                     size="lg"
//                     {...register("role")}
//                     onChange={(e) => setValue("role", e.target.value)}
//                   >
//                     <option value="user">User</option>
//                     <option value="mentor">Mentor</option>
//                   </select>
//                 </div>

//                 {showOTP && (
//                   <div className="mb-4 w-100">
//                     <label htmlFor="otp" className="form-label">
//                       OTP
//                     </label>
//                     <MDBInput
//                       wrapperClass="w-100"
//                       id="otp"
//                       type="text"
//                       size="lg"
//                       {...register("otp", { required: true })}
//                     />
//                     {errors.otp && (
//                       <p className="error-message">OTP is required</p>
//                     )}
//                   </div>
//                 )}

//                 <MDBBtn className="reg-button" size="lg" type="submit">
//                   {showOTP ? "Verify OTP" : "Register"}
//                 </MDBBtn>
//               </form>

//               <hr className="my-4" />
//             </MDBCardBody>
//           </MDBCard>
//         </MDBCol>
//       </MDBRow>
//     </MDBContainer>
//   );
// }

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./sign.scss";
import Sample from "../assets/regImage.png";
import Logo from "../assets/edu.png";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

function Signup() {
  const [showOTP, setShowOTP] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/register",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setShowOTP(true);
      setErrorMessage("");
      setSuccessMessage("");
    } catch (error) {
      console.error(error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const onVerifyOTP = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/verifyOtp",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setSuccessMessage("OTP matched successfully.");
      setErrorMessage("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      setErrorMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center h-100 the-body">
        <MDBCol col="12">
          <div className="image-container">
            <img src={Sample} alt="Education" className="educational-image" />
          </div>
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 w-100 d-flex flex-column">
              <div className="logo-container">
                <img src={Logo} alt="Logo" className="logo" />
              </div>
              <h2 className="fw-bold mb-2 text-center">Register</h2>

              <form onSubmit={handleSubmit(showOTP ? onVerifyOTP : onSubmit)}>
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
                {successMessage && (
                  <p className="success-message">{successMessage}</p>
                )}

                <div className="mb-4 w-100">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="name"
                    type="text"
                    size="lg"
                    {...register("name", { required: true })}
                  />
                  {errors.name && (
                    <p className="error-message">Name is required</p>
                  )}
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="email"
                    type="email"
                    size="lg"
                    {...register("email", {
                      required: true,
                      pattern: /^\S+@\S+$/i,
                    })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <p className="error-message">Email is required</p>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <p className="error-message">Invalid email format</p>
                  )}
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="mobile" className="form-label">
                    Mobile
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="mobile"
                    type="text"
                    size="lg"
                    {...register("mobile", { required: true })}
                  />
                  {errors.mobile && (
                    <p className="error-message">Mobile is required</p>
                  )}
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
                    {...register("password", { required: true })}
                  />
                  {errors.password && (
                    <p className="error-message">Password is required</p>
                  )}
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm password
                  </label>
                  <MDBInput
                    wrapperClass="w-100"
                    id="confirmPassword"
                    type="password"
                    size="lg"
                    {...register("confirmPassword", {
                      required: true,
                      validate: (value) => value === password,
                    })}
                  />
                  {errors.confirmPassword && (
                    <p className="error-message">
                      Confirm Password is required
                    </p>
                  )}
                  {errors.confirmPassword &&
                    errors.confirmPassword.type === "validate" && (
                      <p className="error-message">
                        Your password is not matched
                      </p>
                    )}
                </div>

                <div className="mb-4 w-100">
                  <label htmlFor="roleSelect" className="form-label">
                    Role
                  </label>
                  <select
                    className="form-select"
                    id="roleSelect"
                    aria-label="Role"
                    size="lg"
                    {...register("role")}
                    onChange={(e) => setValue("role", e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="mentor">Mentor</option>
                  </select>
                </div>

                {showOTP && (
                  <div className="mb-4 w-100">
                    <label htmlFor="otp" className="form-label">
                      OTP
                    </label>
                    <MDBInput
                      wrapperClass="w-100"
                      id="otp"
                      type="text"
                      size="lg"
                      {...register("otp", { required: true })}
                    />
                    {errors.otp && (
                      <p className="error-message">OTP is required</p>
                    )}
                  </div>
                )}

                <MDBBtn className="reg-button" size="lg" type="submit">
                  {showOTP ? "Verify OTP" : "Register"}
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

export default Signup;
