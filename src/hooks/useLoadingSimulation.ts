import { useEffect, useState } from 'react';

/**
 * Custom hook to simulate loading state for demo purposes
 */
export const useLoadingSimulation = (duration: number = 1500) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};

export default useLoadingSimulation;
