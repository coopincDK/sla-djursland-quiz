// S-LA for Djursland – Firebase konfiguration (compat SDK)
// Realtime Database til highscore og meningsm\u00e5ling

const firebaseConfig = {
  apiKey: "AIzaSyAMh-GmgUO8NjBMaOMvp2hpkxnOL9QjiEc",
  authDomain: "sla-djursland.firebaseapp.com",
  databaseURL: "https://sla-djursland-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sla-djursland",
  storageBucket: "sla-djursland.firebasestorage.app",
  messagingSenderId: "926484123838",
  appId: "1:926484123838:web:6703c0781f7a8315084eef",
  measurementId: "G-XYFWRCQMTJ"
};

// Initialiser Firebase (compat)
function initFirebase() {
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    return firebase.database();
  } catch (e) {
    console.warn('Firebase init fejlede:', e);
    return null;
  }
}
