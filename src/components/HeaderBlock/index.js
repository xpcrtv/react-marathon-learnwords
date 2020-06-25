import React from "react";
import s from "./HeaderBlock.module.scss";
import { ReactComponent as ReactLogoSvg } from "../../logo.svg";

const HeaderBlock = ({ title, hideBackground = false, description }) => {
  const styleCover = hideBackground ? { backgroundImage: "none" } : {};
  return (
    <div className={s.cover} style={styleCover}>
      <div className={s.wrap}>
        {title && <h1 className={s.header}>{title}</h1>}
        <ReactLogoSvg />
        {description && <p className={s.descr}>{description}</p>}
      </div>
    </div>
  );
};

export default HeaderBlock;
