// authGuard.js
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth(app);

// ✅ Auth Guard
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "/index.html"; 
  }
});

// ✅ Optional: prevent back navigation after logout
export function blockBackButton() {
  window.history.pushState(null, "", window.location.href);
  window.onpopstate = function () {
    window.history.pushState(null, "", window.location.href);
  };
}
