import React, { useState } from "react";
import logo from "../../../assets/parko_logo.png";
import { useTimer } from "react-timer-hook";
import axios from "axios";

import LoginForm from "./LoginForm/LoginForm";
import FormContent from "./FormContent/FormContent";

import styles from "./Login.module.css";

const loginPageMainDiv = [styles.loginPageMainDiv].join("");
const formContentDiv = [styles.formContentDiv].join("");
const loginFormDiv = [styles.loginFormDiv].join("");

import { useNavigate } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    otpValue: "",
  });

  const navigate = useNavigate();

  const [otpFieldDisabled, setOtpFieldDisabled] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle validation for otpValue based on its type
    if (name === "otpValue") {
      // Parse the input value as an integer (number)
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://parko.studio/api/user/verify/mail",
        formData
      );

      if (response.status === 200) {
        console.log("Login successful:", response.data);
        toast.success("Login successful");
        navigate("/home");
      } else {
        console.error("Login failed:", response.status);
        toast.error("Login failed");
      }
    } catch (error) {
      console.error("Error sending Login request:", error);
    }
  };

  const sendUsernameToBackend = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://parko.studio/api/user/login/mail",
        formData
      );

      if (response.status === 200) {
        console.log("OTP request successful:", response.data);
        toast.success("OTP SENT");
      }
    } catch (error) {
      console.error("Error sending OTP request:", error);
      toast.error("Error sending OTP request");
    }

    setOtpFieldDisabled(false);
  };

  const { seconds } = useTimer({
    expiryTimestamp: Date.now() + 60 * 1000,
    onExpire: () => {
      console.warn("Expire timer expired");
    },
  });

  return (
    <div className={loginPageMainDiv}>
      <div className={formContentDiv}>
        <FormContent />
      </div>
      <div className={loginFormDiv}>
        <LoginForm />
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
};

export default Login;
