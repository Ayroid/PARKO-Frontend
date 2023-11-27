import styles from "./Parking.module.css";
import { useState } from "react";
import { useMapData } from "../../../utils/MapDataContext";

const Parkings = () => {
  // ---------------------------- USE CONTEXT ----------------------------

  const { parkingCoordinates } = useMapData();

  // ---------------------------- STATE ----------------------------

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none"); // Default to 'none'

  // ---------------------------- FILTER OPTIONS ----------------------------

  const filterOptions = [
    { label: "None", value: "none" },
    { label: "Available", value: "available" },
    { label: "Parked", value: "parked" },
    { label: "Booked", value: "booked" },
    { label: "Unavailable", value: "unavailable" },
  ];

  const handleFilter = (filterValue) => {
    setSelectedFilter(filterValue);
    toggleDropdown();
  };

  const filteredParkings =
    selectedFilter === "none"
      ? parkingCoordinates
      : parkingCoordinates.filter(
          (parking) => parking.parkingStatus === selectedFilter
        );

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
    let dropDown = document.getElementById("filterDropDown");
    dropDown.style.display = "flex";
    dropDown.classList.add(styles.dropDownAnimation);
    dropDown.classList.remove(styles.dropDownAnimationReverse);
  };

  const closeDropDown = () => {
    let dropDown = document.getElementById("filterDropDown");
    dropDown.classList.remove(styles.dropDownAnimation);
    dropDown.classList.add(styles.dropDownAnimationReverse);
    setTimeout(() => {
      dropDown.style.display = "none";
    }, 200);
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mainHeader = [styles.mainHeader].join("");
  const mainHeading = [styles.mainHeading].join("");
  const filterSection = [styles.filterSection].join("");
  const filterButton = [styles.filterButton].join("");
  const parkingsDiv = [styles.parkingsDiv].join("");
  const parkingDiv = [styles.parkingDiv].join("");
  const parkingInfo = [styles.parkingInfo].join("");
  const parkingStatus = [styles.parkingStatus].join("");
  const parkingStatusColor = [styles.parkingStatusColor].join("");
  const parkingStatusText = [styles.parkingStatusText].join("");
  const dropDown = [styles.dropDown].join(" ");
  const dropDownItems = [styles.dropDownItems].join("");
  const dropDownItemsText = [styles.dropDownItemsText].join("");
  const filterEmpty = [styles.filterEmpty].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={mainHeader}>
        <h2 className={mainHeading}>Parking Spots</h2>
        <div className={filterSection}>
          <button className={filterButton} onClick={toggleDropdown}>
            FILTER
          </button>
          <ul className={dropDown} id="filterDropDown">
            {filterOptions.map((option) => (
              <li
                key={option.value}
                className={dropDownItems}
                onClick={() => handleFilter(option.value)}
              >
                <div className={dropDownItemsText}> {option.label}</div>
                {selectedFilter === option.value && (
                  <img src="public/icons/tick.png" alt="tickmark" />
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={parkingsDiv}>
        <ul>
          {filteredParkings.length === 0 && (
            <h2 className={filterEmpty}>No Parkings Found</h2>
          )}
          {filteredParkings.map((parking, index) => (
            <li key={index}>
              <div className={parkingDiv}>
                <div className={parkingInfo}>
                  <span>Parking No - {parking.parkingNumber}</span>
                  <span>
                    <strong>Near - </strong> {parking.nearBy}
                  </span>
                </div>

                <div className={parkingStatus}>
                  <div
                    className={parkingStatusColor}
                    style={{
                      backgroundColor:
                        parking.parkingStatus === "available"
                          ? "#00ff00"
                          : parking.parkingStatus === "parked"
                          ? "#000000"
                          : parking.parkingStatus === "booked"
                          ? "#ffff00"
                          : "#ff0000",
                    }}
                  ></div>
                  <div className={parkingStatusText}>
                    {parking.parkingStatus}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Parkings;
