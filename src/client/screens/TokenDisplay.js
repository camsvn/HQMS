import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import Navbar from "../components/Navbar";
import DBody from "../components/DBody";
import Slider from "../components/Slider";
import Marquee from "../components/Marquee";

export default function TokenDisplay() {
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
        <Marquee>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            Lorem Ipsum is simply dummy
          </span>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            Lorem Ipsum is simply dummy
          </span>
        </Marquee>
        {/* <div className="scroll-left">
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
          </span>
        </div> */}
      </div>
    </div>
  );
}
