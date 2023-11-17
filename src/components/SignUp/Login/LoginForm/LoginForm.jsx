import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
// import { useTimer } from "react-timer-hook";
import "../../../../css/form.css";

const LoginForm = () => {
  // ---------------------------- SERVER URL CONFIGURATION ----------------------------

  const SERVER_URL = import.meta.env.VITE_BACKEND_SERVER_URL;

  const otpRequestURL = SERVER_URL + "/api/user/login/mail";
  const otpVerifyURL = SERVER_URL + "/api/user/verify/mail";

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  // ---------------------------- STATE ----------------------------

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailValidated, setEmailValidated] = useState(true);
  const [otpValidated, setOTPValidated] = useState(true);
  const [otpSent, setOTPSent] = useState(false);

  // ---------------------------- FUNCTIONS ----------------------------

  const validateEmail = () => {
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

  const validateOTP = () => {
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

      if (validateEmail()) {
        const response = await axios.post(otpRequestURL, data);

        if (response.status === 200) {
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

      if (validateEmail() && validateOTP()) {
        const data = {
          email: email,
          otpValue: otp,
        };

        const response = await axios.post(otpVerifyURL, data);

        if (response.status === 200) {
          localStorage.setItem("jwtToken", response.data.token);
          localStorage.setItem("jwtRefreshToken", response.data.refreshToken);
          toast.success("Login successful");
          navigate("/");
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

  const form = `form`;
  const input = `input`;
  const inputDiv = `inputDiv`;
  const button = `button`;
  const errorMessage = `errorMessage`;

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

// ---------------------------- EXPORT ----------------------------

export default LoginForm;
