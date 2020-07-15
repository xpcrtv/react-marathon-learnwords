import { combineReducers } from "redux";
import userReducer from "./userReducer";
import cardsListReducer from "./cardsListReducer";
import cardListReducer from "./cardPageReducer";

export default combineReducers({
  user: userReducer,
  cards: cardsListReducer,
  card: cardListReducer
});
