import Map from "./Map/Map";
import Parkings from "./Parking/Parking";
import Header from "./Header/Header";
import Navigation from "./Navigation/Navigation";
import UserProfile from "../UserProfile/UserProfile";

const Home = () => {
  return (
    <div>
      <UserProfile />
      <Header />
      <Navigation />
      <Map />
      <Parkings />
    </div>
  );
};

export default Home;
