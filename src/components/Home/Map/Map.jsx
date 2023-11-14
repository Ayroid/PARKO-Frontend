import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  // Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const Map = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mapContainer = [styles.mapContainer].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      {/* size of map */}
      <MapContainer
        center={[30.41757, 77.967754]}
        zoom={13}
        className={mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[30.416991, 77.966727]}>
          <Popup>
            <h2>Mac</h2>
          </Popup>
        </Marker>

        <Marker position={[30.416502, 77.968515]}>
          <Popup>
            <h2>Gandhi Chowk</h2>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
