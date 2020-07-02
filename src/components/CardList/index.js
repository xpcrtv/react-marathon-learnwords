import React, { Component } from "react";
import { SwapOutlined, FileAddOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { getTranslatedWord } from "../../services/dictionary";
import { Form, Button, Input } from "antd";
import Card from "../Card";
import BlockTitle from "../BlockTitle";
import s from "./CardList.module.scss";

class CardList extends Component {
  state = {
    wordRus: "",
    wordEng: "",
    isTranslating: false,
    isAddingWord: false,
  };

  addCard = () => {
    this.props.onAddItem({
      id: uuidv4(),
      rus: this.state.wordRus,
      eng: this.state.wordEng,
    });
    this.setState(() => {
      return {
        wordEng: "",
        wordRus: "",
        isAddingWord: false,
      };
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
    const { data = [], onDeletedItem } = this.props;
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
          {data.map(({ id, eng, rus }) => (
            <Card
              key={id}
              eng={eng}
              rus={rus}
              onDeleteCard={() => onDeletedItem(id)}
            />
          ))}
        </div>
      </>
    );
  }
}

export default CardList;
