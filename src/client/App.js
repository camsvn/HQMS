import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./screens/Main";
import TokenDisplay from "./screens/TokenDisplay";
import DoctorContextProvider from "./contexts/DoctorContext";

export default function App() {
  return (
    <BrowserRouter>
      <DoctorContextProvider>
        <div className="RouterMain">
          <Route exact path="/" component={Main} />
          <Route path="/display" component={TokenDisplay} />
        </div>
      </DoctorContextProvider>
    </BrowserRouter>
  );
}
