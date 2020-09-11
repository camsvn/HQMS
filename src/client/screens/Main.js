import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
import socketIOClient from "socket.io-client";

import "../css/main.css";
// import mockData from "./constants/mockData";
import { DoctorContext } from "../contexts/DoctorContext";

var socket;
const ENDPOINT = "http://desktop-8560w:8080/";
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
  } = useContext(DoctorContext);

  const [message, setMessage] = useState([]);
  const [windowRef, setWindowRef] = useState({});

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    socket.on("getmsg", (data) => {
      setMessage(JSON.parse(data));
    });
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("msg", JSON.stringify(message));
  //   return () => {
  //     // localStorage.setItem("msg",JSON.stringify([]))
  //   };
  // }, [message]);

  useEffect(() => {
    //fetch Data from socket
    socket.on("token-update", (data) => {
      //Adding isVisible property to received Data
      var addprop2doc = data.localDS.map((item) => {
        item.isVisible = docControl.includes(item.id) ? true : false;
        return item;
      });
      setDoctors(addprop2doc);
      // localStorage.setItem("doctor", JSON.stringify(addprop2doc));
    });
    socket.on("doc", (data) => {
      console.log(JSON.parse(data));
    });
    return () => {};
  }, [docControl]);

  const countInc = (id) => {
    socket.emit("increment", {
      id,
    });
  };

  const countDec = (id) => {
    socket.emit("decrement", {
      id,
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
