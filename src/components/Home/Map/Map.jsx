import { memo, useState } from "react";
import Graph from "./graph";
import {
  MapContainer,Pane,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
} from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";

import axios from "axios";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Map.module.css";

import ConfirmParkingButton from "../ConfirmParkingButton/ConfirmParkingButton";
import LandMarkMarkers from "../LandMarkMarkers/LandMarkMarkers";
import Parking from "./Parking/Parking";

import { useMapData } from "../../../utils/MapDataContext";

// ---------------------------- CUSTOM MARKER ICONS ----------------------------

const greenMarker = new Icon({
  iconUrl: "/icons/marker/greenlocation.png",
  iconSize: [20, 20],
});

const blackMarker = new Icon({
  iconUrl: "/icons/marker/blacklocation.png",
  iconSize: [20, 20],
});

const blueMarker = new Icon({
  iconUrl: "/icons/marker/bluelocation.png",
  iconSize: [20, 20],
});

const redMarker = new Icon({
  iconUrl: "/icons/marker/redlocation.png",
  iconSize: [20, 20],
});

const yourBookedMarker = new Icon({
  iconUrl: "/icons/marker/yourbookedlocation.png",
  iconSize: [20, 20],
});

const selectedMarker = new Icon({
  iconUrl: "/icons/marker/selectedlocation.png",
  iconSize: [30, 30],
  iconAnchor: [13, 25],
});

