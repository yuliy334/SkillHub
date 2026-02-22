import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../../../hooks/useAuth";
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import "./SignUpStyle.css";

const getErrorMessage = (error) => {
  const errorData = error?.response?.data;
  
  if (typeof errorData === "string") {
    const errorMap = {
      "email is exist": "This email is already registered",
      "unexepted error": "Something went wrong. Please try again",
    };
    return errorMap[errorData] || errorData;
  }
  
  if (error?.message === "Network Error") {
    return "Unable to connect to server. Please check your connection";
  }
  
  return "An unexpected error occurred. Please try again";
};

const RegisterPage = () => {
  const navigate = useNavigate();
  const { mutate: signUpMutate, isLoading, isError, error } = useRegister();
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [validationError, setValidationError] = useState("");
  
  const displayError = validationError || (isError ? getErrorMessage(error) : "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords do not match!");
      return;
    }

    const { confirmPassword, ...registerData } = formData;

    signUpMutate(registerData, {
      onSuccess: () => {
        navigate("/");
      },
    });
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
          {displayError && (
            <div className="error-message">
              <WarningAmberIcon className="error-icon" />
              <span>{displayError}</span>
            </div>
          )}

          <div className="input-row">
            <div className="input-group">
              <label>First Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John"
                required
              />
            </div>
            <div className="input-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              required
            />
          </div>

          <div className="input-row">
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/auth" className="link">
            Log In
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
