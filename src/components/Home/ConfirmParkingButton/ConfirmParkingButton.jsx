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
                backgroundColor:
                  parkingStatus === "available"
                    ? "#00ff00"
                    : parkingStatus === "parked"
                    ? "#000000"
                    : parkingStatus === "booked"
                    ? "#00c8ff"
                    : "#ff0000",
              }}
            ></div>
            <h3 className={parkingSubInfoText}>
              {parkingStatus === "booked" && user === currentlyParkedUser
                ? `${parkingStatus} (You)`
                : parkingStatus}
            </h3>
          </div>
          <div className={parkingSubInfoDiv}>
            <img src="/icons/location.png" alt="location" />
            <h4 className={parkingSubInfoText}>{nearBy}</h4>
          </div>
        </div>
      </div>
      {!userAlreadyBooked && (
        <button
          className={bookingButton}
          onClick={() => bookSpot(parkingNumber)}
        >
          Book Now
        </button>
      )}
      {parkingStatus === "booked" && user === currentlyParkedUser && (
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
