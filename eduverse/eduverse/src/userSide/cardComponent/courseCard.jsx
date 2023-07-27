import React from "react";
import './courseCard.scss'

const CourseCard = ({ course }) => {
  return (
    <div className="course-card" style={{padding:"2em"}}>
      <img src={`http://localhost:3001/images/${course.imageUrl}`} style={{width:"10em",height:"10em"}} />
      <h3>{course.title}</h3>
      <p>{course.category.name}</p>
      <p>{course.price}</p>    
    </div>
  );
};

export default CourseCard;


