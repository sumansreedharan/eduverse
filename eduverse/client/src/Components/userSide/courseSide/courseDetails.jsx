// // CourseDetails.js

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ResponsiveAppBar from "../../header/navbar";
// import axios from "axios";
// import './courseDetails.scss';

// const CourseDetails = () => {
//   const { id } = useParams();
//   const [course, setCourse] = useState(null);

//   useEffect(() => {
//     fetchCourseDetails();
//   }, [id]);

//   const fetchCourseDetails = async () => {
//     try {
//       const response = await axios.get(`http://localhost:3001/userCourseView/${id}`);
//     //   console.log(response.data,"from front end");
//       setCourse(response.data);
//     } catch (error) {
//       console.error("Error fetching course details:", error);
//     }
//   };

//   if (!course) {
//     return <div>Loading...</div>;
//   }

//   return (
//   <div>
//     <ResponsiveAppBar role={"user"} />
//       <br />
//       <div className="course-details-container">
//       <div className="course-details-header">
//         <h1>{course.title}</h1>
//         <img src={`http://localhost:3001/images/${course.imageUrl}`} alt={course.title} />
//       </div>
//       <hr />
//       <div className="course-details-content">
//       <div className="description-box">
//             <p className="course-description">{course.description}</p>
//           </div>
//         <p className="course-category">This course specified to:{course.category.name}</p>
//         <p className="course-price">Price: ₹ {course.price}</p>
//         <button className="add-to-cart-button">Proceed to pay</button>
//       </div>
//     </div>
//   </div>
//   );
// };

// export default CourseDetails;

// CourseDetails.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponsiveAppBar from "../../header/navbar";
import axios from "../../../Config/axios"
import "./courseDetails.scss";


const CourseDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState("");
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetchCourseDetails();
  }, [id]);

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `/user/userCourseView/${id}`
      );
      setCourse(response.data);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  const handlePaymentSuccess = async (paymentResponse) => {
    try {
      console.log(order);
      const res = await axios.post("/user/orderSuccess", {
        courseId: id,
        amount: course.price,
        order_id: order,
      });
      console.log(res.data.status);
    } catch (error) {
      console.log("Payment successful:", paymentResponse);
    }
  };

  const handlePaymentError = (error) => {
    console.error("Payment error:", error);
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
          color: "#F37254", 
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
    <div style={{backgroundColor:'#c7c7c7',minHeight:'100vh'}}>
      <ResponsiveAppBar role={"user"} />
      <br />
      <div className="course-details-container">
        <div className="course-details-header">
          <h1>{course.title}</h1>
          <img
            src={`http://localhost:3001/images/${course.imageUrl}`}
            alt={course.title}
          />
        </div>
        {/* <hr /> */}
        <div className="course-details-content">
        <h2>What you will learn</h2>
          <div className="description-box">
            <p className="course-description">{course.description}</p>
          </div>
          <p className="course-category">
            This course specified to: {course.category.name}
          </p>
          <p className="course-price">Price: ₹ {course.price}</p>
          <button onClick={handleProceedToPay}>Proceed to pay</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
