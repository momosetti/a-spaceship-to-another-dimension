import styled from "styled-components";

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
    background-color: #ffc1c1;
    &:hover {
      background-color: #fca2a2;
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
export default function Map({ planetGridSchema }) {
  const { gridMatrix, m, n } = planetGridSchema;
  return (
    <MapGridWrapper rows={m} columns={n}>
      {gridMatrix.map((row, rowIndex) =>
        row.map((gridCell, gridCellIndex) => (
          <div
            title={`Position coordinates: (${gridCellIndex},${rowIndex})`}
            key={gridCellIndex}
            className={`${gridCell === 2 ? "obstacle" : ""}`}
          >
            <div className="is-here">{gridCell === 1 ? "X" : " "}</div>
          </div>
        ))
      )}
    </MapGridWrapper>
  );
}
