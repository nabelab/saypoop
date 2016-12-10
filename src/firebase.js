const firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

firebase.initializeApp({
  apiKey: __FIREBASE_API_KEY,
  authDomain: __FIREBASE_AUTH_DOMAIN,
  databaseURL: __FIREBASE_DATABASE_URL,
  storageBucket: __FIREBASE_STORAGE_BUCKET,
  messagingSenderId: __FIREBASE_MESSAGING_SENDER_ID
});

export const auth = firebase.auth();
export const database = firebase.database();
