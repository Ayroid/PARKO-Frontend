import { useState, useEffect } from "react";

import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import BackButton from "../BackButton/BackButton";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useUserData } from "../../utils/UserDataContext";

import "../../css/form.css";
import styles from "./Settings.module.css";

const Settings = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { userData, userLoading, reFetchUserData } = useUserData();

  // ---------------------------- STATE ----------------------------

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [sapid, setSapid] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);

  const [userNameUpdated, setUserNameUpdated] = useState(false);
  const [emailUpdated, setEmailUpdated] = useState(false);
  const [sapidUpdated, setSapidUpdated] = useState(false);
  const [phoneUpdated, setPhoneUpdated] = useState(false);
  // const [profilePicUpdated, setProfilePicUpdated] = useState(false);

  // ---------------------------- USE EFFECT ----------------------------

  useEffect(() => {
    if (!userLoading) {
      setUsername(userData.username);
      setEmail(userData.email);
      setSapid(userData.sapid);
      setPhone(userData.phone);
      if (userData.profilePic) {
        setProfilePic(userData.profilePic);
      }
    }
  }, [userData, userLoading]);

  if (userLoading) {
    return <LoadingSpinner />;
  }

  // ---------------------------- HANDLE CHANGE FUNCTIONS ----------------------------

  const handleUserNameChange = (event) => {
    if (event.target.value.trim() !== userData.username) {
      setUserNameUpdated(true);
    } else {
      setUserNameUpdated(false);
    }
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    if (event.target.value.trim() !== userData.email) {
      setEmailUpdated(true);
    } else {
      setEmailUpdated(false);
    }
    setEmail(event.target.value);
  };

  const handleSAPIDChange = (event) => {
    if (event.target.value.trim() !== userData.sapid) {
      setSapidUpdated(true);
    } else {
      setSapidUpdated(false);
    }
    setSapid(event.target.value);
  };

  const handlePhoneChange = (event) => {
    if (event.target.value.trim() !== userData.phone) {
      setPhoneUpdated(true);
    } else {
      setPhoneUpdated(false);
    }
    setPhone(event.target.value);
  };

  const handleImageChange = async (e) => {
    const imagePreview = document.getElementById("imagePreview");
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
    const token = localStorage.getItem("jwtToken");
    const url =
      import.meta.env.VITE_BACKEND_SERVER_URL + "/api/user/updateProfilePic";
    const data = new FormData();
    data.append("profilePic", e.target.files[0]);

    const response = await axios.post(url, data, {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.status === 200) {
      toast.success("Profile picture updated successfully");
      reFetchUserData();
    }
  };

  // ---------------------------- HANDLE SUBMIT FUNCTIONS ----------------------------

  const handleReFetchUserData = () => {
    reFetchUserData();
  };

  const handleUpdateData = async (event) => {
    try {
      event.preventDefault();

      console.log(userNameUpdated, emailUpdated, sapidUpdated, phoneUpdated);

      if (!(userNameUpdated || emailUpdated || sapidUpdated || phoneUpdated)) {
        return;
      } else {
        const token = localStorage.getItem("jwtToken");

        const userUpdateURL =
          import.meta.env.VITE_BACKEND_SERVER_URL + "/api/user/updateUser";

        const data = {
          username,
          email,
          sapid,
          phone,
        };

        const response = await axios.post(
          userUpdateURL,
          { data },
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.status === 200) {
          handleReFetchUserData();
          toast.success("User updated successfully");
          setUserNameUpdated(false);
          setEmailUpdated(false);
          setSapidUpdated(false);
          setPhoneUpdated(false);
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
      setUsername(userData.username);
      setEmail(userData.email);
      setSapid(userData.sapid);
      setPhone(userData.phone);
    }
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const headerDiv = [styles.headerDiv].join("");
  const bodyDiv = [styles.bodyDiv].join("");
  const profilePicDiv = [styles.profilePicDiv].join("");
  const profilePicImg = [styles.profilePicImg].join("");
  const addPic = [styles.addPic].join("");
  const userInfo = [styles.userInfo].join("");
  const form = `form`;
  const input = `input`;
  const inputDiv = `inputDiv`;
  const inputFieldName = `inputFieldName`;
  const isButtonDisabled =
    !userNameUpdated && !emailUpdated && !sapidUpdated && !phoneUpdated;
  const button = `button + ${isButtonDisabled ? styles.buttonDisabled : ""}`;

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={headerDiv}>
        <BackButton pageName={"Settings"} navigateTo={"/profile"} />
      </div>
      <div className={bodyDiv}>
        <div className={profilePicDiv}>
          <img
            className={profilePicImg}
            src={
              profilePic === "" ? "public/icons/profileicon.jpg" : profilePic
            }
            id="imagePreview"
            alt="profile pic"
          />
          <img className={addPic} src="/icons/add.png" alt="addProfilePic" />
          <input
            type="file"
            accept="image/*"
            name="profilePic"
            id="fileInput"
            onChange={handleImageChange}
          />
        </div>
        <div className={userInfo}>
          <form className={form} onSubmit={handleUpdateData}>
            <div className={inputDiv}>
              <p className={inputFieldName}>Name</p>
              <input
                className={input}
                id="name"
                type="text"
                placeholder="Name"
                value={username}
                onChange={handleUserNameChange}
                required
              />
              {userNameUpdated && (
                <img src="public/icons/caution.png" alt="field updated" />
              )}
            </div>

            <div className={inputDiv}>
              <p className={inputFieldName}>Email</p>
              <input
                className={input}
                id="email"
                type="text"
                placeholder=" Email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailUpdated && (
                <img src="public/icons/caution.png" alt="field updated" />
              )}
            </div>

            <div className={inputDiv}>
              <p className={inputFieldName}>SAPID</p>
              <input
                className={input}
                id="sapid"
                type="text"
                placeholder="Sapid"
                value={sapid}
                onChange={handleSAPIDChange}
                required
              />
              {sapidUpdated && (
                <img src="public/icons/caution.png" alt="field updated" />
              )}
            </div>

            <div className={inputDiv}>
              <p className={inputFieldName}>Phone Number</p>
              <input
                className={input}
                id="phone"
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={handlePhoneChange}
                required
              />
              {phoneUpdated && (
                <img src="public/icons/caution.png" alt="field updated" />
              )}
            </div>

            <button className={button}>UPDATE</button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Settings;
