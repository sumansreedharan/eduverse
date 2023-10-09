// import React, { useEffect, useState } from "react";
// import axios from "../../../Config/axios";
// import { useParams, useNavigate } from "react-router-dom";
// import ResponsiveAppBar from "../../header/navbar";
// import "./purchaseCourses.scss";

// const YourCourses = () => {
//   const { userId } = useParams();
//   const [yourCourses, setYourCourses] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchYourCourses();
//   }, [userId]);

//   const fetchYourCourses = async () => {
//     const response = await axios.get(`/user/yourCourses/${userId}`);
//     setYourCourses(response.data);
//   };

//   const handleStartCourse = (courseId) => {
//     navigate(`/user/courseVideoDetails/${courseId}`);
//   };

//   return (
//     <div>
//       <ResponsiveAppBar role={"user"} />
//       <div className="your-courses-container1">
//         <h2>My Courses</h2>
//         <hr />
//         <div className="course-listing">
//           {yourCourses.map((course) => (
//             <div key={course._id} className="course-cards">
//               <img
//                 src={`http://localhost:3001/images/${course.courseId.imageUrl}`}
//                 alt={course.courseId.title}
//                 className="course-image1"
//               />
//               <div className="course-details1">
//                 <h3 className="course-title1">{course.courseId.title}</h3>
//                 {/* <button className="start-course-button1">Start Course</button> */}
//                 <button
//                   className="start-course-button1"
//                   onClick={() => handleStartCourse(course.courseId._id)}
//                 >
//                   Start course
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default YourCourses;


import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import { useParams, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../../header/navbar";
import "./purchaseCourses.scss";

const YourCourses = () => {
  const { userId } = useParams();
  const [yourCourses, setYourCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // Number of items to display per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchYourCourses();
  }, [userId, currentPage]); // Trigger fetchYourCourses when userId or currentPage changes

  const fetchYourCourses = async () => {
    try {
      const response = await axios.get(`/user/yourCourses/${userId}`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
        },
      });
      setYourCourses(response.data);
    } catch (error) {
      console.error("Error fetching your courses:", error);
    }
  };

  const handleStartCourse = (courseId) => {
    navigate(`/user/courseVideoDetails/${courseId}`);
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = yourCourses.slice(indexOfFirstItem, indexOfLastItem);

  // Render pagination buttons
  const totalPages = Math.ceil(yourCourses.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={i === currentPage ? "active" : ""}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <div className="your-courses-container1">
        <h2>My Courses</h2>
        <hr />
        <div className="course-listing">
          {currentItems.map((course) => (
            <div key={course._id} className="course-cards">
              <img
                src={`http://localhost:3001/images/${course.courseId.imageUrl}`}
                alt={course.courseId.title}
                className="course-image1"
              />
              <div className="course-details1">
                <h3 className="course-title1">{course.courseId.title}</h3>
                <button
                  className="start-course-button1"
                  onClick={() => handleStartCourse(course.courseId._id)}
                >
                  Start course
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="pagination-buttons">
          {renderPagination()}
        </div>
      </div>
    </div>
  );
};

export default YourCourses;


