import React from "react";
import { Routes, Route } from "react-router-dom";
import UserHomePage from "../Components/userSide/userHome/userHome";
import CourseDetails from "../Components/userSide/courseSide/courseDetails";
import UserProfile from "../Components/userSide/userProfile/userProfile";
import YourCourses from '../Components/userSide/courseSide/purchasedCourses';
import DetailedCourseView from "../Components/userSide/courseSide/detailedCourseView"
import CategoryCourses from "../Components/userSide/categoryComponent/listByCategories";
import Chat from "../Components/commonChat/chat"
import Certificate from "../Components/userSide/certificate/courseCertificate"
import UserAuth from "../Auth/UserAuth";

function UserRoute() {
  const user = 'user'
  return (
    <>
      <Routes>
        <Route element={<UserAuth logged='true'></UserAuth>}>
        <Route path="userHome" element={<UserHomePage />} />
        <Route path="courseDetails/:id" element={<CourseDetails />} />
        <Route path="userProfile" element={<UserProfile />} />
        <Route path="yourCourses/:userId" element={<YourCourses />} />
        <Route path="courseVideoDetails/:courseId" element={<DetailedCourseView/>} />
        <Route path="listBycategory/:categoryId" element={<CategoryCourses/>} />
        <Route path="chat/:chatId" element={<Chat user={user}/>} />
        <Route path="certificate/:courseId" element={<Certificate/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default UserRoute;
