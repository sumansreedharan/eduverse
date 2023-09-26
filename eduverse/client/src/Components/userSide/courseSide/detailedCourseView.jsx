// import React, { useEffect, useState } from "react";
// import axios from "../../../Config/axios";
// import ResponsiveAppBar from "../../header/navbar";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Rating from "../courseSide/userRating";
// import Review from "../courseSide/userReview";
// import RatingPopup from "./ratingSuccess";
// import "./detailedCourseView.scss";

// const DetailedCourseView = () => {
//   const { courseId } = useParams();
//   const [courseDetails, setCourseDetails] = useState([]);
//   const [userProgress, setUserProgress] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [reviews, setReviews] = useState([]);
//   const userId = useSelector((state) => state.loggedUser.currentUser._id);
//   const [showRatingPopup, setShowRatingPopup] = useState(false);
//   const [ratingPopupMessage, setRatingPopupMessage] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const reviewsPerPage = 4;

//   const fetchVideoDetails = async () => {
//     try {
//       const response = await axios.get(`/user/courseVideoDetails/${courseId}`);
//       const videoData = response.data;

//       if (videoData.length > 0) {
//         setCourseDetails(videoData);
//         setSelectedVideo(videoData[0]); // Set the first video as the default
//       }

//       // Fetch user progress for this course
//       const userProgressResponse = await axios.get(
//         `/user/userProgress/${userId}`
//       );
//       const completedLessons = userProgressResponse.data.completedLessons;
//       setUserProgress(completedLessons);

//       // Fetch reviews for the course
//       const reviewsResponse = await axios.get(`/user/reviews/${courseId}`);
//       const reviewsData = reviewsResponse.data;
//       setReviews(reviewsData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchVideoDetails();
//     fetchReviews();
//   }, [courseId]);

//   const fetchReviews = async () => {
//     try {
//       const reviewsResponse = await axios.get(`/user/reviews/${courseId}`);
//       const reviewsData = reviewsResponse.data;
//       setReviews(reviewsData);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const markLessonCompleted = async (lessonId) => {
//     try {
//       // Check if the lesson is already marked as completed
//       if (!userProgress.includes(lessonId)) {
//         // Check if the lesson is the next one to unlock
//         const currentIndex = courseDetails.findIndex(
//           (lesson) => lesson._id === lessonId
//         );
//         if (currentIndex > 0) {
//           const prevLesson = courseDetails[currentIndex - 1];
//           if (!userProgress.includes(prevLesson._id)) {
//             console.log("You need to complete the previous lesson first.");
//             return;
//           }
//         }

//         // Mark the lesson as completed for the user
//         await axios.put(`/user/getCompletedLessons/${userId}/${lessonId}`);
//         setUserProgress([...userProgress, lessonId]);
//       }

