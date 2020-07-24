import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import mockData from "../constants/mockData";

var socket;
const ENDPOINT = "http://desktop-8560w:8080/";

export default function Dispay_Body() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("token-update", (data) => {
      setDoctors(data.localDS);
    });
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);
  return (
    <div id="main-body">
      {doctors.map((item) => (
        <div className="token-card" key={item.id}>
          <img src={mockData[2].image} alt="Doctor DP" />
          <div>
            <h1>{item.name}</h1>
          </div>
          <div>
            <span>{item.currentToken}</span>
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
