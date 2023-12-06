import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ---------------------------- CONTEXT ----------------------------

const MapDataContext = createContext();

// ---------------------------- VARIABLES ----------------------------

const user = localStorage.getItem("user");

// ---------------------------- CONTEXT PROVIDER ----------------------------

const MapDataContextProvider = ({ children }) => {
  // ---------------------------- STATE ----------------------------

  const [parkingCoordinates, setParkingCoordinates] = useState([]);
  const [mapLoading, setmapLoading] = useState(true);
  const [userAlreadyBooked, setUserAlreadyBooked] = useState(false);

  // ---------------------------- FETCHING DATA ----------------------------

  const fetchData = async () => {
    try {
      const getUserUrl =
        import.meta.env.VITE_BACKEND_SERVER_URL +
        "/api/parkingSpot/getParkingSpot";
      const jwtToken = localStorage.getItem("jwtToken");

      if (jwtToken == null) {
        setmapLoading(false);
        return;
      }
      const response = await axios.post(getUserUrl, null, {
        headers: {
          Authorization: jwtToken,
        },
      });

      for (let i = 0; i < response.data.parkingSpots.length; i++) {
        if (
          response.data.parkingSpots[i].parkingStatus === "booked" &&
          response.data.parkingSpots[i].currentlyParkedUser === user
        ) {
          setUserAlreadyBooked(true);
          break;
        } else {
          setUserAlreadyBooked(false);
        }
      }
      setParkingCoordinates(response.data.parkingSpots);
    } catch (error) {
      console.log(error);
    } finally {
      setmapLoading(false);
    }
  };

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchData();
    }, 15000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // ---------------------------- FUNCTIONS ----------------------------

  const reFetchMapData = () => {
    fetchData();
  };

  // setTimeout(() => {
  //   fetchData();
  // }, 15000);

  // ---------------------------- JSX ----------------------------

  return (
    <MapDataContext.Provider
      value={{
        parkingCoordinates,
        mapLoading,
        userAlreadyBooked,
        reFetchMapData,
      }}
    >
      {children}
    </MapDataContext.Provider>
  );
};

// ---------------------------- CUSTOM HOOK ----------------------------

const useMapData = () => {
  const context = useContext(MapDataContext);
  if (context === undefined) {
    throw new Error("useMapData must be used within a MapDataContextProvider");
  }
  return context;
};

// ---------------------------- PROPS ----------------------------

MapDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ---------------------------- EXPORT ----------------------------

// eslint-disable-next-line react-refresh/only-export-components
export { useMapData, MapDataContextProvider };
