import React, { useState, useContext } from "react";
// import axios from "axios";

import "../css/main.css";
// import mockData from "./constants/mockData";
import { DoctorContext } from "../contexts/DoctorContext";

export default function App() {
  const {
    doctors,
    docControl,
    countInc,
    countDec,
    addDoc,
    rmDoc,
    getDoctorProp,
  } = useContext(DoctorContext);
  const [windowRef, setWindowRef] = useState({});

  // useEffect(() => {
  //   console.log("fetched from db / rendered");
  //   axios.get("/api/getDoctors").then((res) => {
  //     setDoctors(res.data);
  //   });
  //   return () => {};
  // }, []);

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
                <h3>{getDoctorProp(id, "name")}</h3>
                <button type="button" onClick={() => countInc(id)}>
                  +
                </button>
                <div className="token-counter-view">
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
