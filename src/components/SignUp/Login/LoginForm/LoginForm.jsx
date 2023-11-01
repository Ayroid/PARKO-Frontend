import { useRef, useState } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const serverURL = "https://parko.studio/api/user/test";

const LoginForm = () => {
  // ---------------------------- FORM VALIDATION ----------------------------

  // useRef() Hooks to handle form data
  const emailRef = useRef("");
  const otpRef = useRef("");

  // useState() Hooks to handle form validation
  const [emailValidated, setEmailValidated] = useState(false);
  const [otpValidated, setOtpValidated] = useState(false);

  // Function to check if email is valid
  const checkEmailRef = () => {
    const current = emailRef.current;
    const value = emailRef.current.value;
    if (
      current !== null &&
      value !== "" &&
      value.includes("@") &&
      value.includes(".")
    ) {
      setEmailValidated(true);
    } else {
      setEmailValidated(false);
    }
  };

  // Function to check if otp is valid
  const checkOTP = () => {
    const current = otpRef.current;
    const value = otpRef.current.value;
    if (
      current !== null &&
      value !== "" &&
      value.length === 6 &&
      Number.isInteger(parseFloat(value))
    ) {
      setOtpValidated(true);
    } else {
      setOtpValidated(false);
      console.log(Number.isInteger(parseFloat(value)))
    }
  };

  // ---------------------------- FORM SUBMITTION ----------------------------

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      checkEmailRef();
      checkOTP();
      console.log("emailValidated:", emailValidated);
      console.log("otpValidated:", otpValidated);
      const data = {
        email: emailRef.current.value,
        otpValue: otpRef.current.value,
      };
      if (emailValidated && otpValidated) {
        console.log("data:", data);
        const response = await axios.post(serverURL, data);

        if (response.status === 200) {
          console.log("Login successful:", response.data);
          toast.success("Login successful");
        } else {
          console.error("Login failed:", response.status);
          toast.error("Login failed");
        }
      }
    } catch (error) {
      console.error("Error sending Login request:", error);
    }
  };

  // ---------------------------- CSS ----------------------------

  const form = [styles.form].join("");
  const input = [styles.input].join("");
  const inputDiv = [styles.inputDiv].join("");
  const button = [styles.button].join("");
  const forgotPassword = [styles.forgotPassword].join("");
  const errorMessage = [styles.errorMessage].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div>
      <form className={form} onSubmit={handleSubmit}>
        <div className={inputDiv}>
          <input
            className={input}
            id="email"
            type="email"
            placeholder="EMAIL"
            ref={emailRef}
            required
          />
          {!emailValidated && (
            <span className={errorMessage}>Invalid Email</span>
          )}
        </div>
        <div className={inputDiv}>
          <input
            className={input}
            id="otpValue"
            type="text"
            placeholder="OTP"
            maxLength={6}
            ref={otpRef}
          />
          {!otpValidated && <span className={errorMessage}>Invalid OTP</span>}
        </div>
        <button className={button}>SEND OTP</button>
        <div className={forgotPassword}>Don't have an account? Sign Up</div>
      </form>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default LoginForm;
