import styles from "./Cars.module.css";

import LoadingSpinner from "../../LoadingSpinner/LoadingSpinner";
import { useUserData } from "../../../utils/UserDataContext";

const Cars = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { vehicleData, isLoading } = useUserData();

  if (isLoading) return <LoadingSpinner />;

  // ---------------------------- CSS ----------------------------

  const carsDiv = [styles.carsDiv].join("");
  const innerCarDiv = [styles.innerCarDiv].join("");
  const cars = [styles.cars].join("");
  const carParking = [styles.carParking].join("");
  const carDetails = [styles.carDetails].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <>
      <div className={carsDiv}>
        <h2>Your Vehicles</h2>
        <div className={innerCarDiv}>
          {vehicleData.map((vehicle, index) => (
            <div key={index} className={cars}>
              <div className={carParking}>
                <img src="/icons/cars/greycar.png" alt="car.jpg" />
                <p>{index}</p>
              </div>
              <div className={carDetails}>
                <p>Vehicle No: {vehicle.vehicleNumber}</p>
                <p>Brand: {vehicle.brand}</p>
                <p>Model: {vehicle.model}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

// ---------------------------- EXPORTS ----------------------------

export default Cars;
