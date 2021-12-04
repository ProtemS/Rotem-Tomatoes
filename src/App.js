import "./App.css";
import MovieSelect from "./components/movieSelect";
import { Routes, Route } from "react-router-dom";
import MoviePage from "./components/moviePage";
import MovieNav from "./components/movieNav";
import { useState } from "react";

function App() {
  return (
    <div className="App flex flex-col min-h-screen">
      <MovieNav></MovieNav>
      <main className="flex-1">
        <Routes>
          <Route exact path="/" element={<MovieSelect currentRoute="hi" />} />
          <Route path="/movies/:id" element={<MoviePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
