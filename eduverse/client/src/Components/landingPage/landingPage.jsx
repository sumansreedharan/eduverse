import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../Components/header/navbar";
import Banner from "../../assets/bannerudemy.png";
import axios from "../../Config/axios";
import { Link } from "react-router-dom";
import CourseCard from "../userSide/cardComponent/courseCard"
import "./landingPage.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function LandingPage() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("https://www.chordsconnect.online/api/landingListCourses");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const maxSlidesToShow = 4;
  const numSlidesToShow = Math.min(courses.length, maxSlidesToShow);
  const cardWidth = 220;

  const sliderSettings = {
    infinite: true,
    slidesToShow: numSlidesToShow,
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
    centerPadding: "0px",
    centerMode: true,
    variableWidth: true,
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.chordsconnect.online/api/landingCourseSearch?q=${encodeURIComponent(searchQuery)}`
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error searching for courses:", error);
    }
  };

  const handleClearSearch = () => {
    setFilteredCourses([]);
    setSearchQuery("");
    fetchCourses();
  };

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <br />
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        <button onClick={handleClearSearch}>Clear Search</button>
      </div>

      <img
        src={Banner}
        alt="E-learning Banner"
        style={{ width: "100%", height: "auto" }}
      />

      <div className="carousel-container">
        <Slider {...sliderSettings}>
          {courses.map((course) => (
            <Link
              to={`/user/courseDetails/${course._id}`}
              key={course._id}
              className="course-link"
            >
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

export default LandingPage;
