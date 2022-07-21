import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD4PJS7CAbsUEQf66AbuglpKgYX4PfNX1c",
  authDomain: "productstore-redux-firebase.firebaseapp.com",
  projectId: "productstore-redux-firebase",
  storageBucket: "productstore-redux-firebase.appspot.com",
  messagingSenderId: "584240581413",
  appId: "1:584240581413:web:d4a1a838f4d96091aae8cc",
  measurementId: "G-W8K6J7C9WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);