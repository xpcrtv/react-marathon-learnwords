import {
  FETCH_CARDS,
  FETCH_CARDS_RESOLVE,
  FETCH_CARDS_REJECT,
} from "../actions/actionTypes";

const cardsListReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CARDS:
      return {
        ...state,
        isCardsLoading: true,
        cards: null,
        cardsError: null,
      };
    case FETCH_CARDS_RESOLVE:
      return {
        ...state,
        isCardsLoading: false,
        cards: action.cards,
        cardsError: null,
      };
    case FETCH_CARDS_REJECT:
      return {
        ...state,
        isCardsLoading: false,
        cards: null,
        cardsError: action.err,
      };
    default:
      return state;
  }
};

export default cardsListReducer;
