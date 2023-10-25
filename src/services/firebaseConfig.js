import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCa_ujokiDHImgv_BaW7H_dhbbGtCn464o",
  authDomain: "estacionamento-5291d.firebaseapp.com",
  databaseURL: "https://estacionamento-5291d-default-rtdb.firebaseio.com",
  projectId: "estacionamento-5291d",
  storageBucket: "estacionamento-5291d.appspot.com",
  messagingSenderId: "886411784950",
  appId: "1:886411784950:web:3950b59fd8f2eaff0bf2d7",
  measurementId: "G-9GJNKG9N7Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

