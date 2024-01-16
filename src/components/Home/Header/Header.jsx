import { useState } from "react";
import styles from "./Header.module.css";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // ---------------------------- STATE ----------------------------

  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  // ---------------------------- FUNCTIONS ----------------------------

  const openProfile = () => {
    toggleDropdown();
    navigate("/profile");
  };

  // ---------------------------- LOGOUT ----------------------------

  const updateLogout = (update) => {
    setLogout(update);
  };

  const openLogOut = () => {
    toggleDropdown();
    setLogout(true);
  };

  // ---------------------------- TOGGLE DROPDOWN ----------------------------

  const openDropDown = () => {
    const dropdown = document.getElementById("dropDown");
    dropdown.style.display = "flex";
    dropdown.classList.remove(styles.dropDownAnimationReverse);
    dropdown.classList.add(styles.dropDownAnimation);
  };

  const closeDropDown = () => {
    const dropdown = document.getElementById("dropDown");
    dropdown.classList.remove(styles.dropDownAnimation);
    dropdown.classList.add(styles.dropDownAnimationReverse);
    setTimeout(() => {
      dropdown.style.display = "none";
    }, 200);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const topHeading = [styles.topHeading].join("");
  const threeDots = [styles.threeDots].join("");
  const dropDownDiv = [styles.dropDownDiv].join("");
  const dropDown = [styles.dropDown].join(" ");
  const dropDownItems = [styles.dropDownItems].join("");
  const dropDownItemsText = [styles.dropDownItemsText].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <>
      <div className={mainDiv}>
        <h1 className={topHeading}>Parko</h1>
        <div className={dropDownDiv}>
          <div className={threeDots} onClick={toggleDropdown}>
            &#x2807;
          </div>
          <ul className={dropDown} id="dropDown">
            <div className={dropDownItems} onClick={openProfile}>
              <div className={dropDownItemsText}>Profile</div>
            </div>
            <div className={dropDownItems} onClick={openLogOut}>
              <div className={dropDownItemsText}>Log Out</div>
            </div>
          </ul>
        </div>
      </div>
      {logout && <Logout updateLogout={updateLogout} />}
    </>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Header;
