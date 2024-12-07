import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, sendPasswordResetEmail, initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'; // import AsyncStorage

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
const db = getFirestore(app);

const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
})
// // Set persistence for Firebase Authentication using AsyncStorage
// setPersistence(auth, getReactNativePersistence(AsyncStorage))
//   .then(() => {
//     console.log("Persistence set to local");
//   })
//   .catch((error) => {
//     console.error("Error setting persistence: ", error);
//   });

export {
  auth,
  db,
  sendPasswordResetEmail,
};
