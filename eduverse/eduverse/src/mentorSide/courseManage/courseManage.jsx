
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CourseUploadForm from './addCourse';
import ResponsiveAppBar from "../../header/navbar";
import './courseManage.scss';

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [updated,setUpdated] = useState(false)

  useEffect(() => {
    fetchCourses();
  },[updated]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:3001/mentor/getCourses');
      setCourses(response.data);
      console.log(response.data,"etheerkaan surthukkale");
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };


  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setUpdated(!updated)
    setShowUploadForm(false); 
  };

  const handleCancelUpload = () => {
    setShowUploadForm(false); // Hide the upload form when the "Cancel" button is clicked
  };

  const handleDeleteCourse = async(courseId)=>{
    try {
      const response = await axios.delete(`http://localhost:3001/mentor/deleteCourse/${courseId}`)
      setCourses((prevCourses)=>[...prevCourses.filter((course)=>course._id !==courseId)])
    } catch (error) {
      console.log("error deleting course",error);
    }
  }

  return (
  <div>
    <ResponsiveAppBar role={'mentor'} />
    <br />
      <div className="course-list-page">
      <h1>Course List</h1>
      {showUploadForm && <CourseUploadForm onCourseAdded={handleCourseAdded} onCancel={handleCancelUpload} />}
      <button onClick={() => setShowUploadForm(true)}>Add Course</button>
      <table>
        <thead>
          <tr>
            <th>Thumbnail</th>
            <th>Course Name</th>
            <th>Category</th>
            <th>Description</th>
            <th>Course Type</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>
                <img src={`http://localhost:3001/images/${course.imageUrl}`} alt="Course Thumbnail" />
              </td>
              <td>{course.title}</td>
              <td>{course.category}</td>
              <td>{course.description}</td>
              {/* <td>{course.courseType}</td> */}
              <td>{course.paid ? 'Paid' : 'Free'}</td>
              <td>{course.price}</td>
              <td>
                {/* Add edit and delete buttons here */}
                {/* For example: */}
                {/* <button>Edit</button> */}
                <button onClick={()=>handleDeleteCourse(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default CourseListPage;

