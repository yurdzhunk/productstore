import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAvL74WKYPg6DCfxO6f6Xu8rOXp-6vHGDg",
    authDomain: "product-store-419ec.firebaseapp.com",
    projectId: "product-store-419ec",
    storageBucket: "product-store-419ec.appspot.com",
    messagingSenderId: "788701827361",
    appId: "1:788701827361:web:f8547dd363f79838cfee60"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
