// import { useState, useEffect } from "react";

import styles from "./UserInformation.module.css";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useUserData } from "../../../utils/UserDataContext";

const UserInformation = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { userData, isLoading } = useUserData();

  if (isLoading) return <LoadingSpinner />;

  const { username, email, sapid } = userData;

  // ---------------------------- CSS ----------------------------

  const profileDiv = [styles.profileDiv].join("");
  const profilePic = [styles.profilePic].join("");
  const profileData = [styles.profileData].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={profileDiv}>
      <div className={profilePic}>
        <img src="/icons/profileicon.jpg" alt="profile pic" />
      </div>
      <div className={profileData}>
        <div style={{ fontSize: "1.5rem" }} id="username">
          {username}
        </div>
        <div id="useremail">{email}</div>
        <div id="sapid">{sapid}</div>
      </div>
    </div>
  );
};

// ---------------------------- EXPORTS ----------------------------

export default UserInformation;
