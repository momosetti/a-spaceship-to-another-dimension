import React from "react";
import Map from "../../components/map/map";
import PropTypes from "prop-types";
export default function Planet({ planet }) {
  return <Map planetGridSchema={planet} />;
}
Planet.propTypes = {
  planet: PropTypes.object.isRequired,
};
