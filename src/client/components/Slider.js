import React, { useEffect, useState, useLayoutEffect } from "react";
import 'pure-react-carousel/dist/react-carousel.es.css';

import {
  CarouselProvider,
  DotGroup,
  Slide,
  Slider,
} from 'pure-react-carousel';

import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../constants/constants";
import speak from "./Speech";

var socket;
var fetchtimer;
const TOKENSINSLIDE = 3;

// import s from 'pure-react-carousel/dist/react-carousel.es.css';

export default () => {

  //Filter only isVisibe Doctors to state.
  var locStoData = JSON.parse(localStorage.getItem("doctor"));
  // var newarray = locStoData.filter((item) => item.isVisible === true);
  const [doctors, setDoctors] = useState(locStoData ? locStoData : []);
  
  useLayoutEffect(() => {
    var timer = setInterval(() => {
      var locStoData = JSON.parse(localStorage.getItem("doctor"));
      // var newarray = locStoData.filter((item) => item.isVisible === true);
      // console.log(newarray);

      // if(doctors != locStoData)
        setDoctors(prevData => {
          if (JSON.stringify(prevData) != JSON.stringify(locStoData)) {
            return locStoData
          }
          else{
            return prevData
          }
        });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("speak-trigger", (data) => {
      // console.log("Speak Triggered")
      let extractedData = JSON.parse(data);
      const { id, token } = extractedData;
      speak(id,token);
    });

    return () => {
      // clearInterval(timer);
      clearInterval(fetchtimer);
    };
  }, []);

  return (
    <div style={{width:'100%', textAlign:"center", margin: "10px auto"}}>
      <CarouselProvider
        visibleSlides={1}
        totalSlides={doctors.length && Math.ceil(doctors.length/TOKENSINSLIDE)}
        // totalSlides={4}
        naturalSlideWidth={4}
        naturalSlideHeight={2}
        isPlaying
        touchEnabled={false}
        dragEnabled={false}
      >
        <Slider>
          {/* {console.log(doctors.length)} */}
          {doctors.length ? 
          splitEvery(doctors, TOKENSINSLIDE).map((item, index) => (
            <Slide index={index} key={index}>
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
            </Slide>
          )) : <Slide />} 
        </Slider>
        {/* <Slider>
          <Slide index={0}>
            <div className="box">
              <div className="disptoken-container">
                <div className="token-card">
                  <DoctorImg id={11} />
                  <div className="token-name">
                    <h1>Amal S</h1>
                  </div>
                  <div className="token-number">
                    <span>13</span>
                  </div>
                </div>
                <div
                  className="doctor-msg-close"
                >
                  <span>ON BREAK</span>
                </div>
              </div>

              <div className="disptoken-container">
                <div className="token-card">
                  <DoctorImg id={11} />
                  <div className="token-name">
                    <h1>Amal S</h1>
                  </div>
                  <div className="token-number">
                    <span>13</span>
                  </div>
                </div>
                <div
                  className="doctor-msg"
                >
                  <span>ON BREAK</span>
                </div>
              </div>

              <div className="disptoken-container">
                <div className="token-card">
                  <DoctorImg id={11} />
                  <div className="token-name">
                    <h1>Ajith S</h1>
                  </div>
                  <div className="token-number">
                    <span>12</span>
                  </div>
                </div>
                <div
                  className="doctor-msg-close"
                >
                  <span>ON BREAK</span>
                </div>
              </div>
            </div>
          </Slide>
          <Slide index={1}>I am the second Slide.</Slide>
          <Slide index={2}>I am the third Slide.</Slide>
          <Slide index={3}>I am the third Slide.</Slide>
        </Slider> */}
        {/* <ButtonPlay childrenPlaying="Pause" childrenPaused="Play" /> */}
        {/* <ButtonFirst>First</ButtonFirst>
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
        <ButtonLast>Last</ButtonLast> */}
        {/* <DotGroup dotNumbers className="dotGroup" /> */}
        <DotGroup className="dotGroup" />
      </CarouselProvider>
    </div>
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

const splitEvery = (array, length) =>
  array.reduce((result, item, index) => {
    if (index % length === 0) result.push([]);
    result[Math.floor(index / length)].push(item);
    return result;
  }, []);
