import { useEffect, useState } from "react";

const RateBar = (props) => {
  const [currentRating, setCurrentRating] = useState(0);

  const { rating, setRating, numberOfRatings, setNumberOfRatings } = props;

  return (
    <div>
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
