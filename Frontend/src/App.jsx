import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import HomePage from "./Pages/HomePage/HomePage";
import CardsPage from "./Pages/CardsPage/CardsPage";

function App() {

  return (
    <Router>
      <Navbar/>

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/cards" element={<CardsPage/>} />
        {/* <Route path="/register" element={<RegisterPage />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
