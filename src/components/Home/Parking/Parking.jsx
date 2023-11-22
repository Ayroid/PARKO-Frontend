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
  const parkingDiv = [styles.parkingDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={mainHeader}>
        <h2 className={mainHeading}>Parking Spots</h2>
        <div className={filterButton}>FILTER</div>
      </div>

      <div className={parkingDiv}>
        <ul>
          {parkingCoordinates.map((parking, index) => (
            <li key={index} className="pb-3">
              <div className="flex justify-between items-center group hover:bg-gray-100 rounded">
                <div>
                  <span className="font-bold">
                    Parking No: {parking.parkingNumber}
                  </span>{" "}
                  <br />
                  <span className="text-sm">NearBy: {parking.nearBy}</span>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="bg-green-500 h-2 w-2 rounded"></div>
                  <div className="font-bold">{parking.parkingStatus}</div>
                </div>
              </div>
              <div className="bg-gray-200 h-1 w-full"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Parkings;
