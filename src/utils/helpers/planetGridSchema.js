/**
 * Move a vehcile forward to the East.
 * @param {Object} planetSchema Planet grid schema.
 * @param {Object} currentPosition Current vehicle position.
 * @param {Number} obstacle Obstacle counter, it uses for counting the obstacles faced. (don't use it inside the function)
 * @returns {Object} Return object with step and obstacle keys, step stands for how step should the vehcile make, obstacle stands for how many obstacle the vehcile faced.
 */
export function moveForwardEast(planetSchema, currentPosition, obstacle = 0) {
  const { gridMatrix, n } = planetSchema;
  const { x, y } = currentPosition;
  let step = x + 1 < n ? x + 1 : 0;
  if (gridMatrix[y][step] === 0) {
    return { step, obstacle };
  }
  obstacle++;
  return moveForwardEast(planetSchema, { x: step, y: y }, obstacle);
}

/**
 * Move a vehcile forward to the West.
 * @param {Object} planetSchema Planet grid schema.
 * @param {Object} currentPosition Current vehicle position.
 * @param {Number} obstacle Obstacle counter, it uses for counting the obstacles faced. (don't use it inside the function)
 * @returns {Object} Return object with step and obstacle keys, step stands for how step should the vehcile make, obstacle stands for how many obstacle the vehcile faced.
 */
export function moveForwardWest(planetSchema, currentPosition, obstacle = 0) {
  const { gridMatrix, n } = planetSchema;
  const { x, y } = currentPosition;
  let step = x - 1 >= 0 ? x - 1 : n;
  if (gridMatrix[y][step] === 0) {
    return { step, obstacle };
  }
  if (gridMatrix[y][step] === 2) obstacle++;
  return moveForwardWest(planetSchema, { x: step, y: y }, obstacle);
}

/**
 * Move a vehcile forward to the North.
 * @param {Object} planetSchema Planet grid schema.
 * @param {Object} currentPosition Current vehicle position.
 * @param {Number} obstacle Obstacle counter, it uses for counting the obstacles faced. (don't use it inside the function)
 * @returns {Object} Return object with step and obstacle keys, step stands for how step should the vehcile make, obstacle stands for how many obstacle the vehcile faced.
 */
export function moveForwardNorth(planetSchema, currentPosition, obstacle = 0) {
  const { gridMatrix, m } = planetSchema;
  const { x, y } = currentPosition;
  let step = y + 1 < m ? y + 1 : 0;
  if (gridMatrix[step][x] === 0) {
    return { step, obstacle };
  }
  obstacle++;
  return moveForwardNorth(planetSchema, { x, y: step }, obstacle);
}

/**
 * Move a vehcile forward to the South.
 * @param {Object} planetSchema Planet grid schema.
 * @param {Object} currentPosition Current vehicle position.
 * @param {Number} obstacle Obstacle counter, it uses for counting the obstacles faced. (don't use it inside the function)
 * @returns {Object} Return object with step and obstacle keys, step stands for how step should the vehcile make, obstacle stands for how many obstacle the vehcile faced.
 */
export function moveForwardSouth(planetSchema, currentPosition, obstacle = 0) {
  const { gridMatrix, m } = planetSchema;
  const { x, y } = currentPosition;
  let step = y - 1 >= 0 ? y - 1 : m - 1;
  if (gridMatrix[step][x] === 0) {
    return { step, obstacle };
  }
  obstacle++;
  return moveForwardSouth(planetSchema, { x, y: step }, obstacle);
}

/**
 * Create a planet grid schema.
 * @param {Number} N Grid rows number.
 * @param {Number} M Grid columns number.
 * @param {Object} initialPosition inital position on the grid.
 * @param {Number} obstacleNumber Number of obstacle will be created in the grid, default is 0.
 * @returns Return a grid schema object with gridMatrix, m, and n as object keys.
 */
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

/**
 * Create a planet grid schema positoin.
 * @param {Number} x X axis point.
 * @param {Number} y Y axis point.
 * @param {String} cardinalCompassPoint Cardinal compass direction, default is 'N'.
 * @returns {Object} Return object with x,y, and cardinalCompassPoint keys.
 */
export const createPosition = (x, y, cardinalCompassPoint = "N") => {
  return {
    x,
    y,
    cardinalCompassPoint,
  };
};

/**
 * Insert a new position in the planet grid schema.
 * @param {Object} planetGridSchema Planet grid schema object created by createPlanetGridSchema from createPlanetGridSchema function.
 * @param {Object} position The insertde position.
 * @param {Number} positionType The type of point will be inserted. 0 for empty cell, 2 for an obstacle.
 * @returns {void}
 */
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
};

/**
 * Create a random point on specific gridMatrix dimension.
 * @param {Number} n Grid rows number + 1.
 * @param {Number} m Grid columns number +1.
 * @param {Object} excludedPosition An excluded point, idealy it's the initial position.
 * @returns {Object} Return new position Object.
 */
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
  return createRandomPosition(n, m, excludedPosition);
};
