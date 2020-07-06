import React, { Component } from "react";

import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

class SignInForm extends Component {
  state = {
    validateStatus: null,
    errorMsg: null,
  };

  onFinish = ({ email, password }) => {
    const { createUserWithemail } = this.context;
    const { history } = this.props;
    createUserWithemail(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user.uid));
        history.push("/");
      })
      .catch((error) => this.onFinishFailed(error));
  };

  onFinishFailed = (error) => {
    const errMessages = {
      "auth/invalid-email": "Введите корректный email",
      "auth/weak-password":
        "Придумайте более сложный пароль, не менее 6 символов",
      "auth/email-already-in-use": "Возможно пользователь уже существует",
    };
    this.setState({
      validateStatus: "error",
      errorMsg: errMessages[error.code],
    });
  };

  render() {
    const { validateStatus, errorMsg } = this.state;
    return (
      <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <Form.Item
          name="email"
          validateStatus={validateStatus}
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
          validateStatus={validateStatus}
          help={errorMsg}
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

        <Form.Item wrapperCol={{ span: 14, offset: 5 }}>
          <Button
            block
            type="primary"
            htmlType="submit"
            icon={<UserAddOutlined />}
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

SignInForm.contextType = FirebaseContext;

export default SignInForm;
