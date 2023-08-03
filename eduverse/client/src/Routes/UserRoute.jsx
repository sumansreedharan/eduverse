import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHomePage from "../Components/userSide/userHome/userHome";
import CourseDetails from "../Components/userSide/courseSide/courseDetails";
import UserProfile from "../Components/userSide/userProfile/userProfile";

function UserRoute() {
  return (
    <>
      <Routes>
        <Route path="userHome" element={<UserHomePage />} />
        <Route path="courseDetails/:id" element={<CourseDetails />} />
        <Route path="userProfile" element={<UserProfile />} />
      </Routes>
    </>
  );
}

export default UserRoute;
