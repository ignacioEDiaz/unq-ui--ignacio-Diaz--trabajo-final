import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import Keyboard from "../components/Keyboard/keyboard.jsx";
import Word from "../components/Word/word.jsx";
import { ATTEMPTS } from "../constants/game";

export default function PlayPage() {
  const { state } = useLocation();
  const { sessionId } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if (!state || !state.wordLength) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  const wordLength = state?.wordLength || 5;

  const [tries, setTries] = useState(
    Array.from({ length: ATTEMPTS }, () =>
      Array.from({ length: wordLength }, () => ({
        letter: "",
        solution: "default",
      }))
    )
  );

  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(null);

  const updateLetter = (index, value) => {
    setTries((prev) => {
      const updated = [...prev];
      updated[currentAttempt][index] = value;
      return updated;
    });
  };

  const handleBackspace = () => {
    if (currentIndex === 0) return;
    updateLetter(currentIndex - 1, {
      letter: "",
      solution: "default",
    });
    setCurrentIndex(currentIndex - 1);
  };

  const handleLetter = (key) => {
    if (currentIndex >= wordLength) return;
    updateLetter(currentIndex, {
      letter: key.toUpperCase(),
      solution: "default",
    });
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <section className="container bg-black">
      <Container justify="center" align="center" gap="16px" className="pt-4">
        <Container gap="8px" align="center" justify="center">
          {tries.map((word, index) => (
            <Word key={index} word={word} />
          ))}
        </Container>

        <Keyboard
          tries={tries} 
          onKeyPress={(key) => {
            if (key === "⌫") return handleBackspace();
            if (/^[A-Za-z]$/.test(key)) return handleLetter(key);
          }}
        />
      </Container>
    </section>
  );
}
