// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDjbaWKtZKV9nNirufQbthbuWaRGaTyz9E',
  authDomain: 'react-native-mdev.firebaseapp.com',
  projectId: 'react-native-mdev',
  storageBucket: 'react-native-mdev.appspot.com',
  messagingSenderId: '847189237991',
  appId: '1:847189237991:web:12ce7815b94ae50a88c242',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};
