import { useState, useEffect, useRef } from 'react';

function getDocumentVisibility() {
  if (typeof document === 'undefined') {
    return true;
  }
  return !document.hidden;
}

const useDocumentVisibility = () => {
  const [visible, setIsVisible] = useState(getDocumentVisibility());
  const [count, setCount] = useState(0);
  const callbacks = useRef<((isVisible: boolean) => void)[]>([]);

  const onVisibilityChange = (callback: (isVisible: boolean) => void) => {
    callbacks.current.push(callback);
  };

  useEffect(() => {
    const onVisibilityChangeAll = () => {
      setIsVisible(getDocumentVisibility());
      if (!getDocumentVisibility()) {
        setCount((count) => count + 1);
      }
      callbacks.current.forEach((func) => func(!document.hidden));
    };
    document.addEventListener('visibilitychange', onVisibilityChangeAll);
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChangeAll);
    };
  }, []);

  return {
    count,
    visible,
    onVisibilityChange,
  };
};

export default useDocumentVisibility;
