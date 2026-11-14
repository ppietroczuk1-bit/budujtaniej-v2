// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdKOdNJWuFwHjd2ouaHXrO5o_hMM41Uvs",
  authDomain: "budujtaniej-v2.firebaseapp.com",
  projectId: "budujtaniej-v2",
  storageBucket: "budujtaniej-v2.firebasestorage.app",
  messagingSenderId: "975041613784",
  appId: "1:975041613784:web:3fc018b88f513cfb97acad",
  measurementId: "G-3XMKN2YBES"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
