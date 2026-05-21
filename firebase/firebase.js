// ============================================================
// FIREBASE CONFIGURATION - ADMIN PANEL
// Replace the values below with your actual Firebase project config
// ============================================================

const firebaseConfig = {
  apiKey: "AIzaSyCbcniCvz17GdiGldDw_038fQ5qIzWnM8Y",
  authDomain: "earnpro-ac803.firebaseapp.com",
  databaseURL: "https://earnpro-ac803-default-rtdb.firebaseio.com",
  projectId: "earnpro-ac803",
  storageBucket: "earnpro-ac803.firebasestorage.app",
  messagingSenderId: "217418853905",
  appId: "1:217418853905:web:70dc1445b14232743c0bb0",
  measurementId: "G-T604C4134Q"
};

firebase.initializeApp(firebaseConfig);

const auth    = firebase.auth();
const db      = firebase.firestore();
const storage = firebase.storage();

// ============================================================
// ADMIN AUTH GUARD — MUST be used on every protected page
// ============================================================

function requireAdmin(callback) {
  auth.onAuthStateChanged(async user => {
    if (!user) {
      window.location.href = '../login.html';
      return;
    }
    // Check admin role in Firestore
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (!doc.exists || doc.data().role !== 'admin') {
        auth.signOut();
        window.location.href = '../login.html?denied=1';
        return;
      }
      callback(user, doc.data());
    } catch (e) {
      auth.signOut();
      window.location.href = '../login.html?denied=1';
    }
  });
}

// ============================================================
// HELPERS
// ============================================================

function formatCurrency(n) { return parseFloat(n||0).toFixed(2); }

function formatDate(ts) {
  if (!ts) return '—';
  const d = ts.toDate ? ts.toDate() : new Date(ts);
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function timeAgo(ts) {
  if (!ts) return '';
  const d   = ts.toDate ? ts.toDate() : new Date(ts);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

function showToast(message, type = 'info') {
  const existing = document.getElementById('admin-toast');
  if (existing) existing.remove();
  const colors = {
    success: '#10b981', error: '#ef4444', info: '#6d28d9', warning: '#f59e0b'
  };
  const toast = document.createElement('div');
  toast.id = 'admin-toast';
  toast.style.cssText = `
    position:fixed;top:20px;right:20px;z-index:9999;
    background:${colors[type]||colors.info};color:#fff;
    padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;
    box-shadow:0 4px 20px rgba(0,0,0,0.4);max-width:320px;
    animation:slideIn 0.3s ease;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity='0'; setTimeout(()=>toast.remove(),300); }, 3500);
}
