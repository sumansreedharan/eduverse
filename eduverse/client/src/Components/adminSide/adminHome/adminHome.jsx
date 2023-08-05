import React, {useEffect,useState} from 'react';
import axios from "../../../Config/axios"
import ResponsiveAppBar from "../../header/navbar"
import "./adminHome.scss"
import api from '../../../Config/axios';

function AdminHomePage() {
  const [totalUsers,setTotalUsers] = useState(0)
  const [totalMentors,setTotalMentors] = useState(0)


useEffect(()=>{
  fetchTotalCounts()
},[])

const fetchTotalCounts = async ()=>{
  try {
    const response = await api.get('/admin/totalCounts');
    console.log("admin home response",response);
    const { totalUsers,totalMentors} = response.data
    setTotalUsers(totalUsers)
    setTotalMentors(totalMentors)
  } catch (error) {
    console.log(error);
  }
}



  return (
  <div>
    <ResponsiveAppBar role={'admin'}/>
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