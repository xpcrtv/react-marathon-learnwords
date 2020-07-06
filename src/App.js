import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import s from "./App.module.scss";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import CardPage from "./pages/Card";
import NotFoundPage from "./pages/NotFound";

import { Layout, Spin } from "antd";

import FirebaseContext from "./context/firebaseContext";
import { PrivateRoute } from "./utils/PrivateRoute";

const { Content } = Layout;

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        localStorage.setItem("user", JSON.stringify(user.uid));
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
    const { user } = this.state;
    if (user === null) {
      return (
        <div className={s.spinner_wrap}>
          <Spin size="large" />
        </div>
      );
    }

    return (
      <>
        <Route path="/login" component={LoginPage} />
        <Route
          render={() => (
            <Layout>
              <Content>
                <Switch>
                  <PrivateRoute path="/" exact component={HomePage} />
                  <PrivateRoute path="/home" component={HomePage} />
                  <PrivateRoute path="/cards/:id" component={CardPage} />
                  <Route component={NotFoundPage} />
                </Switch>
              </Content>
            </Layout>
          )}
        />
      </>
    );
  }
}

App.contextType = FirebaseContext;

export default App;
