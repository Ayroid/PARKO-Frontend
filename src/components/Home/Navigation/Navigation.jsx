import { Link } from "react-router-dom";
import styles from "./Navigation.module.css";

const Navigation = () => {
  // ---------------------------- CSS ----------------------------

  const navigation = [styles.navigation].join("");
  const navItems = [styles.navItems].join("");

  // ---------------------------- JSX ----------------------------

  return (
    // <div className="bg-orange-500 p-5 pb-1 text-white font-Nunito font-bold">
    <div className={navigation}>
      <nav>
        <ul className={navItems}>
          <li>
            <Link to="/home">Home</Link>
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

export default Navigation;
