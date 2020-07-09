import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "antd/dist/antd.css";

import FirebaseContext from "./context/firebaseContext";
import Firebase from "./services/firebase";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";

import logger from "redux-logger";

import rootReducer from "./reducers";
const store = new createStore(rootReducer, applyMiddleware(logger));

ReactDOM.render(
  <Provider store={store}>
    <FirebaseContext.Provider value={new Firebase()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FirebaseContext.Provider>
  </Provider>,
  document.getElementById("root")
);
