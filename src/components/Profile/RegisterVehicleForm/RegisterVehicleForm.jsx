import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./RegisterVehicleForm.module.css";
import "../../../css/form.css";

const RegisterVehicleForm = ({ closeVehicleRegistrationForm }) => {
  // ---------------------------- SERVER URL CONFIGURATION ----------------------------

  const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;
  const registerVehicleURL = SERVER_URL + "/api/user/vehicle/registerVehicle";

  // ---------------------------- STATE ----------------------------

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [brandValidated, setBrandValidated] = useState(true);
  const [modelValidated, setModelValidated] = useState(true);
  const [vehicleNumberValidated, setVehicleNumberValidated] = useState(true);

  // ---------------------------- FUNCTIONS ----------------------------

  const closeForm = () => {
    const outerDiv = document.getElementById("outerDiv");
    const mainDiv = document.getElementById("mainDiv");
    mainDiv.classList.remove(`${styles.slideUp}`);
    mainDiv.classList.add(`${styles.slideDown}`);
    outerDiv.classList.remove(`${styles.fadeBgColor}`);
    setTimeout(() => {
      closeVehicleRegistrationForm(false);
    }, 300);
  };

  // ---------------------------- VALIDATION ----------------------------

  const validateBrand = () => {
    const value = brand;
    if (value !== null && value !== "") {
      setBrandValidated(true);
      return true;
    } else {
      setBrandValidated(false);
      return false;
    }
  };

  const validateModel = () => {
    const value = model;
    if (value !== null && value !== "") {
      setModelValidated(true);
      return true;
    } else {
      setModelValidated(false);
      return false;
    }
  };

  const validateVehicleNumber = () => {
    const value = vehicleNumber;
    if (value !== null && value !== "") {
      setVehicleNumberValidated(true);
      return true;
    } else {
      setVehicleNumberValidated(false);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      if (validateBrand() && validateModel() && validateVehicleNumber()) {
        const data = {
          brand: brand,
          model: model,
          vehicleNumber: vehicleNumber,
        };

        const jwtToken = localStorage.getItem("jwtToken");

        const response = await axios.post(registerVehicleURL, data, {
          headers: {
            Authorization: jwtToken,
          },
        });

        if (response.status === 201) {
          console.log("Vehicle Registered Successfully!");
          toast.success("Vehicle Registered Successfully!");
        }
      } else {
        console.log("Vehicle Registration Failed!");
        toast.error("Vehicle Registration Failed!");
      }
    } catch (err) {
      console.log(err);
      toast.error("Vehicle Registration Failed!");
    }
  };

  // ---------------------------- CSS ----------------------------

  const outerDiv = `${styles.outerDiv} ${styles.fadeBgColor}`;
  const bgDiv = `${styles.bgDiv} ${styles.fadeIn}`;
  const mainDiv = `${styles.mainDiv} ${styles.slideUp}`;
  const headerDiv = [styles.headerDiv].join("");
  const closeButton = [styles.closeButton].join("");
  const errorMessage = `errorMessage`;
  const form = `form + ${styles.customInputDiv}`;
  const inputDiv = `inputDiv`;
  const input = `input`;
  const button = `button`;

  // ---------------------------- JSX ----------------------------

  return (
    <div className={outerDiv} id="outerDiv">
      <div
        className={bgDiv}
        onClick={() => {
          closeForm();
        }}
      ></div>
      <div className={mainDiv} id="mainDiv">
        <div className={headerDiv}>Register Vehicle</div>
        <div
          className={closeButton}
          onClick={() => {
            closeForm();
          }}
        >
          <img src="public/icons/cross.png" alt="close" />
        </div>
        <form className={form} onSubmit={handleSubmit}>
          <div className={inputDiv}>
            <input
              className={input}
              id="brand"
              type="text"
              placeholder="BRAND"
              value={brand}
              onChange={(event) => setBrand(event.target.value)}
              required
            />
            {!brandValidated && (
              <span className={errorMessage}>Invalid Brand</span>
            )}
          </div>
          <div className={inputDiv}>
            <input
              className={input}
              id="model"
              type="text"
              placeholder="MODEL"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              required
            />
            {!modelValidated && (
              <span className={errorMessage}>Invalid Model</span>
            )}
          </div>
          <div className={inputDiv}>
            <input
              className={input}
              id="vehicleNumber"
              type="text"
              placeholder="VEHICLE NUMBER"
              value={vehicleNumber}
              onChange={(event) => setVehicleNumber(event.target.value)}
              required
            />
            {!vehicleNumberValidated && (
              <span className={errorMessage}>Invalid Vehicle Number</span>
            )}
          </div>
          <button className={button} type="submit">
            SUBMIT
          </button>
        </form>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

// ---------------------------- PROPS ----------------------------

RegisterVehicleForm.propTypes = {
  closeVehicleRegistrationForm: PropTypes.func,
};

// ---------------------------- EXPORT ----------------------------

export default RegisterVehicleForm;
