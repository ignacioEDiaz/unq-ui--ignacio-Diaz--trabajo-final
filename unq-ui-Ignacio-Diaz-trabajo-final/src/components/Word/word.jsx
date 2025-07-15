import { useEffect, useState, useRef } from "react";
import "./word.css";

export default function Word({ word, loading, oneMoreRound }) {
  const [flippingStates, setFlippingStates] = useState(
    Array(word.length).fill(false)
  );

  const isActiveRef = useRef(false);
  const timeoutRef = useRef([]);

  const clearAllTimeouts = () => {
    timeoutRef.current.forEach(clearTimeout);
    timeoutRef.current = [];
  };

  useEffect(() => {
    if (!loading && !oneMoreRound) return;

    isActiveRef.current = true;
    let i = 0;

    const sequence = async () => {
      for (i = 0; i < word.length; i++) {
        if (!isActiveRef.current) return;

        setFlippingStates((prev) => {
          const updated = [...prev];
          updated[i] = true;
          return updated;
        });

        await new Promise((res) =>
          timeoutRef.current.push(setTimeout(res, 500))
        );

        if (!isActiveRef.current) return;

        setFlippingStates((prev) => {
          const updated = [...prev];
          updated[i] = false;
          return updated;
        });

        await new Promise((res) =>
          timeoutRef.current.push(setTimeout(res, 25))
        );
      }
    };

    sequence();

    return () => {
      isActiveRef.current = false;
      clearAllTimeouts();
      setFlippingStates(Array(word.length).fill(false));
    };
  }, [loading, oneMoreRound, word.length]);

  return (
    <div className="containerWordBox">
      {word.map((box, i) => {
        const statusClass = `word--${box.solution}`;
        const flipping = flippingStates[i] ? "flipping" : "";
        return (
          <div key={i} className={`word ${statusClass} ${flipping}`}>
            {box.letter}
          </div>
        );
      })}
    </div>
  );
}