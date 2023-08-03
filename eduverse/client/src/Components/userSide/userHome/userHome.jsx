
// import React, { useEffect, useState } from "react";
// import ResponsiveAppBar from "../../header/navbar";
// import Banner from "../../assets/bannerudemy.png";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import CourseCard from "../cardComponent/courseCard";
// import "./userHome.scss"; // Import the SCSS file for this component
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// function UserHomePage() {
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     try {
//       const response = await axios.get("http://localhost:3001/listCourses");
//       setCourses(response.data);
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//     }
//   };

//   const sliderSettings = {
//     infinite: true,
//     slidesToShow: 4, // Set the number of slides to show in the carousel
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1200,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 800,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 600,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <div>
//       <ResponsiveAppBar role={"user"} />
//       <br />
//       <img src={Banner} alt="E-learning Banner" style={{ width: "100%", height: "auto" }} />

//       <div  className="carousel-container">
//         <Slider {...sliderSettings}>
//           {courses.map((course) => (
//             // <div key={course._id}>
//             //   <CourseCard course={course} />
//             // </div>
//             <Link to={`/courseDetails/${course._id}`} key={course._id}>
//             <div>
//               <CourseCard course={course} />
//             </div>
//           </Link>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// }

// export default UserHomePage;


import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../header/navbar";
import Banner from "../../../assets/bannerudemy.png";
import axios from "../../../Config/axios"
import { Link } from "react-router-dom";
import CourseCard from "../cardComponent/courseCard";
import "./userHome.scss"; // Import the SCSS file for this component
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function UserHomePage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("/user/listCourses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const maxSlidesToShow = 4; // Set the maximum number of slides to show
  const numSlidesToShow = Math.min(courses.length, maxSlidesToShow);

  const cardWidth = 220; // Set the fixed width for each slide (adjust as needed)

  const sliderSettings = {
    infinite: true,
    slidesToShow: numSlidesToShow, // Set the number of slides to show in the carousel
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: Math.min(courses.length, 3),
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: Math.min(courses.length, 2),
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(courses.length, 1),
        },
      },
    ],
    // Set the fixed width for each slide
    // The width should be equal to the card width plus any margin or padding added to the slide container
    // In this example, we assume there is no margin or padding added to the slide container
    // Adjust the width as needed based on your card styles
    // If your card styles include margins or paddings, you should adjust the width accordingly
    // For example, if your card has a total width of 240px (including margins or paddings), set the width to 240px
    speed: 500,
    cssEase: "linear",
    centerPadding: "0px", // Set padding between slides if needed
    centerMode: true,
    variableWidth: true,
  };

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <br />
      <img src={Banner} alt="E-learning Banner" style={{ width: "100%", height: "auto" }} />

      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {courses.map((course) => (
            <Link to={`/user/courseDetails/${course._id}`} key={course._id}>
              <div style={{ width: `${cardWidth}px` }}>
                <CourseCard course={course} />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default UserHomePage;
