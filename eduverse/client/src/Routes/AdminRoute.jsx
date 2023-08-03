import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "../Components/adminSide/adminHome/adminHome";
import UserManage from "../Components/adminSide/userManage/userManage";
import MentorManage from "../Components/adminSide/mentorManage/mentorManage";
import CategoryList from "../Components/adminSide/categoryManage/categoryList";
import CourseView from "../Components/adminSide/mentorManage/courseView";

function AdminRoute() {
  return (
    <>
      <Routes>
        <Route path="/adminHome" element={<AdminHomePage />} />
        <Route path="/userManage" element={<UserManage />} />
        <Route path="/mentorManage" element={<MentorManage />} />
        <Route path="/categoryList" element={<CategoryList />} />
        <Route path="/courseView" element={<CourseView />} />
      </Routes>
    </>
  );
}

export default AdminRoute;
