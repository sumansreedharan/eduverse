import React from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "../Components/pageVerify/signUp";
import Login from "../Components/pageVerify/login";


function AuthRoute() {
    return (
      <>
        <Routes>
          <Route path="sign" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </>
    );
  }
  
  export default AuthRoute;