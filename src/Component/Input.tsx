import { useRef, KeyboardEvent } from "react";
import useClickOutside from "../CustomHooks/useClickOutside";

interface InputProps {
  value: string;
  setValue: (e: string) => void;
  setEditable: (e: boolean) => void;
  onSubmit: () => void; // Add a prop for handling submission
}

const Input = ({ value, setValue, setEditable, onSubmit }: InputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle click outside to close the input
  useClickOutside(inputRef, () => setEditable(false));

  // Handle keydown events, specifically the Enter key
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit(); // Call the onSubmit callback when Enter is pressed
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        className="card__input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown} // Attach the keydown event listener
        placeholder="Enter a task..." // Add a placeholder for better UX
        style={{
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          outline: "none",
        }}
      />
    </div>
  );
};

export default Input;
