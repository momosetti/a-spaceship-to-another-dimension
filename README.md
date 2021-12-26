[Live Demo 🌍](https://a-spaceship-to-another-dimension.netlify.app/)

## Data structure

In order to illustrate the problem, I used zeros based 2d array (`m*n` matrix) to simulate a grid. Where every 2d array value could be `0`,`1`, or `2`.

- `0` indicates an empty cell.
- `1` indicates the current position (there's only `1` value in the grid).
- `2` indicates an obstacle (obstacle are generated randomly at the initial global state).

**Example**:
`7*7` matrix, with the an initial position at (0,0)

    [
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [0,  0,  0,  0,  0,  0,  0,  0]
    [1,  0,  0,  0,  0,  0,  0,  0]
    ]

## Project structure

```bash
src
 ┣ components
 ┃ ┣ buttons
 ┃ ┃ ┗ controlButton.jsx
 ┃ ┣ layout
 ┃ ┃ ┣ container.jsx
 ┃ ┃ ┗ mainWrapper.jsx
 ┃ ┣ map
 ┃ ┃ ┣ map.jsx
 ┃ ┃ ┗ mapCell.jsx
 ┃ ┣ obstacleReporter
 ┃ ┃ ┗ index.jsx
 ┃ ┗ positionViewer
 ┃ ┃ ┗ index.jsx
 ┣ features
 ┃ ┣ control
 ┃ ┃ ┣ buttonsControl.jsx
 ┃ ┃ ┗ index.jsx
 ┃ ┣ KF96
 ┃ ┃ ┗ KF96Slice.js
 ┣ utils
 ┃ ┣ constants
 ┃ ┃ ┗ mapConstants.js
 ┃ ┗ helpers
 ┃ ┃ ┗ planetGridSchema.js
 ┣ App.jsx
 ┣ globalStyle.js
 ┣ main.jsx
 ┗ store.js
```

## Requirements

Make sure you're using `16.13.1` node version. if you're using `nvm` (node version manager), fire up `nvm use` or `nvm install 16.13.1 && nvm use 16.13.1` to switch to `16.13.1`.
Otherwise, you could edit the `engine` attribute in `package.json` file to unlock the engine version (isn't recommended!).

## How to run the app

After cloning the repo. Using your preferred package manager (I use `Yarn`).

To install dependencies:

    git clone https://github.com/momosetti/a-spaceship-to-another-dimension
    cd a-spaceship-to-another-dimension
    yarn / npm install

For starting the dev server:

    yarn dev

For building:

    yarn build

For serving static files (after build the project):

    yarn perview

## Tech Stack used

- SPA library: React.js.
- State management (Redux.js, utility: Redux ToolKit).

- Build tool: [Vite.js](https://vitejs.dev/)

- Style: Styled-components.

- Source control version: GIT

- Linting & Formatting: Eslint and Prettier (local Prettier Vscode configuration).

# API

### Constans

The constants value are stored in `/src/utils/constants/mapConstants.js`.
The following constants are defined:
| Constant | Type | Description |
| --- | --- | --- |
| `INITIAL_POSITION` | <code>Object</code> | Initial position `{x:0,y:0,cardinalCompassPoint:'N'}`. |
| `INITIAL_MAP_DIMENSION` | <code>Object</code> | Initial map dimension. |
| `OBSTACLES_NUMBER`| <code>Number</code> | Number of obstacle will be generated on the grid. |

### Functions

The functions are defined in `/src/utils/helpers/planetGridSchema.js`.

<dl>
<dt><a href="#createPlanetGridSchema">createPlanetGridSchema</a> ⇒ <code>Object</code></dt>
<dd><p>Create a planet grid schema.</p>
</dd>
<dt><a href="#createPosition">createPosition</a> ⇒ <code>Object</code></dt>
<dd><p>Create a planet grid schema position.</p>
</dd>
<dt><a href="#insertPosition">insertPosition</a> ⇒ <code>void</code></dt>
<dd><p>Insert a new position in the planet grid schema.</p>
</dd>
<dt><a href="#createRandomPosition">createRandomPosition</a> ⇒ <code>Object</code></dt>
<dd><p>Create a random point on specific gridMatrix dimension.</p>
</dd>
</dl>
<dl>
<dt><a href="#moveForwardEast">moveForwardEast(planetSchema, currentPosition, obstacle)</a> ⇒ <code>Object</code></dt>
<dd><p>Move a vehicle forward to the East.</p>
</dd>
<dt><a href="#moveForwardWest">moveForwardWest(planetSchema, currentPosition, obstacle)</a> ⇒ <code>Object</code></dt>
<dd><p>Move a vehicle forward to the West.</p>
</dd>
<dt><a href="#moveForwardNorth">moveForwardNorth(planetSchema, currentPosition, obstacle)</a> ⇒ <code>Object</code></dt>
<dd><p>Move a vehicle forward to the North.</p>
</dd>
<dt><a href="#moveForwardSouth">moveForwardSouth(planetSchema, currentPosition, obstacle)</a> ⇒ <code>Object</code></dt>
<dd><p>Move a vehicle forward to the South.</p>
</dd>
</dl>

<a name="createPlanetGridSchema"></a>

## createPlanetGridSchema ⇒ <code>Object</code>

Create a planet grid schema.

**Returns**: <code>Object</code> - Return a grid schema object with gridMatrix, m, and n as object keys.

| Param           | Type                | Description                                                   |
| --------------- | ------------------- | ------------------------------------------------------------- |
| N               | <code>Number</code> | Grid rows number.                                             |
| M               | <code>Number</code> | Grid columns number.                                          |
| initialPosition | <code>Object</code> | inital position on the grid.                                  |
| obstacleNumber  | <code>Number</code> | Number of obstacle will be created in the grid, default is 0. |

<a name="createPosition"></a>

## createPosition ⇒ <code>Object</code>

Create a planet grid schema position.

**Returns**: <code>Object</code> - Return object with x,y, and cardinalCompassPoint keys.

| Param                | Type                | Description                                 |
| -------------------- | ------------------- | ------------------------------------------- |
| x                    | <code>Number</code> | X axis point.                               |
| y                    | <code>Number</code> | Y axis point.                               |
| cardinalCompassPoint | <code>String</code> | Cardinal compass direction, default is 'N'. |

<a name="insertPosition"></a>

## insertPosition ⇒ <code>void</code>

Insert a new position in the planet grid schema.

| Param            | Type                | Description                                                                                          |
| ---------------- | ------------------- | ---------------------------------------------------------------------------------------------------- |
| planetGridSchema | <code>Object</code> | Planet grid schema object created by createPlanetGridSchema function.                                |
| position         | <code>Object</code> | The insertde position.                                                                               |
| positionType     | <code>Number</code> | The type of point will be inserted. 0 for empty cell, 1 for current position, and 2 for an obstacle. |

<a name="createRandomPosition"></a>

## createRandomPosition ⇒ <code>Object</code>

Create a random point on specific gridMatrix dimension.

**Returns**: <code>Object</code> - Return new position Object.

| Param            | Type                | Description                                          |
| ---------------- | ------------------- | ---------------------------------------------------- |
| n                | <code>Number</code> | Grid rows number + 1.                                |
| m                | <code>Number</code> | Grid columns number +1.                              |
| excludedPosition | <code>Object</code> | An excluded point, idealy it's the initial position. |

<a name="moveForwardEast"></a>

## moveForwardEast(planetSchema, currentPosition, obstacle) ⇒ <code>Object</code>

Move a vehicle forward to the East.

**Returns**: <code>Object</code> - Return object with step and obstacle keys, step stands for how step should the vehicle make, obstacle stands for how many obstacle the vehicle faced.

| Param           | Type                | Description                                                                                                      |
| --------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------- |
| planetSchema    | <code>Object</code> | Planet grid schema.                                                                                              |
| currentPosition | <code>Object</code> | Current vehicle position.                                                                                        |
| obstacle        | <code>Number</code> | Obstacle counter, it uses for counting the obstacles faced. (don't invoke the function with obstacle parameter). |

<a name="moveForwardWest"></a>

## moveForwardWest(planetSchema, currentPosition, obstacle) ⇒ <code>Object</code>

Move a vehicle forward to the West.

**Returns**: <code>Object</code> - Return object with step and obstacle keys, step stands for how step should the vehicle make, obstacle stands for how many obstacle the vehicle faced.

| Param           | Type                | Description                                                                                                     |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| planetSchema    | <code>Object</code> | Planet grid schema.                                                                                             |
| currentPosition | <code>Object</code> | Current vehicle position.                                                                                       |
| obstacle        | <code>Number</code> | Obstacle counter, it uses for counting the obstacles faced. (don't invoke the function with obstacle parameter) |

<a name="moveForwardNorth"></a>

## moveForwardNorth(planetSchema, currentPosition, obstacle) ⇒ <code>Object</code>

Move a vehicle forward to the North.

**Returns**: <code>Object</code> - Return object with step and obstacle keys, step stands for how step should the vehicle make, obstacle stands for how many obstacle the vehicle faced.

| Param           | Type                | Description                                                                                                     |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| planetSchema    | <code>Object</code> | Planet grid schema.                                                                                             |
| currentPosition | <code>Object</code> | Current vehicle position.                                                                                       |
| obstacle        | <code>Number</code> | Obstacle counter, it uses for counting the obstacles faced. (don't invoke the function with obstacle parameter) |

<a name="moveForwardSouth"></a>

## moveForwardSouth(planetSchema, currentPosition, obstacle) ⇒ <code>Object</code>

Move a vehicle forward to the South.

**Returns**: <code>Object</code> - Return object with step and obstacle keys, step stands for how step should the vehicle make, obstacle stands for how many obstacle the vehicle faced.

| Param           | Type                | Description                                                                                                     |
| --------------- | ------------------- | --------------------------------------------------------------------------------------------------------------- |
| planetSchema    | <code>Object</code> | Planet grid schema.                                                                                             |
| currentPosition | <code>Object</code> | Current vehicle position.                                                                                       |
| obstacle        | <code>Number</code> | Obstacle counter, it uses for counting the obstacles faced. (don't invoke the function with obstacle parameter) |
