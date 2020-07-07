import React, { Component } from "react";
import classnames from "classnames";

import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import s from "./Card.module.scss";

class Card extends Component {
  state = {
    done: false,
  };

  toggleCard = () => {
    this.setState(({ done }) => {
      return {
        done: !done,
      };
    });
  };

  render() {
    const { onDeleteCard, onUpdateCard, cardData, onEditCard } = this.props;
    const { eng, rus, isRemembered } = cardData;
    const { done } = this.state;
    const cardClass = classnames(s.card, { [s.done]: done || isRemembered });
    return (
      <div className={cardClass}>
        <div
          className={classnames(s.cardInner, {
            [s.cardRemembered]: isRemembered,
          })}
          onClick={this.toggleCard}
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
}

export default Card;
