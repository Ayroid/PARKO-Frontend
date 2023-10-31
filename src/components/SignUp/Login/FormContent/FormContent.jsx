import styles from "./FormContent.module.css";
import logo from "../../../../assets/nobgwhitelogo.png";

const FormContent = () => {
  const outerDiv = [styles.outerDiv].join("");
  const loginDiv = [styles.loginDiv].join("");
  const logoDiv = [styles.logoDiv].join("");
  const logoImg = [styles.logoImg].join("");
  const welcomeDiv = [styles.welcomeDiv].join("");
  const welcomeText = [styles.welcomeText].join("");

  return (
    <div className={outerDiv}>
      <div className={loginDiv}>Log In</div>
      <div className={logoDiv}>
        <img className={logoImg} src={logo} alt="logo" />
      </div>
      <div className={welcomeDiv}>Parko ...</div>
      {/* <div className={welcomeText}>Your ultimate parking assistant</div> */}
    </div>
  );
};

export default FormContent;
