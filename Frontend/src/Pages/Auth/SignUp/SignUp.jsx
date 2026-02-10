import React, { useState } from "react";
import { motion } from "framer-motion";
import "./SignUpStyle.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering:", formData);
  };

  return (
    <div className="register-container">
      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2>Join SkillHub</h2>
        <p className="subtitle">Start exchanging your expertise today</p>

        <form onSubmit={handleSubmit}>
          <div className="input-row">
            <div className="input-group">
              <label>name</label>
              <input type="text" placeholder="johndoe" required />
            </div>
            <div className="input-group">
              <label>last name</label>
              <input type="text" placeholder="doe" required />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input type="email" placeholder="name@example.com" required />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="••••••••" required />
            </div>
          </div>

          <button type="submit" className="register-button">
            Create Account
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to={"/auth"} className="link">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
