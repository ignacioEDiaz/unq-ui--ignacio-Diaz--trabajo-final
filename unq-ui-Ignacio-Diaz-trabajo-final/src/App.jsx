import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import GamePage from "./Pages/game";

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:sessionId" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
