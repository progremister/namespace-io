// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDAyi-Q5_KHJwfkKTNGMHvgXoXdjX4_O3g",
  authDomain: "namespace-io.firebaseapp.com",
  projectId: "namespace-io",
  storageBucket: "namespace-io.appspot.com",
  messagingSenderId: "543211237770",
  appId: "1:543211237770:web:eefd69d495229856321873",
  measurementId: "G-YTGN1SBRSZ"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
