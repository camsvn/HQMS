import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DBody from "../components/DBody";
import Slider from "../components/Slider";
import Marquee from "../components/Marquee";

export default function TokenDisplay() {
  const localMsg = localStorage.getItem("msg");
  const [msg, setMsg] = useState(JSON.parse(localStorage.getItem("msg")));
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
            {console.log(msg)}
            {msg.length ? msg.map((item) => <span> {item} | </span>) : null}
            {/* Ama | Test | Pillow | */}
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
