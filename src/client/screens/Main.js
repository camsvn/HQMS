import React, { useState, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
// import io from "socket.io-client";

import "../css/main.css";
// import mockData from "./constants/mockData";

var socket;
const ENDPOINT = "http://desktop-8560w:8080/";

export default function App() {
  const [doctors, setDoctors] = useState([]);
  const [windowRef, setWindowRef] = useState({});
  const [docControl, setDocControl] = useState([]);

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
      //Adding isVisible property to received Data
      var addprop2doc = data.localDS.map((item) => {
        item.isVisible = docControl.includes(item.id) ? true : false;
        return item;
      });
      setDoctors(addprop2doc);
    });
    return () => {};
  }, [docControl]);

  var countInc = (id) => {
    socket.emit("increment", {
      id,
    });
  };
  var countDec = (id) => {
    socket.emit("decrement", {
      id,
    });
  };

  var addDoc = (id) => {
    if (!docControl.includes(id)) {
      var addDocArr = [...docControl, id];
      setDocControl(addDocArr);
      var refid = id;
      var indexToModify = doctors.findIndex(({ id }) => id === refid);
      var toggleVisible = { ...doctors[indexToModify], isVisible: true };
      setDoctors(
        Object.assign([...doctors], { [indexToModify]: toggleVisible })
      );
    } else {
      console.log(`${id} is already in list`);
    }
  };

  var rmDoc = (id) => {
    var rmDocArr = docControl.filter((refid) => refid !== id);
    setDocControl(rmDocArr);
    var refid = id;
    var indexToModify = doctors.findIndex(({ id }) => id === refid);
    var toggleVisible = { ...doctors[indexToModify], isVisible: false };
    setDoctors(Object.assign([...doctors], { [indexToModify]: toggleVisible }));
  };

  var getDoctorProp = (refid, prop) => {
    switch (prop) {
      case "name":
        return doctors[doctors.findIndex(({ id }) => id === refid)].name;
      case "token":
        return doctors[doctors.findIndex(({ id }) => id === refid)]
          .currentToken;
      default:
        console.log("invalid Prop");
    }
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
      {/* Body */}
      <div className="adminpanel-body">
        <div className="control-panel">
          {docControl.map((id) => (
            <div className="token-container" key={id}>
              <div className="doc-counter">
                <button type="button" onClick={() => countDec(id)}>
                  -
                </button>
                {/* <h3>{item.name}</h3> */}
                <h3>{getDoctorProp(id, "name")}</h3>
                <button type="button" onClick={() => countInc(id)}>
                  +
                </button>
                <div className="token-counter-view">
                  {/* <span>{item.currentToken}</span> */}
                  <span>{getDoctorProp(id, "token")}</span>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      rmDoc(id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="doctor-selection-container">
          <div>
            <h2>Active Doctors</h2>
            <span>{`Total: ${doctors.length}`}</span>
          </div>
          {doctors.map((item) => (
            <button
              type="button"
              key={item.id}
              className={
                item.isVisible ? "doctor-control-toggle" : "doctor-control"
              }
              onClick={() => addDoc(item.id)}
            >
              {`${item.name}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
