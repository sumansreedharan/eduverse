// import React, { useState } from "react";
// import axios from "axios";
// import "./Register.scss";

// function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [role, setRole] = useState("user");
//   const [showOTP, setShowOTP] = useState(false);
//   const [otp, setOTP] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   async function handleRegister(event) {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/register",
//         {
//           name,
//           email,
//           mobile,
//           password,
//           confirmPassword,
//           role,
//         },
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
//   }

//   async function handleVerifyOTP(event) {
//     event.preventDefault();

//     try {
//       const response = await axios.post(
//         "http://localhost:3001/api/verifyOtp",
//         {
//           email,
//           otp,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       setOTP("");
//       setSuccessMessage("OTP matched successfully.");
//       setErrorMessage("");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Invalid OTP. Please try again.");
//     }
//   }

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={showOTP ? handleVerifyOTP : handleRegister}>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Mobile</label>
//           <input
//             type="tel"
//             value={mobile}
//             onChange={(e) => setMobile(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Role</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="user">User</option>
//             {/* <option value="admin">Admin</option> */}
//             <option value="mentor">Mentor</option>
//           </select>
//         </div>
//         {showOTP ? (
//           <div className="form-group">
//             <label>OTP</label>
//             <input
//               type="text"
//               value={otp}
//               onChange={(e) => setOTP(e.target.value)}
//             />
//           </div>
//         ) : null}
//         <button className="btn-register" type="submit">
//           {showOTP ? "Verify OTP" : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;

// import React, { useState } from "react"
// import axios from "axios";
// import { useForm } from "react-hook-form";
// import "./Register.scss";

// function Register() {
//   const [showOTP, setShowOTP] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");
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

//       setOTP("");
//       setSuccessMessage("OTP matched successfully.");
//       setErrorMessage("");
//     } catch (error) {
//       console.error(error);
//       setErrorMessage("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit(showOTP ? onVerifyOTP : onSubmit)}>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         {successMessage && <p className="success-message">{successMessage}</p>}
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             {...register("name", { required: true })}
//           />
//           {errors.name && (
//             <p className="error-message">Name is required</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             {...register("email", {
//               required: true,
//               pattern: /^\S+@\S+$/i,
//             })}
//           />
//           {errors.email && errors.email.type === "required" && (
//             <p className="error-message">Email is required</p>
//           )}
//           {errors.email && errors.email.type === "pattern" && (
//             <p className="error-message">Invalid email format</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Mobile</label>
//           <input
//             type="tel"
//             {...register("mobile", { required: true })}
//           />
//           {errors.mobile && (
//             <p className="error-message">Mobile is required</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             {...register("password", { required: true })}
//           />
//           {errors.password && (
//             <p className="error-message">Password is required</p>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             {...register("confirmPassword", { required: true })}
//           />
//           {errors.confirmPassword && (
//             <p className="error-message">
//               Confirm Password is required
//             </p>
//           )}
//         </div>
//         <div className="form-group">
//           <label>Role</label>
//           <select
//             {...register("role")}
//             onChange={(e) => setValue("role", e.target.value)}
//           >
//             <option value="user">User</option>
//             {/* <option value="admin">Admin</option> */}
//             <option value="mentor">Mentor</option>
//           </select>
//         </div>
//         {showOTP ? (
//           <div className="form-group">
//             <label>OTP</label>
//             <input
//               type="text"
//               {...register("otp", { required: true })}
//             />
//             {errors.otp && (
//               <p className="error-message">OTP is required</p>
//             )}
//           </div>
//         ) : null}
//         <button className="btn-register" type="submit">
//           {showOTP ? "Verify OTP" : "Register"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default Register;


