import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import {} from '../../../Constants/roles'
import './courseView.scss'

const AdminCourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
      const response = await axios.get("/admin/viewCourses");
      setCourses(response.data);
  };

  return (
  <div style={{backgroundColor:'#c7c7c7', minHeight:'100vh'}}>
    <ResponsiveAppBar role={"admin"} />
      <div className="admin-course-list">
      <h2>Admin Course List</h2>
      <table>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Category</th>
            <th>Course Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
        {console.log(courses,"mentor side")}
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.title}</td>
              <td>{course.category.name}</td>
              <td>{course.paid ? 'Paid' : 'Free'}</td>
              <td>{course.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default AdminCourseList;
