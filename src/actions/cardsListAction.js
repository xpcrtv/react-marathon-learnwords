import {
  FETCH_CARDS,
  FETCH_CARDS_RESOLVE,
  FETCH_CARDS_REJECT,
} from "./actionTypes";

export const getCardsAction = (getData) => {
  return (dispatch) => {
    dispatch(fetchCardsAction());
    getData().on(
      "value",
      (res) => {
        const resValues = res.val() || [];
        const wordsarray = Object.keys(resValues).map((key) => ({
          id: key,
          ...resValues[key],
        }));
        dispatch(fetchCardsActionResolve(wordsarray));
      },
      (err) => dispatch(fetchCardsActionReject(err))
    );
  };
};

export const fetchCardsAction = () => ({
  type: FETCH_CARDS,
});

export const fetchCardsActionResolve = (cards) => ({
  type: FETCH_CARDS_RESOLVE,
  cards,
});

export const fetchCardsActionReject = (error) => ({
  type: FETCH_CARDS_REJECT,
  error,
});
