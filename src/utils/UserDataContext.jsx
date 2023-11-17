import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// ---------------------------- CONTEXT ----------------------------

const UserDataContext = createContext();

// ---------------------------- CONTEXT PROVIDER ----------------------------

const UserDataContextProvider = ({ children }) => {
  // ---------------------------- STATE ----------------------------

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    sapid: "",
    phone: "",
  });
  const [vehicleData, setVehicleData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ---------------------------- FETCHING DATA ----------------------------

  const fetchData = async () => {
    try {
      const getUserUrl =
        import.meta.env.VITE_BACKEND_SERVER_URL + "/api/user/getUser";
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: token,
      };
      const response = await axios.post(getUserUrl, null, {
        headers,
      });

      setUserData({
        username: response.data.username,
        email: response.data.email,
        sapid: response.data.sapid,
        phone: response.data.phone,
      });

      setVehicleData(response.data.vehicles);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    fetchData();
  }, []);

  // ---------------------------- FUNCTIONS ----------------------------

  const reFetchUserData = () => {
    fetchData();
  };

  // ---------------------------- JSX ----------------------------

  return (
    <UserDataContext.Provider
      value={{ userData, vehicleData, isLoading, reFetchUserData }}
    >
      {children}
    </UserDataContext.Provider>
  );
};

// ---------------------------- CUSTOM HOOK ----------------------------

const useUserData = () => {
  const context = useContext(UserDataContext);
  if (context === undefined) {
    throw new Error(
      "useUserData must be used within a UserDataContextProvider"
    );
  }
  return context;
};

// ---------------------------- PROPS ----------------------------

UserDataContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// ---------------------------- EXPORT ----------------------------

// eslint-disable-next-line react-refresh/only-export-components
export { useUserData, UserDataContextProvider };
