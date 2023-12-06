import { Marker, Popup } from "react-leaflet";

const LandMarkMarkers = () => {
  return (
    <>
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
    </>
  );
};

export default LandMarkMarkers;
