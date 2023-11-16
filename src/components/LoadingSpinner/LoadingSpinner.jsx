import styles from "./LoadingSpinner.module.css";

const LoadingSpinner = () => {
  // ---------------------------- CSS ----------------------------

  const loadingSpinnerContainer = [styles.loadingSpinnerContainer].join("");
  const loadingSpinner = [styles.loadingSpinner].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={loadingSpinnerContainer}>
      <div className={loadingSpinner}></div>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default LoadingSpinner;
