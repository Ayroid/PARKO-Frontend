import PropTypes from "prop-types";
import styles from "./Cars.module.css";

const Cars = ({ data }) => {
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
          {data.map((vehicle, index) => (
            <div key={index} className={cars}>
              <div className={carParking}>
                <img src="public/icons/cars/greycar.png" alt="car.jpg" />
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

// ---------------------------- PROPS ----------------------------

Cars.propTypes = {
  data: PropTypes.array.isRequired,
};

export default Cars;
