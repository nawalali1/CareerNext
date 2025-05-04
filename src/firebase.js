// src/firebase.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQ4aeTcrT144jAoalXhOZxuUa_J3VkT4M",
  authDomain: "careernext-f1dd7.firebaseapp.com",
  projectId: "careernext-f1dd7",
  storageBucket: "careernext-f1dd7.firebasestorage.app",
  messagingSenderId: "1024075600721",
  appId: "1:1024075600721:web:64c95236fa347f2a3bb970",
  measurementId: "G-NTHNKP7FSK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export the Auth instance for use elsewhere
export const auth = getAuth(app);
export default app;
