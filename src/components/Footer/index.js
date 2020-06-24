import React from "react";
import s from "./Footer.module.scss";

const Footer = ({ text }) => {
  return <footer className={s.footer}>{text}</footer>;
};

export default Footer;
