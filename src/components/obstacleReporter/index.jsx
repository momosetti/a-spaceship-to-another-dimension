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
    obstacleStatus &&
      toast(`${obstacleNumber} obstacle detected!`, {
        style: {
          border: "1px solid #ff7c73",
          padding: "12px",
          color: "#ff9790",
        },
        iconTheme: {
          primary: "#ff9790",
          secondary: "#FFFAEE",
        },
        icon: "🧱",
      });
    return () => {
      dispatch(resetterAction());
    };
  }, [obstacleStatus]);
  return <Toaster position="top-right" />;
}
ObstacleReporter.propTypes = {
  resetterAction: PropTypes.func.isRequired,
  obstacleStatus: PropTypes.bool.isRequired,
  obstacleNumber: PropTypes.number.isRequired,
};
