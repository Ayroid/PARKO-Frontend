import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  // ---------------------------- CSS ----------------------------

  const loadingSpinnerContainer = [styles.loadingSpinnerContainer].join("");
  const loadingOuter = [styles.loadingOuter].join("");
  const loadingInner = [styles.loadingInner].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={loadingSpinnerContainer}>
      <div className={loadingOuter}>
        <div className={loadingInner}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default LoadingSpinner;
