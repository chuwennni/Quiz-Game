// Select elements
const registerBtn = document.getElementById("submit-register");
const loginBtn = document.getElementById("submit-login");
const registerContainer = document.querySelector(".register");
const loginContainer = document.querySelector(".Login");
const switchBtn = document.getElementById("switch");

// ✅ Import Firebase v9 modules

import { getDocs, collection, query, where, doc, setDoc, serverTimestamp, } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import {db, auth} from './firebase-config.js'

// Inside your registerBtn.addEventListener("click", async () => { ... })
registerBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const nickname = document.getElementById("nickname").value; // ✅ your new input

  try {
    // ✅ Step 1: Check nickname uniqueness
    const q = query(collection(db, "users"), where("nickname", "==", nickname));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      showPopup("⚠️ Nickname already taken, please choose another.");
      return; // stop registration
    }

    // ✅ Step 2: Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // ✅ Step 3: Save to Firestore
    await setDoc(doc(db, "users", user.uid), {
      email: email,
      nickname: nickname,   // store nickname
      points: 0,
      createdAt: serverTimestamp()
    });

    showPopup("✅ Account created! Please login.", ShowLogin);

  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      showPopup("⚠️ Email already registered. Please login instead.");
    } else {
      showPopup("❌ " + error.message);
    }
  }
});


// LOGIN USER

loginBtn.addEventListener("click", async () => {
  const loginInput = document.getElementById("email-login").value; // could be email or nickname
  const password = document.getElementById("password-login").value;

  try {
    let emailToUse = loginInput;

    // Check if input looks like an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(loginInput)) {
      // Not an email -> search by nickname
      const q = query(collection(db, "users"), where("nickname", "==", loginInput));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        showPopup("❌ No account found with that nickname.");
        return;
      }

      // Get the first match (nicknames should be unique ideally)
      const userDoc = querySnapshot.docs[0].data();
      emailToUse = userDoc.email;
    }

    // Login with resolved email + password
    const userCredential = await signInWithEmailAndPassword(auth, emailToUse, password);
    const user = userCredential.user;

    showPopup("✅ Logged in as " + loginInput, () => {
      window.location.href = "/pages/main-menu.html";
    });

  } catch (error) {
    showPopup("❌ " + error.message);
  }
});



// Switch to Login
switchBtn.addEventListener("click", ShowLogin);

function ShowLogin() {
  registerContainer.classList.add("unshowed");

  registerContainer.addEventListener("animationend", function handler() {
    registerContainer.style.display = "none";
    loginContainer.style.display = "flex"; // show login
    registerContainer.classList.remove("unshowed"); // reset
    registerContainer.removeEventListener("animationend", handler);
  });
}

switchBackBtn.addEventListener('click', () => {
  loginContainer.classList.add('showed');

  loginContainer.addEventListener('animationend', function handler() {
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'flex';
    loginContainer.classList.remove('showed'); 
    loginContainer.removeEventListener('animationend', handler);
  });
});




// Popup helper
function showPopup(message, callback) {
  const popup = document.getElementById("popup");
  const popupMsg = document.getElementById("popup-message");
  const popupBtn = document.getElementById("popup-btn");

  popupMsg.textContent = message;
  popup.classList.remove("hidden");

  popupBtn.onclick = () => {
    popup.classList.add("hidden");
    if (callback) callback();
  };
}

onAuthStateChanged(auth, (user) => {
  if (!user) return;

  // If we are on an auth page (register/login), DON'T redirect —
  // this prevents the page unloading while registration writes to Firestore.
  const isAuthPage = Boolean(
    document.getElementById("submit-register") ||
    document.getElementById("submit-login") ||
    document.getElementById("nickname")
  );

  if (isAuthPage) {
    console.log("Auth changed on auth page — skipping auto-redirect.");
    return;
  }

  // Otherwise redirect to main menu
  window.location.href = "/pages/main-menu.html";
});