import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../../hooks/useUserStore";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useLogout } from "../../hooks/useAuth";
import "./NavStyle.css";

const Navbar = () => {
  const { data: user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const { mutate: logOutMutate } = useLogout();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const links = user
    ? [
        { path: "/", label: "Home" },
        { path: "/my-adverts", label: "My Adverts" },
      ]
    : [{ path: "/", label: "Home" }];

  return (
    <nav className="navbar-container">
      <div className="logo">SkillHub</div>

      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path} className="nav-item">
              {({ isActive }) => (
                <>
                  <span className={`nav-text ${isActive ? "active" : ""}`}>
                    {link.label}
                  </span>
                  {isActive && (
                    <motion.div layoutId="bubble" className="nav-active-bg" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}

        {!user ? (
          <li>
            <NavLink to="/auth" className="nav-item">
              {({ isActive }) => (
                <>
                  <span className={`nav-text ${isActive ? "active" : ""}`}>
                    Log In
                  </span>
                  {isActive && (
                    <motion.div layoutId="bubble" className="nav-active-bg" />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ) : (
          <li className="user-menu-container" ref={menuRef}>
            <div
              className="user-profile-trigger"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <AccountCircleIcon sx={{ color: "white" }} />
              <span className="nav-text active">
                {user.username || user.name}
              </span>
            </div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="dropdown-menu"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                >
                  <Link
                    to="/profile"
                    className="dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PersonIcon fontSize="small" />
                    my account
                  </Link>
                  <Link
                    to="/my-adverts"
                    className="dropdown-item"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <AssignmentIcon fontSize="small" />
                    my adverts
                  </Link>
                  <button
                    className="dropdown-item logout"
                    onClick={logOutMutate}
                  >
                    <LogoutIcon fontSize="small" />
                    log out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
