import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/Auth/LogIn/LogIn";
import SignUp from "./Pages/Auth/SignUp/SignUp";

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />

      </Routes>
    </Router>
  );
}

export default App;
