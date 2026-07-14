// ============================================================
// AURA — Firebase Configuration (Compat SDK — no ES modules)
// Works on both file:// and http://localhost
//
// This file uses the Firebase Compat (v8-style) API loaded via
// plain <script> tags — no import/export, no ES modules.
// That makes it work when opening HTML files directly AND via
// Live Server.
//
// The <script> tags that load firebase/app and firebase/auth
// are already added to auth-login.html BEFORE this file runs.
// ============================================================

(function () {

  // ── Your Firebase project credentials ──────────────────────
  var firebaseConfig = {
    apiKey            : "AIzaSyDnppIqgUKrV8ePYKFZvXydsVIz1K7u288",
    authDomain        : "aura-4512f.firebaseapp.com",
    projectId         : "aura-4512f",
    storageBucket     : "aura-4512f.firebasestorage.app",
    messagingSenderId : "704423346904",
    appId             : "1:704423346904:web:44e51ab399d78bcfc24dad",
    measurementId     : "G-9DENE9SK7S"
  };

  // ── Initialise (safe to call multiple times) ────────────────
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  var auth     = firebase.auth();
  var provider = new firebase.auth.GoogleAuthProvider();

  // Always show the "Choose an account" screen
  provider.setCustomParameters({ prompt: 'select_account' });

  // ── signInWithGoogle ────────────────────────────────────────
  // 1. Signs out any cached user first (forces account chooser)
  // 2. Opens signInWithPopup → Google "Choose an account" screen
  window.auraSignInWithGoogle = async function () {
    try { await auth.signOut(); } catch (_) {}
    return auth.signInWithPopup(provider);
  };

  // ── signOutUser ─────────────────────────────────────────────
  window.auraSignOut = async function () {
    try { await auth.signOut(); } catch (_) {}
    [
      'authToken', 'firebaseUID', 'userEmail',
      'userName',  'userPhoto',   'authTimestamp',
      'rememberMe','guestMode'
    ].forEach(function (k) { localStorage.removeItem(k); });
  };

  // ── observeAuthState ────────────────────────────────────────
  window.auraObserveAuth = function (callback) {
    return auth.onAuthStateChanged(callback);
  };

  // Expose auth object for guard / other scripts
  window.auraAuth = auth;

})();
