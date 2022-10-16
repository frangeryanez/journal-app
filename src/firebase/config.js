// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyC5VZrSW2Pyny6D-mXg9U7foWEiMFZq9rM',
  authDomain: 'react-course-d0a40.firebaseapp.com',
  projectId: 'react-course-d0a40',
  storageBucket: 'react-course-d0a40.appspot.com',
  messagingSenderId: '62717892762',
  appId: '1:62717892762:web:e30d7513630abef5876723'
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);