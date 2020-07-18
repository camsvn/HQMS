import React, { createContext, useState } from "react";
import axios from "axios";

const ActiveDoctorsContext = createContext();

const ActiveDoctorsProvider = (props) => {
  const [activeDoctors, setActiveDoctors] = useState([initialState]);
};
