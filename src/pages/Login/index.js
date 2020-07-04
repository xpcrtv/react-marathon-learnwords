import React, { Component } from "react";
import s from "./Login.module.scss";

import LoginForm from "../../components/LoginForm";
import SingInform from "../../components/SingInform";

import { Layout, Button } from "antd";
import FirebaseContext from "../../context/firebaseContext";
const { Content } = Layout;

class LoginPage extends Component {
  state = {
    isSignIn: false,
  };
  toggleForms = () => {
    this.setState(({ isSignIn }) => {
      return {
        isSignIn: !isSignIn,
      };
    });
  };
  render() {
    const { isSignIn } = this.state;
    return (
      <>
        <Layout>
          <Content>
            <div className={s.loginPage}>
              <div className={s.loginCard}>
                <h2>
                  {isSignIn ? "Приветствуем тебя!" : "Вход на LearnWords"}
                </h2>
                {isSignIn ? <SingInform /> : <LoginForm />}
                <div className={s.loginCardControls}>
                  <span>или</span>
                  <Button onClick={this.toggleForms}>
                    {isSignIn ? "Вход" : "Регистрация"}
                  </Button>
                </div>
              </div>
            </div>
          </Content>
        </Layout>
      </>
    );
  }
}

LoginPage.contextType = FirebaseContext;

export default LoginPage;
