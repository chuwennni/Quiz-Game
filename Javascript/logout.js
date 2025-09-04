import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const auth = getAuth();

const logoutBtn = document.getElementById("logout-btn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);

    // Block back button
    window.history.pushState(null, "", window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, "", window.location.href);
    };

    showPopup("✅ Logged out successfully.", () => {
      window.location.href = "/index.html"; 
    });
  } catch (error) {
    showPopup("❌ " + error.message);
  }
});

}

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
