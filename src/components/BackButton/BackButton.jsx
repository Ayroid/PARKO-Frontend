import styles from "./BackButton.module.css";
import { useNavigate } from "react-router";
import PropTypes from "prop-types";

const BackButton = ({ pageName, navigateTo }) => {
  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  const goBack = () => {
    navigate(navigateTo);
  };

  // ---------------------------- CSS ----------------------------

  const backArrow = [styles.backArrow].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={backArrow}>
      <img src="/icons/backArrow.png" alt="backArrow" onClick={goBack} />
      <h3>{pageName}</h3>
    </div>
  );
};

// ---------------------------- PROPS ----------------------------

BackButton.propTypes = {
  pageName: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

// ---------------------------- EXPORT ----------------------------

export default BackButton;
