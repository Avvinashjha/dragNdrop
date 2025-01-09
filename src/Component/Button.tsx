import { MouseEventHandler } from "react";
import "./style.css";
interface ButtonPrams {
  onClick: MouseEventHandler;
  onHover?: MouseEventHandler;
  className?: string;
}
const Button = ({ onClick, onHover, className = "" }: ButtonPrams) => {
  return (
    <button
      className={`btn__primary ${className}`}
      onClick={onClick}
      onMouseOver={onHover}
    >
      +
    </button>
  );
};

export default Button;
