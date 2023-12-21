// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqIcM3DovSVrcVxowqvHFYOrwBjSKdvWY",
  authDomain: "fir-auth-be44f.firebaseapp.com",
  projectId: "fir-auth-be44f",
  storageBucket: "fir-auth-be44f.appspot.com",
  messagingSenderId: "358892590644",
  appId: "1:358892590644:web:e5f99481c210315d065c61",
  measurementId: "G-93RLK033CD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);