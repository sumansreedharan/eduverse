// import React, { useState } from 'react';
// import './rating.scss'

// const Rating = ({ onRatingSubmit }) => {
//   const [rating, setRating] = useState(0);

//   const handleRatingChange = (event) => {
//     setRating(event.target.value);
//   };

//   const handleSubmit = () => {
//     onRatingSubmit(rating);
//     // Optionally, you can update the UI to reflect the new rating
//   };

//   return (
//     <div className="rating-component">
//       <h3>Rate this course:</h3>
//       <div className="rating-input">
//         <input
//           type="number"
//           min="1"
//           max="5"
//           value={rating}
//           onChange={handleRatingChange}
//         />
//         <button onClick={handleSubmit}>Submit Rating</button>
//       </div>
//     </div>
//   );
// };

// export default Rating;



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

