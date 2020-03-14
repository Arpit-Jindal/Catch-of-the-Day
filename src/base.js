import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCdY5lf5cMypYsRTcU5JCb-AHccTmCw_U0",
  authDomain: "catch-of-the-day-2-330dc.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-2-330dc.firebaseio.com"
});
const base = Rebase.createClass(firebaseApp.database());

//Named export
export { firebaseApp };

//Default export
export default base;
