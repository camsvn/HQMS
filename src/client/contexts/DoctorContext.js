import React, { createContext, useState, useEffect } from "react";
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const DoctorContext = createContext();

export default function DoctorContextProvider({ children }) {

  const notify = (msg,type) => toast.success(msg, {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    type: type,
    style: { color: 'black' }
    });

  const localDocControl = localStorage.getItem("docControl");
  const localDoc = JSON.parse(localStorage.getItem("doctor"));

  const [doctors, setDoctors] = useState(localDoc ? localDoc : []);
  const [mutedDoctors, setMutedDoctors] = useState([]);
  const [docControl, setDocControl] = useState(
    localDocControl ? JSON.parse(localDocControl) : []
  );

  useEffect(() => {
    localStorage.setItem("doctor", JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem("docControl", JSON.stringify(docControl));
  }, [docControl]);


  const updateDoctors = (data) => {
    const newData = data.map((item) => {
      if (docControl.includes(item.doctorID))
        return Object.assign({}, item, { isVisible: true });
      return item;
    });
    setDoctors(newData);
  };

  const resetState = () => {
    setDocControl([]);
  };

  const updateDocProps = (id, collapse = true) => {
    const newData = doctors.map((item) => {
      if (item.doctorID === id && docControl.includes(item.doctorID))
        return Object.assign({}, item, { collapse });
      return item;
    });
    setDoctors(newData);
  };

  const updateDocPropsMsg = (id, comment) => {
    const newData = doctors.map((item) => {
      if (item.doctorID === id && docControl.includes(item.doctorID))
        return Object.assign({}, item, { onBreakComment: comment });
      return item;
    });
    setDoctors(newData);
  };

  const toggleDocPropsSpeak = (id) => {
    const index2Toggle= mutedDoctors.indexOf(id)
    if(index2Toggle === -1) {
      notify(`${getDoctorProp(id,"name")} is muted`, toast.TYPE.WARNING);
      setMutedDoctors([...mutedDoctors,id])
    } else if (index2Toggle > -1) {
      notify(`${getDoctorProp(id,"name")} can speak now`);
      setMutedDoctors(mutedDoctors.filter((docid) => docid !== id))
    }
  };

  const addDoc = (id) => {
    if (!docControl.includes(id)) {
      var addDocArr = [...docControl, id];
      setDocControl(addDocArr);
      // Add isVisibe Property to Object
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
    // Set isVisible Property to false
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
      case "collapse":
        if (doctors.length > 0)
          return doctors[
            doctors.findIndex(({ doctorID }) => doctorID === refid)
          ].collapse;
        break;
      case "speak":        
        if (mutedDoctors.indexOf(refid) !== -1)
          return false;
        else 
          return true;
      case "onBreak":
        if (doctors.length > 0)
          return doctors[
            doctors.findIndex(({ doctorID }) => doctorID === refid)
          ].onBreak;
        break;
      case "comment":
        if (doctors.length > 0)
          return doctors[
            doctors.findIndex(({ doctorID }) => doctorID === refid)
          ].onBreakComment;
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
        updateDocProps,
        updateDocPropsMsg,
        toggleDocPropsSpeak,
        resetState,
      }}
    >
      {children}
    </DoctorContext.Provider>
  );
}
