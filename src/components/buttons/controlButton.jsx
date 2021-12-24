import styled from "styled-components";
import { useDispatch } from "react-redux";

const Button = styled.button`
  width: 50px;
  height: 35px;
  cursor: pointer;
  background-color: #e9e9e9;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  &:hover {
    background-color: #d6d6d6;
  }
`;
export default function ControlButton({
  children,
  className,
  onClick,
  direction,
}) {
  const dispatch = useDispatch();
  const handleClick = () => {
    switch (direction) {
      case "right":
        dispatch(onClick({ action: direction }));
        break;
      case "left":
        dispatch(onClick({ action: direction }));
        break;
      case "forward":
        dispatch(onClick());
        break;
      case "backward":
        dispatch(onClick());
        break;
      default:
        break;
    }
  };
  return (
    <Button className={className} onClick={handleClick}>
      {children}
    </Button>
  );
}
