import { createSlice } from "@reduxjs/toolkit";
import {
  createPlanetGridSchema,
  moveForwardEast,
  moveForwardWest,
  moveForwardNorth,
  moveForwardSouth,
} from "../../utils/helpers/planetGridSchema";
import {
  INITIAL_POSITION,
  INITIAL_MAP_DIMENSION,
  OBSTACLES_NUMBER,
} from "../../utils/constants/mapConstants";

const initialState = {
  planet: createPlanetGridSchema(
    INITIAL_MAP_DIMENSION.n,
    INITIAL_MAP_DIMENSION.m,
    INITIAL_POSITION,
    OBSTACLES_NUMBER
  ),
  vehicleCurrentPosition: INITIAL_POSITION,
  vehicleObstacle: { status: false, obstacleNumber: 0 },
};

export const KF96Slice = createSlice({
  name: "KF96",
  initialState,
  reducers: {
    moveForward: (state) => {
      const { x, y, cardinalCompassPoint } = state.vehicleCurrentPosition;
      const { gridMatrix } = state.planet;
      // remove current postition
      // y,x
      gridMatrix[y][x] = 0;
      let step, obstacle;
      switch (cardinalCompassPoint) {
        case "E":
          ({ step, obstacle } = moveForwardEast(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle != 0) {
            state.vehicleObstacle.status = true;
            state.vehicleObstacle.obstacleNumber = obstacle;
          }
          state.vehicleCurrentPosition = {
            x: step,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][step] = 1;
          break;
        case "W":
          ({ step, obstacle } = moveForwardWest(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle != 0) {
            state.vehicleObstacle.status = true;
            state.vehicleObstacle.obstacleNumber = obstacle;
          }
          state.vehicleCurrentPosition = {
            x: step,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][step] = 1;
          break;
        case "N":
          ({ step, obstacle } = moveForwardNorth(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle != 0) {
            state.vehicleObstacle.status = true;
            state.vehicleObstacle.obstacleNumber = obstacle;
          }
          state.vehicleCurrentPosition = {
            x,
            y: step,
            cardinalCompassPoint,
          };
          gridMatrix[step][x] = 1;
          break;
        case "S":
          ({ step, obstacle } = moveForwardSouth(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle != 0) {
            state.vehicleObstacle.status = true;
            state.vehicleObstacle.obstacleNumber = obstacle;
          }
          state.vehicleCurrentPosition = {
            x,
            y: step,
            cardinalCompassPoint,
          };
          gridMatrix[step][x] = 1;
          break;
        default:
          break;
      }
    },
    moveBackward: (state) => {
      const { x, y, cardinalCompassPoint } = state.vehicleCurrentPosition;
      const { gridMatrix } = state.planet;
      // remove current postition
      gridMatrix[y][x] = 0;
      let step, obstacle;
      switch (cardinalCompassPoint) {
        // since moving backward to the east
        // is the same as moving forward to the west
        case "E":
          ({ step, obstacle } = moveForwardWest(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle) {
            state.vehicleObstacle = {
              ...state.vehicleObstacle,
              status: true,
              obstacleNumber: obstacle,
            };
          }
          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            x: step,
          };
          gridMatrix[y][step] = 1;
          break;
        case "W":
          ({ step, obstacle } = moveForwardEast(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle)
            state.vehicleObstacle = {
              ...state.vehicleObstacle,
              status: true,
              obstacleNumber: obstacle,
            };

          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            x: step,
          };
          gridMatrix[y][step] = 1;
          break;
        case "N":
          ({ step, obstacle } = moveForwardSouth(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle)
            state.vehicleObstacle = {
              ...state.vehicleObstacle,
              status: true,
              obstacleNumber: obstacle,
            };
          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            y: step,
          };
          gridMatrix[step][x] = 1;
          break;
        case "S":
          ({ step, obstacle } = moveForwardNorth(
            state.planet,
            state.vehicleCurrentPosition
          ));
          if (obstacle)
            state.vehicleObstacle = {
              ...state.vehicleObstacle,
              status: true,
              obstacleNumber: obstacle,
            };
          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            y: step,
          };
          gridMatrix[step][x] = 1;
          break;
        default:
          break;
      }
    },
    updateCardinalCompass: (state, { payload }) => {
      const { cardinalCompassPoint } = state.vehicleCurrentPosition;
      const compassSchema = {
        N: 90,
        E: 0,
        W: 180,
        S: 270,
      };
      let compassDeg = compassSchema[cardinalCompassPoint];
      switch (payload.action) {
        case "left":
          compassDeg = compassDeg + 90;
          if (compassDeg === 360) compassDeg = 0;
          for (let compassProperty in compassSchema) {
            if (compassSchema[compassProperty] === compassDeg) {
              state.vehicleCurrentPosition = {
                ...state.vehicleCurrentPosition,
                cardinalCompassPoint: compassProperty,
              };
            }
          }
          break;
        case "right":
          compassDeg = compassDeg - 90;
          if (compassDeg === -90) compassDeg = 270;
          for (let compassProperty in compassSchema) {
            if (compassSchema[compassProperty] === compassDeg) {
              state.vehicleCurrentPosition.cardinalCompassPoint =
                compassProperty;
            }
          }
          break;
        default:
          break;
      }
    },
    resetVehicleObstacleStatus: (state) => {
      state.vehicleObstacle.status = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCardinalCompass,
  moveForward,
  moveBackward,
  resetVehicleObstacleStatus,
} = KF96Slice.actions;

export default KF96Slice.reducer;
