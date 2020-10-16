import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

const msgBody = ". Token Number ";
const utterance = new SpeechSynthesisUtterance();
utterance.pitch = 1;

const speak = (id, token) => {
  utterance.voice = speechSynthesis
    .getVoices()
    .filter((voice) => voice.lang === "hi-IN")[0];
  console.log(utterance.voice);
  console.log(typeof utterance.voice);
  console.log("Activated");
  switch (id) {
    case 3:
      utterance.text = `Dr. Salooja ${msgBody} . ${token}`;
      speechSynthesis.speak(utterance);
      break;
    case 2:
      utterance.text = `Dr. T P V ${msgBody} . ${token}`;
      speechSynthesis.speak(utterance);
      break;
  }

  //   if (id === 3) {
  //     console.log("Activated");
  //     utterance.text = `Dr. Salooja ${msgBody} . ${token}`;
  //     speechSynthesis.speak(utterance);
  //   }
  //   if (id === 2) {
  //     console.log("Activated");
  //     utterance.text = `Dr. T P V ${msgBody} . ${token}`;
  //     speechSynthesis.speak(utterance);
  //   }
};

export default speak;
