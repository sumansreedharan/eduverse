import React from "react";
import StarRatings from "react-star-ratings";

const StarRating = ({ rating, totalRatings }) => {
  // Check if 'rating' is a valid number
  const isValidRating = !isNaN(rating) && isFinite(rating);

  return (
    <div>
      {isValidRating ? (
        <>
          <StarRatings
            rating={rating}
            starDimension="20px"
            starSpacing="5px"
            starRatedColor="gold"
            numberOfStars={5}
          />
          <span>{rating.toFixed(1)}</span>
        </>
      ) : (
        "No ratings available"
      )}
      ({totalRatings} ratings)
    </div>
  );
};

export default StarRating;
