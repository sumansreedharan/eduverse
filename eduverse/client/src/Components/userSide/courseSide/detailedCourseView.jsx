
import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import { useParams } from "react-router-dom";
import "./detailedCourseView.scss";

const DetailedCourseView = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideoDetails();
  }, [courseId]);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`/user/courseVideoDetails/${courseId}`);
      setCourseDetails(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handleVideoSelect = (video) => {
    setSelectedVideo(video);
    const videoPlayer = document.getElementById("videoPlayer");
    if (videoPlayer) {
      videoPlayer.src = video.videoUrl;
      videoPlayer.load();
      videoPlayer.play();
    }
  };

  if (courseDetails.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="course-view-container">
      <ResponsiveAppBar role={"user"} />
      <div className="detailed-course-view">
        <div className="course-container">
          <div className="video-player-container">
            <video
              id="videoPlayer"
              width="100%"
              height="auto"
              controls
            >
              <source
                src={
                  selectedVideo
                    ? selectedVideo.videoUrl
                    : courseDetails[0].videoUrl
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            <div className="video-details">
              <h4>
                {selectedVideo ? selectedVideo.title : courseDetails[0].title}
              </h4>
              <br />
              <h3>What you will learn</h3>
              <p>
                {selectedVideo
                  ? selectedVideo.description
                  : courseDetails[0].description}
              </p>
            </div>
          </div>
          <div className="video-list-container">
            <h4 style={{ textAlign: "center" }}>Course content</h4>
            <hr />
            {courseDetails.slice(1).map((course) => (
              <div
                key={course._id}
                className={`course-card ${
                  selectedVideo === course ? "selected" : ""
                }`}
                onClick={() => handleVideoSelect(course)}
              >
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <video width="100%" height="180" controls> {/* Adjust the height as needed */}
                 <source src={course.videoUrl} type="video/mp4" />
                 Your browser does not support the video tag.
              </video>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCourseView;





