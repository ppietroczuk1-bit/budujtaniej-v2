import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdK0dNJWuFwHjd2ouaHXr05o_hMM41Uvs",
  authDomain: "budujtaniej-v2.firebaseapp.com",
  projectId: "budujtaniej-v2",
  storageBucket: "budujtaniej-v2.firebasestorage.app",
  messagingSenderId: "975041613784",
  appId: "1:975041613784:web:521ed8bf0cf8d41c97acad",
  measurementId: "G-E3RPNYN1JQ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
