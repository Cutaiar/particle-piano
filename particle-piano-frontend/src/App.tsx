import React, { useState, useEffect } from "react";
import "./App.css";

const eventSourceUrl = "http://localhost:3001/events";

export const App = () => {
  const [currentNote, setCurrentNote] = useState<number>();
  const [listening, setListening] = useState<boolean>(false);

  useEffect(() => {
    if (!listening) {
      const events = new EventSource(eventSourceUrl);
      events.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        const note = parsedData?.index;
        setCurrentNote(note);
      };

      setListening(true);
    }
  }, [listening, currentNote]);

  return <h1>{currentNote}</h1>;
};
