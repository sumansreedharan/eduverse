
import React, { useState } from 'react';
import './rating.scss';

const Rating = ({ onRatingSubmit }) => {
  const [rating, setRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = () => {
    onRatingSubmit(rating);
    // Optionally, you can update the UI to reflect the new rating
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`star ${i <= rating ? 'selected' : ''}`}
          onClick={() => handleRatingChange(i)}
        >
          &#9733; {/* Unicode character for a star */}
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="rating-component">
      <h3 style={{alignSelf:"flex-start"}}>Rate this course:</h3>
      <div style={{alignSelf:"flex-start"}} className="rating-input">
        {renderStars()}
        <button onClick={handleSubmit}>Submit Rating</button>
      </div>
    </div>
  );
};

export default Rating;

