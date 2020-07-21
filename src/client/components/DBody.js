import React from "react";
import mockData from "../constants/mockData";

export default function Dispay_Body() {
  return (
    <div id="main-body">
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
    </div>
  );
}

const styles = {
  main_body: {
    border: "10px solid yellowgreen",
    height: "85vh",
  },
};
