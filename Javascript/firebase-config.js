import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB-32u4fEa_kXlCAfvXcSqkuYaWtOKW4AI",
  authDomain: "quizzer-edff7.firebaseapp.com",
  projectId: "quizzer-edff7",
  storageBucket: "quizzer-edff7.firebasestorage.app",
  messagingSenderId: "861425010788",
  appId: "1:861425010788:web:7cc47bc8bc7a82ec34f771",
  measurementId: "G-VMPNQL6SDW"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {db, auth};