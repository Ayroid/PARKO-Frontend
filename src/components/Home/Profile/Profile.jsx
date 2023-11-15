import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile = () => {

  // ---------------------------- NAVIGATION ----------------------------

  const navigate = useNavigate();

  // ---------------------------- FUNCTIONS ----------------------------

  const goBack = () => {
    navigate("/");
  };

  const openSettings = () => {
    navigate("/settings");
  };

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");

  const headerDiv = [styles.headerDiv].join("");
  const backArrow = [styles.backArrow].join("");
  const editSettings = [styles.editSettings].join("");

  const profileDiv = [styles.profileDiv].join("");
  const profilePic = [styles.profilePic].join("");
  const profileData = [styles.profileData].join("");
  const profileName = [styles.profileName].join("");
  const profileEmail = [styles.profileEmail].join("");
  const profileSAPID = [styles.profileSAPID].join("");

  const contentDiv = [styles.contentDiv].join("");
  const carsDiv = [styles.carsDiv].join("");
  const cars = [styles.cars].join("");
  const carImage = [styles.carImage].join("");
  const carDetails = [styles.carDetails].join("");
  const addCarDiv = [styles.addCarDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={headerDiv}>
        <div className={backArrow}>
          <img
            src="public/icons/backArrow.png"
            alt="backArrow"
            onClick={goBack}
          />
          <h3>Profile</h3>
        </div>
        <div className={editSettings} onClick={openSettings}>
          <img src="public/icons/pencil.png" alt="edit" />
        </div>
      </div>

      <div className={profileDiv}>
        <div className={profilePic}>
          <img src="public/icons/profileicon.jpg" alt="profile icon" />
        </div>
        <div className={profileData}>
          <div className={profileName}>Ayush Singh Kushwah</div>
          <div className={profileEmail}>ayushsk0000@gmail.com</div>
          <div className={profileSAPID}>500095575</div>
        </div>
      </div>

      <div className={contentDiv}>
        <div className={carsDiv}>
          <div className={cars}>
            <div className={carImage}>
              <img src="public/icons/cars.jpg" alt="car.jpg" />
            </div>
            <div className={carDetails}>
              NUMBER
              <br />
              MODEL
              <br />
              PARKING SLOT
            </div>
          </div>
          <div className={cars}>
            <div className={carImage}>
              <img src="public/icons/cars.jpg" alt="car.jpg" />
            </div>
            <div className={carDetails}>
              NUMBER
              <br />
              MODEL
              <br />
              PARKING SLOT
            </div>
          </div>
        </div>
        <div className={addCarDiv}>
          <img src="public/icons/add.png" alt="addCar" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
