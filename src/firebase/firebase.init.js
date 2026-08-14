// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDf7T1slhQbGPgtprtw2uld1P5Oh5ChCSM",
  authDomain: "movieportal-935a1.firebaseapp.com",
  projectId: "movieportal-935a1",
  storageBucket: "movieportal-935a1.firebasestorage.app",
  messagingSenderId: "1038539600021",
  appId: "1:1038539600021:web:97fd5b42b28557350b2b9c",
  measurementId: "G-NKK6YT16T9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default auth;