const Map = () => {
  // ---------------------------- STATES ----------------------------

  const [parkingSelected, setParkingSelected] = useState(false);
  const [parkingData, setParkingData] = useState({
    parkingNumber: "PS001",
    parkingStatus: "Available",
    nearBy: "Library Front",
    currentlyParkedUser: "None",
  });
  const [clicked, setClicked] = useState(-1);

  // ---------------------------- VARIABLES ----------------------------

  // const user = localStorage.getItem("user");

  // ---------------------------- USE CONTEXT ----------------------------

  const { parkingCoordinates, reFetchMapData } = useMapData();

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mapContainer = [styles.mapContainer].join("");
  const confirmParkingContainer = [styles.confirmParkingContainer].join("");
  const parkingListDiv = [styles.parkingListDiv].join("");

  // ---------------------------- POLYLINE COORDINATES ----------------------------

  // ---------------------------- MAP CLICK HANDLER ----------------------------

  const handleMapClick = () => {
    setParkingSelected(false);
    setClicked(-1);
    console.log("MAP CLICKED");
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: handleMapClick,
    });
    return null;
  };

  // ---------------------------- MARKER CLICK HANDLER ----------------------------

  const handleMarkerClick = (
    parkingNumber,
    parkingStatus,
    nearBy,
    currentlyParkedUser,
    index
  ) => {
    setParkingSelected(true);
    setParkingData({
      parkingNumber,
      parkingStatus,
      nearBy,
      currentlyParkedUser,
    });
    console.log("MARKER CLICKED");
    setClicked(index);
  };

  // ---------------------------- BOOK PARKING SPOT ----------------------------

  const bookParkingSpot = async (parkingNumber) => {
    try {
      const bookingURL =
        import.meta.env.VITE_BACKEND_SERVER_URL +
        "/api/parkingSpot/bookParkingSpot";
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        bookingURL,
        { parkingNumber },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        reFetchMapData();
        handleMapClick();
        toast.success("Parking Spot Booked!");
        localStorage.setItem("bookedParkingSpot", parkingNumber);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Booking Parking Spot!");
    }
  };

  // ---------------------------- CANCEL BOOKING ----------------------------

  const cancelBooking = async (parkingNumber) => {
    try {
      const cancelBookingURL =
        import.meta.env.VITE_BACKEND_SERVER_URL +
        "/api/parkingSpot/cancelParkingSpot";
      const token = localStorage.getItem("jwtToken");

      const response = await axios.post(
        cancelBookingURL,
        { parkingNumber },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 200) {
        reFetchMapData();
        handleMapClick();
        toast.success("Parking Spot Booking Cancelled!");
        localStorage.removeItem("bookedParkingSpot");
      }

      if (response.status === 400) {
        toast.error("Parking Spot Booking Cancellation Failed!");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error Cancelling Parking Spot Booking!");
    }
  };

  // ---------------------------- GET MARKER ICON ----------------------------

  const getMarkerIcon = (parkingStatus, index, currentlyParkedUser) => {
    if (index === clicked) {
      return selectedMarker;
    }
    if (
      parkingStatus === "booked" &&
      currentlyParkedUser === localStorage.getItem("user")
    ) {
      return yourBookedMarker;
    } else {
      // Return the icon based on the parkingStatus
      return parkingStatus === "available"
        ? greenMarker
        : parkingStatus === "booked"
        ? blueMarker
        : parkingStatus === "parked"
        ? blackMarker
        : parkingStatus === "unavailable"
        ? redMarker
        : null;
    }
  };
  
    // ---------------------------- DIJSTRA START ----------------------------

    const gateCoordinates = [30.41578351906404,77.96630144119264];

    const coordinatesMap = [
      [1,30.415797829416945, 77.9663121700287],
      [2,30.415810797815844, 77.96637225151066],
      [3,30.415833029352832, 77.96640014648438],
      [4,30.415881197665534, 77.96640014648438],
      [5,30.41595715534115, 77.96643018722536],
      [6,30.416042376077552, 77.96647739410399],
      [7,30.416116481005236, 77.96652460098268],
      [8,30.416147975582476, 77.96656751632692],
      [9,30.41628506950612, 77.96655464172366],
      [10,30.41644068940231, 77.96653532981874],
      [11,30.41654628847623, 77.96653532981874],
      [12,30.41666670833341, 77.96655249595642],
      [13,30.416796391090337, 77.96662545204164],
      [14,30.416872348053634, 77.96675634384154],
      [15,30.41693718931701, 77.96686792373659],
      [16,30.416976094054363, 77.96699237823486],
      [17,30.416946452351134, 77.96711897850037],
      [18,30.416909400209406, 77.96726059913635],
      [19,30.416866790229054, 77.96743440628056],
      [20,30.416816769793616, 77.96759963035585],
      [21,30.41677230716278, 77.96777987480165],
      [22,30.41671858145686, 77.96798372268678],
      [23,30.4166611504971, 77.96819615364076],
      [24,30.4166166877954, 77.96834206581117],
      [25,30.41656481461778, 77.96843862533568],
      [26,30.41657963552849, 77.96851372718811],  // starts 43
      [27,30.41656666723175, 77.96857166290285],
      [28,30.416522204486974, 77.9686145782471],
      [29,30.41646847864335, 77.9686145782471],
      [30,30.416431426320177, 77.96859097480774],
      [31,30.416401784451505, 77.96858882904053],
      [31,30.41636658472078, 77.96872401237489],
      [32,30.416344353305366, 77.96881413459778],
      [33,30.416318416647638, 77.9689064025879],
      [34,30.41628506950612, 77.96900081634524],
      [35,30.416255427593, 77.96913385391237],
      [36,30.41622578567087, 77.96925830841066],
      [37,30.416194291118746, 77.96937417984009],
      [38,30.416162796556467, 77.96947503089908],
      [39,30.416135007228384, 77.96958231925966],
      [40,30.416107217892364, 77.96970891952517],
      [41,30.41607016543202, 77.9698441028595],
      [42,30.416014586715146, 77.9700071811676],
      [43,30.415986797344853, 77.97014665603636],
      [44,30.415967673121802, 77.97020351886749],
      [45,30.416582742787796, 77.96853196620941],
      [46,30.416699457377188, 77.96856844425203],
      [47,30.416830992699538, 77.9686049222946],
      [48,30.41693103353024, 77.96864998340605],
      [49,30.4170755367713, 77.96868002414703],
      [50,30.417118146660535, 77.96869289875029], // starts 58
      [51,30.417186692965014, 77.96849119663241],
      [52,30.41726450222527, 77.96826589107516],
      [53,30.417347869220972, 77.96803843975066],
      [54,30.417447909521822, 77.96776807308198],
      [55,30.417536834147608, 77.96753847599032],
      [56,30.417607232752196, 77.96736681461336],
      [57,30.417681336491675, 77.96716940402985],
      [58,30.417118407590596, 77.96869182586671],
      [59,30.417162609133793, 77.96871650218965],
      [60,30.417290438631557, 77.9687615633011],
      [61,30.41740715237459, 77.96879589557649],
      [62,30.4175738860511, 77.96885812282564],
      [63,30.417714683156056, 77.96890103816988],
      [64,30.417862890415527, 77.96895682811738],
      [65,30.418003687103557, 77.96901261806488],
      [66,30.41797589829963, 77.9691563844681],
      [67,30.41796848795057, 77.96926152706146],
      [68,30.417959225013494, 77.96936666965485],
      [69,30.417948109487817, 77.96948683261871],
      [70,30.417948109487817, 77.96957695484163],
      [71,30.417951814663184, 77.96964776515959],
      [72,30.418211176589296, 77.96963489055635],
      [73,30.418407550160545, 77.96965205669406],
    ];   

   

    const coordinatesMap1 = [
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
    ];


    const coordinatesMaptest = [
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
      // [30.417014183708623, 77.96705281844322], // parking 1
      [30.416986427239234, 77.96712256189494],
      [30.416972549001603, 77.96719767022759],
      [30.416949418601135, 77.96727277856021],
      
      // [30.416946452351134, 77.96711897850037],
      // [30.416909400209406, 77.96726059913635],
      // [30.416866790229054, 77.96743440628056],
      // [30.416816769793616, 77.96759963035585],
      // [30.41677230716278, 77.96777987480165],
      // [30.41671858145686, 77.96798372268678],
      // [30.4166611504971, 77.96819615364076],
      // [30.4166166877954, 77.96834206581117],
      // [30.41656481461778, 77.96843862533568],
      // [30.41657963552849, 77.96851372718811],  // starts 43
      // [30.41656666723175, 77.96857166290285],
      // [30.416522204486974, 77.9686145782471],
      // [30.41646847864335, 77.9686145782471],
      // [30.416431426320177, 77.96859097480774],
      // [30.416401784451505, 77.96858882904053],
      // [30.41636658472078, 77.96872401237489],
      // [30.416344353305366, 77.96881413459778],
      // [30.416318416647638, 77.9689064025879],
      // [30.41628506950612, 77.96900081634524],
      // [30.416255427593, 77.96913385391237],
      // [30.41622578567087, 77.96925830841066],
      // [30.416194291118746, 77.96937417984009],
      // [30.416162796556467, 77.96947503089908],
      // [30.416135007228384, 77.96958231925966],
      // [30.416107217892364, 77.96970891952517],
      // [30.41607016543202, 77.9698441028595],
      // [30.416014586715146, 77.9700071811676],
      // [30.415986797344853, 77.97014665603636],
      // [30.415967673121802, 77.97020351886749],
      // [30.416582742787796, 77.96853196620941],
      // [30.416699457377188, 77.96856844425203],
      // [30.416830992699538, 77.9686049222946],
      // [30.41693103353024, 77.96864998340605],
      // [30.4170755367713, 77.96868002414703],
      // [30.417118146660535, 77.96869289875029], // starts 58
      // [30.417186692965014, 77.96849119663241],
      // [30.41726450222527, 77.96826589107516],
      // [30.417347869220972, 77.96803843975066],
      // [30.417447909521822, 77.96776807308198],
      // [30.417536834147608, 77.96753847599032],
      // [30.417607232752196, 77.96736681461336],
      // [30.417681336491675, 77.96716940402985],
      // [30.417118407590596, 77.96869182586671],
      // [30.417162609133793, 77.96871650218965],
      // [30.417290438631557, 77.9687615633011],
      // [30.41740715237459, 77.96879589557649],
      // [30.4175738860511, 77.96885812282564],
      // [30.417714683156056, 77.96890103816988],
      // [30.417862890415527, 77.96895682811738],
      // [30.418003687103557, 77.96901261806488],
      // [30.41797589829963, 77.9691563844681],
      // [30.41796848795057, 77.96926152706146],
      // [30.417959225013494, 77.96936666965485],
      // [30.417948109487817, 77.96948683261871],
      // [30.417948109487817, 77.96957695484163],
      // [30.417951814663184, 77.96964776515959],
      // [30.418211176589296, 77.96963489055635],
      // [30.418407550160545, 77.96965205669406],
    ];

  
    var mapGraph = {
      1: { 2: 1 },
      2: { 3: 1 },
      3: { 4: 1 },
      4: { 5: 1 },
      5: { 6: 1 },
      6: { 7: 1 },
      7: { 8: 1 },
      8: { 9: 1 },
      9: { 10: 1 },
      10: { 11: 1 },
      11: { 12: 1 },
      12: { 13: 1 },
      13: { 14: 1 },
      14: { 15: 1 },
      15: { 16: 1 },
      16: { 17: 1 },
      17: { 18: 1 },
      18: { 19: 1 },
      19: { 20: 1 },
      20: { 21: 1 },
      21: { 22: 1 },
      22: { 23: 1 },
      23: { 24: 1 },
      24: { 25: 1 },
      25: { 26: 1 },
      26: { 27: 1 , 42:1},
      27: { 28: 1 },
      28: { 29: 1 },
      29: { 30: 1 },
      30: { 31: 1 },
      31: { 32: 1 },
      32: { 33: 1 },
      33: { 34: 1 },
      34: { 35: 1 },
      35: { 36: 1 },
      36: { 37: 1 },
      37: { 38: 1 },
      38: { 39: 1 },
      39: { 40: 1 },
      40: { 41: 1 },
      41: { 42: 1 },
      42: { 43: 1 },
      43: { 44: 1 },
      44: { 45: 1 },
      45: { 46: 1 },
      46: { 47: 1 },
      47: { 48: 1 },
      48: { 49: 1 },
      49: { 50: 1 },
      50: { 51: 1 , 58:1 },
      51: { 52: 1 },
      52: { 53: 1 },
      53: { 54: 1 },
      54: { 55: 1 },
      55: { 56: 1 },
      56: { 57: 1 },
      57: { 58: 1 },
      58: { 59: 1 },
      59: { 60: 1 },
      60: { 61: 1 },
      61: { 62: 1 },
      62: { 63: 1 },
      63: { 64: 1 },
      64: { 65: 1 },
      65: { 66: 1 },
      66: { 67: 1 },
      67: { 68: 1 },
      68: { 69: 1 },
      69: { 70: 1 },
      70: { 71: 1 },
      71: { 72: 1 },
      72: { 73: 1 },
    };

    const getPathCoordinates = (path) => {
      return path.map((node) => {
        const nodeInfo = coordinatesMap.find(coord => coord[0] === node);
    
        if (nodeInfo) {
          return [nodeInfo[1], nodeInfo[2]];
        } else {
          // Handle the case where nodeInfo is undefined (no match found)
          console.error(`Coordinates not found for node ${node}`);
          return null; // or any default value as needed
        }
      });
    };

    
    
    const myGraph = new Graph(mapGraph);
    const shortestPath = myGraph.findShortestPath(1,34);
    console.log(shortestPath);
    
    const coordinatesOnShortestPath = getPathCoordinates(shortestPath);
    console.log(coordinatesOnShortestPath);
  
    // ---------------------------- DIJISTRA END ----------------------------


  // ---------------------------- MEMOIZING CLUSTER GROUP ----------------------------

  const MemoizedMarkerClusterGroup = memo(MarkerClusterGroup);

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <MapContainer
        center={[30.416502, 77.968515]}
        zoom={18}
        className={mapContainer}
      >
        <MapClickHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* MARKER CLUSTER GROUP */}

        <MemoizedMarkerClusterGroup
          chunkedLoading={true}
          disableClusteringAtZoom={18}
          animate={true}
          spiderfyOnMaxZoom={false}
        >

          <LandMarkMarkers/>

          <Marker position={gateCoordinates}/>

          <Pane name="custom" style={{ zIndex: 500 }}>
          <Polyline  positions={coordinatesMaptest}/>
          </Pane>


          
          {parkingCoordinates.map(
            (
              {
                parkingNumber,
                coordinates,
                parkingStatus,
                nearBy,
                currentlyParkedUser,
              },
              index
            ) => (
              <div key={index} id={parkingNumber}>
                <Marker
                  key={index}
                  position={coordinates}
                  icon={getMarkerIcon(
                    parkingStatus,
                    index,
                    currentlyParkedUser
                  )}
                  riseOnHover={true}
                  riseOffset={100}
                  eventHandlers={{
                    click: () => {
                      handleMarkerClick(
                        parkingNumber,
                        parkingStatus,
                        nearBy,
                        currentlyParkedUser,
                        index
                      );
                    },
                  }}
                ></Marker>
              </div>
            )
          )}
        </MemoizedMarkerClusterGroup>
      </MapContainer>

      {/* CONFIRM PARKING BUTTON */}

      {parkingSelected && (
        <div className={confirmParkingContainer} id="confirmParkingContainer">
          <ConfirmParkingButton
            parkingData={{
              parkingNumber: parkingData.parkingNumber,
              parkingStatus: parkingData.parkingStatus,
              nearBy: parkingData.nearBy,
              currentlyParkedUser: parkingData.currentlyParkedUser,
            }}
            bookSpot={bookParkingSpot}
            cancelSpot={cancelBooking}
          />
        </div>
      )}

      {/* PARKING DETAILS */}

      <div className={parkingListDiv}>
        <Parking />
      </div>

      {/* TOAST CONTAINER */}

      <ToastContainer position="top-center" />
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Map;
