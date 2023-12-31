
// import React, { useState, useLayoutEffect, useRef } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector } from "react-redux";
// import {
//   MDBCol,
//   MDBContainer,
//   MDBRow,
//   MDBCard,
//   MDBCardText,
//   MDBCardBody,
//   MDBCardImage,
//   MDBTypography,
//   MDBIcon,
// } from "mdb-react-ui-kit";
// import "./courseCertificate.scss";
// import Logo from "../../../assets/edu.png";
// import  html2pdf from "html2pdf.js"
// import axios from "../../../Config/axios";

// export default function PersonalProfile() {
//   const { courseId } = useParams();
//   const [courseDetails, setCourseDetails] = useState(null);
//   const userDetails = useSelector((state) => state.loggedUser.currentUser);
//   const [issuedDate, setIssuedDate] = useState("");
//   const certificateRef = useRef(null);
//   const [contentLoaded, setContentLoaded] = useState(false);

//   useLayoutEffect(() => {
//     // Fetch course details when the component mounts
//     const fetchCourseDetails = async () => {
//       try {
//         const response = await axios.get(
//           `/user/getCourseDetailsForCertificate/${courseId}`
//         );
//         setCourseDetails(response.data); // Assuming the API response contains course details
//         setIssuedDate(getFormattedDate(new Date()));
//       } catch (error) {
//         console.error("Error fetching course details:", error);
//       }
//     };

//     fetchCourseDetails(); // Call the function to fetch course details
//   }, [courseId]);

//   const getFormattedDate = (date) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return date.toLocaleDateString(undefined, options);
//   };

//   // Check if the content is loaded, then set contentLoaded to true
//   useLayoutEffect(() => {
//     if (certificateRef.current) {
//       setContentLoaded(true);
//     }
//   }, [certificateRef.current]);

//   const handleDownloadPDF = () => {
//     const element = document.getElementById("pdf-content");
//     const opt = {
//       margin: [0.5, 0.5, 0.5, 0.5],
//       filename: "certificate.pdf",
//       image: { type: "jpeg", quality: 0.98 },
//       html2canvas: { scale: 2 },
//       jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//     };

//     html2pdf().from(element).set(opt).save();
//   };

//   return (
//     <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
//       <MDBContainer className="py-5 h-100">
//         <button className="download-button" onClick={handleDownloadPDF}>
//           Download Certificate
//         </button>
//         <div id="pdf-content">
//         <MDBRow className="justify-content-center align-items-center h-100">
//           <MDBCol lg="6" className="mb-4 mb-lg-0">
//             {courseDetails && (
//               <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
//                 <MDBRow className="g-0" ref={certificateRef}>
//                   <MDBCol
//                     md="4"
//                     className="gradient-custom text-center text-white"
//                     style={{
//                       borderTopLeftRadius: ".5rem",
//                       borderBottomLeftRadius: ".5rem",
//                     }}
//                   >
//                     <MDBCardImage
//                       src={Logo}
//                       alt="Avatar"
//                       className="my-5"
//                       style={{ width: "80px" }}
//                       fluid
//                     />
//                     <MDBTypography tag="h5">EDUVERSE</MDBTypography>
//                     <MDBCardText>E-learning platform</MDBCardText>
//                     <MDBIcon far icon="edit mb-5" />
//                   </MDBCol>
//                   <MDBCol md="8">
//                     <MDBCardBody className="p-4">
//                       <MDBTypography tag="h6">
//                         CERTIFICATE OF COMPLETION
//                       </MDBTypography>
//                       <hr className="mt-0 mb-4" />
//                       <MDBRow className="pt-1">
//                         <MDBCol size="12" className="mb-3">
//                           <MDBTypography tag="h6">
//                             This participation certificate is given to:
//                             <br />
//                             {userDetails.name}
//                           </MDBTypography>
//                         </MDBCol>
//                       </MDBRow>
//                       <hr />
//                       <MDBTypography tag="h6">
//                         Certification related to:
//                         <br />
//                         {courseDetails.title}
//                       </MDBTypography>
//                       <hr />
//                       <MDBRow className="pt-1">
//                         <MDBCol size="12" className="mb-3">
//                           <MDBTypography tag="h6"></MDBTypography>
//                         </MDBCol>
//                         <MDBCol size="6" className="mb-3">
//                           <MDBTypography tag="h6">Issued date:
//                           <br />
//                           {issuedDate}</MDBTypography>
//                           <MDBCardText className="text-muted">
//                           </MDBCardText>
//                         </MDBCol>
//                       </MDBRow>

