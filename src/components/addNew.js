import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
const AddNew = ({ ...props }) => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [goodPic, setGoodPic] = useState(false);
  const [bad, setBad] = useState("");
  const { setModal } = props;
  const AddToCol = async () => {
    const moviesColRef = collection(db, "movies");
    const payload = {
      image: pictureURL,
      name: name,
      summary: summary,
      rating: 0,
      numberOfRatings: 0,
    };
    await addDoc(moviesColRef, payload);
  };
  return (
    <div
      className="z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center
"
    >
      <div>Enter name of movie :</div>
      <input
        type="text"
        placeholder="Movie name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      ></input>
      <div>Enter movie summary :</div>
      <input
        type="text"
        placeholder="Summary"
        onChange={(e) => setSummary(e.target.value)}
        value={summary}
      ></input>
      <div>Enter picture URL</div>
      <input
        type="text"
        placeholder="...png/jpg"
        onChange={(e) => setPictureURL(e.target.value)}
        value={pictureURL}
      ></input>
      <img
        src={pictureURL}
        onLoad={() => setGoodPic(true)}
        onError={() => setGoodPic(false)}
        alt=""
      ></img>
      <button
        onClick={() => {
          if (goodPic === true && name.length !== 0 && summary.length !== 0) {
            AddToCol();
            setModal(false);
          } else if (name.length === 0) setBad("Invalid name");
          else if (summary.length === 0) setBad("Invalid summary");
          else setBad("Invalid Picture URL");
        }}
      >
        Confirm
      </button>
      <div>{bad}</div>
      <button onClick={() => setModal(false)}>Cancel</button>
    </div>
  );
};

export default AddNew;
