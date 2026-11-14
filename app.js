import {
  auth,
  db,
  doc,
  setDoc,
  collection,
  addDoc,
  getDocs
} from "./firebase.js";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

console.log("AUTH:", auth);

// ===========================
// ELEMENTY
// ===========================

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");
const status = document.getElementById("status");

const addTenderBtn = document.getElementById("addTenderBtn");
const tenderStatus = document.getElementById("tenderStatus");

const tendersList =
document.getElementById("tendersList");

const filterWojewodztwo =
document.getElementById("filterWojewodztwo");

const addOfferBtn =
document.getElementById("addOfferBtn");

const offerStatus =
document.getElementById("offerStatus");

const myTenders =
document.getElementById("myTenders");

// ===========================
// REJESTRACJA
// ===========================

if (registerBtn) {

registerBtn.addEventListener(
"click",
async () => {

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
        createdAt:
        new Date().toISOString()
      }
    );

    status.innerHTML =
      "✅ Konto utworzone";

    console.log(
      "USER ZAPISANY",
      userCredential.user.uid
    );

  }
  catch(error){

    console.error(error);

    status.innerHTML =
      error.message;

  }

});

}

// ===========================
// LOGOWANIE
// ===========================

if (loginBtn) {

loginBtn.addEventListener(
"click",
async () => {

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

    loadMyTenders();

  }
  catch(error){

    console.error(error);

    status.innerHTML =
      error.message;

  }

});

}

// ===========================
// DODAJ PRZETARG
// ===========================

if(addTenderBtn){

addTenderBtn.addEventListener(
"click",
async () => {

  if(!auth.currentUser){

    tenderStatus.innerHTML =
    "Najpierw się zaloguj";

    return;
  }

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
      collection(db,"tenders"),
      {
        ownerUid:
        auth.currentUser.uid,

        ownerEmail:
        auth.currentUser.email,

        kategoria:
        kategoria,

        wojewodztwo:
        wojewodztwo,

        powiat:
     
