import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

  const msgBody = ". Token Number ";
  const utterance = new SpeechSynthesisUtterance();
  utterance.pitch = 1;

  const speak = (id, token) => {
      utterance.voice = speechSynthesis
        .getVoices()
        .filter((voice) => voice.lang === "hi-IN")[0];

  if(utterance.voice) {
    switch (id) {
      case 2:
        utterance.text = getUtteranceText(`Dr. सुरेंद्रन`, token); //Dr. Surendran
        speechSynthesis.speak(utterance);
        break;
      case 3:
        utterance.text = getUtteranceText(`Dr. Salooja`, token);
        speechSynthesis.speak(utterance);
        break;
      case 4:
        utterance.text = getUtteranceText(`Dr. Ajay`, token);
        speechSynthesis.speak(utterance);
        break;
      case 5:
        utterance.text = getUtteranceText(`Dr. Sajith`, token);
        speechSynthesis.speak(utterance);
        break;
      case 6:
        utterance.text = getUtteranceText(`Dr. Ganesh`, token);
        speechSynthesis.speak(utterance);
        break;
      case 8:
        utterance.text = getUtteranceText(`Dr. Saajidh`, token);
        speechSynthesis.speak(utterance);
        break;
      case 9:
        utterance.text = getUtteranceText(`Dr. Naisargi`, token);
        speechSynthesis.speak(utterance);
        break;
      case 10:
        utterance.text = getUtteranceText(`Dr. Hakeem`, token);
        speechSynthesis.speak(utterance);
        break;
      case 11:
        utterance.text = getUtteranceText(`Dr. Anudeep`, token);
        speechSynthesis.speak(utterance);
        break;
      case 12:
        utterance.text = getUtteranceText(`Dr. Sudhakshin`, token);
        speechSynthesis.speak(utterance);
        break;
      case 13:
        utterance.text = getUtteranceText(`Dr. Abdul Gafoor`, token);
        speechSynthesis.speak(utterance);
        break;
      case 15:
        utterance.text = getUtteranceText(`Dr. Mohan`, token);
        speechSynthesis.speak(utterance);
        break;
      case 21:
        utterance.text = getUtteranceText(`Dr. Aadarsh`, token);
        speechSynthesis.speak(utterance);
        break;
      case 29:
        utterance.text = getUtteranceText(`Dr. Krishnakumar`, token);
        speechSynthesis.speak(utterance);
        break;
      case 31:
        utterance.text = getUtteranceText(`Dr. Joolie`, token);
        speechSynthesis.speak(utterance);
        break;
    }
  }
};

function getUtteranceText (docName, token) {
  return `${docName} ${msgBody} . ${token}`
}

export default speak;
