import {
  auth,
  db,
  doc,
  setDoc,
  collection,
  addDoc
} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

console.log("AUTH:", auth);

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

const addTenderBtn =
document.getElementById("addTenderBtn");

const status =
document.getElementById("status");

const tenderStatus =
document.getElementById("tenderStatus");


// ======================
// REJESTRACJA
// ======================

registerBtn.addEventListener("click", async () => {

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  const rola =
  document.getElementById("rola").value;

  try {

    const userCredential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await setDoc(
      doc(
        db,
        "users",
        userCredential.user.uid
      ),
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

    status.innerHTML =
    "✅ Konto utworzone";

  }
  catch(error){

    console.error(error);

    status.innerHTML =
    error.message;

  }

});


// ======================
// LOGOWANIE
// ======================

loginBtn.addEventListener("click", async () => {

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try {

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    status.innerHTML =
    "✅ Zalogowano";

  }
  catch(error){

    console.error(error);

    status.innerHTML =
    error.message;

  }

});


// ======================
// DODAJ PRZETARG
// ======================

addTenderBtn.addEventListener("click", async () => {

  const kategoria =
  document.getElementById("kategoria").value;

  const wojewodztwo =
  document.getElementById("wojewodztwo").value;

  const powiat =
  document.getElementById("powiat").value;

  const budzet =
  document.getElementById("budzet").value;

  const termin =
  document.getElementById("termin").value;

  const opis =
  document.getElementById("opis").value;

  try {

    await addDoc(
      collection(db, "tenders"),
      {
        kategoria: kategoria,
        wojewodztwo: wojewodztwo,
        powiat: powiat,
        budzet: Number(budzet),
        termin: termin,
        opis: opis,
        status: "aktywny",
        czasPrzetargu: 30,
        createdAt:
        new Date().toISOString()
      }
    );

    tenderStatus.innerHTML =
    "✅ Przetarg dodany";

    console.log(
      "PRZETARG DODANY"
    );

  }
  catch(error){

    console.error(error);

    tenderStatus.innerHTML =
    error.message;

  }

});
