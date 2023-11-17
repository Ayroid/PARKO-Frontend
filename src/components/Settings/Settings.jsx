import { useState, useEffect } from "react";

import BackButton from "../BackButton/BackButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUserData } from "../../utils/UserDataContext";

import "../../css/form.css";
import styles from "./Settings.module.css";

const Settings = () => {
  // ---------------------------- SERVER URL CONFIGURATION ----------------------------

  const { userData, isLoading, reFetchUserData } = useUserData();

  // ---------------------------- STATE ----------------------------

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sapid, setSapid] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (!isLoading) {
      setName(userData.username);
      setEmail(userData.email);
      setSapid(userData.sapid);
      setPhone(userData.phone);
    }
  }, [userData, isLoading]);

  if (isLoading) return <LoadingSpinner />;

  // ---------------------------- FUNCTIONS ----------------------------

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
  };

  const handleReFetchUserData = () => {
    reFetchUserData();
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const headerDiv = [styles.headerDiv].join("");
  const bodyDiv = [styles.bodyDiv].join("");
  const profilePic = [styles.profilePic].join("");
  const profilePicImg = [styles.profilePicImg].join("");
  const addPic = [styles.addPic].join("");
  const userInfo = [styles.userInfo].join("");
  const form = `form`;
  const input = `input`;
  const inputDiv = `inputDiv`;
  const inputFieldName = `inputFieldName`;
  const button = `button`;
  // const errorMessage = `errorMessage`;

  // ---------------------------- JSX ----------------------------

  return (
    <>
      <div className={mainDiv}>
        <div className={headerDiv}>
          <BackButton pageName={"Settings"} navigateTo={"/profile"} />
        </div>
        <div className={bodyDiv}>
          <div className={profilePic}>
            <img
              className={profilePicImg}
              src="/icons/profileicon.jpg"
              alt="profile pic"
            />
            <img className={addPic} src="/icons/add.png" alt="addProfilePic" />
          </div>
          <div className={userInfo}>
            <form className={form} onSubmit={handleFormSubmit}>
              <div className={inputDiv}>
                <p className={inputFieldName}>Name</p>
                <input
                  className={input}
                  id="name"
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </div>

              <div className={inputDiv}>
                <p className={inputFieldName}>Email</p>
                <input
                  className={input}
                  id="email"
                  type="text"
                  placeholder=" Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className={inputDiv}>
                <p className={inputFieldName}>SAPID</p>
                <input
                  className={input}
                  id="sapid"
                  type="text"
                  placeholder="Sapid"
                  value={sapid}
                  onChange={(event) => setSapid(event.target.value)}
                  required
                />
              </div>

              <div className={inputDiv}>
                <p className={inputFieldName}>Phone Number</p>
                <input
                  className={input}
                  id="phone"
                  type="text"
                  placeholder="Phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  required
                />
              </div>

              <button className={button} onClick={handleReFetchUserData}>
                UPDATE
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Settings;
