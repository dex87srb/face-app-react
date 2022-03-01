import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import firebase from "firebase";
import { BrowserRouter } from "react-router-dom";
import 'firebase/storage';

firebase.initializeApp(process.env.REACT_APP_API);

export const storage = firebase.app().storage('gs://face-app-react.appspot.com')

ReactDOM.render(
  < BrowserRouter >
    <App /></BrowserRouter >,
  document.getElementById("root")
);
