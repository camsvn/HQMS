import React from "react";
import Navbar from "./components/Navbar";
import DBody from "./components/DBody";
import Slider from "./components/Slider";

export default function App() {
  return (
    <div className="app">
      <div className="appc">
        <Navbar />
      </div>
      <div className="appc">
        <DBody />
        {/* <Slider /> */}
      </div>
      <div className="appc">
        <span>Footer Shit</span>
      </div>
    </div>
  );
}
