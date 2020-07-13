import React, { Component } from "react";

import s from "./Home.module.scss";

import Header from "../../components/Header";
import HeaderBlock from "../../components/HeaderBlock";
import Paragraph from "../../components/Paragraph";
import BgImageBlock from "../../components/BgImageBlock";

import CardList from "../../components/CardList";
import AddWordForm from "../../components/AddWordForm";
import FeaturesList from "../../components/FeaturesList";
import SubscribeBlock from "../../components/SubscribeBlock";

import { featuresContent as features } from "../../data/featuresContent";
import { Spin } from "antd";

import Footer from "../../components/Footer";
import logo from "../../logo.svg";
import subscribeImg from "../../assets/img/449.jpg";
import cardsImg from "../../assets/img/450.jpg";
import FirebaseContext from "../../context/firebaseContext";

import { connect } from "react-redux";

class HomePage extends Component {
  state = {
    features,
  };
  render() {
    const { features } = this.state;
    const { isAppLoading, isAuth } = this.props;
    if (isAppLoading || !isAuth) {
      return (
        <div className={s.spinner_wrap}>
          <Spin />
        </div>
      );
    }
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
          <AddWordForm />
          <CardList />
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
    isAuth: state.user.isAuth,
    isAppLoading: state.user.isAppLoading,
  };
};

export default connect(mapStateToProps, null)(HomePage);
