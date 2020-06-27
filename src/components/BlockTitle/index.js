import React from "react";
import s from "./BlockTitle.module.scss";

const BlockTitle = ({ color, children }) => {
  return <h2 className={s.title} style={{color: color}}>{children}</h2>;
};

export default BlockTitle;
