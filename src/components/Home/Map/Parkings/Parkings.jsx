import styles from "./Parkings.module.css";
import { useState } from "react";
import { useMapData } from "../../../../utils/MapDataContext";

// import ConfirmParkingButton from "./ConfirmParkingButton/ConfirmParkingButton";

const Parkings = () => {
  // ---------------------------- USE CONTEXT ----------------------------

  const { parkingCoordinates } = useMapData();

  // ---------------------------- STATE ----------------------------

  const [isOpen, setIsOpen] = useState(false);
  const [parkingsOpen, setParkingsOpen] = useState(false);
  const [selectedFilter1, setSelectedFilter1] = useState("none");
  const [selectedFilter2, setSelectedFilter2] = useState("none");

  // ---------------------------- FILTER LOGIC ----------------------------

  const filterOptions1 = [
    { label: "None", value: "none" },
    { label: "Available", value: "available" },
    { label: "Parked", value: "parked" },
    { label: "Booked", value: "booked" },
    { label: "Unavailable", value: "unavailable" },
  ];

  const filterOptions2 = [
    { label: "None", value: "none" },
    { label: "Library Front", value: "Library Front" },
    { label: "Library Back", value: "Library Back" },
    { label: "Guest House", value: "Guest House" },
    { label: "10th Block", value: "10th Block" },
    { label: "11th Block", value: "11th Block" },
  ];

  const handleFilter1 = (filterValue) => {
    setSelectedFilter1(filterValue);
    toggleDropdown();
  };

  const handleFilter2 = (filterValue) => {
    setSelectedFilter2(filterValue);
    toggleDropdown();
  };

  const applyFilters = () => {
    return parkingCoordinates.filter((parking) => {
      const filter1Passed =
        selectedFilter1 === "none" || parking.parkingStatus === selectedFilter1;

      const filter2Passed =
        selectedFilter2 === "none" || parking.nearBy === selectedFilter2;

      return filter1Passed && filter2Passed;
    });
  };

  const filteredParkings = applyFilters();

  // ---------------------------- DROPDOWN ----------------------------

  const openDropDown = () => {
    const dropDown = document.getElementById("filterDiv");
    const showParkingsArrow = document.getElementById("showParkings");
    showParkingsArrow.style.transform = "rotate(180deg)";
    showParkingsArrow.classList.remove(styles.arrowAnimation);
    dropDown.style.display = "flex";
    dropDown.classList.remove(styles.dropDownAnimationReverse);
    dropDown.classList.add(styles.dropDownAnimation);
  };

  const closeDropDown = () => {
    const dropDown = document.getElementById("filterDiv");
    const showParkingsArrow = document.getElementById("showParkings");
    dropDown.classList.remove(styles.dropDownAnimation);
    dropDown.classList.add(styles.dropDownAnimationReverse);
    showParkingsArrow.style.transform = "rotate(0deg)";
    showParkingsArrow.classList.add(styles.arrowAnimation);
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
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // ---------------------------- SHOW PARKINGS ----------------------------

  const toggleParkings = () => {
    if (parkingsOpen) {
      hideParkings();
    } else {
      displayParkings();
    }
  };

  const displayParkings = () => {
    const mainHeaderBody = document.getElementById("mainHeaderBody");
    const parkingsDiv = document.getElementById("parkingsDiv");
    const mainDiv = document.getElementById("mainDiv");
    const fadeBg = document.getElementById("fadeBg");
    mainDiv.classList.remove(styles.hideParkingAnimation);
    mainDiv.style.zIndex = 10;
    mainDiv.classList.add(styles.showParkingsAnimation);
    mainHeaderBody.style.display = "flex";
    parkingsDiv.style.display = "block";
    setParkingsOpen((prevParkingsOpen) => !prevParkingsOpen);
    setTimeout(() => {
      fadeBg.style.display = "block";
      mainDiv.style.height = "90dvh";
    }, 300);
  };

  const hideParkings = () => {
    const mainHeaderBody = document.getElementById("mainHeaderBody");
    const parkingsDiv = document.getElementById("parkingsDiv");
    const mainDiv = document.getElementById("mainDiv");
    const fadeBg = document.getElementById("fadeBg");
    mainDiv.classList.remove(styles.showParkingsAnimation);
    mainDiv.classList.add(styles.hideParkingAnimation);
    mainDiv.style.height = "10dvh";
    setParkingsOpen((prevParkingsOpen) => !prevParkingsOpen);
    setTimeout(() => {
      fadeBg.style.display = "none";
      mainHeaderBody.style.display = "none";
      parkingsDiv.style.display = "none";
      mainDiv.style.zIndex = 0;
    }, 300);
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const fadedBg = [styles.fadedBg].join("");
  const showParkings = `${styles.showParkings} ${styles.arrowAnimation}`;
  const mainHeader = [styles.mainHeader].join("");
  const mainHeaderBody = [styles.mainHeaderBody].join("");
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
  const filterDropDownDiv = [styles.filterDropDown].join("");
  const filterDiv = [styles.filterDiv].join("");
  const filterHeader = [styles.filterHeader].join("");
  const filterInnerDiv = [styles.filterInnerDiv].join("");
  const middleLine = [styles.middleLine].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv} id="mainDiv">
      <div className={fadedBg} id="fadeBg"></div>
      <div className={mainHeader}>
        <img
          src="/icons/upArrow.png"
          alt="ShowParkings"
          id="showParkings"
          className={showParkings}
          onClick={() => toggleParkings()}
        />
        <div className={mainHeaderBody} id="mainHeaderBody">
          <h2 className={mainHeading}>Parking Spots</h2>
          <div className={filterSection}>
            <img
              className={filterButton}
              onClick={toggleDropdown}
              src="/icons/filter.png"
              alt="Filter"
            />
            <div className={filterDropDownDiv}>
              <div className={filterDiv} id="filterDiv">
                <div className={filterInnerDiv}>
                  <h2 className={filterHeader}>Location</h2>
                  <ul className={dropDown}>
                    {filterOptions2.map((option) => (
                      <li
                        key={option.value}
                        className={dropDownItems}
                        onClick={() => handleFilter2(option.value)}
                      >
                        <div className={dropDownItemsText}> {option.label}</div>
                        {selectedFilter2 === option.value && (
                          <img src="/icons/tick.png" alt="tickmark" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={middleLine}></div>

                <div className={filterInnerDiv}>
                  <h2 className={filterHeader}>Availability</h2>
                  <ul className={dropDown}>
                    {filterOptions1.map((option) => (
                      <li
                        key={option.value}
                        className={dropDownItems}
                        onClick={() => handleFilter1(option.value)}
                      >
                        <div className={dropDownItemsText}> {option.label}</div>
                        {selectedFilter1 === option.value && (
                          <img src="/icons/tick.png" alt="tickmark" />
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={parkingsDiv} id="parkingsDiv">
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
                          ? "#00c8ff"
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
