import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

import "../css/main.css";
// import mockData from "./constants/mockData";
import { DoctorContext } from "../contexts/DoctorContext";
import { ENDPOINT } from "../constants/constants";

var socket;
// const ENDPOINT = "http://desktop-8560w:8080/";
// const socket = socketIOClient(ENDPOINT);

export default function App() {
  const {
    doctors,
    docControl,
    // countInc,
    // countDec,
    addDoc,
    rmDoc,
    getDoctorProp,
    setDoctors,
    updateDoctors,
    updateDocProps,
    updateDocPropsMsg,
  } = useContext(DoctorContext);

  const [message, setMessage] = useState([]);
  const [breakmsg, setBreakmsg] = useState([]);
  const [windowRef, setWindowRef] = useState({});

  useEffect(() => {
    function handleExit() {
      // socket.emit("close", "Close Browser");
      localStorage.clear();
    }
    socket = socketIOClient(ENDPOINT);
    window.addEventListener("beforeunload", handleExit);
    socket.emit("syncdb");
    socket.on("client-syncdb", () => {
      socket.emit("syncdb");
    });
    return () => {
      if (socket) {
        window.removeEventListener("beforeunload", handleExit);
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socket.on("getmsg", (data) => {
      setMessage(JSON.parse(data));
    });
    socket.emit("getdoc");
    socket.on("dbupdated", () => {
      socket.emit("getdoc");
    });
    socket.on("doc", (data) => {
      updateDoctors(JSON.parse(data));
      // setDoctors(JSON.parse(data));
    });
    return () => {
      // if (socket) {
      //   socket.disconnect();
      // }
    };
  }, [docControl]);

  const countInc = (doctorID, token) => {
    // console.log(docControl);
    socket.emit("token-update", {
      doctorID,
      token: ++token,
    });
  };

  const countDec = (doctorID, token) => {
    // console.log(docControl);
    token !== 0 &&
      socket.emit("token-update", {
        doctorID,
        token: --token,
      });
  };

  const checkboxChange = (e, doctorID) => {
    // console.log(e.target.checked);
    // console.log(doctorID);
    socket.emit("onBreak-update", {
      doctorID,
      onBreak: e.target.checked,
    });
  };

  const handleBreakMsgSubmit = (e, doctorID) => {
    e.preventDefault();
    // console.log(getDoctorProp(doctorID, "comment"));
    socket.emit("onBreakMsg-submit", {
      doctorID,
      onBreakComment: getDoctorProp(doctorID, "comment"),
    });
  };

  // useEffect(() => {
  //   console.log("fetched from db / rendered");
  //   axios.get("/api/getDoctors").then((res) => {
  //     setDoctors(res.data);
  //   });
  //   return () => {};
  // }, []);

  return (
    <div className="main noselect">
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
        <div className="message-panel">
          <div className="message-board-container">
            <div>
              <h2>Scroll Message</h2>
            </div>
            <div className="message-board custom-scroll">
              {message.map((item, i) => (
                <Msg
                  msg={item}
                  key={i}
                  id={i}
                  setMessage={setMessage}
                  state={message}
                />
              ))}
            </div>
            {/* <button type="button">Toggle Ads</button> */}
            <MsgForm setMessage={setMessage} state={message} />
          </div>
        </div>
        <div className="control-panel">
          <div className="control-panel-wrapper">
            <div>
              <h2>Control Panel</h2>
            </div>
            <div className="panel-container custom-scroll">
              {docControl &&
                docControl.map((id) => (
                  <div className="token-container" key={id}>
                    <div className="doc-counter">
                      <button
                        className="collapse-control"
                        type="button"
                        onClick={() =>
                          updateDocProps(id, !getDoctorProp(id, "collapse"))
                        }
                      >
                        ▼
                      </button>
                      <div className="doc-counter-mainview">
                        <h3>{getDoctorProp(id, "name")}</h3>
                        {getDoctorProp(id, "onBreak") && (
                          <p>onBreak: {getDoctorProp(id, "comment")}</p>
                        )}
                      </div>
                      <button
                        className="token-control"
                        type="button"
                        onClick={() => countDec(id, getDoctorProp(id, "token"))}
                      >
                        -
                      </button>
                      <button
                        className="token-control"
                        type="button"
                        onClick={() => countInc(id, getDoctorProp(id, "token"))}
                      >
                        +
                      </button>
                      <div className="token-counter-view">
                        <span>{getDoctorProp(id, "token")}</span>
                      </div>
                      <div className="token-counter-delete">
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
                    <div
                      className={
                        getDoctorProp(id, "collapse")
                          ? "collapse-container"
                          : "collapse-container-close"
                      }
                    >
                      <form
                        className="collapse-container-form"
                        onSubmit={(e) => handleBreakMsgSubmit(e, id)}
                      >
                        <input
                          className="collapse-form-checkbox"
                          type="checkbox"
                          checked={getDoctorProp(id, "onBreak")}
                          onChange={(e) => checkboxChange(e, id)}
                        />
                        <span>onBreak</span>
                        <input
                          className="collapse-form-input"
                          type="text"
                          placeholder="Enter the reason here"
                          required
                          // value={getDoctorProp(id, "comment")}
                          onChange={(e) =>
                            updateDocPropsMsg(id, e.currentTarget.value)
                          }
                        />
                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="doctor-selection-container custom-scroll">
          <div>
            <h2>Active Doctors</h2>
            <span>{`Total: ${doctors.length}`}</span>
          </div>
          {doctors.map((item) => (
            <button
              type="button"
              key={item.doctorID}
              className={
                item.isVisible ? "doctor-control-toggle" : "doctor-control"
              }
              onClick={() => addDoc(item.doctorID)}
            >
              {`${item.docName}`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const Msg = ({ msg, id, setMessage, state }) => {
  const deleteMsg = (id) => {
    // setMessage(state.filter((item, i) => i !== id));
    socket.emit("delmsg", id);
  };

  return (
    <div className="message-container">
      <div className="message">
        <p>{msg}</p>
      </div>
      <button type="submit" onClick={() => deleteMsg(id)}>
        Del
      </button>
    </div>
  );
};

const MsgForm = ({ setMessage, state }) => {
  const [msgInput, setMsgInput] = useState("");

  const handleTextChange = (e) => {
    setMsgInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(msgInput);
    // setMessage([...state, msgInput]);
    socket.emit("addmsg", msgInput);
    setMsgInput("");
    // console.log(state);
  };

  return (
    <form className="message-box" onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        value={msgInput}
        onChange={(e) => handleTextChange(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
