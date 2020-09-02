import React, { useRef, useLayoutEffect, useState } from "react";
import styled, { keyframes, css } from "styled-components";

const MarqueeComponent = (props) => {
  const targetRef = useRef();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const screenWidth = window.screen.width;

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  return (
    <Marquee
      ref={targetRef}
      className="marquee-scroll-left"
      screenWidth={screenWidth}
      cwidth={dimensions.width}
    >
      {props.children}
      <span>{` width: ${dimensions.width}`}</span>
      <span>{` height: ${dimensions.height}`}</span>
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
  ${({ screenWidth, cwidth }) =>
    cwidth > screenWidth &&
    css`
      transform: translateX(${screenWidth}px);
      animation: ${scroll(screenWidth)} ${cwidth / 80}s linear infinite;
    `}
`;

export default MarqueeComponent;
