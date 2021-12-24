import { useDispatch } from "react-redux";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function ObstacleReporter({ resetter, ObstacleReporterState }) {
  const dispatch = useDispatch();
  // maintain the side-effect when an obstacle found
  useEffect(() => {
    if (ObstacleReporterState) {
      toast("An obstacle detected!");
      dispatch(resetter());
    }
  }, [ObstacleReporterState]);
  return <Toaster />;
}
