import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import PropTypes from "prop-types";

export default function ObstacleReporter({
  resetterAction,
  obstacleStatus,
  obstacleNumber,
}) {
  const dispatch = useDispatch();
  // maintain the side-effect when an obstacle found
  useEffect(() => {
    obstacleStatus && toast.error(`${obstacleNumber} obstacle found`);
    return () => {
      dispatch(resetterAction());
    };
  }, [obstacleStatus]);
  return <Toaster />;
}
ObstacleReporter.propTypes = {
  resetterAction: PropTypes.func.isRequired,
  obstacleStatus: PropTypes.bool.isRequired,
  obstacleNumber: PropTypes.number.isRequired,
};
