import './Card.css';
import React from 'react'

const Card = ({ data }) => {
  if (!data) return null;

  return (
    <div className="skill-card">
      <div className="skill-card-header">
        <span className="skill-card-category">{data.category}</span>
        <span className="skill-card-user">{data.name}</span>
      </div>

      <div className="skill-card-content">
        {/* Секция предложения */}
        <div className="skill-card-section offer">
          <span className="skill-card-label">Take:</span>
          <p className="skill-card-text">{data.offer}</p>
        </div>

        <hr className="skill-card-divider" />

        {/* Секция запроса */}
        <div className="skill-card-section demand">
          <span className="skill-card-label">Want:</span>
          <p className="skill-card-text">{data.demand}</p>
        </div>
      </div>

      <button className="skill-card-button">
        Offer trade
      </button>
    </div>
  );
};


export default Card;