import { FireIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import AddNew from "./addNew";

const MovieNav = ({ ...props }) => {
  return (
    <div className="flex flex-row space-x-10 justify-center h-10 items-center bg-gray-50">
      <div className="flex flex-row">
        <span>Rotem Tomatoes</span>
        <span>
          {" "}
          <FireIcon className="h-5 w-4 text-red-600 ml-2"></FireIcon>{" "}
        </span>{" "}
      </div>
      <Link
        to={{
          pathname: `/`,
        }}
      >
        <div>Featured movies</div>
      </Link>
    </div>
  );
};

export default MovieNav;
