import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserInformation from "./UserInformation/UserInformation";
import Cars from "./Cars/Cars";
import RegisterVehicleForm from "./RegisterVehicleForm/RegisterVehicleForm";
import BackButton from "../BackButton/BackButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import styles from "./Profile.module.css";

import { useUserData } from "../../utils/UserDataContext";

const Profile = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { userData, vehicleData, userLoading } = useUserData();

  // ---------------------------- STATE ----------------------------

  const [showRegisterVehicleForm, setShowRegisterVehicleForm] = useState(false);

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  if (userLoading) return <LoadingSpinner />;

  // ---------------------------- FUNCTIONS ----------------------------

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
  const editSettings = [styles.editSettings].join("");

  const contentDiv = [styles.contentDiv].join("");
  const addCarDiv = [styles.addCarDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={headerDiv}>
        <BackButton pageName={"Profile"} navigateTo={"/"} />
        <div className={editSettings} onClick={openSettings}>
          <img src="/icons/pencil.png" alt="edit" />
        </div>
      </div>

      <UserInformation data={{ userData, userLoading }} />

      <div className={contentDiv}>
        <Cars data={{ vehicleData }} />
        <div className={addCarDiv} onClick={openVehicleRegistrationForm}>
          <img src="/icons/add.png" alt="addCar" />
        </div>
      </div>
      {showRegisterVehicleForm && (
        <RegisterVehicleForm
          closeVehicleRegistrationForm={closeVehicleRegistrationForm}
        />
      )}
    </div>
  );
};

export default Profile;
