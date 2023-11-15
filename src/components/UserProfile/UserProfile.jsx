import styles from "./UserProfile.module.css";

const UserProfile = () => {
  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const backArrow = [styles.backArrow].join("");
  const backgroundDiv = [styles.backgroundDiv].join("");
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
      <div className={backArrow}>
        <img src="public/icons/backArrow.png" alt="backArrow" />
      </div>
      <div className={backgroundDiv}></div>
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

export default UserProfile;
