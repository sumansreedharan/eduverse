import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminHomePage from "../Components/adminSide/adminHome/adminHome";
import UserManage from "../Components/adminSide/userManage/userManage";
import MentorManage from "../Components/adminSide/mentorManage/mentorManage";
import CategoryList from "../Components/adminSide/categoryManage/categoryList";
import CourseView from "../Components/adminSide/mentorManage/courseView";
import AdminPaymentReport from "../Components/adminSide/reports/paymentReports"
import MonthlySalesChart from "../Components/adminSide/charts/chartReports"
import AdminAuth from "../Auth/AdminAuth";

function AdminRoute() {
  return (
    <>
      <Routes>
        <Route element={<AdminAuth logged='true'></AdminAuth>}>
        <Route path="/adminHome" element={<AdminHomePage />} />
        <Route path="/userManage" element={<UserManage />} />
        <Route path="/mentorManage" element={<MentorManage />} />
        <Route path="/categoryList" element={<CategoryList />} />
        <Route path="/courseView" element={<CourseView />} />
        <Route path="/reports" element={<AdminPaymentReport />} />
        <Route path="/chartInfo" element={<MonthlySalesChart />} />
        </Route>
      </Routes>
    </>
  );
}

export default AdminRoute;
