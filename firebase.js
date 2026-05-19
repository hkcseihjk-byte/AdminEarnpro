import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

// 🔧 REPLACE WITH YOUR FIREBASE PROJECT CONFIG
const firebaseConfig = {
  apiKey: "AIzaSyCbcniCvz17GdiGldDw_038fQ5qIzWnM8Y",
  authDomain: "earnpro-ac803.firebaseapp.com",
  projectId: "earnpro-ac803",
  storageBucket: "earnpro-ac803.firebasestorage.app",
  messagingSenderId: "217418853905",
  appId: "1:217418853905:web:70dc1445b14232743c0bb0",
  measurementId: "G-T604C4134Q"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
