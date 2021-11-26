import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Dorito from "../dorito.png";
import Yair from "../dwawadwadwa.jpg";
import Question from "../question.jpg";
import RateBar from "./rateBar";
import { db } from "../firebase";
import { collection, where, doc, getDocs, query } from "firebase/firestore";

const MoviePage = (...props) => {
  const [rating, setRating] = useState(0);
  const [summary, setSummary] = useState("");
  const { id } = useParams();
  const movieData = [];
  const getMovieInfo = async () => {
    const ColRef = collection(db, "movies");
    const q = query(ColRef, where("name", "==", `${id}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      movieData.push(doc.data());
    });
    return movieData[0];
  };
  useEffect(() => {
    getMovieInfo().then((data) => {
      setRating(data.rating);
      setSummary(data.summary);
    });
  }, []);
  const [moviePic, setmoviePic] = useState(() => {
    switch (id) {
      case "Dorito":
        return Dorito;
      case "Marillmon":
        return Yair;
      default:
        return Question;
    }
  });

  return (
    <div className="flex flex-col justify-center items-center mt-10 mr-96">
      <div className="text-7xl">{id}</div>
      <div>{summary}</div>
      <div>hi</div>
      <div className="flex flex-row">
        <img className="w-56 h-96 rounded-xl m-10" src={moviePic} alt="" />
        <RateBar
          rating={rating}
          setRating={setRating}
          name={id}
          className="m-20"
        />
      </div>
    </div>
  );
};

export default MoviePage;
