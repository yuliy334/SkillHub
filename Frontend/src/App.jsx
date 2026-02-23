import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import LoginPage from "./Pages/Auth/LogIn/LogIn";
import SignUp from "./Pages/Auth/SignUp/SignUp";
import AccountPage from "./Pages/Account/AccountPage";
import MyAdvertsPage from "./Pages/MyAdverts/MyAdvertsPage";
import MyOffersPage from "./Pages/MyOffers/MyOffersPage";
import AllAdvertsPage from "./Pages/AllAdverts/AllAdvertsPage";
import { useAuthInit } from "./hooks/useAuthInit";

function App() {
  const isAuthReady = useAuthInit();

  if (!isAuthReady) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh", color: "#94a3b8" }}>
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/profile" element={<AccountPage />} />
        <Route path="/my-adverts" element={<MyAdvertsPage />} />
        <Route path="/my-offers" element={<MyOffersPage />} />
        <Route path="/adverts" element={<AllAdvertsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
