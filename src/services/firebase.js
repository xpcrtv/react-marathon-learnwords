import * as firebase from "firebase/app";

import "firebase/database";
import "firebase/auth";

const {
  REACT_APP_DB_API_KEY,
  REACT_APP_AUTHDOMAIN,
  REACT_APP_DATABASEURL,
  REACT_APP_PROJECTID,
  REACT_APP_STORAGEBUCKET,
  REACT_APP_MESSAGINGSENDERID,
  REACT_APP_APPID,
} = process.env;

const firebaseConfig = {
  apiKey: REACT_APP_DB_API_KEY,
  authDomain: REACT_APP_AUTHDOMAIN,
  databaseURL: REACT_APP_DATABASEURL,
  projectId: REACT_APP_PROJECTID,
  storageBucket: REACT_APP_STORAGEBUCKET,
  messagingSenderId: REACT_APP_MESSAGINGSENDERID,
  appId: REACT_APP_APPID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(firebaseConfig);
    this.db = firebase.database();
    this.auth = firebase.auth();
    this.userUid = null;
  }

  setUserUid = (uid) => {
    this.userUid = uid;
  };

  getUserCardsRef = () => this.db.ref(`/cards/${this.userUid}`);

  getUserCardRef = (id) => this.db.ref(`/cards/${this.userUid}/${id}`);

  removeUserCard = (id) => this.db.ref(`/cards/${this.userUid}/${id}`).remove();

  updateUserCard = (id, update) =>
    this.db.ref(`/cards/${this.userUid}/${id}`).update(update);

  signWithEmail = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  createUserWithemail = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  logout = () => this.auth.signOut().catch((err) => (this.error = err));
}

export default Firebase;
