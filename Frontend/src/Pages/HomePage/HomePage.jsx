import React from 'react';
import './HomePageStyle.css';

const HomePage = () => {
  return ( 
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to SkillHub</h1>
        <p>The central hub for developing your skills and sharing expertise</p>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Courses</h3>
          <p>Find the best learning materials to boost your IT and design skills.</p>
        </div>
        
        <div className="feature-card">
          <h3>Community</h3>
          <p>Connect with like-minded people and find mentors for your projects.</p>
        </div>

        <div className="feature-card">
          <h3>Projects</h3>
          <p>Build your portfolio and participate in team-based development.</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;