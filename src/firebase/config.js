import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCMhkjOl4WbT7tiemMzSytTGLcE2oGDBdw",
  authDomain: "dubbeez-ventures-f920b.firebaseapp.com",
  projectId: "dubbeez-ventures-f920b",
  storageBucket: "dubbeez-ventures-f920b.appspot.com",
  messagingSenderId: "192998934575",
  appId: "1:192998934575:web:9968289e876dff0774deda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export default app;