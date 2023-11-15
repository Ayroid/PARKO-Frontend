import { useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { useTimer } from "react-timer-hook";

// ---------------------------- SERVER URL CONFIGURATION ----------------------------

const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

const otpRequestURL = SERVER_URL + "/api/user/login/mail";
const otpVerifyURL = SERVER_URL + "/api/user/verify/mail";

const LoginForm = () => {
  // ---------------------------- FORM VALIDATION ----------------------------

  // useNavigate() hook to navigate to different pages
  const navigate = useNavigate();

  // useState() Hooks to handle form validation
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailValidated, setEmailValidated] = useState(true);
  const [otpValidated, setOTPValidated] = useState(true);
  const [otpSent, setOTPSent] = useState(false);

  // Function to check if email is valid
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

  // Function to check if otp is valid
  const checkOTP = () => {
    console.log("OTP CALLED");
    const value = otp;
    if (
      value !== null &&
      value !== "" &&
      value.length === 6 &&
      Number.isInteger(parseFloat(value))
    ) {
      setOTPValidated(true);
      return true;
    } else {
      setOTPValidated(false);
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

  const handleOTPRequest = async (event) => {
    try {
      event.preventDefault();
      const data = {
        email: email,
      };

      if (checkEmailRef()) {
        const response = await axios.post(otpRequestURL, data);

        console.log(response);

        if (response.status === 200) {
          console.log("Login successful:", response.data);
          setOTPSent(true);
          toast.success("Login OTP sent successfully");
        } else if (response.status === 404) {
          setOTPSent(false);
          toast.error("User Not Registered!");
        }
      }
    } catch (error) {
      console.error("Error sending Login request:", error);
      toast.error("Error getting OTP!");
    }
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const data = {
        email: email,
        otpValue: otp,
      };

      console.log(data);

      if (checkEmailRef() && checkOTP()) {
        console.log("Sending Login request");
        const response = await axios.post(otpVerifyURL, data);

        if (response.status === 200) {
          console.log("Login successful:", response.data);
          localStorage.setItem("jwtToken", response.data.token);
          toast.success("Login successful");
          navigate("/home");
        } else {
          console.error("Login failed:", response.status);
          toast.error("Login failed");
        }
      }
    } catch (error) {
      console.error("Error sending Login request:", error);
      toast.error("Login failed");
    }
  };

  // ---------------------------- CSS ----------------------------

  const form = [styles.form].join("");
  const input = [styles.input].join("");
  const inputDiv = [styles.inputDiv].join("");
  const button = [styles.button].join("");
  const errorMessage = [styles.errorMessage].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div>
      {!otpSent ? (
        <form className={form} onSubmit={handleOTPRequest}>
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
          <button className={button}>SEND OTP</button>
        </form>
      ) : (
        <form className={form} onSubmit={handleFormSubmit}>
          <div className={inputDiv}>
            <input
              className={input}
              id="email"
              type="email"
              placeholder="EMAIL"
              value={email}
              required
              disabled
            />
          </div>

          <div className={inputDiv}>
            <input
              className={input}
              id="otpValue"
              type="text"
              placeholder="OTP"
              maxLength={6}
              value={otp}
              onChange={(event) => setOtp(event.target.value)}
            />
            {!otpValidated && <span className={errorMessage}>Invalid OTP</span>}
          </div>

          {/* <div className="flex justify-between">
            <h4 className="text-sm text-yellow-400 text-left">
              Re-Send OTP in <span>{seconds} seconds</span>
            </h4>
            <button
              className="text-black border-none text-sm focus:text-black"
              onClick={handleOTPRequest}
            >
              Send OTP
            </button>
          </div> */}

          <button className={button}>LOGIN</button>
        </form>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginForm;