//                       <div className="d-flex justify-content-start">
//                         <a href="#!">
//                           <MDBIcon fab icon="facebook me-3" size="lg" />
//                         </a>
//                         <a href="#!">
//                           <MDBIcon fab icon="twitter me-3" size="lg" />
//                         </a>
//                         <a href="#!">
//                           <MDBIcon fab icon="instagram me-3" size="lg" />
//                         </a>
//                       </div>
//                     </MDBCardBody>
//                   </MDBCol>
//                 </MDBRow>
//               </MDBCard>
//             )}
//           </MDBCol>
//         </MDBRow>
//         </div>
//       </MDBContainer>
//     </section>
//   );
// }


import React, { useState, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "./courseCertificate.scss";
import Logo from "../../../assets/edu.png";
import html2pdf from "html2pdf.js";
import axios from "../../../Config/axios";

export default function CourseCertificate() {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);
  const userDetails = useSelector((state) => state.loggedUser.currentUser);
  const [issuedDate, setIssuedDate] = useState("");
  const certificateRef = useRef(null);
  const [contentLoaded, setContentLoaded] = useState(false);

  useLayoutEffect(() => {
    // Fetch course details when the component mounts
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `/user/getCourseDetailsForCertificate/${courseId}`
        );
        setCourseDetails(response.data); // Assuming the API response contains course details
        setIssuedDate(getFormattedDate(new Date()));
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    };

    fetchCourseDetails(); // Call the function to fetch course details
  }, [courseId]);

  const getFormattedDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };

  // Check if the content is loaded, then set contentLoaded to true
  useLayoutEffect(() => {
    if (certificateRef.current) {
      setContentLoaded(true);
    }
  }, [certificateRef.current]);

  const handleDownloadPDF = () => {
    const element = document.getElementById("pdf-content");
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: "certificate.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(opt).save();
  };

  return (
    <section className="vh-100 certificate-bg">
      <MDBContainer className="py-5 h-100">
        <button className="download-button" onClick={handleDownloadPDF}>
          Download Certificate
        </button>
        <div id="pdf-content">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              {courseDetails && (
                <MDBCard className="mb-3 certificate-card">
                  <MDBRow className="g-0" ref={certificateRef}>
                    <MDBCol
                      md="4"
                      className="gradient-custom text-center text-white certificate-logo"
                    >
                      <MDBCardImage
                        src={Logo}
                        alt="Avatar"
                        className="my-5"
                        fluid
                      />
                      <MDBTypography tag="h5">EDUVERSE</MDBTypography>
                      <MDBCardText>E-learning platform</MDBCardText>
                      <MDBIcon far icon="edit mb-5" />
                    </MDBCol>
                    <MDBCol md="8">
                      <MDBCardBody className="p-4 certificate-content">
                        <MDBTypography tag="h6">
                          CERTIFICATE OF COMPLETION
                        </MDBTypography>
                        <hr className="mt-0 mb-4" />
                        <MDBRow className="pt-1">
                          <MDBCol size="12" className="mb-3">
                            <MDBTypography tag="h6">
                              This participation certificate is given to:
                              <br />
                              {userDetails.name}
                            </MDBTypography>
                          </MDBCol>
                        </MDBRow>
                        <hr />
                        <MDBTypography tag="h6">
                          Certification related to:
                          <br />
                          {courseDetails.title}
                        </MDBTypography>
                        <hr />
                        <MDBRow className="pt-1">
                          <MDBCol size="12" className="mb-3">
                            <MDBTypography tag="h6">
                              Issued date: {issuedDate}
                            </MDBTypography>
                          </MDBCol>
                        </MDBRow>
                        <div className="d-flex justify-content-start social-icons">
                          <a href="#!">
                            <MDBIcon fab icon="facebook me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="twitter me-3" size="lg" />
                          </a>
                          <a href="#!">
                            <MDBIcon fab icon="instagram me-3" size="lg" />
                          </a>
                        </div>
                      </MDBCardBody>
                    </MDBCol>
                  </MDBRow>
                </MDBCard>
              )}
            </MDBCol>
          </MDBRow>
        </div>
      </MDBContainer>
    </section>
  );
}
