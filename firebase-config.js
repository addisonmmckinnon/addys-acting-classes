import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Addy: this config is safe to be public — it just tells the browser which
// Firebase project to talk to. What actually protects your data is the
// Firestore security rules (see firestore.rules) and the login on the
// admin page, not keeping this file secret.
const firebaseConfig = {
  apiKey: "AIzaSyComnZE_uwS7FdLOG3EBG-68OnNsGVE0h4",
  authDomain: "acting-classes-addy.firebaseapp.com",
  projectId: "acting-classes-addy",
  storageBucket: "acting-classes-addy.firebasestorage.app",
  messagingSenderId: "750737980602",
  appId: "1:750737980602:web:e544b3f47293f02c8dd683",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
