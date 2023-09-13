import React from 'react';
import './ratingSuccess.scss'

const RatingPopup = ({ message, onClose }) => {
  return (
    <div className="rating-popup">
      <div className="rating-popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default RatingPopup;
