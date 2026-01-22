import { useState, useLayoutEffect, type RefObject } from "react";

export function useSmartPositioning(
  isOpen: boolean,
  ref: RefObject<HTMLElement | null>,
) {
  const [isAbove, setIsAbove] = useState(false);

  useLayoutEffect(() => {
    if (isOpen && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate space: If bottom of dropdown > viewport height, flip it
      const shouldFlip = rect.bottom > viewportHeight;

      if (shouldFlip !== isAbove) {
        setIsAbove(shouldFlip);
      }
    }
  }, [isOpen, isAbove, ref]);

  return isAbove;
}
