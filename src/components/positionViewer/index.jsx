import styled from "styled-components";

const PositionViewerWrapper = styled.div`
  text-align: center;
  margin: 2em auto;
  h1 {
    font-size: 17px;
    margin: 1em auto;
  }
  p {
    background-color: #e9e9e9;
    padding: 0.7em;
  }
`;
export default function PositionViewer({ position }) {
  const { x, y, cardinalCompassPoint } = position;
  return (
    <PositionViewerWrapper>
      <h1>Current position</h1>
      <p>{`(${x}, ${y}, ${cardinalCompassPoint})`}</p>
    </PositionViewerWrapper>
  );
}
