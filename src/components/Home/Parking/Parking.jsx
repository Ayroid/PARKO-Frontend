
import styles from "./Parking.module.css";
import { useState } from "react";
import { useMapData } from "../../../utils/MapDataContext";

const Parkings = () => {
  const { parkingCoordinates } = useMapData();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all'); // Default to 'all'

  const filterOptions = [
    { label: 'ALL', value: 'all' },
    { label: 'Unavailable', value: 'unavailable' },
    { label: 'Booked', value: 'booked' },
    { label: 'Parked', value: 'parked' },
  ];

  const handleFilter = (filterValue) => {
    setSelectedFilter(filterValue);
    setIsOpen(false);
  };

  const filteredParkings = selectedFilter === 'all'
    ? parkingCoordinates
    : parkingCoordinates.filter(parking => parking.parkingStatus === selectedFilter);

  const mainDiv = [styles.mainDiv].join("");
  const mainHeader = [styles.mainHeader].join("");
  const mainHeading = [styles.mainHeading].join("");
  const filterButton = [styles.filterButton].join("");
  const parkingsDiv = [styles.parkingsDiv].join("");
  const parkingDiv = [styles.parkingDiv].join("");
  const parkingInfo = [styles.parkingInfo].join("");
  const parkingStatus = [styles.parkingStatus].join("");
  const parkingStatusColor = [styles.parkingStatusColor].join("");
  const parkingStatusText = [styles.parkingStatusText].join("");
  const dropDown = [styles.dropDown].join(" ");
  const dropDownItems = [styles.dropDownItems].join("");

  return (
    <div className={mainDiv}>
      <div className={mainHeader}>
        <h2 className={mainHeading}>Parking Spots</h2>
        <div className={filterButton} onClick={() => setIsOpen(!isOpen)}>
          FILTER
        </div>

        {isOpen && (
          <ul className={dropDown}>
            {filterOptions.map((option) => (
              <li key={option.value} className={dropDownItems} onClick={() => handleFilter(option.value)}>
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={parkingsDiv}>
        <ul>
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
