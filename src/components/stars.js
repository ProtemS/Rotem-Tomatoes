import { useEffect, useState } from "react";
import Question from "../question.jpg";
import { StarIcon } from "@heroicons/react/solid";

const Stars = ({ starLength, ...props }) => {
  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-2" {...props}>
      <div className="flex">
        {Array.from({ length: 5 }, (_n, i) => (
          <StarIcon
            key={i}
            className={`w-8 h-8 ${
              i < starLength ? "text-yellow-400" : "text-black opacity-50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Stars;
