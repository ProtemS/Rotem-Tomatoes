import { useEffect, useState } from "react";
import Stars from "./stars";

const RateBar = (props) => {
  const [currentRating, setCurrentRating] = useState(0);

  const { rating, setRating, numberOfRatings, setNumberOfRatings } = props;
  const starLength = Math.ceil(rating / 2);

  return (
    <div>
      <div>
        <div>Rotem Tomatoes Rating: {rating}</div>
        <Stars starLength={starLength}></Stars>
        <div>Number of ratings : {numberOfRatings}</div>
      </div>
      <div className="pt-4">Rate this movie</div>

      <input
        type="range"
        onChange={(e) => {
          setCurrentRating(parseInt(e.target.value));
        }}
        max="10"
        min="1"
        value={currentRating}
      />
      <div>{currentRating ? currentRating : "Choose your rating"}</div>
      {currentRating !== 0 && (
        <button
          onClick={() => {
            setRating(
              (rating * numberOfRatings + currentRating) / (numberOfRatings + 1)
            );
            setNumberOfRatings(numberOfRatings + 1);
          }}
        >
          Confirm
        </button>
      )}
    </div>
  );
};

export default RateBar;
