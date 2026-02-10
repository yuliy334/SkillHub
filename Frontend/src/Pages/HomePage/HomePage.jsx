import React from "react";
import "./HomePageStyle.css";

const HomePage = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <h1>Welcome to SkillHub</h1>
        <p>The central hub for developing your skills and sharing expertise</p>
      </section>

      <div className="features-grid">
        <div className="feature-card">
          <h3>Give a Skill</h3>
          <p>
            Share your unique expertise in coding, design, or networking and
            help others grow.
          </p>
        </div>

        <div className="feature-card">
          <h3>Gain a Skill</h3>
          <p>
            Learn directly from peers by trading your knowledge. No tuition,
            just pure experience.
          </p>
        </div>

        <div className="feature-card">
          <h3>Grow Together</h3>
          <p>
            Build real-world projects in pairs and expand your professional
            SkillHub network.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
