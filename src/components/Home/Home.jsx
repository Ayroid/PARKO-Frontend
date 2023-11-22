import Map from "./Map/Map";
import Parkings from "./Parking/Parking";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
// import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import styles from "./Home.module.css";

// import { useMapData } from "../../utils/MapDataContext";

const Home = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------
  // const { isLoading } = useMapData();

  // if (isLoading) return <LoadingSpinner />;

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

// ---------------------------- EXPORT ----------------------------

export default Home;
