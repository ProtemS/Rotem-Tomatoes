import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  /*apiKey: "AIzaSyBP4R6oaPRyMGkvN74BjAIENxDFyhxAJGI",
  authDomain: "rotem-tomatoes.firebaseapp.com",
  projectId: "rotem-tomatoes",
  storageBucket: "rotem-tomatoes.appspot.com",
  messagingSenderId: "385838643771",
  appId: "1:385838643771:web:6b75275d68ebf0a102ba1e",
  */
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
export default app;
