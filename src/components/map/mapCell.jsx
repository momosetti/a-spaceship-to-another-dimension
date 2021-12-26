import React from "react";
import PropTypes from "prop-types";
function MapCell({ gridCellValue, rowIndex, gridCellIndex }) {
  return (
    <div
      className={`${gridCellValue === 2 ? "obstacle" : ""}`}
      title={`${
        gridCellValue === 2
          ? "Obstacle's"
          : gridCellValue === 1
          ? "Current"
          : ""
      } Position Coordinates: (${gridCellIndex},${rowIndex})`}
    >
      <div className="is-here">{gridCellValue === 1 ? "X" : " "}</div>
    </div>
  );
}
export default React.memo(MapCell);
MapCell.propTypes = {
  gridCellValue: PropTypes.number.isRequired,
  rowIndex: PropTypes.number.isRequired,
  gridCellIndex: PropTypes.number.isRequired,
};
