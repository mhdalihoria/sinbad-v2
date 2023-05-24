import { styled } from "@mui/material";
import React, { useState, useEffect } from "react";

const TimerCard = styled("div")({
  background: "rgb(242, 242, 242)",
  width: "50px",
  height: "50px",
  boxShadow: "0px 0px 3px 0px rgba(0,0,0,0.75)",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});

const CountDown = ({ direction = "column", offer }) => {
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
        <div style={{display: "flex", gap: "10px", flexDirection: direction}}>
          <TimerCard>
            <div>{timerComponents[0]}</div>
            <span> ايام</span>
          </TimerCard>
          <TimerCard>
            <div>{timerComponents[1]}</div>
            <span> ساعات</span>
          </TimerCard>
          <TimerCard>
            <div>{timerComponents[2]}</div>
            <span> دقائق</span>
          </TimerCard>
          <TimerCard>
            <div>{timerComponents[3]}</div>
            <span> ثوان</span>
          </TimerCard>
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};
export default CountDown;
