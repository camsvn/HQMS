import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [time, setTime] = useState(getTime());

  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);

  const logo =
    "https://www.zilliondesigns.com/images/portfolio/healthcare-hospital/iStock-471629610-Converted.png";
  return (
    <nav id="navbar">
      <img src={logo} alt="Hospital Logo" className="logo" />
      <h1 className="title">LEO HOSPITAL</h1>
      <span className="clock-wrapper">
        <span>{time.slice(0, 2)}</span>
        <span>:</span>
        <span>{`${time.slice(3, 6)} ${time.slice(-2)}`}</span>
      </span>
    </nav>
  );
}

function getTime() {
  var time = new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return time;
}
