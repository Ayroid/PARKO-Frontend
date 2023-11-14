import styles from "./Logout.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Logout = ({ updateLogout }) => {
  // ---------------------------- SERVER URL CONFIGURATION ----------------------------

  const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  // ---------------------------- FUNCTIONS ----------------------------

  const closePopUp = () => {
    updateLogout(false);
  };

  const logout = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    const logoutURL = SERVER_URL + "/api/user/logout";
    await axios
      .post(
        logoutURL,
        {},
        {
          headers: {
            Authorization: jwtToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        localStorage.removeItem("jwtToken");
        toast.success("Logout Successful!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error while Loggin Out!");
      });
    navigate("/");
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const outerDiv = `${styles.outerDiv} ${styles.popupAnimation}}`;
  const heading = [styles.heading].join("");
  const buttons = [styles.buttons].join("");
  const button = [styles.button].join("");

  return (
    <div className={mainDiv} onClick={closePopUp}>
      <div className={outerDiv} id="outerDiv">
        <div className={heading}>
          Are you sure you want to logout from Parko?
        </div>
        <div className={buttons}>
          <div className={button} onClick={closePopUp}>
            CANCEL
          </div>
          <div className={button} onClick={logout}>
            CONFIRM
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

Logout.propTypes = {
  updateLogout: PropTypes.func.isRequired,
};

export default Logout;
