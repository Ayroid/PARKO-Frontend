import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L, { Icon, divIcon } from "leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import MarkerClusterGroup from "react-leaflet-cluster";

import greenMarker from "../../../assets/marker/greenlocation.png";
import yellowMarker from "../../../assets/marker/yellowlocation.png";
import blackMarker from "../../../assets/marker/blacklocation.png";
import redMarker from "../../../assets/marker/redlocation.png";

const Map = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mapContainer = [styles.mapContainer].join("");

  const [coordinates, setCoordinates] = useState([]);
  const [loggedCoordinates, setLoggedCoordinates] = useState([]);

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

  const [parkingCoordinatesArray, setParkingCoordinatesArray] = useState([
    [30.416990006119434, 77.96717848052764],
    [30.416971481579512, 77.96724827597022],
    [30.416948325899668, 77.96736639133455],
    [30.41692053907659, 77.96744692453754],
    [30.41686496540672, 77.96758114654246],
    [30.416868824737495, 77.96763684867452],
    [30.416827144465948, 77.96775496403885],
    [30.41677620188771, 77.96791066156459],
    [30.416739152723185, 77.96806635909032],
    [30.41669747239627, 77.96822742549624],
    [30.416727574856406, 77.96818290866781],
    [30.416308455082795, 77.96916496636459],
    [30.416289930413487, 77.96923476180712],
    [30.416252881064363, 77.96934750829126],
    [30.41623435638452, 77.96942267261403],
    [30.416206569358195, 77.96951394357743],
    [30.41617878232393, 77.96959447678037],
    [30.416159678733262, 77.96972422474579],
    [30.41614115403574, 77.96982086458935],
    [30.416130154994924, 77.96989200233388],
    [30.41607458087497, 77.97004233097941],
    [30.416032900264273, 77.97017655298433],
    [30.41590322713926, 77.97011212642195],
    [30.415958801356794, 77.96994032225568],
    [30.415977326088925, 77.96984905129229],
    [30.416009744361713, 77.96978999361015],
    [30.41602363790392, 77.96968261600618],
    [30.41605142498233, 77.96955376288145],
    [30.416093105585166, 77.96939269647552],
    [30.41612552381948, 77.96930679439235],
    [30.416162573216948, 77.96917794126762],
    [30.41617183556412, 77.96911888358542],
    [30.417247023565693, 77.96852627554402],
    [30.417270179174675, 77.96844037346085],
    [30.41728870365788, 77.9683329958569],
    [30.41731185925697, 77.96826320041434],
    [30.41734890820407, 77.96818803609159],
    [30.417381326021246, 77.96810750288859],
    [30.41740448159835, 77.96804307632623],
    [30.417441530510313, 77.96793032984208],
    [30.41746931718505, 77.96786590327972],
    [30.417497103851844, 77.96779610783713],
    [30.41754341494564, 77.96765114807182],
    [30.417580463804832, 77.96757598374906],
  ]);

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    const clickedCoordinates = [lat, lng];
    console.log(clickedCoordinates);

    // Update component state with the new coordinates
    setCoordinates((prev) => [...prev, clickedCoordinates]);

    // Update logged coordinates
    setLoggedCoordinates((prev) => [...prev, clickedCoordinates]);

    setParkingCoordinatesArray((prev) => [...prev, clickedCoordinates]);
  };

  const MapClickHandler = () => {
    const map = useMapEvents({
      click: handleMapClick,
    });

    return null; // This hook doesn't render anything, so return null
  };

  const customIcon = new Icon({
    iconUrl: greenMarker,
    iconSize: [25, 25],
  });

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <MapContainer
        center={[30.41757, 77.967754]}
        zoom={16}
        className={mapContainer}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* enable this to console log coordinates */}
        <MapClickHandler />

        <MarkerClusterGroup
          chunkedLoading
          disableClusteringAtZoom={18}
          animate={true}
          spiderfyOnMaxZoom={false}
        >
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

          {/* parking markers */}
          {parkingCoordinatesArray.map((coord, index) => (
            <Marker key={index} position={coord} icon={customIcon}>
              <Popup>
                <h2>Parking {index + 1}</h2>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        <Polyline positions={coordinates1} color="red" />
        <Polyline positions={coordinates2} color="blue" />
        <Polyline positions={coordinates3} color="green" />
      </MapContainer>
      {/* <button
        onClick={() => console.log("Logged Coordinates:", loggedCoordinates)}
      >
        Log All Coordinates
      </button> */}
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Map;
