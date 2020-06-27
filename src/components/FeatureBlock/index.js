import React from "react";
import Paragraph from "../Paragraph";
import BlockTitle from "../BlockTitle";

import s from "./FeatureBlock.module.scss";

const FeatureBlock = ({ feature }) => {
  const { title, text, imgSrc } = feature;
  return (
    <div className={s.feature}>
      <div className={s.feature__content}>
        <BlockTitle>{title}</BlockTitle>
        <Paragraph>{text}</Paragraph>
      </div>
      <div className={s.feature__image}>
        <img src={imgSrc} alt=""/>
      </div>
    </div>
  );
};

export default FeatureBlock;
