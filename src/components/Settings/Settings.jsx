import BackButton from "../BackButton/BackButton";

import styles from "./Settings.module.css";

const Settings = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const headerDiv = [styles.headerDiv].join("");
  const profilePic = [styles.profilePic].join("");
  const profilePicImg = [styles.profilePicImg].join("");
  const addPic = [styles.addPic].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={headerDiv}>
        <BackButton pageName={"Settings"} navigateTo={"/profile"} />
      </div>
      <div className={profilePic}>
        <img
          className={profilePicImg}
          src="/icons/profileicon.jpg"
          alt="profile pic"
        />
        <img className={addPic} src="/icons/add.png" alt="addProfilePic" />
      </div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Settings;
