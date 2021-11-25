import "./App.css";
import MovieSelect from "./components/movieSelect";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/moviePage";
import app, { db } from "./firebase";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<MovieSelect />} />
        <Route path="/movies/:id" element={<MoviePage />} />
      </Routes>
    </div>
  );
}

export default App;
