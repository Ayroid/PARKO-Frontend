import { memo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

import styles from "./Map.module.css";

import { useMapData } from "../../../utils/MapDataContext";

import greenMarker from "../../../assets/marker/greenlocation.png";
import yellowMarker from "../../../assets/marker/yellowlocation.png";
import blackMarker from "../../../assets/marker/blacklocation.png";
import redMarker from "../../../assets/marker/redlocation.png";

const Map = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mapContainer = [styles.mapContainer].join("");

  const coordinates1 = [
    [30.415797829416945, 77.9663121700287],
    [30.415810797815844, 77.96637225151066],
    [30.415833029352832, 77.96640014648438],
    [30.415881197665534, 77.96640014648438],
    [30.41595715534115, 77.96643018722536],
    [30.416042376077552, 77.96647739410399],
    [30.416116481005236, 77.96652460098268],
    [30.416147975582476, 77.96656751632692],
    [30.41628506950612, 77.96655464172366],
    [30.41644068940231, 77.96653532981874],
    [30.41654628847623, 77.96653532981874],
    [30.41666670833341, 77.96655249595642],
    [30.416796391090337, 77.96662545204164],
    [30.416872348053634, 77.96675634384154],
    [30.41693718931701, 77.96686792373659],
    [30.416976094054363, 77.96699237823486],
    [30.416946452351134, 77.96711897850037],
    [30.416909400209406, 77.96726059913635],
    [30.416866790229054, 77.96743440628056],
    [30.416816769793616, 77.96759963035585],
    [30.41677230716278, 77.96777987480165],
    [30.41671858145686, 77.96798372268678],
    [30.4166611504971, 77.96819615364076],
    [30.4166166877954, 77.96834206581117],
    [30.41656481461778, 77.96843862533568],
    [30.41657963552849, 77.96851372718811],
    [30.41656666723175, 77.96857166290285],
    [30.416522204486974, 77.9686145782471],
    [30.41646847864335, 77.9686145782471],
    [30.416431426320177, 77.96859097480774],
    [30.416401784451505, 77.96858882904053],
    [30.41636658472078, 77.96872401237489],
    [30.416344353305366, 77.96881413459778],
    [30.416318416647638, 77.9689064025879],
    [30.41628506950612, 77.96900081634524],
    [30.416255427593, 77.96913385391237],
    [30.41622578567087, 77.96925830841066],
    [30.416194291118746, 77.96937417984009],
    [30.416162796556467, 77.96947503089908],
    [30.416135007228384, 77.96958231925966],
    [30.416107217892364, 77.96970891952517],
    [30.41607016543202, 77.9698441028595],
    [30.416014586715146, 77.9700071811676],
    [30.415986797344853, 77.97014665603636],
    [30.415967673121802, 77.97020351886749],
  ];

  const coordinates2 = [
    [30.416582742787796, 77.96853196620941],
    [30.416699457377188, 77.96856844425203],
    [30.416830992699538, 77.9686049222946],
    [30.41693103353024, 77.96864998340605],
    [30.4170755367713, 77.96868002414703],
    [30.417118146660535, 77.96869289875029],
    [30.417186692965014, 77.96849119663241],
    [30.41726450222527, 77.96826589107516],
    [30.417347869220972, 77.96803843975066],
    [30.417447909521822, 77.96776807308198],
    [30.417536834147608, 77.96753847599032],
    [30.417607232752196, 77.96736681461336],
    [30.417681336491675, 77.96716940402985],
  ];

  const coordinates3 = [
    [30.417118407590596, 77.96869182586671],
    [30.417162609133793, 77.96871650218965],
    [30.417290438631557, 77.9687615633011],
    [30.41740715237459, 77.96879589557649],
    [30.4175738860511, 77.96885812282564],
    [30.417714683156056, 77.96890103816988],
    [30.417862890415527, 77.96895682811738],
    [30.418003687103557, 77.96901261806488],
    [30.41797589829963, 77.9691563844681],
    [30.41796848795057, 77.96926152706146],
    [30.417959225013494, 77.96936666965485],
    [30.417948109487817, 77.96948683261871],
    [30.417948109487817, 77.96957695484163],
    [30.417951814663184, 77.96964776515959],
    [30.418211176589296, 77.96963489055635],
    [30.418407550160545, 77.96965205669406],
  ];

  let { parkingCoordinates } = useMapData();

  // let parkingCoordinates1 = parkingCoordinates.slice(36, 85);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const clickedCoordinates = [lat, lng];

    console.log(clickedCoordinates);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });

    return null; // This hook doesn't render anything, so return null
  };

  // ---------------------------- FETCHING DATA ----------------------------

  const MemoizedMarkerClusterGroup = memo(MarkerClusterGroup);

  const greenIcon = new Icon({
    iconUrl: greenMarker,
    iconSize: [20, 20],
  });

  const blackIcon = new Icon({
    iconUrl: blackMarker,
    iconSize: [20, 20],
  });

  const yellowIcon = new Icon({
    iconUrl: yellowMarker,
    iconSize: [20, 20],
  });

  const redIcon = new Icon({
    iconUrl: redMarker,
    iconSize: [20, 20],
  });

  const handleMarkerClick = (markerId, e) => {
    console.log(`Marker ${markerId} clicked at:`, e.latlng);
  };

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <MapContainer
        center={[30.41620924289172, 77.96954673496886]}
        zoom={18}
        className={mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler />

        <MemoizedMarkerClusterGroup
          chunkedLoading={false}
          disableClusteringAtZoom={18}
          animate={true}
          spiderfyOnMaxZoom={false}
        >
          <Marker position={[30.416991, 77.966727]}>
            <Popup>
              <h2>Mac</h2>
            </Popup>
          </Marker>

          <Marker
            position={[30.416502, 77.968515]}
            key={"GC"}
            onclick={(e) => handleMarkerClick("GC", e)}
          >
            <Popup>
              <h2>Gandhi Chowk</h2>
            </Popup>
          </Marker>

          {/* parking markers */}
          {parkingCoordinates.map(
            ({ parkingNumber, coordinates, parkingStatus }, index) => (
              <Marker
                key={index}
                position={coordinates}
                icon={
                  parkingStatus === "parked"
                    ? greenIcon
                    : parkingStatus === "booked"
                    ? yellowIcon
                    : parkingStatus === "vacant"
                    ? blackIcon
                    : parkingStatus === "unavailable"
                    ? redIcon
                    : null
                }
              >
                <Popup>
                  <h2>Parking {parkingNumber}</h2>
                </Popup>
              </Marker>
            )
          )}
        </MemoizedMarkerClusterGroup>

        <Polyline positions={coordinates1} color="red" />
        <Polyline positions={coordinates2} color="blue" />
        <Polyline positions={coordinates3} color="green" />
      </MapContainer>
      {/* <button onClick={deleteParkingSpot} style={{ backgroundColor: "red" }}>
        BUTTON
      </button> */}
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Map;
