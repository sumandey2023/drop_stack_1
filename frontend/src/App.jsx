import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Files from "./components/Files";
import About from "./components/About";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/files" element={<Files />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
