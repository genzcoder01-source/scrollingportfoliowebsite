import React from "react";

export function SplitText({ text, startIdx = 0, className = "" }) {
  if (!text) return null;

  let charIndex = startIdx;
  const words = text.split(" ");

  return (
    <>
      {words.map((word, wIdx) => (
        <React.Fragment key={wIdx}>
          <span className="w">
            {word.split("").map((char, cIdx) => {
              const idx = charIndex++;
              return (
                <span
                  key={cIdx}
                  className={`c ${className}`}
                  style={{ "--i": idx }}
                >
                  {char}
                </span>
              );
            })}
          </span>
          {wIdx < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </>
  );
}
