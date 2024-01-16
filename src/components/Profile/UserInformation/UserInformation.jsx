import PropTypes from "prop-types";

import styles from "./UserInformation.module.css";

const UserInformation = ({ data }) => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { userData } = data;

  const { username, email, sapid } = userData;

  // ---------------------------- CSS ----------------------------

  const profileDiv = [styles.profileDiv].join("");
  const profilePic = [styles.profilePic].join("");
  const profileData = [styles.profileData].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={profileDiv}>
      <div className={profilePic}>
        <img
          src={
            userData.profilePic === ""
              ? "public/icons/profileicon.jpg"
              : userData.profilePic
          }
          alt="profile pic"
        />
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

// ---------------------------- PROPS ----------------------------

UserInformation.propTypes = {
  data: PropTypes.object.isRequired,
};

// ---------------------------- EXPORTS ----------------------------

export default UserInformation;
