import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { getTranslatedWord } from "../../services/dictionary";
import Card from "../Card";
import BlockTitle from "../BlockTitle";

import { SwapOutlined, FileAddOutlined } from "@ant-design/icons";
import { Form, Button, Input, Spin } from "antd";

import s from "./CardList.module.scss";
import FirebaseContext from "../../context/firebaseContext";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCardsAction } from "../../actions/cardsListAction";

class CardList extends Component {
  state = {
    wordRus: "",
    wordEng: "",
    isTranslating: false,
    isAddingWord: false,
  };

  componentDidMount() {
    const { getCards } = this.props;
    const { getUserCardsRef } = this.context;
    getCards(getUserCardsRef);
  }

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
          wordRus: "",
          wordEng: "",
          isAddingWord: false,
        });
      });
  };

  removeCard = (id) => {
    const { removeUserCard } = this.context;
    removeUserCard(id);
  };

  rememberCard = (id) => {
    const { updateUserCard } = this.context;
    updateUserCard(id, { isRemembered: true });
  };

  editCard = (id) => {
    const { history } = this.props;
    history.push(`/cards/${id}`);
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
    const { cards, isCardsLoading } = this.props;
    const { wordEng, wordRus, isTranslating, isAddingWord } = this.state;

    if (isCardsLoading) {
      return <Spin />;
    }

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
          {cards.map((cardData) => (
            <Card
              key={cardData.id}
              cardData={cardData}
              onDeleteCard={() => this.removeCard(cardData.id)}
              onUpdateCard={() => this.rememberCard(cardData.id)}
              onEditCard={() => this.editCard(cardData.id)}
            />
          ))}
        </div>
      </>
    );
  }
}

CardList.contextType = FirebaseContext;

const mapStateToProps = (state) => {
  return {
    cards: state.cards.cards || [],
    isCardsLoading: state.cards.isCardsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCards: getCardsAction,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardList));
