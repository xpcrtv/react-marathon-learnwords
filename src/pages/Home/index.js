import React, { Component } from "react";
// import s from "./Home.module.scss";

import Header from "../../components/Header";
import HeaderBlock from "../../components/HeaderBlock";
import Paragraph from "../../components/Paragraph";
import BgImageBlock from "../../components/BgImageBlock";
import CardList from "../../components/CardList";
import FeaturesList from "../../components/FeaturesList";
import SubscribeBlock from "../../components/SubscribeBlock";

import FirebaseContext from "../../context/firebaseContext";
import { featuresContent as features } from "../../data/featuresContent";

import Footer from "../../components/Footer";
import logo from "../../logo.svg";
import subscribeImg from "../../assets/img/449.jpg";
import cardsImg from "../../assets/img/450.jpg";

class HomePage extends Component {
  state = {
    words: [],
    features,
  };

  componentDidMount() {
    const { getUserCardsRef } = this.context;
    getUserCardsRef().on("value", (response) => {
      this.setState({
        words: response.val() || [],
      });
    });
  }

  deleteWord = (id) => {
    const { words } = this.state;
    const { getUserCardsRef } = this.context;
    const newWordsList = words.filter((word) => word.id !== id);
    getUserCardsRef().set(newWordsList);
  };

  addWord = (word) => {
    const { words } = this.state;
    const { getUserCardsRef } = this.context;
    getUserCardsRef().set([...words, word]);
  };

  render() {
    const { words, features } = this.state;
    return (
      <>
        <Header logoSrc={logo} title="Learn words" />
        <HeaderBlock title="Учите слова онлайн">
          <Paragraph color="white">
            Воспользуйтесь карточками для запоминания и пополнения активныйх
            словарных запасов
          </Paragraph>
        </HeaderBlock>
        <FeaturesList data={features} />
        <BgImageBlock imgSrc={cardsImg} bgcSize="cover">
          <CardList
            data={words}
            onDeletedItem={this.deleteWord}
            onAddItem={this.addWord}
          />
        </BgImageBlock>
        <BgImageBlock imgSrc={subscribeImg} bgcSize="cover">
          <SubscribeBlock />
        </BgImageBlock>
        <Footer text={`Learn words | ${new Date().getFullYear()}`} />
      </>
    );
  }
}

HomePage.contextType = FirebaseContext;

export default HomePage;
