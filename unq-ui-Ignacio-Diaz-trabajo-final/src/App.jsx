import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/Home";
import GamePage from "./Pages/game";
import WinPage from "./Pages/win";
import LosePage from "./Pages/lose";
import { ToastContainer } from "react-toastify";

export default function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:sessionId" element={<GamePage />} />
        <Route path="/win" element={<WinPage />} />
        <Route path="/lose" element={<LosePage />} />


      </Routes>
      <ToastContainer position="top-right" />
    </BrowserRouter>
  );
} 
