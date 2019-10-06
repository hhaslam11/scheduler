import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode, replace = false) => {
    if (replace) setHistory(history.slice(0, history.length - 1));
    setMode(newMode);
    setHistory(prev => [...prev, newMode]);
  };

  const back = () => {
    if (history.length === 1) return;

    const newHistory = history.slice(0, history.length - 1);
    console.log('newHistory:', newHistory);
    setHistory(newHistory);
    setMode(newHistory[newHistory.length - 1]);
  };

  return { mode, transition, back };
}
