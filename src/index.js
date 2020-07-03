import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import FirebaseContext from "./context/firebaseContext";

import "antd/dist/antd.css";
import "./index.css";
import Firebase from "./services/firebase";

ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
