import { ButtonProps } from "../types/TypesForUI";
import { AiFillPlayCircle } from "react-icons/ai";

function Button({ children, onClick, styles, playIcon }: ButtonProps) {
  return (
    <button className={styles} onClick={onClick}>
      {playIcon && <AiFillPlayCircle size="2rem" />}
      {children}
    </button>
  );
}
export default Button;
