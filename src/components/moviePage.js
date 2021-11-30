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
import Stars from "./stars";

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
    <main className="min-h-screen flex justify-center items-center">
      <div className="flex bg-gray-50 rounded-2xl shadow-lg p-14 relative">
        <div className="flex flex-col mr-7">
          {movieData && (
            <>
              <div className="text-7xl font-semibold text-gray-900 truncate">
                {movieData.name}
              </div>
              <div className="flex-1 mt-10">
                <div className="text-xl">Movie Summary:</div>
                <div className="mt-2 w-96">{movieData.summary}</div>
              </div>
              <div className="flex flex-row">
                {rating !== -1 && numberOfRatings !== -1 && (
                  <RateBar
                    className="m-20"
                    {...{
                      rating,
                      setRating,
                      numberOfRatings,
                      setNumberOfRatings,
                    }}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div className="flex flex-col justify-between items-center">
          <div className="flex flex-col mt-7 bg-gray-100 shadow-lg rounded-lg p-4">
            {rating !== -1 && numberOfRatings !== -1 && (
              <Stars className="" starLength={Math.floor(rating / 2)}></Stars>
            )}
            <div className="mt-2">
              Number of ratings:{" "}
              <span className="font-bold">{numberOfRatings}</span>
            </div>
          </div>
          <img className="w-96 mt-5 rounded-md" src={moviePic} alt="" />
        </div>
        <div className="absolute left-8 top-8 border-t-4 border-l-4 w-7 h-7 border-gray-600 rounded-tl-md" />
        <div className="absolute right-8 bottom-8 border-b-4 border-r-4 w-7 h-7 border-gray-600 rounded-br-md" />
      </div>
    </main>
  );
};

export default MoviePage;
