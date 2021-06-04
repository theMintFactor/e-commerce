import * as firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCfTatdZjQmk8dgL6f1sAYVPc36qkJSPcY',
  authDomain: 'ecommerce-66e87.firebaseapp.com',
  projectId: 'ecommerce-66e87',
  storageBucket: 'ecommerce-66e87.appspot.com',
  messagingSenderId: '353005964682',
  appId: '1:353005964682:web:c71a877d965466c2884c73',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
