import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import Board from "../components/board/board.jsx";
import Keyboard from "../components/Keyboard/keyboard";
import { checkWord } from "../services/game.jsx";
import { toast } from "react-toastify";
import { ROUTES } from '../constants/routes';

export default function GamePage() {
  const { sessionId } = useParams();
  const navigate = useNavigate();

  const [activeSession, setActiveSession] = useState(() => {
    const localSession = JSON.parse(localStorage.getItem("session"));
    return localSession?.sessionId === sessionId ? localSession : null;
  });

  const [currentInput, setCurrentInput] = useState("");
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [keyboardState, setKeyboardState] = useState({});
  const [checkingWord, setCheckingWord] = useState(false);
  const [status, setStatus] = useState("playing");

  const wordSize = activeSession?.wordLenght ?? 5;
  const maxAttempts = 6;

  const handleKeyInteraction = useCallback(
    (keyPressed) => {
      if (status !== "playing" || checkingWord) return;

      if (keyPressed === "ENTER") {
        if (currentInput.length < wordSize) {
          toast.error(`The word must have ${wordSize} letters`);
          return;
        }
        validateWord(currentInput);
      } else if (keyPressed === "⌫") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (/^[A-Z]$/.test(keyPressed) && currentInput.length < wordSize) {
        setCurrentInput((prev) => prev + keyPressed);
      }
    },
    [currentInput, status, checkingWord]
  );

  const validateWord = async (inputWord) => {
    try {
      setCheckingWord(true);
      const response = await checkWord({ sessionId, word: inputWord.toLowerCase() });
      const animatedBoxes = response.map((char) => ({ ...char, animating: true }));

      setAttemptHistory((prev) => [...prev, animatedBoxes]);
      refreshKeyboardState(response);

      if (response.every((char) => char.solution === "correct")) {
        toast.success("You guessed the word!");
        setStatus("won");
        localStorage.removeItem("session");
        navigate(ROUTES.GAME_WIN);
      } else if (attemptHistory.length + 1 >= maxAttempts) {
        toast.error("You lost!");
        setStatus("lost");
        localStorage.removeItem("session");
        navigate(ROUTES.GAME_OVER);
      }

      setCurrentInput("");
    } catch (err) {
      toast.error("Invalid word");
    } finally {
      setTimeout(() => {
        setAttemptHistory((prev) =>
          prev.map((row, index) =>
            index === prev.length - 1
              ? row.map((cell) => ({ ...cell, animating: false }))
              : row
          )
        );
        setCheckingWord(false);
      }, wordSize * 300);
    }
  };

  const refreshKeyboardState = (resultData) => {
    const updatedState = { ...keyboardState };
    resultData.forEach(({ letter, solution }) => {
      const char = letter.toUpperCase();
      const existingStatus = updatedState[char];
      if (
        !existingStatus ||
        solution === "correct" ||
        (solution === "elsewhere" && existingStatus !== "correct") ||
        (solution === "absent" && !["correct", "elsewhere"].includes(existingStatus))
      ) {
        updatedState[char] = solution;
      }
    });
    setKeyboardState(updatedState);
  };

  useEffect(() => {
    const keyListener = (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      const key = e.key.toUpperCase();
      if (key === "ENTER") handleKeyInteraction("ENTER");
      else if (key === "BACKSPACE") handleKeyInteraction("⌫");
      else if (/^[A-Z]$/.test(key)) handleKeyInteraction(key);
    };

    window.addEventListener("keydown", keyListener);
    return () => window.removeEventListener("keydown", keyListener);
  }, [handleKeyInteraction]);

  useEffect(() => {
    if (!activeSession || activeSession.sessionId !== sessionId) {
      toast.error("Invalid session");
      navigate("/");
    }
  }, [activeSession, sessionId]);

  return (
    <>
      <Board
        guesses={attemptHistory}
        currentWord={currentInput}
        wordLength={wordSize}
        maxTries={maxAttempts}
      />
      <Keyboard
        onKeyPress={handleKeyInteraction}
        keyStatuses={keyboardState}
      />
    </>
  );
}
