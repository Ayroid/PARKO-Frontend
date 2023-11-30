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
    let dropDown = document.getElementById("dropDown");
    dropDown.style.display = "flex";
    dropDown.classList.remove(styles.dropDownAnimationReverse);
    dropDown.classList.add(styles.dropDownAnimation);
  };

  const closeDropDown = () => {
    let dropDown = document.getElementById("dropDown");
    dropDown.classList.remove(styles.dropDownAnimation);
    dropDown.classList.add(styles.dropDownAnimationReverse);
    setTimeout(() => {
      dropDown.style.display = "none";
    }, 200);
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
    setIsOpen(!isOpen);
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
            <a href="#" className={dropDownItems}>
              <div className={dropDownItemsText}>Dropdown 2</div>
            </a>
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
