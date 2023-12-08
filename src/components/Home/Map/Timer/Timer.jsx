import { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { useMapData } from "../../../../utils/MapDataContext";

const Timer = () => {
  const [remainingTime, setRemainingTime] = useState(15);

  const { reFetchMapData } = useMapData();
  // useEffect to update the remaining time when the interval updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      reFetchMapData(); // Replace this with your logic
      setRemainingTime((prevRemainingTime) => {
        // Update the remaining time based on your interval duration
        const newRemainingTime = prevRemainingTime - 1;
        return newRemainingTime < 0 ? 15 : newRemainingTime; // Reset to 5 when it reaches 0
      });
    }, 15000);

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [reFetchMapData]);

  const timerProps = {
    isPlaying: true,
    duration: remainingTime,
    colors: [["#3498db"]],
    size: 100,
    strokeWidth: 6,
    initialRemainingTime: remainingTime,
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "10rem",
        color: "#3498db",
        fontSize: "2rem",
      }}
    >
      <CountdownCircleTimer
        {...timerProps}
        onComplete={() => {
          // do your stuff here
          return { shouldRepeat: true }; // repeat animation in 1.5 seconds
        }}
      >
        {({ remainingTime }) => <div>{remainingTime}</div>}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
