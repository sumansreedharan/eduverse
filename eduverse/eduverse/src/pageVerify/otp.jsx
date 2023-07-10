// import React, { useState } from "react";
// import axios from "axios";

// function VerifyOtp() {
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [message, setMessage] = useState("");

//   async function handleVerifyOtp(event) {
//     event.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3001/api/verifyOtp", {
//         email,
//         otp,
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.log(error);
//       setMessage("An error occurred");
//     }
//   }

//   return (
//     <div>
//       <h2>Verify OTP</h2>
//       <form onSubmit={handleVerifyOtp}>
//         <div>
//           <label>Email</label>
//           <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div>
//           <label>OTP</label>
//           <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
//         </div>
//         <button type="submit">Verify OTP</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default VerifyOtp;
