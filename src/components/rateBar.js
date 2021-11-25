import { useEffect, useState } from "react";
import { db } from "../firebase";

const RateBar = (props) => {
  const [Slider, setSlider] = useState(1);
  const { rating, setRating, id } = props;
  const [numberOfRatings, setNumberOfRatings] = useState(0);

  const [average, setAverage] = useState(-1);

  return (
    <div>
      <div>
        <div>Rotem Tomatoes Rating</div>
        <div>{average}</div>
      </div>
      <div>Rate this movie</div>
      <input
        type="range"
        step="1"
        onChange={(e) => {
          setSlider(e.target.value);
        }}
        max="10"
        min="1"
        defaultValue="1"
      />
      <div>{Slider}</div>
      <button
        onClick={() => {
          setAverage(
            (average * numberOfRatings + parseInt(Slider)) /
              (numberOfRatings + 1)
          );
          setNumberOfRatings(numberOfRatings + 1);
        }}
      >
        Confirm
      </button>
    </div>
  );
};

export default RateBar;
