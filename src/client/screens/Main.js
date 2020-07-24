import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
// import io from "socket.io-client";

import "../css/main.css";
// import mockData from "./constants/mockData";

var socket;
const ENDPOINT = "http://desktop-8560w:8080/";

export default function App() {
  const [count, setCount] = useState(0);
  const [doctors, setDoctors] = useState([]);
  const [windowRef, setWindowRef] = useState({});

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   console.log("fetched from db / rendered");
  //   axios.get("/api/getDoctors").then((res) => {
  //     setDoctors(res.data);
  //   });
  //   return () => {};
  // }, []);

  useEffect(() => {
    socket.on("token-update", (data) => {
      setDoctors(data.localDS);
    });

    return () => {};
  }, []);

  var countInc = (id) => {
    // setCount(count + 1);
    socket.emit("increment", {
      id,
    });
  };
  var countDec = (id) => {
    // if (count !== 0) setCount(count - 1);
    socket.emit("decrement", {
      id,
    });
  };

  return (
    <div className="main">
      {/* Nav Bar */}
      <div className="btnContainer">
        <button
          type="button"
          className="open-window"
          onClick={() => {
            let ref = window.open(
              `${window.location.href}display`,
              "tokenview"
            );
            setWindowRef(ref);
          }}
        >
          Open Token View
        </button>
        <button
          type="button"
          className="open-window"
          onClick={() => windowRef.close()}
        >
          Close Token View
        </button>
      </div>
      {/* <a href="/display" className="open-window">
        Open Token View
      </a> */}
      {/* Body */}
      {/* {console.log(doctors)} */}
      {doctors.map((item) => (
        <div className="token-container" key={item.id}>
          <div className="doc-counter">
            <button type="button" onClick={() => countDec(item.id)}>
              -
            </button>
            <h3>{item.name}</h3>
            <button type="button" onClick={() => countInc(item.id)}>
              +
            </button>
            <div>
              <span>{item.currentToken}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
