import { useState, useEffect } from 'react';

export const useTimer = (initialTime: number, onComplete?: () => void) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((time) => {
        if (time <= 1000) {
          setIsRunning(false);
          onComplete?.();
          return 0;
        }
        return time - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const startTimer = () => {
    setTimeLeft(initialTime);
    setIsRunning(true);
  };

  return {
    timeLeft,
    isRunning,
    startTimer
  };
};