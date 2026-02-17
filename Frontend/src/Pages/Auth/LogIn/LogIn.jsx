import React, { useState } from "react";
import "./LoginStyle.css";
import { Link } from "react-router-dom";
import path from "path";
import { useLogin } from "../../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(
      { email, password },
      {
        onSuccess: () => {
          navigate("/");
        },
      },
    );
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your skill exchange</p>

        <form onSubmit={handleSubmit}>
          {isError && (
            <div
              className="error-message"
              style={{ color: "red", marginBottom: "10px" }}
            >
              {error?.response?.data?.message ||
                "Login failed. Please try again."}
            </div>
          )}
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isPending}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isPending}
            />
          </div>

          <button type="submit" className="login-button">
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="footer-text">
          Don't have an account?{" "}
          <Link to={"/register"} className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
