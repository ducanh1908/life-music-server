import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8ZiqgzFf6ad4EQSxq54Bz0AunjZvZ9ow",
  authDomain: "life-music-aa2d2.firebaseapp.com",
  projectId: "life-music-aa2d2",
  storageBucket: "life-music-aa2d2.appspot.com",
  messagingSenderId: "843044288362",
  appId: "1:843044288362:web:3a796fad775378acb99713",
  measurementId: "G-QYKXCF8B2X"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
