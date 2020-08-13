import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Navbar from "../components/Navbar";
import DBody from "../components/DBody";
import Slider from "../components/Slider";
import "../css/scroll.css";

export default function TokenDisplay() {
  // const myRef = React.createRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  let screenWidth = window.screen.width;
  const myRef = useRef();
  let width;

  const scroll = keyframes`
  from {
    transform: translateX(${screenWidth});
  }

  to {
    transform: translateX(-100%);
  }
`;

  console.log(screenWidth);
  const Marquee = styled.div`
    transform: translateX(${screenWidth}px);
    animation: ${scroll} linear infinite;
  `;

  useLayoutEffect(() => {
    if (myRef.current) {
      width = myRef.current.offsetWidth;
      setDimensions({
        width: myRef.current.offsetWidth,
        height: myRef.current.offsetHeight,
      });
      // setMarqueeOverflow(width > screenWidth);
    }
    myRef.current.style.animationDuration = `${width / 65}s`;
    console.log(myRef.current.style.animationDuration, width > screenWidth);
  }, []);

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
      <div className="appc">
        <div className="scroll-left" ref={myRef}>
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
        </div>
      </div>
    </div>
  );
}
