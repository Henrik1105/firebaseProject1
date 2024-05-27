// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDu0VgrScBin05J401ZqFnpwrjr2zlHzLo",
  authDomain: "cours-firebase-9edbb.firebaseapp.com",
  projectId: "cours-firebase-9edbb",
  storageBucket: "cours-firebase-9edbb.appspot.com",
  messagingSenderId: "39137875228",
  appId: "1:39137875228:web:c5fcb75ae00608940c56d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
