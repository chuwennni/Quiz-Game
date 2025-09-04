import { db } from "./firebase-config.js";
import { collection, query, orderBy, limit, getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

async function loadLeaderboard() {
  const leaderboardList = document.getElementById("leaderboard-list");
  leaderboardList.innerHTML = ""; // clear old data

  const q = query(
    collection(db, "users"),
    orderBy("points", "desc"),
    limit(10) // top 10
  );

  const querySnapshot = await getDocs(q);

  let rank = 1;
  querySnapshot.forEach((docSnap) => {
    const data = docSnap.data();
    const li = document.createElement("li");
    li.textContent = `${rank}. ${data.nickname} — ${data.points} pts`;
    leaderboardList.appendChild(li);
    rank++;
  });
}

document.addEventListener("DOMContentLoaded", loadLeaderboard);
