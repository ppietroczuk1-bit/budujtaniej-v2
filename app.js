import { auth, db, doc, setDoc } from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

console.log("AUTH:", auth);

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

registerBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rola = document.getElementById("rola").value;

  try {

    const userCredential =
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

    await setDoc(
      doc(db, "users", userCredential.user.uid),
      {
        email: email,
        rola: rola,
        createdAt: new Date().toISOString()
      }
    );

    console.log(
      "USER ZAPISANY W FIRESTORE",
      userCredential.user.uid
    );

    status.innerHTML = "✅ Konto utworzone";

  } catch (error) {

    console.error("BŁĄD:", error);

    status.innerHTML = error.message;

  }

});

loginBtn.addEventListener("click", async () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    status.innerHTML = "✅ Zalogowano";

  } catch (error) {

    console.error(error);

    status.innerHTML = error.message;

  }

});
