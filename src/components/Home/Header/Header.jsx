import { useState } from "react";
import styles from "./Header.module.css";
import Logout from "../Logout/Logout";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [logout, setLogout] = useState(false);

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
  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
    if (isOpen) {
      closeDropDown();
    } else {
      openDropDown();
    }
  };

  const openDropDown = () => {
    let dropDown = document.getElementById("dropDown");
    dropDown.style.display = "flex";
    dropDown.classList.add(styles.dropDownAnimation);
    dropDown.classList.remove(styles.dropDownAnimationReverse);
  };

  const closeDropDown = () => {
    let dropDown = document.getElementById("dropDown");
    dropDown.classList.remove(styles.dropDownAnimation);
    dropDown.classList.add(styles.dropDownAnimationReverse);
    setTimeout(() => {
      dropDown.style.display = "none";
    }, 300);
  };

  // ---------------------------- CSS ----------------------------

  const outerDiv = [styles.outerDiv].join("");
  const mainDiv = [styles.mainDiv].join("");
  const topHeading = [styles.topHeading].join("");
  const threeDots = [styles.threeDots].join("");
  const dropDown = [styles.dropDown].join(" ");
  const dropDownItems = [styles.dropDownItems].join("");
  const dropDownItemsText = [styles.dropDownItemsText].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={outerDiv}>
      <div className={mainDiv}>
        <h1 className={topHeading}>Parko</h1>
        <div className={threeDots} onClick={toggleDropdown}>
          &#x2807;
        </div>
      </div>
      <ul className={dropDown} id="dropDown">
        <div className={dropDownItems} onClick={openProfile}>
          <div className={dropDownItemsText}>Profile</div>
        </div>
        <a href="#" className={dropDownItems}>
          <div className={dropDownItemsText}>dropdown 2</div>
        </a>
        <div className={dropDownItems} onClick={openLogOut}>
          <div className={dropDownItemsText}>Log Out</div>
        </div>
      </ul>
      {logout && <Logout updateLogout={updateLogout} />}
    </div>
  );
};

export default Header;
