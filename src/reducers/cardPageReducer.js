import {
  FETCH_CARD,
  FETCH_CARD_RESOLVE,
  FETCH_CARD_REJECT,
} from "../actions/actionTypes";

const cardPageReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CARD:
      return {
        ...state,
        isCardLoading: true,
        card: null,
        cardError: null,
      };
    case FETCH_CARD_RESOLVE:
      return {
        ...state,
        isCardLoading: false,
        card: action.card,
        cardError: null,
      };
    case FETCH_CARD_REJECT:
      return {
        ...state,
        isCardLoading: false,
        card: null,
        cardError: action.err,
      };
    default:
      return state;
  }
};

export default cardPageReducer;
