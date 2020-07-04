import React, { Component } from "react";

import { getTranslatedWord } from "../../services/dictionary";
import Card from "../Card";
import BlockTitle from "../BlockTitle";

import { SwapOutlined, FileAddOutlined } from "@ant-design/icons";
import { Form, Button, Input } from "antd";

import s from "./CardList.module.scss";

import FirebaseContext from "../../context/firebaseContext";

class CardList extends Component {
  state = {
    wordRus: "",
    wordEng: "",
    isTranslating: false,
    isAddingWord: false,
  };

  addCard = () => {
    const { getUserCardsRef } = this.context;
    getUserCardsRef()
      .push()
      .set({
        rus: this.state.wordRus,
        eng: this.state.wordEng,
        isRemembered: false,
      })
      .then(() => {
        this.setState({
          isAddingWord: false,
        });
      });
  };

  changeInputValue = (event) => {
    const { dataset, value } = event.target;
    this.setState(() => {
      return {
        [dataset.lang]: value,
      };
    });
  };

  translateWord = async () => {
    const { wordEng } = this.state;
    const translatedWord = await getTranslatedWord(wordEng);
    this.setState(() => {
      return {
        wordRus: translatedWord.translate,
        isTranslating: false,
      };
    });
  };

  handleAddWord = (event) => {
    event.preventDefault();
    this.setState(
      {
        isAddingWord: true,
      },
      this.addCard
    );
  };

  handleTranslate = async () => {
    this.setState(
      {
        isTranslating: true,
      },
      this.translateWord
    );
  };

  render() {
    const { data = [] } = this.props;
    const { wordEng, wordRus, isTranslating, isAddingWord } = this.state;
    return (
      <>
        <BlockTitle color="white">
          Кликайте по карточкам и узнавайте новые слова!
        </BlockTitle>
        <Form layout="horizontal">
          <Input.Group compact>
            <Input
              placeholder="Слово на английском"
              data-lang="wordEng"
              value={wordEng}
              onChange={this.changeInputValue}
              prefix="ENG"
              style={{ width: "32.5%" }}
            />
            <Button
              type="primary"
              onClick={this.handleTranslate}
              icon={<SwapOutlined />}
              loading={isTranslating}
              style={{ width: "5%" }}
            />
            <Input
              placeholder="Слово на русском"
              data-lang="wordRus"
              value={wordRus}
              onChange={this.changeInputValue}
              prefix="РУС"
              style={{ width: "30%" }}
            />
            <Button
              type="primary"
              icon={<FileAddOutlined />}
              onClick={this.handleAddWord}
              style={{ width: "32.5%" }}
              loading={isAddingWord}
            >
              Добавить слово
            </Button>
          </Input.Group>
        </Form>
        <div className={s.cards}>
          {data.map((cardData) => (
            <Card key={cardData.id} cardData={cardData} />
          ))}
        </div>
      </>
    );
  }
}

CardList.contextType = FirebaseContext;

export default CardList;
