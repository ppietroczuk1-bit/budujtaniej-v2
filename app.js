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

// =======================
// ELEMENTY
// =======================

const registerBtn = document.getElementById("registerBtn");
const loginBtn = document.getElementById("loginBtn");

const status = document.getElementById("status");

const addTenderBtn = document.getElementById("addTenderBtn");
const tenderStatus = document.getElementById("tenderStatus");

const addOfferBtn = document.getElementById("addOfferBtn");
const offerStatus = document.getElementById("offerStatus");

const tendersList = document.getElementById("tendersList");
const filterWojewodztwo =
document.getElementById("filterWojewodztwo");

const myTenders =
document.getElementById("myTenders");

// =======================
// REJESTRACJA
// =======================

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

      } catch (error) {

        console.error(error);

        status.innerHTML =
        error.message;

      }

    }
  );

}

// =======================
// LOGOWANIE
// =======================

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

      } catch (error) {

        console.error(error);

        status.innerHTML =
        error.message;

      }

    }
  );

}

// =======================
// DODAWANIE PRZETARGÓW
// =======================

if (addTenderBtn) {

  addTenderBtn.addEventListener(
    "click",
    async () => {

      if (!auth.currentUser) {

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
          collection(db, "tenders"),
          {
            ownerUid:
            auth.currentUser.uid,

            ownerEmail:
            auth.currentUser.email,

            kategoria,
            wojewodztwo,
            powiat,

            budzet:
            Number(budzet),

            termin,
            opis,

            status:
            "aktywny",

            createdAt:
            new Date().toISOString()
          }
        );

        tenderStatus.innerHTML =
        "✅ Przetarg dodany";

        loadTenders();
        loadMyTenders();

      } catch (error) {

        console.error(error);

        tenderStatus.innerHTML =
        error.message;

      }

    }
  );

}

// =======================
// DODAWANIE OFERT
// =======================

if (addOfferBtn) {

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
          collection(db, "offers"),
          {
            tenderId,

            cena:
            Number(cena),

            termin,
            opis,

            createdAt:
            new Date().toISOString()
          }
        );

        offerStatus.innerHTML =
        "✅ Oferta zapisana";

      } catch (error) {

        console.error(error);

        offerStatus.innerHTML =
        error.message;

      }

    }
  );

}

// =======================
// LISTA PRZETARGÓW
// =======================

async function loadTenders() {

  if (!tendersList) return;

  tendersList.innerHTML = "";

  const snapshot =
  await getDocs(
    collection(
      db,
      "tenders"
    )
  );

  snapshot.forEach((item) => {

    const tender =
    item.data();

    if (
      filterWojewodztwo &&
      filterWojewodztwo.value &&
      tender.wojewodztwo !==
      filterWojewodztwo.value
    ) {
      return;
    }

    const card =
    document.createElement("div");

    card.className = "card";

    card.innerHTML = `
      <h3>${tender.kategoria}</h3>

      <p>Województwo: ${tender.wojewodztwo}</p>

      <p>Powiat: ${tender.powiat}</p>

      <p>Budżet: ${tender.budzet} zł</p>

      <p>Status: ${tender.status}</p>

      <p>ID: ${item.id}</p>
    `;

    tendersList.appendChild(card);

  });

}

// =======================
// PANEL INWESTORA
// =======================

async function loadMyTenders() {

  if (!auth.currentUser) return;
  if (!myTenders) return;

  myTenders.innerHTML = "";

  const tendersSnapshot =
  await getDocs(
    collection(
