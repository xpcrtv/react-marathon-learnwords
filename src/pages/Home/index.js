import React, { Component } from "react";

import Header from "../../components/Header";
import HeaderBlock from "../../components/HeaderBlock";
import Paragraph from "../../components/Paragraph";
import BgImageBlock from "../../components/BgImageBlock";

import CardList from "../../components/CardList";
import FeaturesList from "../../components/FeaturesList";
import SubscribeBlock from "../../components/SubscribeBlock";

import { featuresContent as features } from "../../data/featuresContent";

import Footer from "../../components/Footer";
import logo from "../../logo.svg";
import subscribeImg from "../../assets/img/449.jpg";
import cardsImg from "../../assets/img/450.jpg";
import FirebaseContext from "../../context/firebaseContext";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCardsAction } from "../../actions/cardsListAction";

class HomePage extends Component {
  state = {
    features,
  };

  componentDidMount() {
    const { getCards } = this.props;
    const { getUserCardsRef } = this.context;
    getUserCardsRef().on("value", (res) => {
      const resValues = res.val() || [];
      const wordsarray = Object.keys(resValues).map((key) => ({
        id: key,
        ...resValues[key],
      }));
      getCards(wordsarray);
    });
  }

  render() {
    const { features } = this.state;
    const { cards } = this.props;
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
          <CardList data={cards} />
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

const mapStateToProps = (state) => {
  return {
    userUid: state.user.userUid,
    cards: state.cards.cards,
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
