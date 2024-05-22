import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KAppBar from "./COMPONENTS/AppBar";
import BlogPage from "./PAGES/BlogPage";
import LeaveANote from "./PAGES/LeaveANote";

import MainPage from "./PAGES/MainPage";
import LandingPage from "./PAGES/LandingPage";
import DeveloperPage from "./PAGES/DeveloperPage";

function RouterPage() {
  return (
    <>
      <Router>
        <KAppBar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dev" element={<MainPage />} />
          <Route path="/Blog" element={<BlogPage />} />
          <Route path="/BirNotBırak" element={<LeaveANote />} />
          <Route path="/BirNotBırak" element={<DeveloperPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouterPage;

//<Route path="/Connection" element={<ConnectionPage/>} />
