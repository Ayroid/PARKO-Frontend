import { useState } from "react";

import BackButton from "../BackButton/BackButton";

import "../../css/form.css";
import styles from "./Settings.module.css";

const Settings = () => {
  // ---------------------------- SERVER URL CONFIGURATION ----------------------------

  // ---------------------------- NAVIGATION ----------------------------

  // ---------------------------- STATE ----------------------------

  const [name, setName] = useState("Ayush Singh Kushwah");
  const [email, setEmail] = useState("ayushsk0000@gmail.com");
  const [sapid, setSapid] = useState("500095575");
  const [phone, setPhone] = useState("9456713820");

  // ---------------------------- FUNCTIONS ----------------------------

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form Submitted");
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
                placeholder="Name"
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
                placeholder="sapid"
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
                placeholder="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </div>

            <button className={button}>UPDATE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Settings;
