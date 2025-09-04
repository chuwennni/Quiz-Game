import { mathQuestions } from "../javascript modules/questions-math.js";
import { scienceQuestions } from "../javascript modules/question-science.js";
import { oralCommsQuestions } from "../javascript modules/question-oralcomm.js";
import { doc, setDoc, getDoc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { db } from "./firebase-config.js"; 
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const selection = document.getElementById('selection');
const quizGame = document.getElementById('quizGame');
const question = document.getElementById('question');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const resultContainer = document.getElementById('results');
const resultAnswers = document.getElementById('result');
const insult = document.getElementById('insult');
const nextButton = document.getElementById('nextButton');
const currentQuestion = document.getElementById('currentQuestions');
const backButtonQuiz = document.getElementById('back-button-quiz');
const BackToQuiz = document.getElementById('go-back-to-quiz');
const BackToSelect = document.getElementById('go-back-to-select');
const timer = document.getElementById('timer');
const correctsfx = new Audio('/sfx/correct.mp3');
const congratsSfx = new Audio('/sfx/congrats.mp3');
const wrongSfx = new Audio('/sfx/wrong.mp3');
const clockSfx = new Audio('/sfx/clock.mp3');

let totalQuestions = 10;
let nextQuestionTime = 5;

let attempts = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let usedQuestions = [];

let currentCorrect = null;
let selectedAnswer = null;

let totalTime = 0;
let timeLeft = 0;
let timerInterval;

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function startTimer(duration) {
  clearInterval(timerInterval);
  totalTime = duration;
  timeLeft = duration;

  timer.textContent = formatTime(timeLeft);

  timerInterval = setInterval(() => {
    timeLeft--;

    document.getElementById("timer").textContent = formatTime(timeLeft);

    if (timeLeft === 8){
      timer.classList.add('ticking')
      clockSfx.play()
    }

    if (timeLeft <= 0) {
      Results();
      ResetGame();
    }
  }, 1000);
}

const allAnswerDivs = [answer1, answer2, answer3, answer4];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

nextButton.addEventListener('click', SubmitAnswer);
BackToQuiz.addEventListener('click', GoBackToQuiz);
BackToSelect.addEventListener('click', GoBackToSelect);

export function setQuizSettings(questionsCount, timeValue) {
  totalQuestions = questionsCount;
  totalTime = timeValue;
}

function ResetGame() {
  clearInterval(timerInterval);
  attempts = 0;
  correctAnswers = 0;
  usedQuestions = [];
  selectedAnswer = null;
  currentCorrect = null;
  timeLeft = 0;
}

let subject = localStorage.getItem("subject");

let questions = [];
if (subject === "math") {
  questions = mathQuestions;
  console.log('math')
} else if (subject === "science") {
  questions = scienceQuestions;
  console.log('science')
} else if (subject === "oral") {
  questions = oralCommsQuestions;
  console.log('oralcomm')
} else {
  console.warn("No subject found, defaulting to math.");
  questions = mathQuestions;
}


export function StartGame() {
  quizGame.classList.remove('unshowed');
  timer.classList.remove('ticking');
  quizGame.classList.add('showed');
  quizGame.style.display = 'flex';
  resultContainer.style.display = 'none';

  selectedAnswer = null;
  currentQuestion.textContent = `${attempts}/${totalQuestions}`;
  const remainingQuestions = questions.filter(q => !usedQuestions.includes(q.question));
  if (remainingQuestions.length === 0) {
    Results();
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  const selectedQuestion = remainingQuestions[randomIndex];
  usedQuestions.push(selectedQuestion.question);

  currentCorrect = selectedQuestion.correct;
  question.textContent = selectedQuestion.question;

  const allChoices = [...selectedQuestion.choices];
  shuffleArray(allChoices);

  allAnswerDivs.forEach((div, index) => {
    div.textContent = allChoices[index];
    div.classList.remove('selected');
    div.classList.remove('correct');
    div.classList.remove('wrong');
    div.onclick = () => {
      allAnswerDivs.forEach(d => d.classList.remove('selected'));
      div.classList.add('selected');
      selectedAnswer = div.textContent;
    };
  });
}

function SubmitAnswer() {
  if (!selectedAnswer) {
    nextButton.classList.add('alert');
    return;
  }

  clockSfx.pause()

  nextQuestionTime--
  attempts++;
  currentQuestion.textContent = `${attempts}/${totalQuestions}`;
  nextButton.classList.remove('alert');

  allAnswerDivs.forEach(div => {
    div.onclick = null;  
  });

  if (selectedAnswer === currentCorrect) {
    correctAnswers++;
    correctsfx.play();

    allAnswerDivs.forEach(div => {
      if (div.textContent === currentCorrect) {
        div.classList.add('correct');
      }
    });

  } else {
    wrongAnswers++;
    wrongSfx.play();

    allAnswerDivs.forEach(div => {
      if (div.textContent === selectedAnswer) {
        div.classList.add('wrong');
      }
      if (div.textContent === currentCorrect) {
        div.classList.add('correct');
      }
    });
  }

  if (attempts === totalQuestions) {
    Results();
  } else {
    setTimeout(() => {
      StartGame();
    }, 1000);
  }
}

async function Results() {
  congratsSfx.play();
  quizGame.style.display = 'none';
  resultContainer.style.display = 'flex';
  resultContainer.classList.add('showed');

  const result = correctAnswers;
  resultAnswers.textContent = result < 0 ? `0/${totalQuestions}` : `${result}/${totalQuestions}`;

  const messages = [
    "okay nato", "puro ka kasi daldal eh", "lollipop lang yan",
    "kaya mo yan!, hindi na pala", "pede nayan", "try mo kaya mag chat gpt",
    "ni...nig...nigeri... nigeria", "miss mo?", "airplane", "basic HAHAHA", 'Ml Pa Boi',
    'cod pa men', '1+1 = 4?'
  ];

  if (result <= 0) {
    insult.textContent = messages[0];
  } else {
    insult.textContent = messages[result - 1] || "";
  }

 
  const auth = getAuth();
  const user = auth.currentUser;
  if (user) {
    await addScore(user.uid, result);  // Adds score to Firestore
  }

  ResetGame(); 
}

async function createUser(userId, username) {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    username: username,
    points: 0
  });
}


async function addScore(userId, score) {
  const userRef = doc(db, "users", userId);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // Increment existing points
    await updateDoc(userRef, {
      points: increment(score)
    });
  } else {
    // Create user if not exists
    await setDoc(userRef, {
      username: "Anonymous", // or from your signup flow
      points: score
    });
  }
}


function GoBackToQuiz(){
  resultContainer.classList.remove('showed')
  resultContainer.classList.add('unshowed')

  resultContainer.addEventListener('animationend', function handler() {
    resultContainer.style.display = 'none'
    resultContainer.removeEventListener('animationend', handler)
  })

  StartGame();
  startTimer(totalTime);
}

function GoBackToSelect(){
  resultContainer.classList.remove('showed')
  resultContainer.classList.add('unshowed')
  resultContainer.style.display = 'none'
  
}

backButtonQuiz.addEventListener('click', () => {
  ResetGame();

  quizGame.classList.remove('showed');
  quizGame.classList.add('unshowed');

  quizGame.addEventListener('animationend', function handler() {
    quizGame.style.display = 'none';
    selection.classList.add('showed');
    quizGame.removeEventListener('animationend', handler);
  });
});
