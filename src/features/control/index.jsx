import styled from "styled-components";
import PositionViewer from "../../components/positionViewer";
import ButtonsControl from "./buttonsControl";
const ButtonPadWrapper = styled.div`
  margin: 0 5em;
`;
export default function ButtonPad({ vehicleCurrentPosition }) {
  return (
    <ButtonPadWrapper>
      <PositionViewer position={vehicleCurrentPosition} />
      <ButtonsControl />
    </ButtonPadWrapper>
  );
}
