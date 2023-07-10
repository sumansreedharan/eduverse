import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Register from "./pageVerify/registration"
import Signup from "./pageVerify/signUp"
import Login from './pageVerify/login';
import UserHome from './userSide/userHome/userHome'
import AdminHome from './adminSide/adminHome/adminHome'
import MentorHome from './mentorSide/mentorHome/mentorHome'
import UserProfile from './userSide/userProfile/userProfile'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
         {/* <Route path = "/register" element={<Register />} /> */}
         <Route path = "/sign" element={<Signup />} />
         <Route path = "/login" element={<Login />} />
         <Route path="/userHome" element={<UserHome />} />
         <Route path="/admin/adminHome" element={<AdminHome />} />
         <Route path="/mentorHome" element={<MentorHome />} />
         <Route path="/userProfile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


