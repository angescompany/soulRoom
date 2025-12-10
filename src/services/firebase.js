import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMW5Dlm774c55Qavw8-hxEKImhxNLezlM",
    authDomain: "soulroom-74c97.firebaseapp.com",
    projectId: "soulroom-74c97",
    storageBucket: "soulroom-74c97.firebasestorage.app",
    messagingSenderId: "240813368074",
    appId: "1:240813368074:web:c32c1ce196bfa4916950f3",
    measurementId: "G-8JQYLDDF0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { app, analytics, auth, db, storage, googleProvider };
