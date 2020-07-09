import { ADD_USER, REMOVE_USER } from "./actionTypes";

export const addUserAction = (user) => ({
  type: ADD_USER,
  user,
});

export const removeUserAction = () => ({
  type: REMOVE_USER,
});
