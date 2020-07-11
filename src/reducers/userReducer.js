import {
  REMOVE_USER,
  FETCH_USER,
  FETCH_USER_RESOLVE,
  FETCH_USER_REJECT,
} from "../actions/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REMOVE_USER:
      return {
        ...state,
        isAuth: false,
        userUid: null,
        userEmail: null,
      };
    case FETCH_USER:
      return {
        ...state,
        isAuth: false,
        isAppLoading: true,
        appError: null,
        userUid: null,
        userEmail: null,
      };
    case FETCH_USER_RESOLVE:
      return {
        ...state,
        isAuth: true,
        isAppLoading: false,
        appError: null,
        userUid: action.user.uid,
        userEmail: action.user.email,
      };
    case FETCH_USER_REJECT:
      return {
        ...state,
        isAuth: false,
        isAppLoading: false,
        appError: action.error,
        userUid: null,
        userEmail: null,
      };

    default:
      return state;
  }
};

export default userReducer;
