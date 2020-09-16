import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import styled, { keyframes, css } from "styled-components";
import { ENDPOINT } from "../constants/constants";

// const ENDPOINT = "http://desktop-8560w:8080/";

const MarqueeComponent = ({ children }) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const screenWidth = window.screen.width;

  const [msg, setMsg] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("getmsg", (data) => {
      // console.log(JSON.parse(data));
      setMsg(JSON.parse(data));
    });
  }, []);

  useLayoutEffect(() => {
    // console.log("Marquee");
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, [msg]);

  // setInterval(() => {
  //   console.log(targetRef.current.offsetWidth);
  // }, 1000);

  return (
    <Marquee
      ref={targetRef}
      className="marquee-scroll-left"
      screenWidth={screenWidth}
      cwidth={dimensions.width}
    >
      {msg.length
        ? msg.map((item, _idx) => (
            <span key={_idx}>
              {/* {item} {msg.length - 1 !== _idx && "◆Amal "} */}
              {item} {msg.length - 1 !== _idx && <span>&#9670;&nbsp;</span>}
            </span>
          ))
        : null}
      {/* {children} */}
      {/* <span>{` width: ${dimensions.width}`}</span>
      <span>{` height: ${dimensions.height}`}</span> */}
    </Marquee>
  );
};

const scroll = (screenWidth) => keyframes`
  from {
    transform: translateX(${screenWidth}px);
  }

  to {
    transform: translateX(-100%);
  }
`;

// const Marquee = styled.div.attrs((props) => ({
//   screenWidth: props.screenWidth || 0,
// }))`
//   transform: translateX(${(props) => props.screenWidth}px);
//   animation: ${(props) => scroll(props.screenWidth)}
//     ${(props) => props.cwidth / 80}s linear infinite;
// `;

const Marquee = styled.div`
  ${({ screenWidth, cwidth }) => {
    return (
      cwidth > screenWidth &&
      css`
        transform: translateX(${screenWidth}px);
        animation: ${scroll(screenWidth)} ${cwidth / 300}s linear infinite;
      `
    );
  }}
`;

export default MarqueeComponent;
