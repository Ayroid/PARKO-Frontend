import { useState } from "react";
import { useNavigate } from "react-router-dom";

import UserInformation from "./UserInformation/UserInformation";
import Cars from "./Cars/Cars";
import RegisterVehicleForm from "./RegisterVehicleForm/RegisterVehicleForm";
import BackButton from "../BackButton/BackButton";

import styles from "./Profile.module.css";

const Profile = () => {
  // ---------------------------- STATE ----------------------------

  const [showRegisterVehicleForm, setShowRegisterVehicleForm] = useState(false);

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

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

      <UserInformation />

      <div className={contentDiv}>
        <Cars />
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
