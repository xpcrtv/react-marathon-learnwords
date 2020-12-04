import React, { useContext, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import s from "./App.module.scss";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CardPage from "./pages/Card";
import NotFoundPage from "./pages/NotFound";

import { Spin } from "antd";

import { addUserAction } from "./actions/userAction";

import FirebaseContext from "./context/firebaseContext";
import { PrivateRoute } from "./utils/PrivateRoute";

const App = () => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const isAppLoading = useSelector((state) => state.user.isAppLoading);

  useEffect(() => {
    const { auth, setUserUid } = firebase;
    dispatch(addUserAction(auth, setUserUid));
  }, [dispatch, firebase]);

  if (isAppLoading) {
    return (
      <div className={s.spinner_wrap}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <Switch>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/home" component={HomePage} />
        <PrivateRoute path="/cards/:id" component={CardPage} />
        <Route path="/404" component={NotFoundPage} />
        <Redirect to="/404" />
      </Switch>
    </>
  );
};

export default App;
