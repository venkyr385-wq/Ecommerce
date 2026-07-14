/**
 * AURA Authentication Guard  v3
 * Works on file:// AND http://localhost
 * Handles Firebase UID tokens, auth_token_*, and guest_token_*
 */

(function () {
  'use strict';

  /* ── Expiry constants ──────────────────────────────────── */
  var EXPIRY_DEFAULT  = 24 * 60 * 60 * 1000;      // 24 h
  var EXPIRY_REMEMBER = 30 * 24 * 60 * 60 * 1000; // 30 days
  var EXPIRY_GUEST    =  2 * 60 * 60 * 1000;      //  2 h

  var AUTH_KEYS = [
    'authToken','firebaseUID','userEmail',
    'userName','userPhoto','authTimestamp','rememberMe','guestMode'
  ];

  /* ── Helpers ───────────────────────────────────────────── */
  function clearAuthData() {
    AUTH_KEYS.forEach(function (k) { localStorage.removeItem(k); });
  }

  function getCurrentPage() {
    var path = window.location.pathname;
    return path.substring(path.lastIndexOf('/') + 1) || 'index.html';
  }

  function isAuthPage() {
    return getCurrentPage().startsWith('auth-');
  }

  function isAuthenticated() {
    var token     = localStorage.getItem('authToken');
    var timestamp = localStorage.getItem('authTimestamp');
    var remember  = localStorage.getItem('rememberMe') === 'true';
    var isGuest   = localStorage.getItem('guestMode')  === 'true';
    var isFirebase= !!localStorage.getItem('firebaseUID');

    if (!token) return false;

    var expiry;
    if (isGuest || token.startsWith('guest_token_')) {
      expiry = EXPIRY_GUEST;
    } else if (remember || isFirebase) {
      expiry = EXPIRY_REMEMBER;
    } else {
      expiry = EXPIRY_DEFAULT;
    }

    var age = Date.now() - parseInt(timestamp || '0', 10);
    if (isNaN(age) || age > expiry) {
      clearAuthData();
      return false;
    }
    return true;
  }

  /* ── Display user profile ──────────────────────────────── */
  function displayUserProfile() {
    var email   = localStorage.getItem('userEmail') || '';
    var name    = localStorage.getItem('userName')  || '';
    var photo   = localStorage.getItem('userPhoto') || '';
    var isGuest = localStorage.getItem('guestMode') === 'true';

    var display = isGuest ? 'Guest' : (name || email.split('@')[0] || 'User');
    var formatted = display.charAt(0).toUpperCase() + display.slice(1);

    document.querySelectorAll('[data-user-email]').forEach(function (el) {
      el.textContent = isGuest ? 'Guest User' : (email || 'user@example.com');
    });
    document.querySelectorAll('[data-user-name]').forEach(function (el) {
      el.textContent = formatted;
    });

    if (photo) {
      document.querySelectorAll('[data-user-photo]').forEach(function (el) {
        if (el.tagName === 'IMG') el.src = photo;
      });
      var hAvatar = document.querySelector('#user-profile-trigger img');
      if (hAvatar) hAvatar.src = photo;
      var pAvatar = document.querySelector('#profile-panel img[alt="Avatar"]');
      if (pAvatar) pAvatar.src = photo;
    }
  }

  /* ── Firebase sign-out (compat SDK — works on file:// too) */
  function signOutFirebase() {
    /* firebase-config.js exposes window.auraSignOut via compat SDK */
    if (typeof window.auraSignOut === 'function') {
      return window.auraSignOut().catch(function () {});
    }
    return Promise.resolve();
  }

  /* ── Setup logout button ───────────────────────────────── */
  function setupLogout() {
    var buttons = document.querySelectorAll('[data-logout], #logout-btn, .logout-btn');

    buttons.forEach(function (btn) {
      /* Replace node to remove any stale listeners */
      var fresh = btn.cloneNode(true);
      btn.parentNode.replaceChild(fresh, btn);

      fresh.addEventListener('click', function (e) {
        e.preventDefault();

        if (!confirm('Are you sure you want to logout?')) return;

        /* 1. Clear all auth data immediately */
        clearAuthData();
        localStorage.setItem('logoutTriggered', 'true');

        /* 2. Sign out of Firebase first, then redirect to the auth page */
        signOutFirebase().finally(function () {
          /* 3. Show success toast */
          if (typeof window.showToast === 'function') {
            window.showToast('Logged out successfully.', 'success');
          }

          /* 4. Redirect to login page after sign-out completes */
          setTimeout(function () {
            window.location.replace('auth-login.html');
          }, 300);
        });
      });
    });
  }

  /* ── Activity heartbeat ────────────────────────────────── */
  function startActivityHeartbeat() {
    var timer;
    function refresh() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        if (isAuthenticated()) {
          localStorage.setItem('authTimestamp', Date.now().toString());
        }
      }, 1500);
    }
    ['click','scroll','keypress','mousemove','touchstart'].forEach(function (ev) {
      document.addEventListener(ev, refresh, { passive: true });
    });
  }

  /* ── Init ──────────────────────────────────────────────── */
  function init() {
    var isFile = window.location.protocol === 'file:';

    /* On http:// — enforce auth gates */
    if (!isFile) {
      if (!isAuthenticated() && !isAuthPage()) {
        window.location.href = 'auth-login.html';
        return;
      }
      if (isAuthenticated() && isAuthPage()) {
        window.location.href = 'index.html';
        return;
      }
    }

    /* Wire UI — always runs regardless of protocol */
    function setup() {
      displayUserProfile();
      setupLogout();
      if (!isFile) startActivityHeartbeat();
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', setup);
    } else {
      setup();
    }
  }

  init();

  /* ── Global logout helper (for inline onclick / app.js) ── */
  window.logout = function () {
    clearAuthData();
    localStorage.setItem('logoutTriggered', 'true');
    signOutFirebase().finally(function () {
      window.location.replace('auth-login.html');
    });
  };

  /* ── Re-check on tab focus ─────────────────────────────── */
  document.addEventListener('visibilitychange', function () {
    if (window.location.protocol === 'file:') return;
    if (!document.hidden && !isAuthenticated() && !isAuthPage()) {
      window.location.href = 'auth-login.html';
    }
  });

})();
