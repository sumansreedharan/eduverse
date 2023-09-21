import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Components/pageVerify/signUp";
import Login from "../Components/pageVerify/login";
import LandingPage from "../Components/landingPage/landingPage"
import UserAuth from "../Auth/UserAuth";


function AuthRoute() {
    return (
      <>
        <Routes>
          <Route element={<UserAuth/>}>
          <Route path="sign" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="" element={<LandingPage />} />
          </Route>
        </Routes>
      </>
    );
  }
  
  export default AuthRoute;