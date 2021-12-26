import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
    <PositionViewerWrapper cardinalCompassPoint={cardinalCompassPoint}>
      <h1>Current position</h1>
      <p>
        {`(${x}, ${y}, ${cardinalCompassPoint})`}{" "}
        {cardinalCompassPoint === "N"
          ? "↑"
          : cardinalCompassPoint === "E"
          ? "→"
          : cardinalCompassPoint === "S"
          ? "↓"
          : cardinalCompassPoint === "W"
          ? "←"
          : ""}
      </p>
    </PositionViewerWrapper>
  );
}
PositionViewer.propTypes = {
  position: PropTypes.object.isRequired,
};
