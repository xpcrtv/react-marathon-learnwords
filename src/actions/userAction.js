import {
  REMOVE_USER,
  FETCH_USER,
  FETCH_USER_RESOLVE,
  FETCH_USER_REJECT,
} from "./actionTypes";

export const addUserAction = (auth, setUid) => {
  return (dispatch) => {
    dispatch(fetchUsersAction());
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUid(user.uid);
        localStorage.setItem("user", JSON.stringify(user.uid));
        dispatch(fetchUserActionResolve(user));
      } else {
        setUid(null);
        localStorage.removeItem("user");
        dispatch(fetchUserActionReject());
      }
    });
  };
};

export const logoutAction = (auth) => {
  return (dispatch) => {
    dispatch(fetchUsersAction());
    auth
      .signOut()
      .then(() => {
        dispatch(removeUserAction());
        localStorage.removeItem("user");
      })
      .catch((err) => dispatch(fetchUserActionReject(err)));
  };
};

export const fetchUsersAction = () => ({
  type: FETCH_USER,
});

export const fetchUserActionResolve = (user) => ({
  type: FETCH_USER_RESOLVE,
  user,
});

export const fetchUserActionReject = (error) => ({
  type: FETCH_USER_REJECT,
  error,
});

export const removeUserAction = () => ({
  type: REMOVE_USER,
});
