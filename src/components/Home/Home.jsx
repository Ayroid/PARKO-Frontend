import Map from "./Map/Map";
import Parkings from "./Parking/Parking";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";

import styles from "./Home.module.css";

const Home = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <Header />
      <Navigation />
      <Map />
      <Parkings />
    </div>
  );
};

export default Home;
