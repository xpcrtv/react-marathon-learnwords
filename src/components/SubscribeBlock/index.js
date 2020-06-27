import React, { Component } from "react";
import BlockTitle from "../BlockTitle";
import classnames from "classnames";

import s from "./SubscribeBlock.module.scss";

class SubscribeBlock extends Component {
  state = {
    subscribed: false,
    titleText: "Подпишитесь, чтобы узнать больше!",
  };
  handleSubscribe = (event) => {
    event.preventDefault();
    const email = document.querySelector(`.${s.subscribe__input}`).value;
    this.setState({
      subscribed: true,
      titleText: `Письмо было отправленно на указанный Вами адрес! (${email})`,
    });
  };
  render() {
    const { subscribed, titleText } = this.state;
    const formClass = classnames(s.subscribe__form, {
      [s.subscribe__form_hide]: subscribed,
    });
    return (
      <>
        <BlockTitle color="white">{titleText}</BlockTitle>
        <div className={s.subscribe}>
          <form onSubmit={this.handleSubscribe} className={formClass}>
            <input
              className={s.subscribe__input}
              type="email"
              name="subscribe"
              id="subscribeEmail"
            />
            <button className={s.subscribe__btn} onClick={this.handleSubscribe}>
              Подписаться!
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default SubscribeBlock;
