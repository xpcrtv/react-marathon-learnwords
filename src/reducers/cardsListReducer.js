import { GET_CARDS } from "../actions/actionTypes";

const cardsListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    default:
      return state;
  }
};

export default cardsListReducer;
