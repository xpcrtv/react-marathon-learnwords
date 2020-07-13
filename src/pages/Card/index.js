import React, { Component } from "react";
import s from "./CardPage.module.scss";

import BlockTitle from "../../components/BlockTitle";

import { SaveOutlined, RollbackOutlined } from "@ant-design/icons";
import { Form, Input, Button, Switch } from "antd";

import FirebaseContext from "../../context/firebaseContext";

class CardPage extends Component {
  formRef = React.createRef();

  componentDidMount() {
    const { getUserCardRef } = this.context;
    const { history, match } = this.props;
    const { id } = match.params;
    getUserCardRef(id)
      .once("value")
      .then((res) => {
        const { eng, rus, isRemembered } = res.val();
        this.formRef.current.setFieldsValue({
          eng,
          rus,
          isRemembered,
        });
      })
      .catch((err) => {
        console.log(err);
        history.push("/404");
      });
  }

  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  onFinish = (values) => {
    const { updateUserCard } = this.context;
    const { history, match } = this.props;
    const { id } = match.params;
    updateUserCard(id, values).then(() => history.goBack());
  };
  onFinishFailed = (error) => console.log(error);
  render() {
    return (
      <div className={s.cardPage}>
        <div className={s.cardPage_wrap}>
          <div className={s.cardPage_backBtn}>
            <Button
              onClick={this.handleBack}
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
              ref={this.formRef}
              layout="vertical"
              name="basic"
              onFinish={this.onFinish}
              onFinishFailed={this.onFinishFailed}
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
  }
}

CardPage.contextType = FirebaseContext;

export default CardPage;
