import React, { useEffect, useState, useLayoutEffect } from "react";
import Slider from "infinite-react-carousel";
import speak from "./Speech";

const SimpleSlider = () => {
  //Filter only isVisibe Doctors to state.
  var locStoData = JSON.parse(localStorage.getItem("doctor"));
  // var newarray = locStoData.filter((item) => item.isVisible === true);
  const [doctors, setDoctors] = useState(locStoData ? locStoData : []);
  // const [doctors, setDoctors] = useState([]);

  useLayoutEffect(() => {
    var timer = setInterval(() => {
      var locStoData = JSON.parse(localStorage.getItem("doctor"));
      // var newarray = locStoData.filter((item) => item.isVisible === true);
      // console.log(newarray);
      setDoctors(locStoData);
    }, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Slider {...settings} className="slider">
      {doctors.length ? (
        splitEvery(doctors, 3).map((item, index) => (
          <div className="slider-view" key={index}>
            <div className="box">
              {item.map((data) => {
                // if (data.isVisible && data.token > 0)
                return (
                  <div key={data.doctorID} className="disptoken-container">
                    <div className="token-card">
                      <DoctorImg id={data.doctorID} />
                      <div className="token-name">
                        <h1>{data.docName}</h1>
                      </div>
                      <div className="token-number">
                        <span>{data.token}</span>
                      </div>
                    </div>
                    <div
                      className={
                        data.onBreak ? "doctor-msg" : "doctor-msg-close"
                      }
                    >
                      <span>{data.onBreakComment}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      ) : (
        <div />
      )}
    </Slider>
  );
};

const DoctorImg = ({ id }) => {
  var imgSrc;
  try {
    imgSrc = require("../../../public/img/" + id + ".jpg");
  } catch (e) {
    imgSrc = require("../../../public/img/default.jpg");
  }
  return <img src={imgSrc} alt="Doctor DP" />;
};

const settings = {
  arrows: false,
  arrowsBlock: false,
  autoplay: true,
  autoplaySpeed: 5200,
  dots: true,
  duration: 200,
  // overScan: 1,
  pauseOnHover: false,
  swipe: false,
};

const splitEvery = (array, length) =>
  array.reduce((result, item, index) => {
    if (index % length === 0) result.push([]);
    result[Math.floor(index / length)].push(item);
    return result;
  }, []);

export default SimpleSlider;
