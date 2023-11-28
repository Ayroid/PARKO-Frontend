import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ---------------------------- CONTEXT ----------------------------

const MapDataContext = createContext();

// ---------------------------- CONTEXT PROVIDER ----------------------------

const MapDataContextProvider = ({ children }) => {
  // ---------------------------- STATE ----------------------------

  const [parkingCoordinates, setParkingCoordinates] = useState([]);
  const [mapLoading, setmapLoading] = useState(true);

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

  // ---------------------------- FUNCTIONS ----------------------------

  const reFetchMapData = () => {
    fetchData();
  };

  setTimeout(() => {
    reFetchMapData();
  }, 10000);

  // ---------------------------- JSX ----------------------------

  return (
    <MapDataContext.Provider
      value={{ parkingCoordinates, mapLoading, reFetchMapData }}
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
