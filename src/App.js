import "./App.css";
import MovieSelect from "./components/movieSelect";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/moviePage";
import MovieNav from "./components/movieNav";

function App() {
  return (
    <div className="App flex flex-col h-screen">
      <MovieNav />
      <main className="flex-1 overflow-auto scrollbar-thin scrollbar-thumb-red-400">
        <Routes>
          <Route exact path="/" element={<MovieSelect currentRoute="hi" />} />
          <Route path="/movies/:id" element={<MoviePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
