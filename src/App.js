import React from "react";
import Header from "./components/Header";
import HeaderBlock from "./components/HeaderBlock";
import TextBlock from "./components/TextBlock";
import BgImageBlock from "./components/BgImageBlock";

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
