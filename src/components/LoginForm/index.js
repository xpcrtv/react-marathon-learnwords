import React, { Component } from "react";

import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

class LoginForm extends Component {
  state = {
    validateStatus: null,
    errorMsg: null,
    isLoading: false,
  };

  loginHandle = ({ email, password }) => {
    const { signWithEmail } = this.context;
    const { history } = this.props;
    signWithEmail(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user.uid));
        history.push("/");
        this.setState({
          isLoading: false,
        });
      })
      .catch((err) => this.onFinishFailed(err));
  };

  errorHandle = () => {
    this.setState({
      isLoading: false,
      validateStatus: "error",
      errorMsg: "Email или пароль введены неверно",
    });
  };

  onFinish = (values) => {
    this.setState(
      {
        isLoading: true,
      },
      () => this.loginHandle(values)
    );
  };

  onFinishFailed = () => {
    this.setState(
      {
        isLoading: true,
      },
      this.errorHandle
    );
  };

  render() {
    const { validateStatus, errorMsg, isLoading } = this.state;
    return (
      <Form onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
        <Form.Item
          validateStatus={validateStatus}
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
          help={errorMsg}
          validateStatus={validateStatus}
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
            loading={isLoading}
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
