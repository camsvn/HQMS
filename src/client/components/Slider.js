import React, { useEffect, useState } from "react";
import Slider from "infinite-react-carousel";
// import data from "../constants/mockData";

const SimpleSlider = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    var timer = setInterval(() => {
      var locStoData = JSON.parse(localStorage.getItem("doctor"));
      var newarray = locStoData.filter((item) => item.isVisible === true);
      console.log(newarray);
      setDoctors(newarray);
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
                if (data.isVisible)
                  return (
                    <div className="token-card" key={data.id}>
                      <img src={data.image} alt="Doctor DP" />
                      <div>
                        <h1>{data.name}</h1>
                      </div>
                      <div>
                        <span>{data.currentToken}</span>
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
