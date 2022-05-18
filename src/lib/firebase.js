import firebase from "firebase/compat/app";
import "firebase/compat/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJzm3axYaSK3Prv-xKAl1QoNas1ewrgtA",
  authDomain: "user-management-system-12235.firebaseapp.com",
  projectId: "user-management-system-12235",
  storageBucket: "user-management-system-12235.appspot.com",
  messagingSenderId: "1065811308540",
  appId: "1:1065811308540:web:869722e708ea075ef90c79"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig).database().ref();

export default app