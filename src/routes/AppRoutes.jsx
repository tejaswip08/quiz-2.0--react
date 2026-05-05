import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Quiz from "../pages/Quiz";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-attempt" element={<Quiz />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
