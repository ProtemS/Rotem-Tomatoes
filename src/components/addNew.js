import { useState, Fragment } from "react";
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
    <Transition appear show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setModal(false);
        }}
      >
        <div className="min-h-screen px-4">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-all ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 backdrop-filter backdrop-blur-lg backdrop-brightness-50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-10 bg-opacity-70 rounded-2xl w-96 flex flex-col space-y-4"
            as="div"
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div>
              <label for="movieName">Enter name of movie:</label>
              <input
                type="text"
                id="movieName"
                placeholder="Movie name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="bg-gray-200 w-full"
              />
            </div>
            <div>
              <label for="movieSummary">Enter summary:</label>
              <textarea
                id="movieSummary"
                placeholder="Summary"
                onChange={(e) => setSummary(e.target.value)}
                value={summary}
                className="bg-gray-200 block w-full"
              />
            </div>
            <div>
              <label for="moviePic">Enter picture URL:</label>
              <input
                id="moviePic"
                type="text"
                placeholder="...png/jpg"
                onChange={(e) => setPictureURL(e.target.value)}
                value={pictureURL}
                className="bg-gray-200 w-full"
              />
            </div>
            <img
              src={pictureURL}
              onLoad={() => setGoodPic(true)}
              onError={() => setGoodPic(false)}
              alt=""
              className="max-h-20 max-w-sm mt-4"
            />
            <button
              className="font-semibold text-l"
              onClick={() => {
                if (
                  goodPic === true &&
                  name.length !== 0 &&
                  summary.length !== 0
                ) {
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
            <button className="font-semibold" onClick={() => setModal(false)}>
              Cancel
            </button>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddNew;
