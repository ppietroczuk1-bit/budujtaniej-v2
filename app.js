import { auth, db, doc, setDoc } from "./firebase.js";
console.log("AUTH:", auth);
import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

registerBtn.addEventListener("click", async () => {

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try {

const userCredential =
await createUserWithEmailAndPassword(
  auth,
  email,
  password
);

const rola =
document.getElementById("rola").value;

await setDoc(
  doc(db, "users", userCredential.user.uid),
  {
    email: email,
    rola: rola,
    createdAt: new Date().toISOString()
  }
);

status.innerHTML = "✅ Konto utworzone";

}
catch(error){

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

}
catch(error){

status.innerHTML = error.message;

}

});
