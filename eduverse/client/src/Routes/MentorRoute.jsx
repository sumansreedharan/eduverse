import React from "react";
import { Routes, Route } from "react-router-dom";
import MentorHome from "../Components/mentorSide/mentorHome/mentorHome";
import MentorProfile from "../Components//mentorSide/mentorProfile/mentorProfile";
import CourseManage from "../Components/mentorSide/courseManage/courseManage";
import UploadVideoForm from "../Components/mentorSide/courseManage/videoUpload";
import MentorPurchaseHistory from "../Components/mentorSide/purchaseDetails/purchaseDetails";
import Chat from "../Components/commonChat/chat"
import MentorAuth from "../Auth/MentorAuth";

function MentorRoute() {
  const mentor = 'mentor'
  return (
    <>
      <Routes>
        <Route element={<MentorAuth logged='true'/>}>

        <Route path="/mentorHome" element={<MentorHome />} />
        <Route path="/mentorProfile" element={<MentorProfile />} />
        <Route path="/courseManage" element={<CourseManage />} />
        <Route path="/videoUpload/:courseId" element={<UploadVideoForm />} />
        <Route path="/purchaseDetails" element={<MentorPurchaseHistory />} />
        <Route path="/chat/:chatId" element={<Chat mentor={mentor}/>} />
        </Route>
      </Routes>
    </>
  );
}

export default MentorRoute;
