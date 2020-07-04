import React, { Component } from "react";

import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

class LoginForm extends Component {
  onFinish = ({ email, password }) => {
    const { signWithEmail } = this.context;
    signWithEmail(email, password).then((res) => console.log(res));
  };
  render() {
    return (
      <Form onFinish={this.onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Введите свой email!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="email" type="email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Введите пароль!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 10, offset: 7 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            icon={<LoginOutlined />}
          >
            Войти
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

LoginForm.contextType = FirebaseContext;

export default LoginForm;
