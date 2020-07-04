import React, { Component } from "react";
import classnames from "classnames";

import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import s from "./Card.module.scss";
import FirebaseContext from "../../context/firebaseContext";

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

  rememberCard = (event) => {
    event.preventDefault();
    const { updateUserCard } = this.context;
    const { id } = this.props.cardData;
    updateUserCard(id, { isRemembered: true }).then(() => {
      this.setState(() => {
        return {
          done: true,
        };
      });
    });
  };

  deleteCard = (event) => {
    event.preventDefault();
    const { removeUserCard } = this.context;
    const { id } = this.props.cardData;
    removeUserCard(id);
  };

  render() {
    const { eng, rus, isRemembered } = this.props.cardData;
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
            onClick={this.rememberCard}
            disabled={isRemembered}
          >
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

Card.contextType = FirebaseContext;

export default Card;
