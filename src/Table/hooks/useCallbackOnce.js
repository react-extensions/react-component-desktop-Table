import { useCallback, useRef } from 'react';

export default function useCallbackOnce(fn) {
  const ref = useRef(false);
  return useCallback((...args) => {
    if (ref.current) {
      return;
    }
    ref.current = true;
    fn(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
