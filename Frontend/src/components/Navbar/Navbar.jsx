import React from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './NavStyle.css';

const Navbar = () => {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/auth', label: 'Log In' }
  ];

  return (
    <nav className="navbar-container">
      <div className="logo">SkillHub</div>
      <ul className="nav-links">
        {links.map((link) => (
          <li key={link.path}>
            <NavLink to={link.path} className="nav-item">
              {({ isActive }) => (
                <>
                  <span className={`nav-text ${isActive ? 'active' : ''}`}>
                    {link.label}
                  </span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="bubble"
                      className="nav-active-bg"
                      transition={{ 
                        type: 'spring', 
                        bounce: 0.2, 
                        duration: 0.6 
                      }}
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;