import styles from "./Parking.module.css";

const Parkings = () => {
  // dummy data
  const parkingData = [
    { parkingNo: 1, parkingBlock: "A", status: "available" },
    { parkingNo: 2, parkingBlock: "B", status: "available" },
    { parkingNo: 3, parkingBlock: "C", status: "available" },
    { parkingNo: 4, parkingBlock: "D", status: "available" },
    { parkingNo: 5, parkingBlock: "E", status: "available" },
    { parkingNo: 4, parkingBlock: "D", status: "available" },
    { parkingNo: 4, parkingBlock: "D", status: "available" },
  ];

  // ---------------------------- CSS ----------------------------

  const mainDiv = [styles.mainDiv].join("");
  const mainHeader = [styles.mainHeader].join("");
  const mainHeading = [styles.mainHeading].join("");
  const filterButton = [styles.filterButton].join("");
  const parkingDiv = [styles.parkingDiv].join("");

  // ---------------------------- JSX ----------------------------

  return (
    <div className={mainDiv}>
      <div className={mainHeader}>
        <h2 className={mainHeading}>Parking Spots</h2>
        <div className={filterButton}>FILTER</div>
      </div>

      {/* <div className=" max-h-60 overflow-y-auto pr-4 "> */}
      <div className={parkingDiv}>
        <ul>
          {parkingData.map((parking, index) => (
            <li key={index} className="pb-3">
              <div className="flex justify-between items-center group hover:bg-gray-100 rounded">
                <div>
                  <span className="font-bold">
                    Parking No: {parking.parkingNo}
                  </span>{" "}
                  <br />
                  <span className="text-sm">Block: {parking.parkingBlock}</span>
                </div>

                <div className="flex gap-5 items-center">
                  <div className="bg-green-500 h-2 w-2 rounded"></div>
                  <div className="font-bold">{parking.status}</div>
                </div>
              </div>
              <div className="bg-gray-200 h-1 w-full"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Parkings;
