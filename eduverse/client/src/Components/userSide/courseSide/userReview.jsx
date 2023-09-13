import React, { useState } from 'react';
import './review.scss'

const Review = ({ onReviewSubmit }) => {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = () => {
    onReviewSubmit(text);
    // Optionally, you can update the UI to reflect the new review
    setText(''); // Clear the input field after submission
  };

  return (
    <div className="review-component">
      <h3>Write a Review:</h3>
      <div className="review-input">
        <textarea
          rows="4"
          cols="50"
          placeholder="Write your review here..."
          value={text}
          onChange={handleTextChange}
        ></textarea>
        <button onClick={handleSubmit}>Submit Review</button>
      </div>
    </div>
  );
};

export default Review;
