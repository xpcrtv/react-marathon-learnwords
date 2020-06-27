import React from "react";
import Card from "../Card";
import BlockTitle from "../BlockTitle";
import shuffleArray from "../../utils/shuffleArray";

import s from "./CardList.module.scss";

const CardList = ({ data }) => {
  return (
    <>
      <BlockTitle color="white">
        Кликайте по карточкам и узнавайте новые слова!
      </BlockTitle>
      <div className={s.cards}>
        {shuffleArray(data)
          .filter((el, idx) => idx < 5)
          .map(({ id, eng, rus }) => (
            <Card key={id} eng={eng} rus={rus} />
          ))}
      </div>
    </>
  );
};

export default CardList;
