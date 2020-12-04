import React, { useState } from "react";
import classnames from "classnames";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";

function Card(props) {
  const [isDone, setDone] = useState(false);
  const { onDeleteCard, onUpdateCard, cardData, onEditCard } = props;
  const { eng, rus, isRemembered } = cardData;
  const cardClass = classnames(s.card, { [s.done]: isDone || isRemembered });

  return (
    <div className={cardClass}>
      <div
        className={classnames(s.cardInner, {
          [s.cardRemembered]: isRemembered,
        })}
        onClick={() => setDone((s) => !s)}
      >
        <div className={s.cardFront}>{eng}</div>
        <div className={s.cardBack}>{rus}</div>
      </div>
      <div className={s.cardControls}>
        <button
          className={s.cardRememberBtn}
          onClick={onUpdateCard}
          disabled={isRemembered}
        >
          <CheckCircleOutlined />
        </button>
        <button className={s.cardEditBtn} onClick={onEditCard}>
          <EditOutlined />
        </button>
        <button className={s.cardCloseBtn} onClick={onDeleteCard}>
          <CloseCircleOutlined />
        </button>
      </div>
    </div>
  );
}

export default Card;
