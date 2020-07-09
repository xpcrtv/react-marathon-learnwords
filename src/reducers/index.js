import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cardsListReducer from "./cardsListReducer";

export default combineReducers({
  user: userReducer,
  cards: cardsListReducer,
});
