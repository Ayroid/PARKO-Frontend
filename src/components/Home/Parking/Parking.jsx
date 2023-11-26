import styles from "./Parking.module.css";

import { useMapData } from "../../../utils/MapDataContext";

const Parkings = () => {
  // ---------------------------- USE CONTEXT ----------------------------

  const { parkingCoordinates } = useMapData();

  // ---------------------------- CSS ----------------------------

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

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={mainHeader}>
        <h2 className={mainHeading}>Parking Spots</h2>
        <div className={filterButton}>FILTER</div>
      </div>

      <div className={parkingsDiv}>
        <ul>
          {parkingCoordinates.map((parking, index) => (
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

// ---------------------------- EXPORT ----------------------------

export default Parkings;
