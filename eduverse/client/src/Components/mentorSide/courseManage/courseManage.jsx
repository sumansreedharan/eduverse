import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../../Config/axios";
import CourseUploadForm from "./addCourse";
import EditCourseModal from "./editCourseModal";
import Modal from "react-modal";
import ResponsiveAppBar from "../../header/navbar";
import "./courseManage.scss";

const CourseListPage = () => {
  const [courses, setCourses] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, [updated]);

  const fetchCourses = async () => {
    const response = await axios.get("/mentor/getCourses");
    setCourses(response.data);
    console.log(response.data, "etheerkaan surthukkale");
  };

  const handleCourseAdded = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
    setUpdated(!updated);
    setShowUploadForm(false);
  };

  const handleCancelUpload = () => {
    setShowUploadForm(false); // Hide the upload form when the "Cancel" button is clicked
  };

  const handleView = (courseId) => {
    console.log("Navigating to video upload page with Course ID:", courseId);
    navigate(`/mentor/videoUpload/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    const response = await axios.delete(`/mentor/deleteCourse/${courseId}`);
    setCourses((prevCourses) => [
      ...prevCourses.filter((course) => course._id !== courseId),
    ]);
  };

  const handleEditCourse = (course) => {
    setSelectedCourse(course);
    setShowEditModal(true);
  };

  return (
    <div>
      <ResponsiveAppBar role={"mentor"} />
      <br />
      <div className="course-list-page">
        <h1>Course List</h1>
        {showUploadForm && (
          <CourseUploadForm
            onCourseAdded={handleCourseAdded}
            onCancel={handleCancelUpload}
          />
        )}
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
                  <img
                    src={`http://localhost:3001/images/${course.imageUrl}`}
                    alt="Course Thumbnail"
                  />
                </td>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>{course.description}</td>
                {/* <td>{course.courseType}</td> */}
                <td>{course.paid ? "Paid" : "Free"}</td>
                <td>{course.price}</td>
                <td>
                  <button
                    style={{ marginRight: "3px" }}
                    onClick={() => handleEditCourse(course)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleView(course._id)}>View</button>
                  <button
                    style={{ marginLeft: "3px" }}
                    onClick={() => handleDeleteCourse(course._id)}
                  >
                    Erase
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Modal
          isOpen={showEditModal}
          onRequestClose={() => setShowEditModal(false)}
        >
          {selectedCourse && (
            <EditCourseModal
              course={selectedCourse}
              onSave={() => setUpdated(!updated)}
              onClose={() => setShowEditModal(false)}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default CourseListPage;
