import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

export default function App() {
  return (
    <div className="app">
      <div className="appc">
        <Navbar />
      </div>
      <div className="appc">
        <Body />
      </div>
      <div className="appc">
        <span>Footer Shit</span>
      </div>
    </div>
  );
}
