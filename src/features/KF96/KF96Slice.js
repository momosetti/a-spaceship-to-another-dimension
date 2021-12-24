import { createSlice } from "@reduxjs/toolkit";
import {
  createPlanetGridSchema,
  forwardEast,
  forwardWest,
  forwardNorth,
  forwardSouth,
} from "../../utils/helpers/createMapGrid";
import {
  INITIAL_POSITION,
  INITIAL_MAP_DIMENSION,
} from "../../utils/constants/mapConstants";

const initialState = {
  planet: createPlanetGridSchema(
    INITIAL_MAP_DIMENSION.n,
    INITIAL_MAP_DIMENSION.m,
    INITIAL_POSITION,
    15
  ),
  vehicleCurrentPosition: INITIAL_POSITION,
  foundObstacle: false,
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
      let step;
      switch (cardinalCompassPoint) {
        case "E":
          step = forwardEast(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            x: step,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][step] = 1;
          break;
        case "W":
          step = forwardWest(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            x: step,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][step] = 1;
          break;
        case "N":
          step = forwardNorth(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            y: step,
          };
          gridMatrix[step][x] = 1;
          break;
        case "S":
          step = forwardSouth(state.planet, state.vehicleCurrentPosition);
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
      // y,x
      gridMatrix[y][x] = 0;
      switch (cardinalCompassPoint) {
        case "E":
          let nes = forwardWest(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            x: nes,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][nes] = 1;
          break;
        case "W":
          let step = forwardEast(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            x: step,
            y,
            cardinalCompassPoint,
          };
          gridMatrix[y][step] = 1;
          break;
        case "N":
          let bns = forwardSouth(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            x,
            y: bns,
            cardinalCompassPoint,
          };
          gridMatrix[bns][x] = 1;
          break;
        case "S":
          let bss = forwardNorth(state.planet, state.vehicleCurrentPosition);
          state.vehicleCurrentPosition = {
            ...state.vehicleCurrentPosition,
            y: bss,
          };
          gridMatrix[bss][x] = 1;
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
              state.vehicleCurrentPosition.cardinalCompassPoint =
                compassProperty;
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
    resetObstacleDetector: (state) => {
      state.foundObstacle = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  updateCardinalCompass,
  moveForward,
  moveBackward,
  resetObstacleDetector,
} = KF96Slice.actions;

export default KF96Slice.reducer;
