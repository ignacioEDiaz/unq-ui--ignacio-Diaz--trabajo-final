import Letter from "../letter/letter.jsx";
import "./board.css";

export default function Board({ guesses, currentWord, wordLength, maxTries }) {
  const totalAttempts = guesses.length;
  const shouldRenderCurrent = totalAttempts < maxTries;
  const rowsRemaining = maxTries - totalAttempts - (shouldRenderCurrent ? 1 : 0);

  return (
    <div className="board">
      {guesses.map((attempt, attemptIndex) => (
        <div className="row" key={`guess-${attemptIndex}`}>
          {attempt.map((cell, letterIndex) => (
            <Letter
              key={letterIndex}
              letter={cell.letter}
              status={cell.solution}
              animating={cell.animating}
              delay={letterIndex}
            />
          ))}
        </div>
      ))}

      {shouldRenderCurrent && (
        <div className="row" key="currentWord">
          {[...Array(wordLength)].map((_, index) => (
            <Letter key={index} letter={currentWord[index] || ""} />
          ))}
        </div>
      )}

      {[...Array(Math.max(rowsRemaining, 0))].map((_, rowIndex) => (
        <div className="row" key={`empty-${rowIndex}`}>
          {[...Array(wordLength)].map((_, boxIndex) => (
            <Letter key={boxIndex} />
          ))}
        </div>
      ))}
    </div>
  );
}
