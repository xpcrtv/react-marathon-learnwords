import React, { Component } from "react";
import { SwapOutlined, FileAddOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card";
import BlockTitle from "../BlockTitle";
import s from "./CardList.module.scss";

class CardList extends Component {
  state = {
    wordRus: "",
    wordEng: "",
  };

  addCard = (event) => {
    event.preventDefault();
    this.props.onAddItem({
      id: uuidv4(),
      rus: this.state.wordRus,
      eng: this.state.wordEng,
    });
    this.setState(() => {
      return {
        wordEng: "",
        wordRus: "",
      };
    });
  };

  changeInputValue = (event) => {
    const { id, value } = event.target;
    this.setState(() => {
      return {
        [id]: value,
      };
    });
  };

  render() {
    const { data = [], onDeletedItem } = this.props;
    const { wordEng, wordRus } = this.state;
    return (
      <>
        <BlockTitle color="white">
          Кликайте по карточкам и узнавайте новые слова!
        </BlockTitle>
        <form className={s.cardsAddForm} onSubmit={this.addCard}>
          <label htmlFor="wordRus">
            Слово на русском
            <input
              type="text"
              id="wordRus"
              onChange={this.changeInputValue}
              value={wordRus}
            />
          </label>
          <i className={s.cardsAddFormIcon}><SwapOutlined /></i>
          <label htmlFor="wordEng">
            Перевод слова
            <input
              type="text"
              id="wordEng"
              onChange={this.changeInputValue}
              value={wordEng}
            />
          </label>
          <button className={s.cardsAddFormBtn}> <FileAddOutlined /> Добавить слово</button>
        </form>
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
