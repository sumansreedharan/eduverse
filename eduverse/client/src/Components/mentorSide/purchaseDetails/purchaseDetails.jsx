
// import React, { useEffect, useState } from "react";
// import ResponsiveAppBar from "../../header/navbar";
// import axios from "../../../Config/axios";

// const MentorPurchaseHistory = () => {
//   const [purchaseHistory, setPurchaseHistory] = useState([]);

//   useEffect(() => {
//     fetchPurchaseList();
//   }, []);

//   const fetchPurchaseList = async () => {
//     const response = await axios
//       .get("/mentor/purchaseDetails")
//       .then((response) => {
//         setPurchaseHistory(response.data);
//       });
//   };

//   return (
//     <div>
//       <ResponsiveAppBar role={"mentor"} />
//       <div>
//         <h1>Mentor Purchase History</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Username</th>
//               <th>Course Name</th>
//               <th>Price</th>
//               <th>Payment Method</th>
//               <th>Payment Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {purchaseHistory.map((purchase) => (
//               <tr key={purchase._id}>
//                 <td>{purchase.userId.name}</td>
//                 <td>{purchase.courseId.title}</td>
//                 <td>{purchase.amount}</td>
//                 <td>{purchase.paymentId}</td>{" "}
//                 {/* Replace with actual payment method */}
//                 <td>{new Date(purchase.paymentDate).toLocaleString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default MentorPurchaseHistory;



// components/MentorPurchaseHistory.js

import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../header/navbar";
import axios from "../../../Config/axios";
import "./purchaseDetails.scss"; // Import the SCSS stylesheet

const MentorPurchaseHistory = () => {
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  useEffect(() => {
    fetchPurchaseList();
  }, []);

  const fetchPurchaseList = async () => {
    try {
      const response = await axios.get("/mentor/purchaseDetails");
      setPurchaseHistory(response.data);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="mentor-purchase-history">
      <ResponsiveAppBar role={"mentor"} />
      <div className="container">
        <h1>Purchase History</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Course Name</th>
              <th>Price</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {purchaseHistory.map((purchase) => (
              <tr key={purchase._id}>
                <td>{purchase.userId.name}</td>
                <td>{purchase.courseId.title}</td>
                <td>{purchase.amount}</td>
                <td>{formatDate(purchase.paymentDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MentorPurchaseHistory;
