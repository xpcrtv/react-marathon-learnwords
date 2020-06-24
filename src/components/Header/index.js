import React from "react";
import s from "./Header.module.scss";

const Header = ({ logoSrc, title, links }) => {
  return (
    <header className={s.header}>
      {logoSrc && (
        <a href="/" className={s.logo}>
          <img src={logoSrc} alt="" />
        </a>
      )}
      {title && <h1 className={s.header__title}>{title}</h1>}
    </header>
  );
};

export default Header;
