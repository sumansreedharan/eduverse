// import React, { useEffect, useState } from 'react';
// import axios from '../../../Config/axios';
// import ResponsiveAppBar from "../../header/navbar";
// import Chart from 'chart.js/auto';
// import './chartReports.scss'; // Import the SCSS file

// const ChartReports = () => {
//   const [monthlySales, setMonthlySales] = useState([]);
//   const [totalPayments, setTotalPayments] = useState([]);

//   useEffect(() => {
//     // Fetch monthly sales data from the server
//     axios
//       .get('/admin/getMonthlySales')
//       .then((response) => {
//         setMonthlySales(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching monthly sales:', error);
//       });

//     // Fetch total payments data from the server
//     axios
//       .get('/admin/getTotalPayments')
//       .then((response) => {
//         setTotalPayments(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching total payments:', error);
//       });
//   }, []);

//   useEffect(() => {
//     // Create and update the monthly sales chart when monthlySales data changes
//     const monthlySalesCtx = document.getElementById('monthlySalesChart').getContext('2d');

//     const monthlySalesChart = new Chart(monthlySalesCtx, {
//       type: 'bar',
//       data: {
//         labels: monthlySales.map((item) => item._id),
//         datasets: [
//           {
//             label: 'Monthly Sales',
//             data: monthlySales.map((item) => item.totalAmount),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//             fill: false,
//           },
//         ],
//       },
//     });

//     // Create and update the total payments chart when totalPayments data changes
//     const totalPaymentsCtx = document.getElementById('totalPaymentsChart').getContext('2d');

//     const totalPaymentsChart = new Chart(totalPaymentsCtx, {
//       type: 'bar',
//       data: {
//         labels: totalPayments.map((item) => item.courseName),
//         datasets: [
//           {
//             label: 'Total Payments',
//             data: totalPayments.map((item) => item.totalAmount),
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//             fill: false,
//           },
//         ],
//       },
//     });

//     return () => {
//       monthlySalesChart.destroy(); // Cleanup when the component unmounts
//       totalPaymentsChart.destroy();
//     };
//   }, [monthlySales, totalPayments]);

//   return (
//     <div>
//       <ResponsiveAppBar role={"admin"} />
//       <div className="chart-container"> {/* Apply the .chart-container class */}
//         <h2 className="chart-title">Monthly Sales Chart</h2> {/* Apply the .chart-title class */}
//         <div>
//           <canvas id="monthlySalesChart" className="chart-canvas" width="800" height="400"></canvas> {/* Adjust width and height */}
//         </div>
//       </div>

//       <div className="chart-container"> {/* Apply the .chart-container class */}
//         <h2 className="chart-title">Total Payments Chart</h2> {/* Apply the .chart-title class */}
//         <div>
//           <canvas id="totalPaymentsChart" className="chart-canvas" width="800" height="400"></canvas> {/* Adjust width and height */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChartReports;

import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import Chart from "chart.js/auto";
import "./chartReports.scss"; // Import the SCSS file

const ChartReports = () => {
  const [monthlySales, setMonthlySales] = useState([]);
  const [totalPayments, setTotalPayments] = useState([]);
  const [categorySales, setCategorySales] = useState([]);

  useEffect(() => {
    // Fetch monthly sales data from the server
    axios
      .get("/admin/getMonthlySales")
      .then((response) => {
        setMonthlySales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching monthly sales:", error);
      });

    // Fetch total payments data from the server
    axios
      .get("/admin/getTotalPayments")
      .then((response) => {
        setTotalPayments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching total payments:", error);
      });

    // Fetch category sales data from the server
    axios
      .get("/admin/getCategorySales")
      .then((response) => {
        setCategorySales(response.data);
      })
      .catch((error) => {
        console.error("Error fetching category sales:", error);
      });
  }, []);

  useEffect(() => {
    // Create and update the monthly sales chart when monthlySales data changes
    const monthlySalesCtx = document
      .getElementById("monthlySalesChart")
      .getContext("2d");

    const monthlySalesChart = new Chart(monthlySalesCtx, {
      type: "bar",
      data: {
        labels: monthlySales.map((item) => item._id),
        datasets: [
          {
            label: "Monthly Sales",
            data: monthlySales.map((item) => item.totalAmount),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });

    // Create and update the total payments chart when totalPayments data changes
    const totalPaymentsCtx = document
      .getElementById("totalPaymentsChart")
      .getContext("2d");

    const totalPaymentsChart = new Chart(totalPaymentsCtx, {
      type: "bar",
      data: {
        labels: totalPayments.map((item) => item.courseName),
        datasets: [
          {
            label: "Total Payments",
            data: totalPayments.map((item) => item.totalAmount),
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });

    // Create and update the category sales chart when categorySales data changes
    const categorySalesCtx = document
      .getElementById("categorySalesChart")
      .getContext("2d");

    const categorySalesChart = new Chart(categorySalesCtx, {
      type: "pie",
      data: {
        labels: categorySales.map((item) => item._id),
        datasets: [
          {
            label: "Category-wise Sales",
            data: categorySales.map((item) => item.sales),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    });

    return () => {
      monthlySalesChart.destroy();
      totalPaymentsChart.destroy();
      categorySalesChart.destroy();
    };
  }, [monthlySales, totalPayments, categorySales]);

  return (
    <div>
      <ResponsiveAppBar role={"admin"} />
      <div className="chart-container">
        <h2 className="chart-title">Monthly Sales Chart</h2>
        <div>
          <canvas
            id="monthlySalesChart"
            className="chart-canvas"
            width="800"
            height="400"
          ></canvas>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Total Payments Chart</h2>
        <div>
          <canvas
            id="totalPaymentsChart"
            className="chart-canvas"
            width="800"
            height="400"
          ></canvas>
        </div>
      </div>

      <div className="chart-container">
        <h2 className="chart-title">Category Sales Chart</h2>
        <div>
          <canvas
            id="categorySalesChart"
            className="chart-canvas"
            width="400"
            height="200"
          ></canvas>
        </div>
      </div>
    </div>
  );
};

export default ChartReports;
