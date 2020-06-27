import React from "react";
import FeatureBlock from "../FeatureBlock";

import s from "./FeatureList.module.scss";

const FeatureList = ({ data }) => {
  return (
    <div className={s.features}>
      {data.map(({ id, ...feature }) => (
        <FeatureBlock key={id} feature={feature} />
      ))}
    </div>
  );
};

export default FeatureList;
