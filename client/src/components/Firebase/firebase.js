// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
} from 'firebase/auth';
import {getAnalytics} from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDZd8efKLf0fx8j7uii2t2k_wMsJmPKrYo',
  authDomain: 'fir-auth-meal-stream.firebaseapp.com',
  projectId: 'fir-auth-meal-stream',
  storageBucket: 'fir-auth-meal-stream.appspot.com',
  messagingSenderId: '1021544741305',
  appId: '1:1021544741305:web:da9f258932f79489af9e68',
  measurementId: 'G-CP1TXLWXS2',
};

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_API_KEY,
//   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_APP_ID,
//   measurementId: process.env.REACT_APP_MEASUREMENT_ID,
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Analytics and get a reference to the service
const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

export {
  app,
  auth,
  analytics,
  googleProvider,
  signInWithPopup,
  GoogleAuthProvider,
  linkWithCredential,
  fetchSignInMethodsForEmail,
  getAdditionalUserInfo,
};
