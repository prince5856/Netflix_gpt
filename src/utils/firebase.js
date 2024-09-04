// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSSXLanEKvUyMTQWP51o6Lnh1ntpKa_W4",
  authDomain: "netflixgpt-9bd57.firebaseapp.com",
  projectId: "netflixgpt-9bd57",
  storageBucket: "netflixgpt-9bd57.appspot.com",
  messagingSenderId: "632530093050",
  appId: "1:632530093050:web:9723209d60ca2e2a139a43",
  measurementId: "G-TCSQFSN3DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
