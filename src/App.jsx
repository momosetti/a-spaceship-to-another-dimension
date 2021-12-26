import React from "react";
import Container from "./components/layout/container";
import MainWrapper from "./components/layout/mainWrapper";
import ButtonsPad from "./features/control";
import { useSelector } from "react-redux";
import { resetVehicleObstacleStatus } from "./features/KF96/KF96Slice";
import ObstacleReporter from "./components/obstacleReporter";
import Planet from "./features/planet/planet";

export default function App() {
  const { planet, vehicleCurrentPosition, vehicleObstacle } = useSelector(
    (state) => state.KF96
  );
  return (
    <Container>
      <MainWrapper>
        <ObstacleReporter
          obstacleStatus={vehicleObstacle.status}
          obstacleNumber={vehicleObstacle.obstacleNumber}
          resetterAction={resetVehicleObstacleStatus}
        />
        <Planet planet={planet} />
        <ButtonsPad vehicleCurrentPosition={vehicleCurrentPosition} />
      </MainWrapper>
    </Container>
  );
}
