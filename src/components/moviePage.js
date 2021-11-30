import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Dorito from "../dorito.png";
import Yair from "../dwawadwadwa.jpg";
import Question from "../question.jpg";
import RateBar from "./rateBar";
import { db } from "../firebase";
import {
  collection,
  where,
  getDocs,
  query,
  limit,
  setDoc,
} from "firebase/firestore";

const MoviePage = ({ ...props }) => {
  const { id } = useParams();
  const [rating, setRating] = useState(-1);
  const [numberOfRatings, setNumberOfRatings] = useState(-1);
  const [movieData, setMovieData] = useState(null);
  const [dbRef, setDbRef] = useState(null);

  const getMovieData = useCallback(async () => {
    const ColRef = collection(db, "movies");
    const q = query(ColRef, where("__name__", "==", `${id}`), limit(1));
    const querySnapshot = await getDocs(q);

    setDbRef(querySnapshot.docs[0].ref);
    setMovieData({
      ...querySnapshot.docs[0].data(),
      id: querySnapshot.docs[0].id,
    });
  }, [id]);

  useEffect(() => {
    if (movieData) {
      setRating(movieData.rating);
      setNumberOfRatings(movieData.numberOfRatings);
    }
  }, [movieData]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData]);

  useEffect(() => {
    if (rating != -1) setDoc(dbRef, { rating }, { merge: true });
  }, [rating]);

  useEffect(() => {
    if (numberOfRatings != -1)
      setDoc(dbRef, { numberOfRatings }, { merge: true });
  }, [numberOfRatings]);

  const [moviePic] = useState(() => {
    switch (id) {
      case "nKToJpPHfBAEz1ZLbm5S":
        return Dorito;
      case "w4Ta08qIh3BNMGzTRGaE":
        return Yair;
      default:
        return Question;
    }
  });

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-100 min-w-screen min-h-screen m-0">
      <div className="flex flex-col justify-center items-center mt-10 mr-96">
        {movieData && (
          <>
            <div className="text-7xl">{movieData.name}</div>
            <div>{movieData.summary} </div>
            <div className="flex flex-row">
              <img
                className="w-56 h-96 rounded-xl m-10"
                src={moviePic}
                alt=""
              />
              {rating !== -1 && numberOfRatings !== -1 ? (
                <RateBar
                  className="m-20"
                  {...{
                    rating,
                    setRating,
                    numberOfRatings,
                    setNumberOfRatings,
                  }}
                />
              ) : (
                console.log("hi")
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MoviePage;
