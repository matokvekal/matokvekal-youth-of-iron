import { useState, useEffect } from 'react';

interface ProgressData {
  date: string;
  score: {
    current: number;
    old: number;
  };
}

const useDailyProgress = () => {
  const [score, setScore] = useState<number>(0);
  const [oldScore, setOldScore] = useState<number>(0);

  useEffect(() => {
    const storedData = localStorage.getItem('dailyProgress');
    if (storedData) {
      const parsedData: ProgressData = JSON.parse(storedData);
      if (new Date().toDateString() === new Date(parsedData.date).toDateString()) {
        setOldScore(parsedData.score.old);
        setScore(parsedData.score.current);
      }
    }
  }, []);

  const incrementScore = (n: number) => {
    let newScore = Math.min(score + n, 10) || 1;
    const today = new Date().toDateString();

    if (newScore === 10 && oldScore === 10) {
      return;
    }

    const storedData = localStorage.getItem('dailyProgress');
    if (storedData) {
      const parsedData: ProgressData = JSON.parse(storedData);
      if (new Date(parsedData.date).toDateString() !== today) {
        newScore = n;
      }
    }

    setOldScore(score);
    setScore(newScore);
    const newProgressData: ProgressData = {
      date: new Date().toISOString(),
      score: {
        current: newScore,
        old: score,
      },
    };
    localStorage.setItem('dailyProgress', JSON.stringify(newProgressData));
  };

  return { score, oldScore, incrementScore };
};

export default useDailyProgress;
