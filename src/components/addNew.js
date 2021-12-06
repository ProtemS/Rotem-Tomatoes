import { useEffect, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Dialog, Transition } from "@headlessui/react";

const AddNew = ({ ...props }) => {
  const [name, setName] = useState("");
  const [summary, setSummary] = useState("");
  const [pictureURL, setPictureURL] = useState("");
  const [goodPic, setGoodPic] = useState(false);
  const [bad, setBad] = useState("");
  const { setModal, modal } = props;
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
    <Dialog open={modal} onClose={() => setModal(false)}>
      <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
      <div
        className="z-10 fixed top-1/2 left-1/2 transform min-w-0 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center w-96 max-w-full bg-gray-400 rounded-md h-72 max-h-full border-2 border-black
"
      >
        <div>Enter name of movie :</div>
        <input
          type="text"
          placeholder="Movie name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-52  bg-gray-200"
        ></input>
        <div>Enter movie summary :</div>
        <input
          type="text"
          placeholder="Summary"
          onChange={(e) => setSummary(e.target.value)}
          value={summary}
          className="w-52 bg-gray-200"
        ></input>
        <div>Enter picture URL</div>
        <input
          type="text"
          placeholder="...png/jpg"
          onChange={(e) => setPictureURL(e.target.value)}
          value={pictureURL}
          className="w-52 bg-gray-200"
        ></input>
        <img
          src={pictureURL}
          onLoad={() => setGoodPic(true)}
          onError={() => setGoodPic(false)}
          alt=""
          className="max-h-20 max-w-sm mt-4"
        ></img>
        <button
          onClick={() => {
            if (goodPic === true && name.length !== 0 && summary.length !== 0) {
              AddToCol();
              setModal(false);
              window.location.reload(false);
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
    </Dialog>
  );
};

export default AddNew;
