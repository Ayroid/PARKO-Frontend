import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  // ---------------------------- CSS ----------------------------

  const navigation = [styles.navigation].join("");
  const navItems = [styles.navItems].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={navigation}>
      <nav>
        <ul className={navItems}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/history">History</Link>
          </li>
          <li>
            <Link to="/tools">Tools</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Navigation;
