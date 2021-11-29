import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
const getAllMovies = async () => {
  const moviesColRef = collection(db, "movies");
  const moviesSnapshot = await getDocs(moviesColRef);
  const movies = [];
  moviesSnapshot.forEach((doc) => {
    movies.push({ ...doc.data(), id: doc.id });
  });
  return movies;
};
const MovieSelect = () => {
  const [movies, setMovies] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    getAllMovies().then((moviesData) => {
      setMovies(moviesData);
      setDone(true);
    });
  }, []);

  /*<div className="flex flex-col relative top-10 bg-yellow-100 h-screen  align-middle">
      <button onClick={getAllMovies}>hi</button>
      {movies.map((movie, i) => (
        <div>{movie.name}</div>
      ))}
    </div> */
  return (
    <>
      {!done ? (
        <div className="flex justify-center align-middle flex-col">
          <div className="text-center text-7xl">Loading</div>
          <div className="flex align-middle justify-center">
            <ReactLoading type="spin" color="black" width={500} height={500} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col relative top-10 bg-yellow-100 h-screen  align-middle">
          <button onClick={getAllMovies}>hi</button>
          {movies.map((movie, i) => (
            <Link
              key={i}
              to={{
                pathname: `/movies/${movie.id}`,
              }}
            >
              <div>{movie.name}</div>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default MovieSelect;
