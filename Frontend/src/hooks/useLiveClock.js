import { useState, useEffect } from 'react';

export function useLiveClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      setTime(new Date().toLocaleTimeString('pt-BR'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
}
