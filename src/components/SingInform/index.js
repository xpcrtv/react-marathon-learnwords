import React, { Component } from "react";

import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

class SignInForm extends Component {
  onFinish = ({ email, password }) => {
    const { createUserWithemail } = this.context;
    createUserWithemail(email, password).then((res) => console.log(res));
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

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SignInForm.contextType = FirebaseContext;

export default SignInForm;
