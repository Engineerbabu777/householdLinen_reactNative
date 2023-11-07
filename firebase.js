import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAjLsTUdkytmvHgg4PeqoNJBz0RUBuQndc",
  authDomain: "laundary-app-04.firebaseapp.com",
  projectId: "laundary-app-04",
  storageBucket: "laundary-app-04.appspot.com",
  messagingSenderId: "609275017320",
  appId: "1:609275017320:web:787d3bd9aca4f9e85363dd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);

export { auth, db };