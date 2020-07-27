import React, { createContext, useState, useEffect } from "react";
import socketIOClient from "socket.io-client";

var socket;
const ENDPOINT = "http://desktop-8560w:8080/";

export const DoctorContext = createContext();

export default function DoctorContextProvider(props) {
  const [doctors, setDoctors] = useState([]);
  const [docControl, setDocControl] = useState([]);

  useEffect(() => {
    socket = socketIOClient(ENDPOINT);
    return () => {
      if (socket) socket.disconnect();
    };
  }, []);

  useEffect(() => {
    //fetch Data from socket
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

  const addDoc = (id) => {
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

  const rmDoc = (id) => {
    var rmDocArr = docControl.filter((refid) => refid !== id);
    setDocControl(rmDocArr);
    var refid = id;
    var indexToModify = doctors.findIndex(({ id }) => id === refid);
    var toggleVisible = { ...doctors[indexToModify], isVisible: false };
    setDoctors(Object.assign([...doctors], { [indexToModify]: toggleVisible }));
  };

  const getDoctorProp = (refid, prop) => {
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
    <DoctorContext.Provider
      value={{
        doctors,
        docControl,
        countInc,
        countDec,
        addDoc,
        rmDoc,
        getDoctorProp,
      }}
    >
      {props.children}
    </DoctorContext.Provider>
  );
}
