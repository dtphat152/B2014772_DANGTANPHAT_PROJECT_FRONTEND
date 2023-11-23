

import { createApp } from 'vue'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import router from "./router";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDk3tBIwPoXLC2sleOPYRA8uuYKiWc85f4",
  authDomain: "tpstore-531fc.firebaseapp.com",
  projectId: "tpstore-531fc",
  storageBucket: "tpstore-531fc.appspot.com",
  messagingSenderId: "572308636096",
  appId: "1:572308636096:web:490dbec62496979bdc0825"
};

// Initialize Firebase
initializeApp(firebaseConfig);


createApp(App).use(router).mount("#app");


