import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./screens/Main";
import TokenDisplay from "./screens/TokenDisplay";
import Slider from "./components/Slider";
import DoctorContextProvider from "./contexts/DoctorContext";
import MessageContextProvider from "./contexts/MessageContext";

export default function App() {
  return (
    <BrowserRouter>
      <DoctorContextProvider>
        <MessageContextProvider>
          <div className="RouterMain">
            <Route exact path="/" component={Main} />
            <Route path="/display" component={TokenDisplay} />
          </div>
        </MessageContextProvider>
      </DoctorContextProvider>
    </BrowserRouter>
  );
}