//       setSelectedVideo(courseDetails.find((lesson) => lesson._id === lessonId));
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleVideoSelect = (video) => {
//     // Check if the clicked video has a previous lesson
//     const currentIndex = courseDetails.findIndex(
//       (lesson) => lesson._id === video._id
//     );
//     if (currentIndex > 0) {
//       const prevLesson = courseDetails[currentIndex - 1];
//       if (!userProgress.includes(prevLesson._id)) {
//         console.log("You need to complete the previous lesson first.");
//         return;
//       }
//     }

//     setSelectedVideo(video);
//   };

//   // Handle rating submission
//   const submitRating = async (rating) => {
//     await axios.post(`/user/userRatings/${courseId}`, { rating });
//     // You can update the UI to reflect the new rating
//     setRatingPopupMessage("Rating submitted successfully.");
//     setShowRatingPopup(true);

//     // Optionally, you can close the pop-up after a few seconds
//     setTimeout(() => {
//       setShowRatingPopup(false);
//     }, 3000); // Close the pop-up after 3 seconds
//   };

//   // Handle review submission
//   const submitReview = async (text) => {
//     await axios.post(`/user/userReviews/${courseId}/${userId}`, { text });
//     fetchReviews();
//   };

//   const indexOfLastReview = currentPage * reviewsPerPage;
//   const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
//   const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

//   const pageNumber = [];
//   for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
//     pageNumber.push(i);
//   }

//   return (
//     <div>
//       <ResponsiveAppBar role={"user"} />
//       <div className="course-view-container">
//         <div className="detailed-course-view">
//           <div className="course-content">
//             <h4 style={{ textAlign: "center" }}>Course Content</h4>
//             <div className="video-list">
//               {courseDetails.map((video) => (
//                 <div
//                   key={video._id}
//                   className={`video-list-item ${
//                     userProgress.includes(video._id) ? "completed" : ""
//                   }`}
//                   onClick={() => handleVideoSelect(video)}
//                 >
//                   <h3>{video.title}</h3>
//                   <p>{video.duration}</p>
//                   <p>{video.note}</p>
//                   {userProgress.includes(video._id) ? (
//                     <p className="completed-label">Video Watched</p>
//                   ) : (
//                     <button
//                       className="mark-completed-button"
//                       onClick={() => markLessonCompleted(video._id)}
//                     >
//                       Watched?
//                     </button>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="video-player-container">
//             {selectedVideo && (
//               <div>
//                 <video
//                   id="videoPlayer"
//                   width="100%"
//                   height="auto"
//                   controls
//                   src={selectedVideo.videoUrl}
//                 >
//                   Your browser does not support the video tag.
//                 </video>
//                 <div className="video-details">
//                   <h4>
//                     {selectedVideo ? selectedVideo.title : ""} Part{" "}
//                     {selectedVideo ? selectedVideo.part : ""}
//                   </h4>
//                   <br />
//                   <h3>What you will learn</h3>
//                   <hr />
//                   <div className="description">
//                     {selectedVideo ? selectedVideo.description : ""}
//                   </div>
//                   <br />
//                 </div>
//                 {showRatingPopup && (
//                   <RatingPopup
//                     message={ratingPopupMessage}
//                     onClose={() => setShowRatingPopup(false)}
//                   />
//                 )}
//                 <Rating onRatingSubmit={submitRating} />
//                 <Review onReviewSubmit={submitReview} />
//                 <br />
//                 <button
//                   className={`bbutton ${showAllReviews ? "hide-button" : ""}`}
//                   onClick={() => setShowAllReviews(!showAllReviews)}
//                 >
//                   {showAllReviews ? "Hide Reviews" : "View All Reviews"}
//                 </button>
//                 {showAllReviews && (
//                   <div>
//                      <br />
//                     <h3>All Reviews:</h3>
//                     <ul>
//                       {currentReviews.map((review) => (
//                         <li key={review._id} className="review-item">
//                           {review.user ? (
//                             <>
//                               <strong>
//                                 {review.user.name || "Unknown User"}
//                               </strong>
//                               : {review.text}
//                               <br />
//                             </>
//                           ) : (
//                             <>
//                               <strong>Unknown User</strong>: {review.text}
//                               <br />
//                             </>
//                           )}
//                           <small>
//                             {new Date(review.date).toLocaleString("en-US", {
//                               year: "numeric",
//                               month: "long",
//                               day: "numeric",
//                               hour: "numeric",
//                               minute: "numeric",
//                               hour12: true, // Use 12-hour format (AM/PM)
//                             })}
//                           </small>
//                           <hr />
//                         </li>
//                       ))}
//                     </ul>
//                     <div className="pagination">
//                       {pageNumber.map((number) => (
//                         <button
//                           key={number}
//                           className={`page-button ${
//                             number === currentPage ? "active" : ""
//                           }`}
//                           onClick={() => setCurrentPage(number)}
//                         >
//                           {number}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailedCourseView;





import React, { useEffect, useState } from "react";
import axios from "../../../Config/axios";
import ResponsiveAppBar from "../../header/navbar";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Rating from "../courseSide/userRating";
import Review from "../courseSide/userReview";
import RatingPopup from "./ratingSuccess";
import StarRating from "../courseSide/avgStar";
import "./detailedCourseView.scss";

const DetailedCourseView = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState([]);
  const [userProgress, setUserProgress] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const userId = useSelector((state) => state.loggedUser.currentUser._id);
  const [showRatingPopup, setShowRatingPopup] = useState(false);
  const [ratingPopupMessage, setRatingPopupMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const [userRatings, setUserRatings] = useState([]);

  const fetchVideoDetails = async () => {
    try {
      const response = await axios.get(`/user/courseVideoDetails/${courseId}`);
      const videoData = response.data;

      if (videoData.length > 0) {
        setCourseDetails(videoData);
        setSelectedVideo(videoData[0]); // Set the first video as the default
      }

      // Fetch user progress for this course
      const userProgressResponse = await axios.get(
        `/user/userProgress/${userId}`
      );
      const completedLessons = userProgressResponse.data.completedLessons;
      setUserProgress(completedLessons);

      // Fetch reviews for the course
      const reviewsResponse = await axios.get(`/user/reviews/${courseId}`);
      const reviewsData = reviewsResponse.data;
      setReviews(reviewsData);

      const userRatingsResponse = await axios.get(`/user/averageRating/${courseId}`);
      const userRatingsData = userRatingsResponse.data;
      setUserRatings(userRatingsData);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVideoDetails();
    fetchReviews();
  }, [courseId]);


  const calculateAverageRating = () => {
    if (userRatings.length === 0) {
      return 0; // Return 0 if there are no ratings
    }

    const totalRating = userRatings.reduce((sum, rating) => sum + rating, 0);
    return totalRating / userRatings.length;
  };

  const fetchReviews = async () => {
    try {
      const reviewsResponse = await axios.get(`/user/reviews/${courseId}`);
      const reviewsData = reviewsResponse.data;
      setReviews(reviewsData);
    } catch (error) {
      console.error(error);
    }
  };

  const markLessonCompleted = async (lessonId) => {
    try {
      // Check if the lesson is already marked as completed
      if (!userProgress.includes(lessonId)) {
        // Check if the lesson is the next one to unlock
        const currentIndex = courseDetails.findIndex(
          (lesson) => lesson._id === lessonId
        );
        if (currentIndex > 0) {
          const prevLesson = courseDetails[currentIndex - 1];
          if (!userProgress.includes(prevLesson._id)) {
            console.log("You need to complete the previous lesson first.");
            return;
          }
        }

        // Mark the lesson as completed for the user
        await axios.put(`/user/getCompletedLessons/${userId}/${lessonId}`);
        setUserProgress([...userProgress, lessonId]);
      }

      setSelectedVideo(courseDetails.find((lesson) => lesson._id === lessonId));
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideoSelect = (video) => {
    // Check if the clicked video has a previous lesson
    const currentIndex = courseDetails.findIndex(
      (lesson) => lesson._id === video._id
    );
    if (currentIndex > 0) {
      const prevLesson = courseDetails[currentIndex - 1];
      if (!userProgress.includes(prevLesson._id)) {
        console.log("You need to complete the previous lesson first.");
        return;
      }
    }

    setSelectedVideo(video);
  };

  // Handle rating submission
  const submitRating = async (rating) => {
    await axios.post(`/user/userRatings/${courseId}`, { rating });
    // You can update the UI to reflect the new rating
    setRatingPopupMessage("Rating submitted successfully.");
    setShowRatingPopup(true);

    // Optionally, you can close the pop-up after a few seconds
    setTimeout(() => {
      setShowRatingPopup(false);
    }, 3000); // Close the pop-up after 3 seconds
  };

  // Handle review submission
  const submitReview = async (text) => {
    await axios.post(`/user/userReviews/${courseId}/${userId}`, { text });
    fetchReviews();
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(reviews.length / reviewsPerPage); i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ResponsiveAppBar role={"user"} />
      <div className="course-view-container">
        <div className="detailed-course-view">
          <div className="course-content">
            <h4 style={{ textAlign: "center" }}>Course Content</h4>
            <div className="video-list">
              {courseDetails.map((video) => (
                <div
                  key={video._id}
                  className={`video-list-item ${
                    userProgress.includes(video._id) ? "completed" : ""
                  }`}
                  onClick={() => handleVideoSelect(video)}
                >
                  <h3>{video.title}</h3>
                  <p>{video.duration}</p>
                  <p>{video.note}</p>
                  {userProgress.includes(video._id) ? (
                    <p className="completed-label">Ready to watch</p>
                  ) : (
                    <button
                      className="mark-completed-button"
                      onClick={() => markLessonCompleted(video._id)}
                    >
                      Click here to play
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="video-player-container">
            {selectedVideo && (
              <div>
                <video
                  id="videoPlayer"
                  width="100%"
                  height="auto"
                  controls
                  src={selectedVideo.videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
                <div className="video-details">
                  <h4>
                    {selectedVideo ? selectedVideo.title : ""} Part{" "}
                    {selectedVideo ? selectedVideo.part : ""}
                  </h4>
                  <br />
                  <h3>What you will learn</h3>
                  <hr />
                  <div className="description">
                    {selectedVideo ? selectedVideo.description : ""}
                  </div>
                  <br />
                </div>
                <h5>Average Rating:{userRatings.length > 0 ? <StarRating rating={calculateAverageRating()} totalRatings={userRatings.length} /> : "No ratings available"}</h5>
                {showRatingPopup && (
                  <RatingPopup
                    message={ratingPopupMessage}
                    onClose={() => setShowRatingPopup(false)}
                  />
                )}
                <Rating onRatingSubmit={submitRating} />
                <Review onReviewSubmit={submitReview} />
                <br />
                <button
                  className={`bbutton ${showAllReviews ? "hide-button" : ""}`}
                  onClick={() => setShowAllReviews(!showAllReviews)}
                >
                  {showAllReviews ? "Hide Reviews" : "View All Reviews"}
                </button>
                {showAllReviews && (
                  <div>
                     <br />
                    <h3>All Reviews:</h3>
                    <ul>
                      {currentReviews.map((review) => (
                        <li key={review._id} className="review-item">
                          {review.user ? (
                            <>
                              <strong>
                                {review.user.name || "Unknown User"}
                              </strong>
                              : {review.text}
                              <br />
                            </>
                          ) : (
                            <>
                              <strong>Unknown User</strong>: {review.text}
                              <br />
                            </>
                          )}
                          <small>
                            {new Date(review.date).toLocaleString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true, // Use 12-hour format (AM/PM)
                            })}
                          </small>
                          <hr />
                        </li>
                      ))}
                    </ul>
                    <div className="pagination">
                      {pageNumber.map((number) => (
                        <button
                          key={number}
                          className={`page-button ${
                            number === currentPage ? "active" : ""
                          }`}
                          onClick={() => setCurrentPage(number)}
                        >
                          {number}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCourseView;


