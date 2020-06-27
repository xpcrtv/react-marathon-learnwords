import React from "react";
import s from "./HeaderBlock.module.scss";

const HeaderBlock = ({ title, hideBackground = false, description, children }) => {
  const styleCover = hideBackground ? { backgroundImage: "none" } : {};
  return (
    <div className={s.cover} style={styleCover}>
      <div className={s.wrap}>
        {title && <h1 className={s.header}>{title}</h1>}
        {description && <p className={s.descr}>{description}</p>}
        {children}
      </div>
    </div>
  );
};

export default HeaderBlock;
