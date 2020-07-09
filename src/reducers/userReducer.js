import { ADD_USER, REMOVE_USER } from "../actions/actionTypes";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        userUid: action.user.uid,
        userEmail: action.user.email,
      };
    case REMOVE_USER:
      return {
        ...state,
        userUid: null,
        userEmail: null,
      };

    default:
      return state;
  }
};

export default userReducer;
