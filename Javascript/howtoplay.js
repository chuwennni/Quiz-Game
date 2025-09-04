const howToPlayContainer = document.querySelector(".howToPlayContainer");
const howContent = document.getElementById("howContent");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeHowTo = document.getElementById("closeHowTo");

const howSteps = [
  "Welcome! This is a quiz game. You’ll answer multiple-choice questions.",
  "Select the number of questions and time limit before starting.",
  "Each question has 4 choices. Click on the correct answer.",
  "You’ll earn points for correct answers. Try to get the highest score!",
  "Good luck and have fun!"
];

let currentStep = 0;

function showStep(index) {
  howContent.textContent = howSteps[index];
  prevBtn.style.display = index === 0 ? "none" : "inline-block";
  nextBtn.textContent = index === howSteps.length - 1 ? "Finish" : "Next";
}

function openHowToPlay() {
  currentStep = 0; 
  showStep(currentStep);
  howToPlayContainer.style.display = "flex";
}

function closeHowToPlay() {
  howToPlayContainer.style.display = "none";
}

nextBtn.addEventListener("click", () => {
  if (currentStep < howSteps.length - 1) {
    currentStep++;
    showStep(currentStep);
  } else {
    // ✅ Explicitly close when Finish is clicked
    closeHowToPlay();
    localStorage.setItem("howToPlaySeen", "true");
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
});

closeHowTo.addEventListener("click", closeHowToPlay);

// Show automatically on first visit
window.addEventListener("load", () => {
  if (!localStorage.getItem("howToPlaySeen")) {
    openHowToPlay();
  }
});

// Button to open manually later
document.getElementById("howToPlayBtn").addEventListener("click", () => {
  openHowToPlay();
});
