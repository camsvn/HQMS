import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Navbar from "../components/Navbar";
import DBody from "../components/DBody";
import Slider from "../components/Slider";
import "../css/scroll.css";

export default function TokenDisplay() {
  const [dimensions, setDimensions] = useState(0);
  let screenWidth = window.screen.width;
  const myRef = useRef();

  const scroll = keyframes`
  from {
    transform: translateX(${screenWidth});
  }

  to {
    transform: translateX(-100%);
  }
`;

  const Marquee = styled.div`
    transform: translateX(${screenWidth}px);
    animation: ${scroll} linear infinite;
  `;

  useEffect(() => {
    console.log(dimensions);
    // setDimensions(dimensions + 1);
    return () => {};
  }, []);

  // useLayoutEffect(() => {
  //   width = myRef.current.offsetWidth;
  //   setDimensions({ width: 15, height: 10 });
  //   // if (myRef.current) {
  //   //   setDimensions({
  //   //     width: myRef.current.offsetWidth,
  //   //     height: myRef.current.offsetHeight,
  //   //   });
  //   //   // setMarqueeOverflow(width > screenWidth);
  //   // }
  //   // myRef.current.style.animationDuration = `${width / 65}s`;
  //   // console.log(myRef.current.style.animationDuration, width > screenWidth);
  // }, []);

  // var ele = document.getElementsByClassName("scroll-left").console.log(ele);
  return (
    <div className="app">
      <div className="appc">
        <Navbar />
      </div>
      <div className="appc">
        {/* <DBody /> */}
        <Slider />
      </div>
      <div className="appc" ref={myRef}>
        <Marquee className="scroll-left">
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </span>

          <span> AMAL</span>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <span> AMAL</span>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <span> AMAL</span>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </span>
          <span> AMAL</span>
        </Marquee>
      </div>
    </div>
  );
}
