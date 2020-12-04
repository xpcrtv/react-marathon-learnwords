import React, { useState, useContext } from "react";

import { UserOutlined, LockOutlined, UserAddOutlined } from "@ant-design/icons";
import { Form, Input, Button } from "antd";

import FirebaseContext from "../../context/firebaseContext";

const SignInForm = (props) => {
  const firebase = useContext(FirebaseContext);
  const [validateStatus, setValidateStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setLoadingState] = useState(false);

  const { createUserWithemail } = firebase;
  const { history } = props;

  const onFinish = ({ email, password }) => {
    setLoadingState(true);
    createUserWithemail(email, password)
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.user.uid));
        setLoadingState(false);
        history.push("/");
      })
      .catch((error) => onFinishFailed(error));
  };

  const onFinishFailed = (error) => {
    setLoadingState(false);
    setValidateStatus("error");
    const errMessages = {
      "auth/invalid-email": "Введите корректный email",
      "auth/weak-password":
        "Придумайте более сложный пароль, не менее 6 символов",
      "auth/email-already-in-use": "Возможно пользователь уже существует",
    };
    setErrorMsg(errMessages[error.code]);
  };

  return (
    <Form onFinish={onFinish} onFinishFailed={onFinishFailed}>
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
          loading={isLoading}
          icon={<UserAddOutlined />}
        >
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignInForm;
