import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import "./adminHome.scss";

function AdminHomePage() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalMentors, setTotalMentors] = useState(0);

  useEffect(() => {
    fetchTotalCounts();
  }, []);

  const fetchTotalCounts = async () => {
    const response = await axios.get("/admin/totalCounts");
    const { totalUsers, totalMentors } = response.data;
    setTotalUsers(totalUsers);
    setTotalMentors(totalMentors);
  };

  return (
    <div>
      <ResponsiveAppBar role={"admin"} />
      <div className="admin-dashboard">
        <div className="dashboard-summary">
          <div className="summary-item">
            <h2>Total Users</h2>
            <p>{totalUsers}</p>
          </div>
          <div className="summary-item">
            <h2>Total Mentors</h2>
            <p>{totalMentors}</p>
          </div>
          <div className="summary-item">
            <h2>Total Courses</h2>
            <p>7</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminHomePage;
