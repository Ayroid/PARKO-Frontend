import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

import './Map.module.css';

const createRoutineMachineLayer = (props) => {
  const { start, end } = props;

  const instance = L.Routing.control({
    waypoints: [L.latLng(start), L.latLng(end)],
    createMarker: (i, wp, nWps) => {
      // Return null for start and end waypoints to remove markers
      if (i === 0 || i === nWps - 1) {
        return null;
      }

      // Default behavior for other waypoints
      return L.Routing.icon({
        iconUrl: "path/to/your/waypoint/icon.png",
        iconSize: [20, 20],
      });
    },
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
