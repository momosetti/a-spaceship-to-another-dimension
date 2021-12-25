import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { nanoid } from "nanoid";

const MapGridWrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(${(props) => props.rows || 1}, 40px);
  grid-template-columns: repeat(${(props) => props.columns || 1}, 40px);
  max-width: calc(40px * 13);
  overflow: auto;
  max-height: calc(40px * 13);
  transform: rotateX(180deg);
  padding: 1px;
  gap: 1px;
  background-color: #d8d8d8;
  .obstacle {
    background-color: #ffc4c4;
    &:hover {
      background-color: #ffdbdb;
    }
  }
  & > div {
    position: relative;
    background-color: #fff;
    transition: background-color 0.6s ease-in-out;
    cursor: help;
    &:hover {
      background-color: #f3f3f3;
    }
    .is-here {
      position: absolute;
      left: 50%;
      bottom: 50%;
      transform: translate(-50%, 50%);
    }
  }
`;
const Map = ({ planetGridSchema }) => {
  const { gridMatrix, m, n } = planetGridSchema;
  return (
    <MapGridWrapper rows={m} columns={n}>
      {gridMatrix.map((row, rowIndex) =>
        row.map((gridCell, gridCellIndex) => (
          <div
            // define each cell with a title helper
            title={`${
              gridCell === 2 ? "Obstacle's" : gridCell === 1 ? "Current" : ""
            } Position Coordinates: (${gridCellIndex},${rowIndex})`}
            key={nanoid()}
            className={`${gridCell === 2 ? "obstacle" : ""}`}
          >
            <div className="is-here">{gridCell === 1 ? "X" : " "}</div>
          </div>
        ))
      )}
    </MapGridWrapper>
  );
};
export default Map;
Map.propTypes = {
  planetGridSchema: PropTypes.object.isRequired,
};
