/// <reference types="@angular/localize" />

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDN--mJidlaG0Xez36eC57ZM64hpqgh1LQ",
  authDomain: "soma16-8.firebaseapp.com",
  projectId: "soma16-8",
  storageBucket: "soma16-8.firebasestorage.app",
  messagingSenderId: "769749912923",
  appId: "1:769749912923:web:61c72da49d2ee26e259e7e",
  measurementId: "G-9D88Q1FZRT"
};

const app = initializeApp(firebaseConfig);


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
