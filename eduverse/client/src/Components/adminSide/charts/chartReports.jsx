import React, { useEffect, useState } from 'react';
import axios from '../../../Config/axios';
import ResponsiveAppBar from "../../header/navbar";
import "./chartReports.scss"
import Chart from 'chart.js/auto';

const MonthlySalesChart = () => {
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    // Fetch monthly sales data from the server
    axios
      .get('/admin/getMonthlySales')
      .then((response) => {
        setMonthlySales(response.data);
      })
      .catch((error) => {
        console.error('Error fetching monthly sales:', error);
      });
  }, []);

  useEffect(() => {
    // Create and update the chart when monthlySales data changes
    const ctx = document.getElementById('monthlySalesChart').getContext('2d');

    const chart = new Chart(ctx, {
      type: 'line', // You can choose the chart type (e.g., line, bar, etc.)
      data: {
        labels: monthlySales.map((item) => item._id),
        datasets: [
          {
            label: 'Monthly Sales',
            data: monthlySales.map((item) => item.totalAmount),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
    });

    return () => {
      chart.destroy(); // Cleanup when the component unmounts
    };
  }, [monthlySales]);

  return (
   <div>
    <ResponsiveAppBar role={"admin"} />
    <br />
     <div>
      <h2>Monthly Sales Chart</h2>
      <div>
        <canvas id="monthlySalesChart" width="400" height="200"></canvas>
      </div>
    </div>
   </div>
  );
};

export default MonthlySalesChart;
