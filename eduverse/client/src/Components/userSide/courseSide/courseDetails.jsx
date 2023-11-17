// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import ResponsiveAppBar from "../../header/navbar";
// import axios from "../../../Config/axios";
// import "./courseDetails.scss";
// import { useSelector } from "react-redux";

// const CourseDetails = () => {
//   const { id } = useParams();
//   const [order, setOrder] = useState("");
//   const [course, setCourse] = useState(null);
//   const [mentor, setMentor] = useState(null);
//   const [lessonCount, setLessonCount] = useState(null);

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [id]);

//   const fetchCourseDetails = async () => {
//     const response = await axios.get(`/user/userCourseView/${id}`);
//     setCourse(response.data.courseInfo);
//     setMentor(response.data.mentorDetails);
//     setLessonCount(response.data.lessonDetails);
//   };

//   const handlePaymentSuccess = async (paymentResponse) => {
//     const res = await axios.post("/user/orderSuccess", {
//       courseId: id,
//       amount: course.price,
//       order_id: order,
//     });

//     Swal.fire({
//       icon: "success",
//       title: "Payment Successful",
//       text: "Course added to your list",
//       confirmButtonText: "OK",
//     });
//   };

//   const handlePaymentError = (error) => {
//     console.error("Payment error:", error);
//   };

//   const handlePaymentCancel = () => {
//     console.log("Payment cancelled");
//   };

//   const handleProceedToPay = async () => {
//     try {
//       const response = await axios.post("/user/createOrder", {
//         courseId: id,
//         amount: course.price * 100,
//         currency: "INR",
//       });
//       if (response) {
//         console.log(order, "order vanne");
//         setOrder(response.data.order.id);
//       }

//       // After getting the Razorpay order details from the backend, open the payment dialog
//       const options = {
//         key: "rzp_test_pChQvCOnHtlSse", // Replace with your Razorpay Key ID
//         order_id: response.data.order.id,
//         amount: course.price * 100,
//         currency: response.data.currency,
//         name: "Your Company Name",
//         description: "Payment for Course",
//         image: "your_logo_url",
//         handler: handlePaymentSuccess,
//         prefill: {
//           name: "John Doe",
//           email: "john@example.com",
//           contact: "9876543210",
//         },
//         notes: {
//           address: "Customer Address",
//         },
//         theme: {
//           color: "#3498db",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       rzp1.open();
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//     }
//   };

//   if (!course) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ backgroundColor: "#c7c7c7", minHeight: "100vh" }}>
//       <ResponsiveAppBar role={"user"} />
//       <br />
//       <div className="course-details-container">
//         <div className="course-details-header">
//           <h1>{course.title}</h1>
//           <img
//             src={`http://localhost:3001/images/${course.imageUrl}`}
//             alt={course.title}
//           />
//         </div>
//         {/* <hr /> */}
//         <div className="course-details-content">
//           <h2>What you will learn</h2>
//           <div
//             className="description-box"
//             style={{ maxHeight: "200px", overflowY: "auto" }}
//           >
//             <p
//               className="course-description"
//               style={{ whiteSpace: "pre-wrap" }}
//             >
//               {course.description}
//             </p>
//           </div>
//           <p className="course-category">
//             This course specified to: <strong>{course.category.name}</strong>
//           </p>
//           <p className="course-mentor">
//             Course uploaded by: <strong>{mentor.name}</strong>
//           </p>
//           <p className="course-mentor">
//             This course contain: <strong>{lessonCount}</strong> Lesson
//           </p>
//           <p className="course-price">Price: ₹ {course.price}</p>
//           <button
//             style={{ backgroundColor: "#3498db" }}
//             onClick={handleProceedToPay}
//           >
//             Proceed to pay
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;

import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ResponsiveAppBar from "../../header/navbar";
import axios from "../../../Config/axios";
import "./courseDetails.scss";
import { useSelector } from "react-redux";

const CourseDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState("");
  const [course, setCourse] = useState(null);
  const [mentor, setMentor] = useState(null);
  const [lessonCount, setLessonCount] = useState(null);
  const [hasPurchased, setHasPurchased] = useState(false);
  const courseId = id;
  const userId = useSelector(state => state.loggedUser.currentUser._id);
  const navigate = useNavigate()

  useEffect(() => {
    fetchCourseDetails();
    isPurchased();
  }, [id]);

  const isPurchased = async () => {
    axios.get(`/user/checkPurchase/${courseId}/${userId}`).then((response) => {
      setHasPurchased(response.data.hasPurchased);
    });
  };

  const fetchCourseDetails = async () => {
    const response = await axios.get(`/user/userCourseView/${id}`);
    setCourse(response.data.courseInfo);
    setMentor(response.data.mentorDetails);
    setLessonCount(response.data.lessonDetails);
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    const res = await axios.post("/user/orderSuccess", {
      courseId: id,
      amount: course.price,
      order_id: order,
    });

    Swal.fire({
      icon: "success",
      title: "Payment Successful",
      text: "Course added to your list",
      confirmButtonText: "OK",
    });
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
  };

  const handleEnroll = () => {
    navigate(`/user/courseVideoDetails/${courseId}`);
  };


  const handlePaymentCancel = () => {
    console.log("Payment cancelled");
  };

  const handleProceedToPay = async () => {
    try {
      const response = await axios.post("/user/createOrder", {
        courseId: id,
        amount: course.price * 100,
        currency: "INR",
      });
      if (response) {
        console.log(order, "order vanne");
        setOrder(response.data.order.id);
      }

      // After getting the Razorpay order details from the backend, open the payment dialog
      const options = {
        key: "rzp_test_pChQvCOnHtlSse", // Replace with your Razorpay Key ID
        order_id: response.data.order.id,
        amount: course.price * 100,
        currency: response.data.currency,
        name: "Your Company Name",
        description: "Payment for Course",
        image: "your_logo_url",
        handler: handlePaymentSuccess,
        prefill: {
          name: "John Doe",
          email: "john@example.com",
          contact: "9876543210",
        },
        notes: {
          address: "Customer Address",
        },
        theme: {
          color: "#3498db",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Error creating Razorpay order:", error);
    }
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#c7c7c7", minHeight: "100vh" }}>
      <ResponsiveAppBar role={"user"} />
      <br />
      <div className="course-details-container">
        <div className="course-details-header">
          <h1>{course.title}</h1>
          <img
            src={`https://www.chordsconnect.online/images/${course.imageUrl}`}
            alt={course.title}
          />
        </div>
        {/* <hr /> */}
        <div className="course-details-content">
          <h2>What you will learn</h2>
          <div
            className="description-box"
            style={{ maxHeight: "200px", overflowY: "auto" }}
          >
            <p
              className="course-description"
              style={{ whiteSpace: "pre-wrap" }}
            >
              {course.description}
            </p>
          </div>
          <p className="course-category">
            This course specified to: <strong>{course.category.name}</strong>
          </p>
          <p className="course-mentor">
            Course uploaded by: <strong>{mentor.name}</strong>
          </p>
          <p className="course-mentor">
            This course contain: <strong>{lessonCount}</strong> Lesson
          </p>
          <p className="course-price">Price: ₹ {course.price}</p>
          {hasPurchased ? (
            <button onClick={handleEnroll}>Enroll Now</button>
          ) : (
            <button onClick={handleProceedToPay}>Proceed to Pay</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
