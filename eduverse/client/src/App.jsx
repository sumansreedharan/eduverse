import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserRoute from "./Routes/userRoute";
import AdminRoute from "./Routes/AdminRoute";
import MentorRoute from "./Routes/MentorRoute";
import AuthRoute from "./Routes/AuthRoute";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/*" element={<AuthRoute />} />
          <Route path="/user*" element={<UserRoute />} />
          <Route path="/admin*" element={<AdminRoute />} />
          <Route path="/mentor*" element={<MentorRoute />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
