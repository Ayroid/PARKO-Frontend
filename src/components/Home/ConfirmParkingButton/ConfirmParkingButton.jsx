// import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./ConfirmParkingButton.module.css";

const ConfirmParkingButton = ({
  parkingData,
  bookSpot,
  cancelSpot,
  userAlreadyBooked,
}) => {
  // ---------------------------- DATA EXTRACTION ----------------------------

  const { parkingNumber, parkingStatus, nearBy, currentlyParkedUser } =
    parkingData;
  const user = localStorage.getItem("user");

  // ---------------------------- STATE ----------------------------
  //   const [isOpen, setIsOpen] = useState(false);

  // ---------------------------- FUNCTIONS ----------------------------

  const getBackgroundColor = () => {
    switch (parkingStatus) {
      case "available":
        return "#00ff00";
      case "booked":
        return "#00c8ff";
      case "parked":
        return "#000000";
      default:
        return "#ff0000";
    }
  };

  const getStatusText = () => {
    switch (parkingStatus) {
      case "available":
        return "Available";
      case "booked":
        if (user === currentlyParkedUser) {
          return "Your Booking";
        } else {
          return "Booked";
        }
      case "parked":
        if (user === currentlyParkedUser) {
          return "Your Parking";
        } else {
          return "Parked";
        }
      default:
        return "Unavailable";
    }
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const parkingInfoDiv = [styles.parkingInfoDiv].join("");
  const parkingSubInfoDiv = [styles.parkingSubInfoDiv].join("");
  const availabilityStatusColor = [styles.availabilityStatusColor].join("");
  const parkingSubInfoText = [styles.parkingSubInfoText].join("");
  const parkingNumberHeading = [styles.parkingNumberHeading].join("");
  const parkingInfo = [styles.parkingInfo].join("");
  const bookingButton = [styles.bookingButton].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={parkingInfoDiv}>
        <h2 className={parkingNumberHeading}>{parkingNumber}</h2>
        <div className={parkingInfo}>
          <div className={parkingSubInfoDiv}>
            <div
              className={availabilityStatusColor}
              style={{
                backgroundColor: getBackgroundColor(),
              }}
            ></div>
            <h3 className={parkingSubInfoText}>{getStatusText()}</h3>
          </div>
          <div className={parkingSubInfoDiv}>
            <img src="/icons/location.png" alt="location" />
            <h4 className={parkingSubInfoText}>{nearBy}</h4>
          </div>
        </div>
      </div>
      {!userAlreadyBooked &&
        currentlyParkedUser == null &&
        parkingStatus == "available" && (
          <button
            className={bookingButton}
            onClick={() => bookSpot(parkingNumber)}
          >
            Book Now
          </button>
        )}
      {(parkingStatus === "booked" || parkingStatus === "parked") &&
        user === currentlyParkedUser && (
          <button
            className={bookingButton}
            onClick={() => cancelSpot(parkingNumber)}
          >
            Cancel Booking
          </button>
        )}
    </div>
  );
};

// ---------------------------- PROPS ----------------------------

ConfirmParkingButton.propTypes = {
  parkingData: PropTypes.object.isRequired,
  bookSpot: PropTypes.func.isRequired,
  cancelSpot: PropTypes.func.isRequired,
  userAlreadyBooked: PropTypes.bool.isRequired,
};

// ---------------------------- EXPORTS ----------------------------
export default ConfirmParkingButton;
