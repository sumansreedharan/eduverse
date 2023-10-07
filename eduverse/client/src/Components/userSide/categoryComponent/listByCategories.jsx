
// import React, { useEffect, useState } from "react";
// import { useParams,Link } from "react-router-dom";
// import ResponsiveAppBar from "../../header/navbar";
// import axios from "../../../Config/axios";
// import "./listByCategories.scss"; // Import the SCSS file

// const CategoryCourses = () => {
//   const { categoryId } = useParams();
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     const fetchCoursesByCategory = async () => {
//       try {
//         const response = await axios.get(`/user/listBycategories/${categoryId}`);
//         setCourses(response.data);
//       } catch (error) {
//         console.error("Error fetching courses by category:", error);
//       }
//     };

//     fetchCoursesByCategory();
//   }, [categoryId]);

//   return (
//     <div>
//     <ResponsiveAppBar role={"user"} />
//     <div className="category-courses-container12">
//       <div className="course-cards-containers12">
//         {courses.map((course) => (
//           <Link to={`/user/courseDetails/${course._id}`} key={course._id} className="course-link">
//             {/* Use Link to wrap the course card div */}
//             <div className="course-card12">
//               <img src={`http://localhost:3001/images/${course.imageUrl}`} alt={course.title} className="course-image12" />
//               <div className="course-details12">
//                 <h3 className="written">{course.title}</h3>
//                 <p><strong>Price: {course.price}</strong></p>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   </div>
//   );
// };

// export default CategoryCourses;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ResponsiveAppBar from "../../header/navbar";
import axios from "../../../Config/axios";
import "./listByCategories.scss";

const CategoryCourses = () => {
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [sortOrder, setSortOrder] = useState("lowToHigh");

  useEffect(() => {
    const fetchCoursesByCategory = async () => {
      try {
        const response = await axios.get(`/user/listBycategories/${categoryId}`);
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses by category:", error);
      }
    };

    fetchCoursesByCategory();
  }, [categoryId]);

  const sortCourses = () => {
    const sortedCourses = [...courses];
    if (sortOrder === "lowToHigh") {
      sortedCourses.sort((a, b) => b.price - a.price);
      setSortOrder("highToLow");
    } else {
      sortedCourses.sort((a, b) => a.price - b.price);
      setSortOrder("lowToHigh");
    }
    setCourses(sortedCourses);
  };

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <div className="category-courses-container12">
        <div>
        <button className="sort-button" onClick={sortCourses}>
          Price: {sortOrder === "lowToHigh" ? "Low to High" : "High to Low"}
        </button>
        </div>
        <br />
        <div className="course-cards-containers12">
          {courses.map((course) => (
            <Link to={`/user/courseDetails/${course._id}`} key={course._id} className="course-link">
              <div className="course-card12">
                <img src={`http://localhost:3001/images/${course.imageUrl}`} alt={course.title} className="course-image12" />
                <div className="course-details12">
                  <h3 className="written">{course.title}</h3>
                  <p><strong>Price: {course.price}</strong></p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCourses;



