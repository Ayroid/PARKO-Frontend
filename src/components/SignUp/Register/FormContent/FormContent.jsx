import styles from "./FormContent.module.css";
import logo from "../../../../assets/parko_logo.png";

const FormContent = () => {

  // ---------------------------- CSS ----------------------------

  const outerDiv = [styles.outerDiv].join("");
  const loginDiv = [styles.loginDiv].join("");
  const logoDiv = [styles.logoDiv].join("");
  const logoImg = [styles.logoImg].join("");
  const welcomeDiv = [styles.welcomeDiv].join("");
  // const welcomeText = [styles.welcomeText].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={outerDiv}>
      <div className={loginDiv}>Register</div>
      <div className={logoDiv}>
        <img className={logoImg} src={logo} alt="logo" />
      </div>
      <div className={welcomeDiv}>Parko ...</div>
      {/* <div className={welcomeText}>Your ultimate parking assistant</div> */}
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default FormContent;
