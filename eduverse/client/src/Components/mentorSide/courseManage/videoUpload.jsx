// import React, { useEffect, useState } from "react";
// import ResponsiveAppBar from "../../header/navbar";
// import axios from "../../../Config/axios";
// import "./videoUpload.scss"; // Import your SCSS file
// import { useParams } from "react-router-dom";

// function UploadVideoForm() {
//   const { courseId } = useParams();
//   const [videoTitle, setVideoTitle] = useState("");
//   const [part, setPart] = useState("");
//   const [videoDescription, setVideoDescription] = useState("");
//   const [note,setNote] = useState("")
//   const [videoFile, setVideoFile] = useState("");
//   const [courses, setCourses] = useState([]);

//   useEffect(() => {
//     fetchUploadedCourse();
//   }, [courseId]);

//   const fetchUploadedCourse = async () => {
//     const response = await axios.get(`/mentor/uploadedCourses/${courseId}`);
//     setCourses(response.data);
//   };

//   const handleVideoUpload = async (event) => {
//     event.preventDefault();

//     // Create a FormData object to send to the backend
//     const formData = new FormData();
//     formData.append("videos", videoFile);
//     formData.append("title", videoTitle);
//     formData.append("part", part);
//     formData.append("description", videoDescription);
//     formData.append("note",note);

//     try {
//       const response = await axios.post(
//         `/mentor/videoUpload/${courseId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data", // Important for sending FormData
//           },
//           timeout: 10000,
//         }
//       );
//       // .then(async(res)=>setCourses((await axios.get(`/mentor/uploadedCourses/${courseId}`)).data ))

//       if (response.status === 200) {
//         console.log("Video uploaded successfully");
//         // Reset form fields after successful upload
//         setVideoTitle("");
//         setPart("");
//         setVideoDescription("");
//         setNote("")
//         setVideoFile("");

//         fetchUploadedCourse();
//       } else {
//         console.error("Error uploading video");
//       }
//     } catch (error) {
//       console.error("Error uploading video:", error);
//     }
//   };

//   const handleEditCourse = (courseId) => {
//     // Handle edit action here based on courseId
//   };

//   const handleDeleteCourse = (courseId) => {
//     // Handle delete action here based on courseId
//   };

//   return (
//     <div>
//       <ResponsiveAppBar role={"mentor"} />
//       <div className="course-content-management">
//         <h2>Course Content Management</h2>

//         <form
//           className="video-upload-form"
//           onSubmit={handleVideoUpload}
//           encType="multipart/form-data"
//         >
//           <div className="form-group">
//             <label htmlFor="videoTitle">Video Title</label>
//             <input
//               type="text"
//               id="videoTitle"
//               value={videoTitle}
//               onChange={(e) => setVideoTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="videoTitle">Part</label>
//             <input
//               type="text"
//               id="part"
//               value={part}
//               onChange={(e) => setPart(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="videoDescription">Video Description</label>
//             <textarea
//               id="videoDescription"
//               value={videoDescription}
//               onChange={(e) => setVideoDescription(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="note">Short note</label>
//             <textarea
//               id="note"
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               required
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="videoFile">Upload Video</label>
//             <input
//               type="file"
//               id="videoFile"
//               accept="video/*"
//               onChange={(e) => setVideoFile(e.target.files[0])}
//               required
//             />
//           </div>

//           <button type="submit">Upload Video Part</button>
//         </form>

//         {/* Display course details in table */}
//         <div className="course-list">
//           <h3>Uploaded Courses</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Part</th>
//                 <th>Lesson title</th>
//                 <th>File</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courses.map((course) => (
//                 <tr key={course._id}>
//                   <td>{course.part}</td>
//                   <td>{course.title}</td>
//                   <td>
//                     {/* Display the smaller video */}
//                     <video width="160" height="120" controls>
//                       <source src={course.videoUrl} type="video/mp4" />
//                       Your browser does not support the video tag.
//                     </video>
//                   </td>
//                   <td>
//                     <button onClick={() => handleEditCourse(course._id)}>
//                       Edit
//                     </button>
//                     <button
//                       style={{ backgroundColor: "#c74040" }}
//                       onClick={() => handleDeleteCourse(course._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default UploadVideoForm;

