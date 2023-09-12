import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import NumberPage from "./components/NumberPage";
import WordPage from "./components/WordPage";
import ColoredWordPage from "./components/ColoredWordPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/:number" element={<NumberPage />} />
        <Route path="/:word" element={<WordPage />} />
        <Route path="/:word/:color/:backgroundColor" element={<ColoredWordPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
