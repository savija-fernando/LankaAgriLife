// src/components/VoiceCommandHandler.jsx
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router-dom";

const VoiceCommandHandler = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);

  const commands = [
    { command: "go to home", callback: () => navigate("/") },
    { command: "open login", callback: () => navigate("/login") },
    { command: "open admin", callback: () => navigate("/admin") },
    { command: "go to products", callback: () => navigate("/products") },
    { command: "go to contact", callback: () => navigate("/contact") },
    { command: "go to inventory", callback: () => navigate("/admin") },
  ];

  const { listening, browserSupportsSpeechRecognition } = useSpeechRecognition({ commands });

  // Handle toggle logic
  const handleToggle = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
      setIsListening(false);
    } else {
      SpeechRecognition.startListening({ continuous: true });
      setIsListening(true);
    }
  };

  // Auto stop when leaving page
  useEffect(() => {
    return () => {
      SpeechRecognition.stopListening();
    };
  }, []);

  if (!browserSupportsSpeechRecognition) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg border border-gray-300 rounded-md px-4 py-3 z-50 w-64">
      <p className="text-sm font-medium mb-2">
        🎙️ Voice Navigation:{" "}
        <span className={isListening ? "text-green-600" : "text-red-500"}>
          {isListening ? "ON" : "OFF"}
        </span>
      </p>

      <button
        onClick={handleToggle}
        className={`w-full py-2 text-sm font-semibold rounded ${
          isListening
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        } transition`}
      >
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>

      <p className="text-xs text-gray-500 mt-2">
        Try saying: “Go to dashboard”, “Go to inventory”, etc.
      </p>
    </div>
  );
};

export default VoiceCommandHandler;