import React, { useEffect, useState } from "react";
import ResponsiveAppBar from "../../header/navbar";
import axios from "../../../Config/axios";
import "./videoUpload.scss"; // Import your SCSS file
import { useParams } from "react-router-dom";

function UploadVideoForm() {
  const { courseId } = useParams();
  const [videoTitle, setVideoTitle] = useState("");
  const [part, setPart] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [note, setNote] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchUploadedCourse();
  }, [courseId]);

  const fetchUploadedCourse = async () => {
    const response = await axios.get(`/mentor/uploadedCourses/${courseId}`);
    setCourses(response.data);
  };

  const handleVideoUpload = async (event) => {
    event.preventDefault();
    setLoading(true);

    // Create a FormData object to send to the backend
    const formData = new FormData();
    formData.append("videos", videoFile);
    formData.append("title", videoTitle);
    formData.append("part", part);
    formData.append("description", videoDescription);
    formData.append("note", note);

    try {
      const response = await axios.post(
        `/mentor/videoUpload/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for sending FormData
          },
          timeout: 10000,
        }
      );
      // .then(async(res)=>setCourses((await axios.get(`/mentor/uploadedCourses/${courseId}`)).data ))

      if (response.status === 200) {
        console.log("Video uploaded successfully");
        setSuccessMessage("Your video is uploaded successfully");
        setVideoTitle("");
        setPart("");
        setVideoDescription("");
        setNote("");
        setVideoFile("");

        fetchUploadedCourse();
      } else {
        console.error("Error uploading video");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setLoading(false); // Set loading back to false after upload completes
    }
  };

  const handleEditCourse = (courseId) => {
    // Handle edit action here based on courseId
  };

  const handleDeleteLesson = (lessonId) => {
    axios
    .delete(`/mentor/deleteLesson/${lessonId}`)
    .then((response) => {
      console.log(response.data.message);
    })
    .catch((error) => {
      console.error("Error deleting course:", error);
    });
    setCourses((preCourses) => [
      ...preCourses.filter((lesson) => lesson._id !== lessonId),
    ]);
  };

  return (
    <div>
      <ResponsiveAppBar role={"mentor"} />
      <div className="course-content-management">
        <h2>Course Content Management</h2>

        <form
          className="video-upload-form"
          onSubmit={handleVideoUpload}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="videoTitle">Video Title</label>
            <input
              type="text"
              id="videoTitle"
              value={videoTitle}
              onChange={(e) => setVideoTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoTitle">Part</label>
            <input
              type="text"
              id="part"
              value={part}
              onChange={(e) => setPart(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoDescription">Video Description</label>
            <textarea
              id="videoDescription"
              value={videoDescription}
              onChange={(e) => setVideoDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="note">Short note</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="videoFile">Upload Video</label>
            <input
              type="file"
              id="videoFile"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files[0])}
              required
            />
          </div>

          <button type="submit">
            {loading ? (
              <div className="loader"></div> // Display loader while uploading
            ) : (
              "Upload Video Part"
            )}
          </button>
          {/* Display success message */}
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </form>

        {/* Display course details in table */}
        <div className="course-list">
          <h3>Uploaded Courses</h3>
          <table>
            <thead>
              <tr>
                <th>Part</th>
                <th>Lesson title</th>
                <th>File</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course._id}>
                  <td>{course.part}</td>
                  <td>{course.title}</td>
                  <td>
                    {/* Display the smaller video */}
                    <video width="160" height="120" controls>
                      <source src={course.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </td>
                  <td>
                    <button onClick={() => handleEditCourse(course._id)}>
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "#c74040" }}
                      onClick={() => handleDeleteLesson(course._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UploadVideoForm;
