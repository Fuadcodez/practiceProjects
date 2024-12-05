// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'insta-next-75230.firebaseapp.com',
  projectId: 'insta-next-75230',
  storageBucket: 'insta-next-75230.firebasestorage.app',
  messagingSenderId: '103248485273',
  appId: '1:103248485273:web:87ef85c792bcbabd495108',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
