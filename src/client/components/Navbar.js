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
      <img
        src={require("../../../public/img/logo.jpg")}
        alt="Hospital Logo"
        className="logo"
      />
      <h1 className="title">LEO HOSPITAL</h1>
      <div className="clock-wrapper">
        <span>{time.slice(0, 2)}</span>
        <span>:</span>
        <span>{`${time.slice(3, 6)} ${time.slice(-2)}`}</span>
      </div>
    </nav>
  );
}

// function getTime() {
//   var time = new Date().toLocaleString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//   });
//   return time;
// }

function getTime() {
  let ampm;
  const d = new Date();
  var hour = d.getHours();
  var min = d.getMinutes();
  if (hour >= 12) {
    ampm = "PM";
    hour === 12 ? (hour = 12) : (hour = ("0" + (hour - 12)).slice(-2));
  } else {
    ampm = "AM";
    hour === 0 ? (hour = 12) : (hour = ("0" + hour).slice(-2));
  }
  if (min < 10) min = ("0" + min).slice(-2);
  // console.log(`${hour} : ${min} ${ampm}`);
  return `${hour}:${min} ${ampm}`;
}
