import firebase from "firebase/app";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCh42cYlsOzo02uKQR6IA1OqxaWlkSHqXg",
  authDomain: "api-posts-8c346.firebaseapp.com",
  databaseURL: "https://api-posts-8c346.firebaseio.com",
  projectId: "api-posts-8c346",
  storageBucket: "api-posts-8c346.appspot.com",
  messagingSenderId: "888358723829",
  appId: "1:888358723829:web:7345cd28964172853365bc",
};

firebase.initializeApp(config);

const storage = firebase.storage();

export { storage, firebase as deafult };
