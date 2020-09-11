import React, { createContext, useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";

// var socket;
// const ENDPOINT = "http://desktop-8560w:8080/";

export const DoctorContext = createContext();

export default function DoctorContextProvider({ children }) {
  const localDocControl = localStorage.getItem("docControl");
  const localDoc = JSON.parse(localStorage.getItem("doctor"));
  // const [doctors, setDoctors] = useState([]);
  // const [docControl, setDocControl] = useState([]);
  const [doctors, setDoctors] = useState(localDoc ? localDoc : []);
  const [docControl, setDocControl] = useState(
    localDocControl ? JSON.parse(localDocControl) : []
  );

  useEffect(() => {
    localStorage.setItem("doctor", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("docControl", JSON.stringify(docControl));
  }, [docControl]);

  //   useEffect(() => {
  //     socket = socketIOClient(ENDPOINT);
  //     return () => {
  //       if (socket) socket.disconnect();
  //     };
  //   }, []);

  //   useEffect(() => {
  //     //fetch Data from socket
  //     socket.on("token-update", (data) => {
  //       //Adding isVisible property to received Data
  //       var addprop2doc = data.localDS.map((item) => {
  //         item.isVisible = docControl.includes(item.id) ? true : false;
  //         return item;
  //       });
  //       setDoctors(addprop2doc);
  //     });
  //     return () => {};
  //   }, [docControl]);

  //   const countInc = (id) => {
  //     socket.emit("increment", {
  //       id,
  //     });
  //   };

  //   const countDec = (id) => {
  //     socket.emit("decrement", {
  //       id,
  //     });
  //   };

  const updateDoctors = (data) => {
    const newData = data.map((item) => {
      if (docControl.includes(item.doctorID))
        return Object.assign({}, item, { isVisible: true });
      return item;
    });
    setDoctors(newData);
  };

  const addDoc = (id) => {
    if (!docControl.includes(id)) {
      var addDocArr = [...docControl, id];
      setDocControl(addDocArr);
      var refid = id;
      var indexToModify = doctors.findIndex(
        ({ doctorID }) => doctorID === refid
      );
      var toggleVisible = { ...doctors[indexToModify], isVisible: true };
      var newDocState = Object.assign([...doctors], {
        [indexToModify]: toggleVisible,
      });
      setDoctors(newDocState);
    } else {
      console.log(`${id} is already in list`);
    }
  };

  const rmDoc = (id) => {
    var rmDocArr = docControl.filter((refid) => refid !== id);
    setDocControl(rmDocArr);
    var refid = id;
    var indexToModify = doctors.findIndex(({ doctorID }) => doctorID === refid);
    var toggleVisible = { ...doctors[indexToModify], isVisible: false };
    var newDocState = Object.assign([...doctors], {
      [indexToModify]: toggleVisible,
    });
    setDoctors(newDocState);
  };

  const getDoctorProp = (refid, prop) => {
    switch (prop) {
      case "name":
        if (doctors.length > 0)
          return doctors[
            doctors.findIndex(({ doctorID }) => doctorID === refid)
          ].docName;
        break;
      case "token":
        if (doctors.length > 0)
          return doctors[
            doctors.findIndex(({ doctorID }) => doctorID === refid)
          ].token;
        break;
      default:
        console.log("invalid Prop");
    }
  };

  return (
    <DoctorContext.Provider
      value={{
        doctors,
        docControl,
        addDoc,
        rmDoc,
        getDoctorProp,
        setDoctors,
        updateDoctors,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
