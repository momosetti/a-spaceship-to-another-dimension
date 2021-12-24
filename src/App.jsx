import Container from "./components/layout/container";
import MainWrapper from "./components/layout/mainWrapper";
import Map from "./components/map/map";
import ButtonsPad from "./features/control";
import { useSelector } from "react-redux";
import { resetObstacleDetector } from "./features/KF96/KF96Slice";
import ObstacleReporter from "./components/obstacleReporter";

export default function App() {
  const { planet, vehicleCurrentPosition, foundObstacle } = useSelector(
    (state) => state.KF96
  );
  return (
    <Container>
      <MainWrapper>
        <ObstacleReporter
          ObstacleReporterState={foundObstacle}
          resetter={resetObstacleDetector}
        />
        <Map planetGridSchema={planet} />
        <ButtonsPad vehicleCurrentPosition={vehicleCurrentPosition} />
      </MainWrapper>
    </Container>
  );
}
