import React from "react";
import ReactStopwatch from "react-stopwatch";

function StopWatch({ seconds, minutes, hours }) {
  return (
    <ReactStopwatch
      seconds={seconds}
      minutes={minutes}
      hours={hours}
      onCallback={() => console.log("Finish")}
      render={({ formatted }) => {
        return (
          <div>
            <p>{formatted}</p>
          </div>
        );
      }}
    />
  );
}

export default StopWatch;
