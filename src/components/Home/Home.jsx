import Map from "./Map/Map";
import Parkings from "./Parking/Parking";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";

const Home = () => {
  return (
    <>
      <Header />
      <Navigation />
      {/* <Map /> */}
      <Parkings />
    </>
  );
};

export default Home;
