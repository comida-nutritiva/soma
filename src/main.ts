/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, setUserId } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDN--mJidlaG0Xez36eC57ZM64hpqgh1LQ",
  authDomain: "soma16-8.firebaseapp.com",
  projectId: "soma16-8",
  storageBucket: "soma16-8.firebasestorage.app",
  messagingSenderId: "769749912923",
  appId: "1:769749912923:web:61c72da49d2ee26e259e7e",
  measurementId: "G-9D88Q1FZRT"
};


// generar o recuperar el userId
let userId = localStorage.getItem('userId');
if (!userId) {
  userId = crypto.randomUUID(); // genera un ID único
  localStorage.setItem('userId', userId);
}


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

setUserId(analytics, userId);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
