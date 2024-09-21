// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBuSUbYlcByiWC47lLGIQY9mZ4AOKj7_hg',
  authDomain: 'budgetingapp-27.firebaseapp.com',
  projectId: 'budgetingapp-27',
  storageBucket: 'budgetingapp-27.appspot.com',
  messagingSenderId: '191895625372',
  appId: '1:191895625372:web:1cd51dfbe8db2e95ec9759',
  measurementId: 'G-946ESJ12X2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase auth and Firestore services
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
