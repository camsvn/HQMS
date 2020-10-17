import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
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
    resetState,
    updateDoctors,
    updateDocProps,
    updateDocPropsMsg,
  } = useContext(DoctorContext);

  // var { socket } = useContext(DoctorContext);

  const [message, setMessage] = useState([]);
  const [windowRef, setWindowRef] = useState({});
  const [viewAll, setViewAll] = useState(false);
  // const [billInput, setBillInput] = useState("");

  useLayoutEffect(() => {
    function handleExit() {
      // socket.emit("close", "Close Browser");
      localStorage.clear();
    }
    socket = socketIOClient(ENDPOINT);
    window.addEventListener("beforeunload", handleExit);
    socket.emit("syncdb");
    socket.emit("getdoc");
    socket.on("sync-dbupdated", () => {
      resetState();
    });
    socket.on("client-syncdb", () => {
      socket.emit("syncdb");
    });
    socket.on("getmsg", (data) => {
      setMessage(JSON.parse(data));
    });
    socket.on("dbupdated", () => {
      socket.emit("getdoc");
    });
    return () => {
      if (socket) {
        window.removeEventListener("beforeunload", handleExit);
        socket.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    socket.on("doc", (data) => {
      updateDoctors(JSON.parse(data));
    });
  }, [docControl]);

  useEffect(() => {
    localStorage.setItem("viewAll", viewAll);
  }, [viewAll]);

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

  // const handleBill = (e) => {
  //   e.preventDefault();
  //   billInput !== "" && console.log(billInput);
  //   setBillInput("");
  // };

  return (
    <div className="main noselect">
      <a
        href="http://decare.team"
        target="signature"
        style={{
          position: "absolute",
          textDecoration: "none",
          color: "#45515840",
          top: 28,
          right: 0,
          paddingRight: 10,
        }}
      >
        Powered By DeCare Software Soutions
      </a>
      {/* Nav Bar */}
      <div className="btnContainer">
        <button
          type="button"
          className="open-window"
          onClick={() => {
            let ref = window.open(
              `${window.location.href}display`,
              "tokenView",
              // `left=${screen.width}, height=${screen.height}, width=${screen.width}`
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
        <form
          // onSubmit={handleBill}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "2rem",
            position: "absolute",
            right: 25,
            top: 20,
            display: "none",
            // top: viewAll ? 20 : 30,
            // transform: viewAll ? "translateX(0)" : "translateX(150px)",
            // transition:
            //   "transform 0.5s cubic-bezier(0.6, -0.28, 0.74, 0.05) 0s",
          }}
        >
          <input
            type="checkbox"
            style={{ marginRight: 5 }}
            checked={viewAll}
            onChange={() => setViewAll(!viewAll)}
          />
          <span
            className="view-bill"
            style={{ color: "white", marginRight: 10 }}
          >
            View All Doctors
          </span>
          {/* <input
            required
            type="text"
            placeholder="Bill number"
            value={billInput}
            onChange={(e) => setBillInput(e.target.value)}
            style={{
              marginRight: "10px",
              height: "2rem",
              maxWidth: 100,
              paddingLeft: 8,
              // display: "none",
            }}
          /> */}
          {/* <button type="submit">submit</button> */}
        </form>
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
                          <p>
                            onBreak:
                            {' '}
                            {getDoctorProp(id, "comment")}
                          </p>
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
        <div className="doctor-selection-container">
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
        required
        type="text"
        value={msgInput}
        onChange={(e) => handleTextChange(e)}
      />
      <button type="submit">Add</button>
    </form>
  );
};
