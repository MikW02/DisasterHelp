
//configurações do firebase
import { initializeApp } from "firebase/app";

import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDjVo2loqpwCvm9yPeOPu5sA9SvB6_87e0",
  authDomain: "gsocean-8738c.firebaseapp.com",
  projectId: "gsocean-8738c",
  storageBucket: "gsocean-8738c.appspot.com",
  messagingSenderId: "440318597369",
  appId: "1:440318597369:web:89bf29283525174cd1ea28"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
