import React, { useState } from "react";

import s from "./Login.module.scss";
import logoSrc from "../../logo.svg";

import LoginForm from "../../components/LoginForm";
import SingInform from "../../components/SingInform";
import BlockTitle from "../../components/BlockTitle";

import { Layout, Button } from "antd";
const { Content } = Layout;

const LoginPage = (props) => {
  const [isSignIn, setSignIn] = useState(false);

  const toggleForms = () => {
    setSignIn(() => !isSignIn);
  };

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
              {isSignIn ? <SingInform {...props} /> : <LoginForm {...props} />}
              <div className={s.loginCardControls}>
                <Button type="link" onClick={toggleForms}>
                  {isSignIn ? "Вход" : "Регистрация"}
                </Button>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default LoginPage;
