import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from "./pageVerify/registration"
import Signup from "./pageVerify/signUp"
import Login from './pageVerify/login';
import UserHome from './userSide/userHome/userHome'
import AdminHome from './adminSide/adminHome/adminHome'
import MentorHome from './mentorSide/mentorHome/mentorHome'
import UserProfile from './userSide/userProfile/userProfile'
import UserManage from './adminSide/userManage/userManage'
import MentorManage from "./adminSide/mentorManage/mentorManage"
import MentorProfile from "./mentorSide/mentorProfile/mentorProfile"
import CourseManage from "./mentorSide/courseManage/courseManage"
import CategoryList from "./adminSide/categoryManage/categoryList"
import CourseView from "./adminSide/mentorManage/courseView"
import CourseDetails from "./userSide/courseSide/courseDetails"

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
         {/* <Route path = "/register" element={<Register />} /> */}
         <Route path = "/sign" element={<Signup />} />
         <Route path = "/login" element={<Login />} />
         <Route path="/userHome" element={<UserHome />} />
         <Route path="/courseDetails/:id" element={<CourseDetails />} />
         <Route path="/admin/adminHome" element={<AdminHome />} />
         <Route path="/admin/userManage" element={<UserManage />} />
         <Route path="/admin/mentorManage" element={<MentorManage />} />
         <Route path="/admin/categoryList" element={<CategoryList />} />
         <Route path="/admin/courseView" element={<CourseView />} />
         <Route path="/userProfile" element={<UserProfile />} />
         <Route path="/mentor/mentorHome" element={<MentorHome />} />
         <Route path="/mentor/mentorProfile" element={<MentorProfile />} />
         <Route path="/mentor/courseManage" element={<CourseManage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


