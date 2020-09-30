import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "../constants/constants";

var socket;
var fetchtimer;

export default function BillNumber() {
  // const [labresultsview, setLabResultsView] = useState(
  //   JSON.parse(localStorage.getItem("labresultsview"))
  // );
  const [labresultsview, setLabResultsView] = useState(true);
  const [labResults, setLabResults] = useState();

  function fnfetchtimer() {
    socket.emit("getlabresults");
  }

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);

    // let timer = setInterval(() => {
    //   const labresultslocal = JSON.parse(
    //     localStorage.getItem("labresultsview")
    //   );
    //   setLabResultsView(labresultslocal);
    // }, 500);

    socket.on("labresults", (data) => {
      setLabResults(JSON.parse(data));
    });

    return () => {
      // clearInterval(timer);
      clearInterval(fetchtimer);
    };
  }, []);

  useEffect(() => {
    labresultsview
      ? (fetchtimer = setInterval(fnfetchtimer, 3000))
      : clearInterval(fetchtimer);
  }, [labresultsview]);

  return (
    <div
      className="bill-view"
      style={{ display: labresultsview ? "" : "none" }}
    >
      <h1
        style={{
          padding: "10px 0 5px",
          background: "#2994e0",
          textTransform: "uppercase",
        }}
      >
        Lab Results Ready
      </h1>
      <h2
        style={{
          padding: "5px 0",
          background: "#2994e0",
          fontWeight: 700,
          letterSpacing: 2,
          textTransform: "uppercase",
        }}
      >
        Op Number / Name
      </h2>
      <div className="test-results">
        {labResults &&
          labResults.map((item, _idx) => (
            <p key={_idx}>{item.OPNo ? `${item.OPNo}` : item.Patient}</p>
          ))}
      </div>
    </div>
  );
}
