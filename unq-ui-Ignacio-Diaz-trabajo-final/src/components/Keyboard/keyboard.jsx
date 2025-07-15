import React from "react";
import "./Keyboard.css";

const WordStatus = {
  CORRECT: "correct",
  ELSEWHERE: "elsewhere",
  ABSENT: "absent",
  DEFAULT: "default",
};

const KEYS = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["⌫", "Z", "X", "C", "V", "B", "N", "M", "ENTER"],
];

export default function Keyboard({ onKeyPress, tries }) {
  const statusPriority = {
    [WordStatus.CORRECT]: 3,
    [WordStatus.ELSEWHERE]: 2,
    [WordStatus.ABSENT]: 1,
    [WordStatus.DEFAULT]: 0,
  };

  const getStrongestStatus = (letter) => {
    const letterStatuses = tries.map((attempt) => {
      const box = attempt.find(
        (b) => b.letter.toLowerCase() === letter.toLowerCase()
      );
      return box?.solution || WordStatus.DEFAULT;
    });

    return letterStatuses.reduce((strongest, current) => {
      return statusPriority[current] > statusPriority[strongest]
        ? current
        : strongest;
    }, WordStatus.DEFAULT);
  };

  return (
    <div className="keyboard">
      {KEYS.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((key) => {
            const isSpecial = key === "ENTER" || key === "⌫";
            const status = isSpecial
              ? WordStatus.DEFAULT
              : getStrongestStatus(key);
            const statusClass = `key--${status}`;
            return (
              <button
                key={key}
                className={`key ${isSpecial ? "wideKey" : ""} ${statusClass}`}
                onClick={() => onKeyPress?.(key)}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
