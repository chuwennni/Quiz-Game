const settingsMenu = document.querySelector('.settings-menu');
const closeButtons = document.getElementById('close-button');
const backButton = document.getElementById('back-button');
const backButtonLeader = document.getElementById('back-button-leader');
const backButtonGame = document.getElementById('back-button-game');
const backButtonCredits = document.getElementById('back-button-credits');
const HowtoplayMenu = document.querySelector(".howToPlayContainer")
const Leaderboards = document.querySelector('.leaderboards')
const gameScreen = document.getElementById('gameScreen')
const quizGame = document.getElementById('quizGame')
const CreditsContainer = document.getElementById('CreditsContainer');



function ShowSettings() {
  settingsMenu.classList.remove('unshowed');
  settingsMenu.classList.add('showed');
  settingsMenu.style.display = 'flex';
}

function ShowHowToPlay(){
  HowtoplayMenu.classList.remove('unshowed')
  HowtoplayMenu.classList.add('showed')
  HowtoplayMenu.style.display = 'flex'
}

closeButtons.addEventListener('click', () => {
  settingsMenu.classList.remove('showed');
  settingsMenu.classList.add('unshowed');

  settingsMenu.addEventListener('animationend', function handler() {
    settingsMenu.style.display = 'none';
    settingsMenu.removeEventListener('animationend', handler);
  });
});

function ShowLeaderboards() {
  Leaderboards.classList.remove('unshowed');
  Leaderboards.classList.add('showed');
  Leaderboards.style.display = 'flex';
}

backButtonLeader.addEventListener('click', () => {
  Leaderboards.classList.remove('showed');
  Leaderboards.classList.add('unshowed')

  Leaderboards.addEventListener('animationend', function handler() {
    Leaderboards.style.display = 'none'
    Leaderboards.removeEventListener('animationend', handler)
  })
})

function ShowCredit() {
  CreditsContainer.classList.remove('unshowed');
  CreditsContainer.classList.add('showed');
  CreditsContainer.style.display = 'flex';
}

backButtonCredits.addEventListener('click', () => {
  CreditsContainer.classList.remove('showed');
  CreditsContainer.classList.add('unshowed')

  CreditsContainer.addEventListener('animationend', function handler() {
    CreditsContainer.style.display = 'none'
    CreditsContainer.removeEventListener('animationend', handler)
  })
})



function GoToGame() {
  gameScreen.classList.remove('unshowed');
  gameScreen.classList.add('showed');
  gameScreen.style.display = 'flex';
}

backButtonGame.addEventListener('click', () => {
  gameScreen.classList.remove('showed');
  gameScreen.classList.add('unshowed')

  gameScreen.addEventListener('animationend', function handler() {
    gameScreen.style.display = 'none'
    gameScreen.removeEventListener('animationend', handler)
  })
})


document.getElementById("mathsub").addEventListener("click", () => {
  localStorage.setItem("subject", "math");
  window.location.href = "math.html"; 
});

document.getElementById("sciencesub").addEventListener("click", () => {
  localStorage.setItem("subject", "science");
  window.location.href = "science.html"; 
});

document.getElementById("oralsub").addEventListener("click", () => {
  localStorage.setItem("subject", "oral");
  window.location.href = "oralComm.html"; 
});

