import React, { Component } from "react";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import classnames from "classnames";
import s from "./Card.module.scss";

class Card extends Component {
  state = {
    done: false,
    isRemembered: false,
  };

  toggleCard = () => {
    if (!this.state.isRemembered) {
      this.setState(({ done }) => {
        return {
          done: !done,
        };
      });
    }
  };

  rememberCard = (event) => {
    event.preventDefault();
    this.setState(({ isRemembered }) => {
      return {
        done: true,
        isRemembered: true,
      };
    });
  };

  deleteCard = (event) => {
    event.preventDefault();
    this.props.onDeleteCard();
  };

  render() {
    const { eng, rus } = this.props;
    const { done, isRemembered } = this.state;
    const cardClass = classnames(s.card, { [s.done]: done });
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
          <button className={s.cardRememberBtn} onClick={this.rememberCard} disabled={isRemembered}>
            <CheckCircleOutlined />
          </button>
          <button className={s.cardCloseBtn} onClick={this.deleteCard}>
            <CloseCircleOutlined />
          </button>
        </div>
      </div>
    );
  }
}
export default Card;
