import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserInformation from "./UserInformation/UserInformation";
import Cars from "./Cars/Cars";
import RegisterVehicleForm from "./RegisterVehicleForm/RegisterVehicleForm";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import styles from "./Profile.module.css";

// ---------------------------- SERVER URL CONFIGURATION ----------------------------

const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const getUserUrl = SERVER_URL + "/api/user/getUser";

const Profile = () => {
  // ---------------------------- STATE ----------------------------

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    sapid: "",
  });

  const [vehicleData, setVehicleData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [showRegisterVehicleForm, setShowRegisterVehicleForm] = useState(false);

  // ---------------------------- SERVER CALLS ----------------------------

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: token,
        };
        const response = await axios.post(getUserUrl, null, {
          headers,
        });

        console.log(response.data);

        setUserData({
          username: response.data.username,
          email: response.data.email,
          sapid: response.data.sapid,
        });

        setVehicleData(response.data.vehicles);

        // setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData().then(() => {
      setIsLoading(false);
    });
  }, []);

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  // ---------------------------- FUNCTIONS ----------------------------

  const goBack = () => {
    navigate("/");
  };

  const openSettings = () => {
    navigate("/settings");
  };

  const openVehicleRegistrationForm = () => {
    setShowRegisterVehicleForm(true);
  };

  const closeVehicleRegistrationForm = () => {
    setShowRegisterVehicleForm(false);
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");

  const headerDiv = [styles.headerDiv].join("");
  const backArrow = [styles.backArrow].join("");
  const editSettings = [styles.editSettings].join("");

  const contentDiv = [styles.contentDiv].join("");
  const addCarDiv = [styles.addCarDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={mainDiv}>
          <div className={headerDiv}>
            <div className={backArrow}>
              <img
                src="public/icons/backArrow.png"
                alt="backArrow"
                onClick={goBack}
              />
              <h3>Profile</h3>
            </div>
            <div className={editSettings} onClick={openSettings}>
              <img src="public/icons/pencil.png" alt="edit" />
            </div>
          </div>

          {!isLoading && <UserInformation data={userData} />}

          <div className={contentDiv}>
            {!isLoading && <Cars data={vehicleData} />}
            <div className={addCarDiv} onClick={openVehicleRegistrationForm}>
              <img src="public/icons/add.png" alt="addCar" />
            </div>
          </div>
          {showRegisterVehicleForm && (
            <RegisterVehicleForm
              closeVehicleRegistrationForm={closeVehicleRegistrationForm}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Profile;
