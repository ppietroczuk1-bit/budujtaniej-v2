import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";

import { getAuth }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

import { getFirestore }
from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAdKOdNJWuFwHjd2ouaHXrO5o_hMM41Uvs",
  authDomain: "budujtaniej-v2.firebaseapp.com",
  projectId: "budujtaniej-v2",
  storageBucket: "budujtaniej-v2.firebasestorage.app",
  messagingSenderId: "975041613784",
  appId: "1:975041613784:web:3fc018b88f513cfb97acad",
  measurementId: "G-3XMKN2YBES"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
