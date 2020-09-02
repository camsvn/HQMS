import React from "react";
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
            Lorem Ipsum is simply dummy text of the printing and THE_END
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
