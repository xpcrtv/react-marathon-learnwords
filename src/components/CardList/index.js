import React, { useEffect, useContext } from "react";
import s from "./CardList.module.scss";

import Card from "../Card";

import { Spin } from "antd";

import FirebaseContext from "../../context/firebaseContext";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getCardsAction } from "../../actions/cardsListAction";

const CardList = (props) => {
  const firebase = useContext(FirebaseContext);
  const { getCards, cards, isCardsLoading, history } = props;
  const { getUserCardsRef, removeUserCard, updateUserCard } = firebase;

  useEffect(() => {
    getCards(getUserCardsRef);
  }, [getCards, getUserCardsRef]);

  const removeCard = (id) => {
    removeUserCard(id);
  };

  const rememberCard = (id) => {
    updateUserCard(id, { isRemembered: true });
  };

  const editCard = (id) => {
    history.push(`/cards/${id}`);
  };

  if (isCardsLoading) {
    return (
      <div className={s.cards}>
        <Spin />
      </div>
    );
  }

  return (
    <>
      <div className={s.cards}>
        {cards.map((cardData) => (
          <Card
            key={cardData.id}
            cardData={cardData}
            onDeleteCard={() => removeCard(cardData.id)}
            onUpdateCard={() => rememberCard(cardData.id)}
            onEditCard={() => editCard(cardData.id)}
          />
        ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cards: state.cards.cards || [],
    isCardsLoading: state.cards.isCardsLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCards: getCardsAction,
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CardList));
