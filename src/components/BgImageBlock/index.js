import React from "react";
import s from "./BgImageBlock.module.scss";

const BgImageBlock = ({ imgSrc, bgcSize = "cover" }) => {
  const styleImg = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};
  const styleBgSize = { backgroundSize: bgcSize };
  const customStyles = { ...styleImg, ...styleBgSize };
  return <div className={s.bgImageBlock} style={customStyles}></div>;
};

export default BgImageBlock;
