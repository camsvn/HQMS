import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export default function MessageContextProvider({ children }) {
  return <MessageContext.Provider>{children}</MessageContext.Provider>;
}
