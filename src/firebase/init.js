import firebase from 'firebase/app'

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyD4Bi2fgFEJIDCi2k9ZPUiD09gL4aaIqMg",
  authDomain: "shoppy-market.firebaseapp.com",
  databaseURL: "https://shoppy-market.firebaseio.com",
  projectId: "shoppy-market",
  storageBucket: "shoppy-market.appspot.com",
  messagingSenderId: "1023447207751",
  appId: "1:1023447207751:web:5bdc248a735233d0b74662"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore()