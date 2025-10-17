// Import Firebase SDK
import { initializeApp } from "firebase/app"; 
import { getDatabase } from "firebase/database"; 
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCwNvo_66qOdS0VwZGwHJwkwNmBip-baRI",
  authDomain: "watches-2847c.firebaseapp.com", 
  databaseURL: "https://watches-2847c-default-rtdb.asia-southeast1.firebasedatabase.app",
   projectId: "watches-2847c",
   storageBucket: "watches-2847c.appspot.com", // ✅corrected 
   messagingSenderId: "534140669443", 
   appId: "1:534140669443:web:95270bd65f2e4e64420836",
   measurementId: "G-CYG7DGYZ8P" 
  };
  const app = initializeApp(firebaseConfig);
  export const database = getDatabase(app); 
  export const storage = getStorage(app);
   // ✅ added storage for image uploads