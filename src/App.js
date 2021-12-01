import "./App.css";
import MovieSelect from "./components/movieSelect";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/moviePage";
import MovieNav from "./components/movieNav";

function App() {
  return (
    <div className="App">
      <MovieNav></MovieNav>
      <Routes>
        <Route exact path="/" element={<MovieSelect currentRoute="hi" />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
