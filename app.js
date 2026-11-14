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

// =====================
// KONTO
// =====================

const registerBtn =
document.getElementById("registerBtn");

const loginBtn =
document.getElementById("loginBtn");

const status =
document.getElementById("status");

// =====================
// PRZETARGI
// =====================

const addTenderBtn =
document.getElementById("addTenderBtn");

const tenderStatus =
document.getElementById("tenderStatus");

const tendersList =
document.getElementById("tendersList");

const filterWojewodztwo =
document.getElementById("filterWojewodztwo");

// =====================
// OFERTY
// =====================

const addOfferBtn =
document.getElementById("addOfferBtn");

const offerStatus =
document.getElementById("offerStatus");

// =====================
// REJESTRACJA
// =====================

if(registerBtn){

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

}

// =====================
// LOGOWANIE
// =====================

if(loginBtn){

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

  }
  catch(error){

    console.error(error);

    status.innerHTML =
    error.message;

  }

});

}

// =====================
// DODAWANIE PRZETARGU
// =====================

if(addTenderBtn){

addTenderBtn.addEventListener(
"click",
async () => {

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
      collection(
        db,
        "tenders"
      ),
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

    loadTenders();

  }
  catch(error){

    console.error(error);

    tenderStatus.innerHTML =
    error.message;

  }

});

}

// =====================
// LISTA PRZETARGÓW
// =====================

async function loadTenders(){

  if(!tendersList) return;

  tendersList.innerHTML = "";

  const snapshot =
  await getDocs(
    collection(db,"tenders")
  );

  snapshot.forEach((item) => {

    const tender =
    item.data();

    const tenderId =
    item.id;

    if(
      filterWojewodztwo &&
      filterWojewodztwo.value !== "" &&
      tender.wojewodztwo !==
      filterWojewodztwo.value
    ){
      return;
    }

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `

      <h3>${tender.kategoria}</h3>

      <p>
      Województwo:
      ${tender.wojewodztwo}
      </p>

      <p>
      Powiat:
      ${tender.powiat}
      </p>

      <p>
      Budżet:
      ${tender.budzet} zł
      </p>

      <p>
      Termin:
      ${tender.termin}
      </p>

      <p>
      ${tender.opis}
      </p>

      <p>
      Status:
      ${tender.status}
      </p>

      <p>
      ID:
      ${tenderId}
      </p>

    `;

    tendersList.appendChild(card);

  });

}

// =====================
// FILTR WOJEWÓDZTW
// =====================

if(filterWojewodztwo){

filterWojewodztwo.addEventListener(
  "change",
  loadTenders
);

}

// =====================
// DODAWANIE OFERTY
// =====================

if(addOfferBtn){

addOfferBtn.addEventListener(
"click",
async () => {

  const tenderId =
  document.getElementById(
    "offerTenderId"
  ).value;

  const cena =
  document.getElementById(
    "offerPrice"
  ).value;

  const termin =
  document.getElementById(
    "offerTermin"
  ).value;

  const opis =
  document.getElementById(
    "offerOpis"
  ).value;

  try {

    await addDoc(
      collection(db,"offers"),
      {
        tenderId: tenderId,
        cena: Number(cena),
        termin: termin,
        opis: opis,
        createdAt:
        new Date().toISOString()
      }
    );

    offerStatus.innerHTML =
    "✅ Oferta zapisana";

  }
  catch(error){

    console.error(error);

    offerStatus.innerHTML =
    error.message;

  }

});

}

// =====================
// START
// =====================

loadTenders();
