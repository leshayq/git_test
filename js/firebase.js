import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-analytics.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDhNJVq2cGxANMDMpxt_NzadS5qV3EjMUg",
    authDomain: "delivery-food-b694a.firebaseapp.com",
    projectId: "delivery-food-b694a",
    storageBucket: "delivery-food-b694a.firebasestorage.app",
    messagingSenderId: "392545173309",
    appId: "1:392545173309:web:d89e4e7ab7356da27c0f54",
    measurementId: "G-NXSCM9NXPV"
  };

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase();

export { database, ref, set, push };