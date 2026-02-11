import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KAppBar from "./COMPONENTS/AppBar";
import LandingPage from "./PAGES/LandingPage";

//import BlogPage from "./PAGES/BlogPage";
//import LeaveANote from "./PAGES/LeaveANote";
//import MainPage from "./PAGES/MainPage";
// import DeveloperPage from "./PAGES/DeveloperPage"; // unnecessary page for now, can be added later when the page is ready.

function RouterPage() {
  return (
    <>
      <Router>
        <KAppBar />

        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default RouterPage;

//unnnecessary route for now, can be added later when the page is ready.
//<Route path="/Blog" element={<BlogPage />} />
//<Route path="/BirNotBırak" element={<LeaveANote />} />
//<Route path="/dev" element={<MainPage />} />
//<Route path="/BirNotBırak" element={<DeveloperPage />} /> 
//<Route path="/Connection" element={<ConnectionPage/>} />
