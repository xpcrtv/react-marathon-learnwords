import React from "react";
import Header from "./components/Header";
import HeaderBlock from "./components/HeaderBlock";
import TextBlock from "./components/TextBlock";
import BgImageBlock from "./components/BgImageBlock";
import Card from "./components/Card";

import { wordsList } from "./data/wordsList";

import Footer from "./components/Footer";
import logo from "./logo.svg";

const App = () => {
  return (
    <>
      <Header logoSrc={logo} title="Learn words" />
      <HeaderBlock
        title="Учите слова онлайн"
        description="Воспользуйтесь карточками для запоминания и пополнения активныйх словарных запасов"
      />
      {wordsList.map(({ eng, rus }, idx) => (
        <Card key={idx} eng={eng} rus={rus} />
      ))}
      <TextBlock
        text="Общий текст для блока с общим текстом"
        fontSize="30px"
        invertedColor
      />
      <BgImageBlock imgSrc={logo} bgcSize="contain" />
      <Footer text={`Learn words | ${new Date().getFullYear()}`} />
    </>
  );
};

export default App;
