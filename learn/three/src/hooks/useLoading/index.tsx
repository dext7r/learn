import { useRef } from 'react';
import useBoolean from '../useBoolean';

function useLoading(defaultValue = false, delay = 0) {
  const { boolean, setFalse, setTrue } = useBoolean(defaultValue);
  const timer = useRef<number | null>(null);

  const openLoading = () => {
    setTrue();
    timer.current = new Date().getTime();
  };

  const closeLoading = () => {
    if (timer.current === null) return;
    const now = new Date().getTime();
    const diff = now - timer.current;
    if (diff < delay) {
      return setTimeout(() => {
        setFalse();
        timer.current = null;
      }, delay - diff);
    }
    setFalse();
    timer.current = null;
  };

  return {
    loading: boolean,
    openLoading,
    closeLoading,
  };
}

export default useLoading;
