import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MapCell from "./mapCell";
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
    transition: background-color 0.4s ease-in-out;
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
          <MapCell
            key={nanoid()}
            gridCellValue={gridCell}
            gridCellIndex={gridCellIndex}
            rowIndex={rowIndex}
          />
        ))
      )}
    </MapGridWrapper>
  );
};
export default React.memo(Map);
Map.propTypes = {
  planetGridSchema: PropTypes.object.isRequired,
};
