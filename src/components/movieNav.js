import { FireIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddNew from "./addNew";

const MovieNav = (props) => {
  const [modal, setModal] = useState(false);
  const Toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      <div className="flex flex-row space-x-10 justify-center h-10 items-center bg-gray-50">
        <div className="flex flex-row">
          <span className="text-3xl">Rotem Tomatoes</span>
          <span>
            {" "}
            <FireIcon className="h-8 w-8 text-red-600 ml-2"></FireIcon>{" "}
          </span>{" "}
        </div>
        <Link
          to={{
            pathname: `/`,
          }}
        >
          <div>Featured movies</div>
        </Link>
        <div onClick={Toggle}>Add Movie!</div>
      </div>
      {modal ? <AddNew setModal={setModal}></AddNew> : null}
    </div>
  );
};

export default MovieNav;
