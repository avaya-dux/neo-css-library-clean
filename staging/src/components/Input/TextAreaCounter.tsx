import clsx from "clsx";
import { useState } from "react";

export const TextAreaCounter = () => {
  const [charCount, setCharCount] = useState(0);
  const [maxChar] = useState(10);

  const [useWords, setUseWords] = useState(true);

  const getCharCountDisplayText = () => {
    const indicatorWord = charCount > maxChar ? "over" : "remaining";
    const displayTextParts = [
      Math.abs(maxChar - charCount),
      indicatorWord,
      "/",
      maxChar,
    ];

    return displayTextParts.join(" ");
  };

  return (
    <div
      className={clsx(
        "neo-form-control neo-form-control--textarea",
        charCount > maxChar && "neo-form-control--error"
      )}
    >
      <div className="neo-input-group">
        <label htmlFor="word-count-example">React Controlled Component</label>

        <textarea
          id="word-count-example"
          className="neo-input"
          aria-describedby="textarea-hint textarea-counter"
          onChange={(e) => setCharCount(e.target.value.length)}
        />

        <div className="neo-input-textarea__helper">
          <div className="neo-input-hint" id="textarea-hint">
            Type to see the number of characters remaining
          </div>

          {useWords ? (
            <div className="neo-input-textarea__counter" id="textarea-counter">
              {getCharCountDisplayText()}
            </div>
          ) : (
            <div className="neo-input-textarea__counter" id="textarea-counter">
              {maxChar - charCount} / {maxChar}
            </div>
          )}
        </div>

        <div>
          <input
            type="checkbox"
            id="use-words"
            onChange={() => setUseWords(!useWords)}
            checked={useWords}
          />

          <label htmlFor="use-words"> Use Words</label>
        </div>
      </div>
    </div>
  );
};
