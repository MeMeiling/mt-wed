// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMnIVIJsx0CxvPufybn1jyC0oWiny3Q0w",
  authDomain: "mt-wed.firebaseapp.com",
  projectId: "mt-wed",
  storageBucket: "mt-wed.appspot.com",
  messagingSenderId: "237589215055",
  appId: "1:237589215055:web:633d8ae7c388a67ff8373a",
  measurementId: "G-YN23V6DMHZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Storage
const storage = getStorage(app);

// Export instances for use in other files
export { db, storage };
