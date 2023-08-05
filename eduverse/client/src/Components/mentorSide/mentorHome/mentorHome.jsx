import React,{useEffect,useState} from 'react';
import axios from "../../../Config/axios"
import ResponsiveAppBar from "../../header/navbar";
import "./mentorHome.scss";

function MentorHome() {
const [totalLearners,setTotalLearners] = useState(0)

useEffect(()=>{
  fetchTotalLearners()
},[])

const fetchTotalLearners = async ()=>{
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('/mentor/getLearners',config);
    const {totalLearners} = response.data
    setTotalLearners(totalLearners)

  } catch (error) {
    console.log(error);
  }
}

  return (
  <div>
     <ResponsiveAppBar role={'mentor'} />
     <br />
      <div className="mentor-homepage">
      <div className="mentor-homepage__box">
        <h3>Total Learners</h3>
        <p>{totalLearners}</p>
      </div>
      <div className="mentor-homepage__box">
        <h3>Your Courses</h3>
        <p>10</p>
      </div>
      <div className="mentor-homepage__box">
        <h3>Total Earnings</h3>
        <p>10</p>
      </div>
    </div>
  </div>
  );
}

export default MentorHome;


