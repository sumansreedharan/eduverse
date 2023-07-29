
// import React from "react";
// import './courseCard.scss'

// const CourseCard = ({ course }) => {
//   return (
//     <div className="course-card">
//       <img src={`http://localhost:3001/images/${course.imageUrl}`} alt={course.title} />
//       <div className="course-details">
//         <h3>{course.title}</h3>
//         <p className="course-category">{course.category.name}</p>
//         <p className="course-price">{course.price}</p>
//       </div>
//     </div>
//   );
// };

// export default CourseCard;

import React from "react";
import './courseCard.scss'

const CourseCard = ({ course }) => {
  const isCourseFree = !course.price || course.price === "0"; // Check if the course is free

  return (
    <div className="course-card">
      <img src={`http://localhost:3001/images/${course.imageUrl}`} alt={course.title} />
      <div className="course-details">
        <h3>{course.title}</h3>
        <p className="course-category">{course.category.name}</p>
        {isCourseFree ? ( // Use a ternary operator to conditionally render the price or "Free"
          <p className="course-price">Free</p>
        ) : (
          <p className="course-price">₹{course.price}</p>
        )}
      </div>
    </div>
  );
};

export default CourseCard;




