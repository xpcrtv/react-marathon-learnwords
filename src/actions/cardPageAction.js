import {
  FETCH_CARD,
  FETCH_CARD_RESOLVE,
  FETCH_CARD_REJECT,
} from "./actionTypes";

export const getCardAction = (getData, id) => {
  return (dispatch) => {
    dispatch(fetchCardAction());
    getData(id)
      .once("value")
      .then(
        (res) => {
          if (res.exists()) {
            const { eng, rus, isRemembered } = res.val();
            const cardData = { eng, rus, isRemembered };
            dispatch(fetchCardActionResolve(cardData));
          }
        },
        (err) => dispatch(fetchCardActionReject(err))
      );
  };
};

export const fetchCardAction = () => ({
  type: FETCH_CARD,
});

export const fetchCardActionResolve = (card) => ({
  type: FETCH_CARD_RESOLVE,
  card,
});

export const fetchCardActionReject = (error) => ({
  type: FETCH_CARD_REJECT,
  error,
});
