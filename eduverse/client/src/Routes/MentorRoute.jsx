import React from "react";
import { Routes, Route } from "react-router-dom";
import MentorHome from "../Components/mentorSide/mentorHome/mentorHome";
import MentorProfile from "../Components//mentorSide/mentorProfile/mentorProfile";
import CourseManage from "../Components/mentorSide/courseManage/courseManage";
import UploadVideoForm from "../Components/mentorSide/courseManage/videoUpload";
import MentorAuth from "../Auth/MentorAuth";

function MentorRoute() {
  return (
    <>
      <Routes>
        <Route element={<MentorAuth logged='true'/>}>

        <Route path="/mentorHome" element={<MentorHome />} />
        <Route path="/mentorProfile" element={<MentorProfile />} />
        <Route path="/courseManage" element={<CourseManage />} />
        <Route path="/videoUpload/:courseId" element={<UploadVideoForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default MentorRoute;
