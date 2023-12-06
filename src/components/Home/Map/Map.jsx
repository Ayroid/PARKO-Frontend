import { memo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  // Polyline,
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
          {/* LAND MARK MARKERS */}

          <LandMarkMarkers />

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
