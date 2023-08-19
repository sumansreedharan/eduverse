
import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import { useParams,useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../header/navbar";
import './purchaseCourses.scss';

const YourCourses = () => {
  const { userId } = useParams();
  const [yourCourses, setYourCourses] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    fetchYourCourses();
  }, [userId]);

  const fetchYourCourses = async () => {
    try {
      const response = await axios.get(`/user/yourCourses/${userId}`);
      console.log(response.data,"lllllll");
      setYourCourses(response.data);
    } catch (error) {
      console.error("Error fetching your courses:", error);
    }
  };

 const  handleStartCourse =  (courseId)=>{
navigate(`/user/courseVideoDetails/${courseId}`)
 }

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <div className="your-courses-container1">
        <h2>Your Courses</h2>
        <hr />
        <div className="course-listing">
          {yourCourses.map((course) => (
            <div key={course._id} className="course-cards">
              <img
                src={`http://localhost:3001/images/${course.courseId.imageUrl}`}
                alt={course.courseId.title}
                className="course-image1"
              />
              <div className="course-details1">
                <h3 className="course-title1">{course.courseId.title}</h3>
                {/* <button className="start-course-button1">Start Course</button> */}
                <button
                  className="start-course-button1"
                  onClick={() => handleStartCourse(course.courseId._id)}
                >
                  Start Course
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default YourCourses;

