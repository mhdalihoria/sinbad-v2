import React, { useState, useEffect } from "react";

const CountDown = () => {
  const calculateTimeLeft = () => {
    let year = new Date().getFullYear();
    const difference = +new Date(`2023-6-1`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(<span>{timeLeft[interval]}</span>);
  });

  return (
    <div>
      {timerComponents.length ? (
        <div>
          <span>{timerComponents[0]} ايام</span> {" - "}
          <span>{timerComponents[1]} (س) : {timerComponents[2]} (د): {timerComponents[3]} (ث)</span>
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};
export default CountDown;
