import React, { Component } from "react";
import classnames from "classnames";
import s from "./Card.module.scss";

class Card extends Component {
  state = {
    done: false,
  };

  toggleCard = () => {
    this.setState({
      done: !this.state.done,
    });
  };

  render() {
    const { eng, rus } = this.props;
    const { done } = this.state;
    const cardClass = classnames(s.card, {[s.done]: done});
    return (
      <div className={cardClass} onClick={this.toggleCard}>
        <div className={s.cardInner}>
          <div className={s.cardFront}>{eng}</div>
          <div className={s.cardBack}>{rus}</div>
        </div>
      </div>
    );
  }
}
export default Card;
