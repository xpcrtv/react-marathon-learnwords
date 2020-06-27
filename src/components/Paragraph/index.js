import React from "react";
import s from "./Paragraph.module.scss";

const Paragraph = ({ color = "inherit", children }) => {
  return (
    <p className={s.paragraph} style={{ color: color }}>
      {children}
    </p>
  );
};

export default Paragraph;
