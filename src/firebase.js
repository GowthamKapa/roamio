// Importing Firebase core and services
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDNxZ9P3mGeBz7m3EADKMLxvm6LSvOAKR8",
  authDomain: "roamio-bb3b7.firebaseapp.com",
  projectId: "roamio-bb3b7",
  storageBucket: "roamio-bb3b7.firebasestorage.app",
  messagingSenderId: "170380116868",
  appId: "1:170380116868:web:93304132334586c62b93d1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth and db
export const auth = getAuth(app);
export const db = getFirestore(app);
