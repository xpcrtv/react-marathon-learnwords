import { GET_CARDS } from "./actionTypes";

export const getCardsAction = (cards) => ({
  type: GET_CARDS,
  cards,
});
