import React, { Component } from "react";
import s from "./App.module.scss";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import FirebaseContext from "./context/firebaseContext";

import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

class App extends Component {
  state = {
    user: null,
  };

  componentDidMount() {
    const { auth, setUserUid } = this.context;
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
        this.setState({
          user,
        });
      } else {
        setUserUid(null);
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
        <div className={s.loader_wrap}>
          <Spin size="large" indicator={<LoadingOutlined />} />
        </div>
      );
    }
    return <>{user ? <HomePage /> : <LoginPage />}</>;
  }
}

App.contextType = FirebaseContext;

export default App;
