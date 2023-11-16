// import React, { useEffect, useState } from "react";
// import axios from "../../../Config/axios";
// import ResponsiveAppBar from "../../header/navbar";
// import "./PaymentReports.scss";

// const AdminPaymentReport = () => {
//   const [paymentReport, setPaymentReport] = useState([]);
//   const [totalRevenue, setTotalRevenue] = useState(0);
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");

//   useEffect(() => {
//     axios
//       .get("/admin/getPaymentReports")
//       .then((response) => {
//         setPaymentReport(response.data);
//         const total = response.data.reduce(
//           (acc, payment) => acc + payment.amount,
//           0
//         );
//         setTotalRevenue(total);
//       })
//       .catch((error) => {
//         console.error("Error fetching payment report:", error);
//       });
//   }, []);

//   const formatDate = (dateString) => {
//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };
//     return new Date(dateString).toLocaleDateString("en-US", options);
//   };

//   const handleReset = () => {
//     setStartDate("");
//     setEndDate("");
//   };

//   const filteredPaymentReport = paymentReport.filter((payment) => {
//     if (startDate && endDate) {
//       const paymentDate = new Date(payment.paymentDate);
//       return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
//     }
//     return true;
//   });

//   return (
//     <div>
//       <ResponsiveAppBar role={"admin"} />
//       <div className="admin-payment-report">
//         <h1>Payment Report</h1>
//         <div className="total-revenue">
//           <strong>Total Revenue:</strong>{" "}
//           <strong>₹{totalRevenue.toFixed(2)}</strong>
//         </div>
//         <div className="date-filter">
//           <label htmlFor="startDate">Start Date:</label>
//           <input
//             type="date"
//             id="startDate"
//             value={startDate}
//             onChange={(e) => setStartDate(e.target.value)}
//           />
//           <label htmlFor="endDate">End Date:</label>
//           <input
//             type="date"
//             id="endDate"
//             value={endDate}
//             onChange={(e) => setEndDate(e.target.value)}
//           />
//           <button onClick={handleReset}>Reset</button>
//         </div>
//         <br />
//         <table>
//           <thead>
//             <tr>
//               <th>Course name</th>
//               <th>User name</th>
//               <th>Amount</th>
//               <th>Payment Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredPaymentReport.map((payment) => (
//               <tr key={payment._id}>
//                 <td>{payment.courseId.title}</td>
//                 <td>{payment.userId.name}</td>
//                 <td>₹{payment.amount}</td>
//                 <td>{formatDate(payment.paymentDate)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminPaymentReport;



import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import "./paymentReports.scss";

const AdminPaymentReport = () => {
  const [paymentReport, setPaymentReport] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    axios
      .get("/admin/getPaymentReports")
      .then((response) => {
        setPaymentReport(response.data);
        const total = response.data.reduce(
          (acc, payment) => acc + payment.amount,
          0
        );
        setTotalRevenue(total);
      })
      .catch((error) => {
        console.error("Error fetching payment report:", error);
      });
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    const selectedEndDate = e.target.value;
    if (selectedEndDate >= startDate) {
      setEndDate(selectedEndDate);
    } else {
      alert("End date cannot be earlier than the start date");
      setEndDate(""); // Reset the end date to an empty string
    }
  };

  const handleReset = () => {
    setStartDate("");
    setEndDate("");
  };

  const filteredPaymentReport = paymentReport.filter((payment) => {
    if (startDate && endDate) {
      const paymentDate = new Date(payment.paymentDate);
      return paymentDate >= new Date(startDate) && paymentDate <= new Date(endDate);
    }
    return true;
  });

  return (
    <div>
      <ResponsiveAppBar role={"admin"} />
      <div className="admin-payment-report">
        <h1>Payment Report</h1>
        <div className="total-revenue">
          <strong>Total Revenue:</strong>{" "}
          <strong>₹{totalRevenue.toFixed(2)}</strong>
        </div>
        <div className="date-filter">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <button onClick={handleReset}>Reset</button>
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>Course name</th>
              <th>User name</th>
              <th>Amount</th>
              <th>Payment Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredPaymentReport.map((payment) => (
              <tr key={payment._id}>
                <td>{payment.courseId.title}</td>
                <td>{payment.userId.name}</td>
                <td>₹{payment.amount}</td>
                <td>{formatDate(payment.paymentDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPaymentReport;

