import styled from "styled-components";
import ControlButton from "../../components/buttons/controlButton";
import {
  updateCardinalCompass,
  moveForward,
  moveBackward,
} from "../KF96/KF96Slice";
const ButtonsControlWrapper = styled.div`
  text-align: center;
  margin: 2em auto;
  h2 {
    font-size: 17px;
    margin: 1em auto;
  }
  .buttons {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    gap: 1em;
    grid-template-columns: repeat(3, 1fr);
    .forward {
      grid-column-start: 2;
    }
    .left {
      grid-column-start: 1;
    }
  }
`;
export default function ButtonsControl() {
  return (
    <ButtonsControlWrapper>
      <h2>Controls</h2>
      <div className="buttons">
        <ControlButton
          onClick={moveForward}
          direction="forward"
          className="forward"
        >
          F
        </ControlButton>
        <ControlButton
          onClick={updateCardinalCompass}
          direction="left"
          className="left"
        >
          L
        </ControlButton>
        <ControlButton
          onClick={moveBackward}
          direction="backward"
          className="backward"
        >
          B
        </ControlButton>
        <ControlButton
          onClick={updateCardinalCompass}
          direction="right"
          className="right"
        >
          R
        </ControlButton>
      </div>
    </ButtonsControlWrapper>
  );
}
