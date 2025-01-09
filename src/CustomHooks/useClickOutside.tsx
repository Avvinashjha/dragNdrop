import { useEffect } from "react";

/**
 * A custom hook for detecting clicks outside of an element.
 *
 * @param ref A React ref object linked to the target element.
 * @param callback A function that will be invoked when a click outside is detected.
 */
const useClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: () => void
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default useClickOutside;
