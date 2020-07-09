import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// import s from "./App.module.scss";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CardPage from "./pages/Card";
import NotFoundPage from "./pages/NotFound";

// import { Spin } from "antd";

import { connect } from "react-redux";
import { addUserAction } from "./actions/userAction";

import FirebaseContext from "./context/firebaseContext";
import { PrivateRoute } from "./utils/PrivateRoute";
import { bindActionCreators } from "redux";
// import { UnorderedListOutlined } from "@ant-design/icons";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    const { addUser } = this.props;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        localStorage.setItem("user", JSON.stringify(user.uid));
        addUser(user);
        this.setState({
          user,
        });
      } else {
        setUserUid(null);
        localStorage.removeItem("user");
        this.setState({
          user: false,
        });
      }
    });
  }

  render() {
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
    userUid: state.user.userUid,
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
