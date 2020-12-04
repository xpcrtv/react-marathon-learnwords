import React, { useState, useContext } from "react";

import { UserOutlined, LockOutlined, LoginOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

const LoginForm = (props) => {
  const firebase = useContext(FirebaseContext);
  const [validateStatus, setValidateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoadingState] = useState(false);

  const { signWithEmail } = firebase;
  const { history } = props;

  const onFinish = ({ email, password }) => {
    setLoadingState(true);
    signWithEmail(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user.uid));
        setLoadingState(false);
        history.push("/");
      })
      .catch((err) => onFinishFailed(err));
  };

  const onFinishFailed = () => {
    setLoadingState(false);
    setValidateStatus("error");
    setErrorMsg("Email или пароль введены неверно");
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
};

export default LoginForm;
