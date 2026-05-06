import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
// import Quiz from "../pages/Quiz";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:data" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
