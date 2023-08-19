import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHomePage from "../Components/userSide/userHome/userHome";
import CourseDetails from "../Components/userSide/courseSide/courseDetails";
import UserProfile from "../Components/userSide/userProfile/userProfile";
import YourCourses from '../Components/userSide/courseSide/purchasedCourses';
import DetailedCourseView from "../Components/userSide/courseSide/detailedCourseView"
import UserAuth from "../Auth/UserAuth";

function UserRoute() {
  return (
    <>
      <Routes>
        <Route element={<UserAuth logged='true'></UserAuth>}>
        <Route path="userHome" element={<UserHomePage />} />
        <Route path="courseDetails/:id" element={<CourseDetails />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="yourCourses/:userId" element={<YourCourses />} />
        <Route path="courseVideoDetails/:courseId" element={<DetailedCourseView/>} />
        </Route>
      </Routes>
    </>
  );
}

export default UserRoute;
