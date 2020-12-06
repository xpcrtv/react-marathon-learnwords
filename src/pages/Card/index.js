import React, { useEffect, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";

import s from "./CardPage.module.scss";

import BlockTitle from "../../components/BlockTitle";

import { SaveOutlined, RollbackOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch, Spin } from "antd";

import FirebaseContext from "../../context/firebaseContext";
import { getCardAction } from "../../actions/cardPageAction";

const CardPage = (props) => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const isCardLoading = useSelector((state) => state.card.isCardLoading);
  const card = useSelector((state) => state.card.card);

  useEffect(() => {
    const { getUserCardRef } = firebase;
    const { match } = props;
    const { id } = match.params;
    dispatch(getCardAction(getUserCardRef, id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isCardLoading) {
      form.setFieldsValue(card);
    }
  }, [isCardLoading, form, card]);

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

  if (isCardLoading) {
    return (
      <div className={s.spinner_wrapper}>
        <Spin />
      </div>
    );
  }

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
