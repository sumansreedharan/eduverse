
import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../header/navbar";
import Banner from "../../assets/bannerudemy.png";
import axios from "axios";
import CourseCard from "../cardComponent/courseCard";
import "./userHome.scss"; // Import the CSS file for this component

function UserHomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:3001/listCourses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <br />
      <img src={Banner} alt="E-learning Banner" style={{ width: "100%", height: "auto" }} />

      <div className="course-cards-container" style={{display:"flex",gap:"2em"}}>
        {courses.map((course) => (
          <div style={{minWidth:"17em"}}>
            <CourseCard key={course._id} course={course} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserHomePage;



