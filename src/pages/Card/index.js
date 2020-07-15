import React, { useEffect, useContext } from "react";
import s from "./CardPage.module.scss";

import BlockTitle from "../../components/BlockTitle";

import { SaveOutlined, RollbackOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch } from "antd";

import FirebaseContext from "../../context/firebaseContext";

const CardPage = (props) => {
  const firebase = useContext(FirebaseContext);
  const [form] = Form.useForm();

  useEffect(() => {
    const { getUserCardRef } = firebase;
    const { history, match } = props;
    const { id } = match.params;
    getUserCardRef(id)
      .once("value")
      .then((res) => {
        const { eng, rus, isRemembered } = res.val();
        form.setFieldsValue({
          eng,
          rus,
          isRemembered,
        });
      })
      .catch((err) => {
        console.log(err);
        history.push("/404");
      });
  }, [firebase, props, form]);

  const handleBack = () => {
    const { history } = props;
    history.goBack();
  };

  const onFinish = (values) => {
    const { updateUserCard } = firebase;
    const { history, match } = props;
    const { id } = match.params;
    updateUserCard(id, values).then(() => history.goBack());
  };

  const onFinishFailed = (error) => console.log(error);

  return (
    <div className={s.cardPage}>
      <div className={s.cardPage_wrap}>
        <div className={s.cardPage_backBtn}>
          <Button
            onClick={handleBack}
            shape="round"
            type="dashed"
            icon={<RollbackOutlined />}
          >
            Назад
          </Button>
        </div>

        <BlockTitle className={s.cardPage_title}>
          Поменяйте карточку по своему усмотрению!
        </BlockTitle>
        <div className={s.cardPage_form}>
          <Form
            form={form}
            layout="vertical"
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="Слово на английском языке" name="eng">
              <Input suffix="ENG" />
            </Form.Item>

            <Form.Item label="Слово на русском языке" name="rus">
              <Input suffix="РУС" />
            </Form.Item>

            <Form.Item
              wrapperCol={{ span: 10, offset: 8 }}
              name="isRemembered"
              valuePropName="checked"
              value={false}
            >
              <Switch
                checkedChildren="Запомнил 😏"
                unCheckedChildren="Не помню 😶"
              />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 12, offset: 6 }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
              >
                Сохранить
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CardPage;
