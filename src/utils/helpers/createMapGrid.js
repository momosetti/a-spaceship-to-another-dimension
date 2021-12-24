export function forwardEast(planetSchema, currentPosition) {
  const { gridMatrix, n } = planetSchema;
  const { x, y } = currentPosition;
  let step = x + 1 < n ? x + 1 : 0;
  if (gridMatrix[y][step] === 0) {
    return step;
  }
  return forwardEast(planetSchema, { x: step, y: y });
}
export function forwardWest(planetSchema, currentPosition) {
  const { gridMatrix, n } = planetSchema;
  const { x, y } = currentPosition;
  let step = x - 1 >= 0 ? x - 1 : n;
  if (gridMatrix[y][step] === 0) {
    return step;
  }
  return forwardWest(planetSchema, { x: step, y: y });
}
export function forwardNorth(planetSchema, currentPosition) {
  const { gridMatrix, m } = planetSchema;
  const { x, y } = currentPosition;
  let step = y + 1 < m ? y + 1 : 0;
  if (gridMatrix[step][x] === 0) {
    return step;
  }
  return forwardNorth(planetSchema, { x, y: step });
}
export function forwardSouth(planetSchema, currentPosition) {
  const { gridMatrix, m } = planetSchema;
  const { x, y } = currentPosition;
  let step = y - 1 >= 0 ? y - 1 : m - 1;
  console.log(m);
  if (gridMatrix[step][x] === 0) {
    return step;
  }
  return forwardSouth(planetSchema, { x, y: step });
}
export const createPlanetGridSchema = (
  N,
  M,
  initialPosition = { x: 0, y: 0, cardinalCompassPoint: "N" },
  obstacleNumber = 0
) => {
  // create m x n zeros matrix
  // N is rows number
  // M is columns number
  const m = M + 1;
  const n = N + 1;
  const { x, y, cardinalCompassPoint } = initialPosition;
  const gridMatrix = Array(m)
    .fill(null)
    .map(() => Array(n).fill(0));
  const planetGridSchema = {
    gridMatrix,
    m,
    n,
  };
  // insert initial point to the planetGridSchema
  insertPosition(planetGridSchema, { x, y, cardinalCompassPoint }, 1);

  // insert obstacles
  for (let i = 0; i < obstacleNumber; i++) {
    insertPosition(
      planetGridSchema,
      createRandomPosition(N, M, initialPosition),
      2
    );
  }
  return planetGridSchema;
};

export const createPosition = (x, y, cardinalCompassPoint = "N") => {
  return {
    x,
    y,
    cardinalCompassPoint,
  };
};

export const insertPosition = (planetGridSchema, position, positionType) => {
  const { x, y } = position;
  const { m, n, gridMatrix } = planetGridSchema;
  if (x > n - 1 || x < 0 || y > m - 1 || y < 0) throw "Invalid position";
  gridMatrix.forEach((grid, gridIndex) => {
    if (gridIndex === y) {
      grid.forEach((gridItem, gridCellIndex) => {
        if (gridCellIndex === x) {
          gridMatrix[gridIndex][gridCellIndex] = positionType;
        }
      });
    }
  });
  return gridMatrix;
};

export const createRandomPosition = (n, m, excludedPosition) => {
  const { x, y } = excludedPosition;
  const xAxisPoint = Math.floor(Math.random() * (n + 1));
  const YAxisPoint = Math.floor(Math.random() * (m + 1));
  const cardinalCompassPoint = ["N", "E", "S", "W"][
    Math.floor(Math.random() * 3)
  ];

  if (xAxisPoint != x || YAxisPoint != y) {
    return {
      x: xAxisPoint,
      y: YAxisPoint,
      cardinalCompassPoint,
    };
  }
  console.log("wiwo");
  return createRandomPosition(n, m, excludedPosition);
};
