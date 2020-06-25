import React from "react";
import s from "./TextBlock.module.scss";

const TextBlock = ({ text, invertedColor = false, fontSize }) => {
  const styleColor = invertedColor ? { color: "white", backgroundColor: "rgb(26, 40, 120)" } : {};
  const styleFontSize = fontSize ? { fontSize: fontSize } : {};
  const customStyle = { ...styleColor, ...styleFontSize };

  return text ? (
    <section className={s.textBlock} style={customStyle}>
      <p>{text}</p>
    </section>
  ) : null;
};

export default TextBlock;
