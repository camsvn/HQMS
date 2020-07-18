import React from "react";
import mockData from "../constants/mockData";

export default function Navbar() {
  return (
    <div id="main-body">
      {/* <div className="token-card"> */}
      {mockData.map((item) => (
        <div className="token-card" key={item.id}>
          <img src={item.image} alt="Doctor DP" />
          <div>
            <h1>{item.name}</h1>
          </div>
          <div>
            <span>22</span>
          </div>
        </div>
      ))}
      {/* <img src={mockData[5].image} alt="Doctor DP" />
        <div>
          <h1>{mockData[5].name}</h1>
        </div>
        <div>
          <span>22</span>
        </div> */}
      {/* </div> */}
    </div>
  );
}

const styles = {
  main_body: {
    border: "10px solid yellowgreen",
    height: "85vh",
  },
};
