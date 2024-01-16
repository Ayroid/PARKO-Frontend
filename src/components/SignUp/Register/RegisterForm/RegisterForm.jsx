import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PropTypes from "prop-types";
// import { useTimer } from "react-timer-hook";
import "../../../../css/form.css";

// ---------------------------- SERVER URL CONFIGURATION ----------------------------

const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const userRegisterURL = SERVER_URL + "/api/user/register";

const RegisterForm = ({ submitForm }) => {
  // ---------------------------- STATE ----------------------------

  const [username, setUsername] = useState("");
  const [usernameValidated, setUsernameValidated] = useState(true);
  const [sapid, setSapid] = useState("");
  const [sapidValidated, setSapidValidated] = useState(true);
  const [email, setEmail] = useState("");
  const [emailValidated, setEmailValidated] = useState(true);
  const [phone, setPhone] = useState("");
  const [phoneValidated, setPhoneValidated] = useState(true);

  // ---------------------------- FUNCTIONS ----------------------------

  const checkUsernameRef = () => {
    console.log("USERNAME CALLED");
    const value = username;
    if (value !== null && value !== "" && value.length >= 3) {
      setUsernameValidated(true);
      return true;
    } else {
      setUsernameValidated(false);
      return false;
    }
  };

  const checkEmailRef = () => {
    console.log("EMAIL CALLED");
    const value = email;
    if (
      value !== null &&
      value !== "" &&
      value.includes("@") &&
      value.includes(".")
    ) {
      setEmailValidated(true);
      return true;
    } else {
      setEmailValidated(false);
      return false;
    }
  };

  const checkSapidRef = () => {
    console.log("SAPID CALLED");
    const value = sapid;
    if (
      value !== null &&
      value !== "" &&
      value.length === 9 &&
      Number.isInteger(parseFloat(value))
    ) {
      setSapidValidated(true);
      return true;
    } else {
      setSapidValidated(false);
      return false;
    }
  };

  const checkPhoneRef = () => {
    console.log("PHONE CALLED");
    const value = phone;
    if (
      value !== null &&
      value !== "" &&
      value.length === 10 &&
      Number.isInteger(parseFloat(value))
    ) {
      setPhoneValidated(true);
      return true;
    } else {
      setPhoneValidated(false);
      return false;
    }
  };

  // TIMER HOOK FOR OTP
  // const { seconds } = useTimer({
  //   expiryTimestamp: otpSent ? Date.now() + 60 * 1000 : 0,
  //   onExpire: () => {
  //     console.warn("Expire timer expired");
  //     // Handle what you want to do when the timer expires
  //   },
  // });

  // ---------------------------- FORM SUBMITTION ----------------------------

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        username,
        sapid,
        email,
        phone,
      };

      if (
        checkUsernameRef() &&
        checkEmailRef() &&
        checkSapidRef() &&
        checkPhoneRef()
      ) {
        console.log("Sending User Registration request");
        const response = await axios.post(userRegisterURL, data);

        if (response.status === 201) {
          console.log("Registration successful!:", response.data);
          toast.success("Registration successful!");
          submitForm(true);
        } else {
          console.error("Registration failed!:", response.data);
          toast.error("Registration failed!");
        }
      }
    } catch (error) {
      console.error("Error sending Registration request:", error);
      toast.error("Registration failed!");
    }
  };

  // ---------------------------- CSS ----------------------------

  const form = `form`;
  const input = `input`;
  const inputDiv = `inputDiv`;
  const button = `button`;
  const errorMessage = `errorMessage`;

  // ---------------------------- JSX ----------------------------

  return (
    <div>
      <form className={form} onSubmit={handleFormSubmit}>
        <div className={inputDiv}>
          <input
            className={input}
            id="username"
            type="text"
            placeholder="USERNAME"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
          {!usernameValidated && (
            <span className={errorMessage}>Invalid Username</span>
          )}
        </div>
        <div className={inputDiv}>
          <input
            className={input}
            id="sapid"
            type="text"
            placeholder="SAPID"
            maxLength={9}
            value={sapid}
            onChange={(event) => setSapid(event.target.value)}
            required
          />
          {!sapidValidated && (
            <span className={errorMessage}>Invalid Sap Id</span>
          )}
        </div>
        <div className={inputDiv}>
          <input
            className={input}
            id="email"
            type="email"
            placeholder="EMAIL"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {!emailValidated && (
            <span className={errorMessage}>Invalid Email</span>
          )}
        </div>
        <div className={inputDiv}>
          <input
            className={input}
            id="phone"
            type="text"
            placeholder="PHONE NUMBER"
            maxLength={10}
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
          {!phoneValidated && (
            <span className={errorMessage}>Invalid Phone Number</span>
          )}
        </div>
        <button className={button}>SEND</button>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

// ---------------------------- PROPS ----------------------------

RegisterForm.propTypes = {
  submitForm: PropTypes.func.isRequired,
};

// ---------------------------- EXPORT ----------------------------

export default RegisterForm;
