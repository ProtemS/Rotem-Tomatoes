import { useEffect, useState } from "react";

const RateBar = (props) => {
  const [currentRating, setCurrentRating] = useState(0);

  const { rating, setRating, numberOfRatings, setNumberOfRatings } = props;

  return (
    <div className="flex flex-row ml-10">
      <div className="flex-1 flex flex-col justify-center items-center">
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
      </div>

      {currentRating !== 0 && (
        <button
          className="bg-gray-600 shadow-md px-4 py-3 text-white rounded-md mt-2"
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
