import React, { Component } from "react";
import s from "./Login.module.scss";

import LoginForm from "../../components/LoginForm";
import SingInform from "../../components/SingInform";
import BlockTitle from "../../components/BlockTitle";

import { Layout, Button } from "antd";
import FirebaseContext from "../../context/firebaseContext";

import logoSrc from "../../logo.svg";

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
                <div className={s.loginCardLogo}>
                  <img src={logoSrc} alt="" />
                </div>
                <BlockTitle>
                  {isSignIn ? "Приветствуем тебя!" : "Вход на LearnWords"}
                </BlockTitle>
                {isSignIn ? <SingInform /> : <LoginForm />}
                <div className={s.loginCardControls}>
                  <Button type="link" onClick={this.toggleForms}>
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
