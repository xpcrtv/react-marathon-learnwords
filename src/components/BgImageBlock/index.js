import React from "react";
import s from "./BgImageBlock.module.scss";

const BgImageBlock = ({ imgSrc, bgcSize = "cover", children }) => {
  const styleImg = imgSrc ? { backgroundImage: `url(${imgSrc})` } : {};
  const styleBgSize = { backgroundSize: bgcSize };
  const customStyles = { ...styleImg, ...styleBgSize };
  return (
    <div className={s.bgImageBlock} style={customStyles}>
      {children}
    </div>
  );
};

export default BgImageBlock;
