// import { useState } from "react";
import PropTypes from "prop-types";

import FormContent from "./FormContent/FormContent";
import LoginForm from "./LoginForm/LoginForm";

import styles from "./Login.module.css";

const loginPageMainDiv = [styles.loginPageMainDiv].join("");
const formContentDiv = [styles.formContentDiv].join("");
const loginFormDiv = [styles.loginFormDiv].join("");
const forgotPassword = [styles.forgotPassword].join("");

// import { toast, ToastContainer } from "react-toastify";

const Login = ({ changePage }) => {
  return (
    <div className={loginPageMainDiv}>
      <div className={formContentDiv}>
        <FormContent />
      </div>

      <div className={loginFormDiv}>
        <LoginForm />
        <div className={forgotPassword}>
          Don&rsquo;t have an account?&nbsp;
          <span style={{ color: "#7dabff" }} onClick={() => changePage(false)}>
            Sign Up
          </span>
        </div>
      </div>
      {/* <ToastContainer position="top-center" /> */}
    </div>
  );
};

Login.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default Login;
