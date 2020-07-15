import React, { useContext, useMemo } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import s from "./CardList.module.scss";

import Card from "../Card";

import { Spin } from "antd";

import FirebaseContext from "../../context/firebaseContext";
import { getCardsAction } from "../../actions/cardsListAction";

const CardList = (props) => {
  const firebase = useContext(FirebaseContext);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cards || []);
  const isCardsLoading = useSelector((state) => state.cards.isCardsLoading);
  const { history } = props;
  const { getUserCardsRef, removeUserCard, updateUserCard } = firebase;

  useMemo(() => dispatch(getCardsAction(getUserCardsRef)), [
    dispatch,
    getUserCardsRef,
  ]);

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

export default withRouter(CardList);
