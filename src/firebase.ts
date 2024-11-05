
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyD79KzIu0yprIZZTCASTx95PE5Sgqc9oH0",
    authDomain: "jinsupark91-373c3.firebaseapp.com",
    projectId: "jinsupark91-373c3",
    storageBucket: "jinsupark91-373c3.firebasestorage.app",
    messagingSenderId: "48185372611",
    appId: "1:48185372611:web:6443bb5802791d86915776",
    measurementId: "G-YX69P1WG7E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);