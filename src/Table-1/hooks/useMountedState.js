import { useRef, useEffect, useCallback } from 'react';

export default function useMountedState() {
  const ref = useRef(false);
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  });
  const getState = useCallback(() => {
    return ref.current;
  }, []);
  return getState;
}
