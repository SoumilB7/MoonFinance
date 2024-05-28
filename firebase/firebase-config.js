// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDLgYP7XoHUC7Bs5psQSa86CyoKORryQJw",
  authDomain: "moonfinance-nayan.firebaseapp.com",
  projectId: "moonfinance-nayan",
  storageBucket: "moonfinance-nayan.appspot.com",
  messagingSenderId: "521711030617",
  appId: "1:521711030617:web:d74816a05c9adf0f41bc48",
  measurementId: "G-TE0XCJV7DL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
