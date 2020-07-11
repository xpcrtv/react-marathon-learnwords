import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import s from "./App.module.scss";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CardPage from "./pages/Card";
import NotFoundPage from "./pages/NotFound";

import { Spin } from "antd";

import { connect } from "react-redux";
import { addUserAction } from "./actions/userAction";

import FirebaseContext from "./context/firebaseContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import { bindActionCreators } from "redux";

class App extends Component {
  componentDidMount() {
    const { auth, setUserUid } = this.context;
    const { addUser } = this.props;
    addUser(auth, setUserUid);
  }

  render() {
    const { isAppLoading } = this.props;
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
  }
}

App.contextType = FirebaseContext;

const mapStateToProps = (state) => {
  return {
    isAuth: state.user.isAuth,
    isAppLoading: state.user.isAppLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      addUser: addUserAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
