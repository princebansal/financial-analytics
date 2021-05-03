import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";
import "antd/dist/antd.css";

var firebaseConfig = {
  apiKey: "AIzaSyC5yJSnQRHNPdF0VaeVBWbii44ukOty_Yw",
  authDomain: "co-ox9.firebaseapp.com",
  databaseURL:
    "https://co-ox9-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "co-ox9",
  storageBucket: "co-ox9.appspot.com",
  messagingSenderId: "270678706924",
  appId: "1:270678706924:web:d766a82b1ba96be6f233c9",
  measurementId: "G-9H22682NTM",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App firebaseRef={firebase} />
  </React.StrictMode>,
  document.getElementById("root")
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
