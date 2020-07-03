import React, { Component } from "react";
import s from "./Login.module.scss";

import BlockTitle from "../../components/BlockTitle";

import FirebaseContext from "../../context/firebaseContext";

import { LoginOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import { Layout, Form, Input, Button, Space } from "antd";

const { Content } = Layout;

class LoginPage extends Component {
  onFinish = ({ email, password }) => {
    const { signWithEmail } = this.context;
    signWithEmail(email.trim(), password.trim()).catch((err) => {
      console.log(err);
    });
  };
  onFinishFailed = (msgErr) => console.log(msgErr);

  renderForm = () => {
    const layout = {
      labelCol: {
        span: 24,
      },
      wrapperCol: {
        span: 24,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 0,
        span: 24,
      },
    };
    return (
      <Form
        {...layout}
        layout="vertical"
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Логин"
          name="email"
          type="email"
          rules={[
            {
              required: true,
              message: "Введите свой email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} />
        </Form.Item>

        <Form.Item
          label="Пароль"
          name="password"
          rules={[
            {
              required: true,
              message: "Введите свой пороль!",
            },
          ]}
        >
          <Input.Password prefix={<KeyOutlined />} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Space>
            <Button type="primary" htmlType="submit" icon={<LoginOutlined />}>
              Войти
            </Button>
          </Space>
        </Form.Item>
      </Form>
    );
  };

  render() {
    return (
      <Layout>
        <Content>
          <div className={s.page}>
            <div className={s.form_wrap}>
              <BlockTitle>Добро пожаловать в LearnWords!</BlockTitle>
              {this.renderForm()}
            </div>
          </div>
        </Content>
      </Layout>
    );
  }
}

LoginPage.contextType = FirebaseContext;

export default LoginPage;
