import { useState, useEffect } from "react";

function useTypingEffect(text, speed = 100) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); // Reset when text changes
    let index = 0;

    const interval = setInterval(() => {
      // Append characters one by one
      setDisplayedText(text.slice(0, index + 1));
      index++;

      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return displayedText;
}

export default useTypingEffect;
