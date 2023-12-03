import Map from "./Map/Map";
import Header from "./Header/Header";
// import Navigation from "./Navigation/Navigation";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import styles from "./Home.module.css";

import { useMapData } from "../../utils/MapDataContext";

const Home = () => {
  // ---------------------------- DATA EXTRACTION ----------------------------
  const { mapLoading } = useMapData();

  if (mapLoading) return <LoadingSpinner />;

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <Header />
      <Map />
      {/* <Navigation /> */}
    </div>
  );
};

// ---------------------------- EXPORT ----------------------------

export default Home;
