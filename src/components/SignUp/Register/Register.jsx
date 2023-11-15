import PropTypes from "prop-types";
import FormContent from "./FormContent/FormContent";
import RegisterForm from "./RegisterForm/RegisterForm";

import styles from "./Register.module.css";

const Register = ({ changePage }) => {
  const submitForm = (value) => {
    changePage(value);
  };

  // ---------------------------- CSS ----------------------------

  const loginPageMainDiv = [styles.loginPageMainDiv].join("");
  const formContentDiv = [styles.formContentDiv].join("");
  const loginFormDiv = [styles.loginFormDiv].join("");
  const forgotPassword = [styles.forgotPassword].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={loginPageMainDiv}>
      <div className={formContentDiv}>
        <FormContent />
      </div>

      <div className={loginFormDiv}>
        <RegisterForm submitForm={submitForm} />
        <div className={forgotPassword}>
          Already have an account?&nbsp;
          <span style={{ color: "#7dabff" }} onClick={() => changePage(true)}>
            Login
          </span>
        </div>
      </div>
      {/* <ToastContainer position="top-center" /> */}
    </div>
  );
};

Register.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default Register;
