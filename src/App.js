import React from "react";
import Header from "./components/Header";
import HeaderBlock from "./components/HeaderBlock";
import Paragraph from "./components/Paragraph";
import BgImageBlock from "./components/BgImageBlock";

import CardList from "./components/CardList";
import FeaturesList from "./components/FeaturesList";
import SubscribeBlock from "./components/SubscribeBlock";

import { wordsList as words } from "./data/wordsList";
import { featuresContent as features } from "./data/featuresContent";

import Footer from "./components/Footer";
import logo from "./logo.svg";
import subscribeImg from "./assets/img/449.jpg";
import cardsImg from "./assets/img/450.jpg";

const App = () => {
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
        <CardList data={words} />
      </BgImageBlock>
      <BgImageBlock imgSrc={subscribeImg} bgcSize="cover">
        <SubscribeBlock />
      </BgImageBlock>
      <Footer text={`Learn words | ${new Date().getFullYear()}`} />
    </>
  );
};

export default App;
