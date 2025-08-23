import { questions } from "./questions.js";

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


let totalQuestions = 10;
let quizTime = 20;
let timerInterval = null;
let timeLeft = 0;
let isQuizActive = false;

let attempts = 0;
let correctAnswers = 0;
let wrongAnswers = 0;
let usedQuestions = [];

let currentCorrect = null;
let selectedAnswer = null;

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
  quizTime = timeValue;
  console.log("Quiz settings updated:", totalQuestions, quizTime);
}


function ResetGame() {
  clearInterval(timerInterval);
  isQuizActive = false;
  attempts = 0;
  correctAnswers = 0;
  wrongAnswers = 0;
  usedQuestions = [];
  selectedAnswer = null;
  currentCorrect = null;
  timeLeft = 0;
}

export function StartGame() {
  isQuizActive = true; 
  quizGame.classList.remove('unshowed');
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
    div.onclick = () => {
      allAnswerDivs.forEach(d => d.classList.remove('selected'));
      div.classList.add('selected');
      selectedAnswer = div.textContent;
    };
  });

  clearInterval(timerInterval);

  timeLeft = quizTime;
  document.getElementById("timer").textContent = `Time left: ${timeLeft}`;

  timerInterval = setInterval(() => {
    if (!isQuizActive) {
      clearInterval(timerInterval);
      return;
    }

    timeLeft--;
    document.getElementById("timer").textContent = `Time left: ${timeLeft}`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      if (!selectedAnswer) {
        attempts++;
        wrongAnswers++;
        currentQuestion.textContent = `${attempts}/${totalQuestions}`;
      }

      if (!isQuizActive) return;  

      if (attempts >= totalQuestions) {
        Results();
      } else {
        StartGame();
      }
    }
  }, 1000);
}

function SubmitAnswer() {
  if (!selectedAnswer) {
    nextButton.classList.add('alert');
    return;
  }

  attempts++;
  currentQuestion.textContent = `${attempts}/${totalQuestions}`;
  nextButton.classList.remove('alert');

  if (selectedAnswer === currentCorrect) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  if (attempts === totalQuestions) {
    Results();
  } else {
    clearInterval(timerInterval);
    StartGame();
  }
}

function Results() {
  quizGame.style.display = 'none';
  resultContainer.style.display = 'flex'
  resultContainer.classList.add('showed');


  const result = correctAnswers;
  resultAnswers.textContent = result < 0 ? `0/${totalQuestions}` : `${result}/${totalQuestions}`;

  const messages = [
    "okay nato", "puro ka kasi daldal eh", "lollipop lang yan",
    "kaya mo yan!, hindi na pala", "pede nayan", "try mo kaya mag chat gpt",
    "ni...nig...nigeri... nigeria", "miss mo?", "airplane", "basic HAHAHA"
  ];

  if (result <= 0) {
    insult.textContent = messages[0];
  } else {
    insult.textContent = messages[result - 1] || "";
  }

  ResetGame(); 
}

function GoBackToQuiz(){
  resultContainer.classList.remove('showed')
  resultContainer.classList.add('unshowed')

  resultContainer.addEventListener('animationend', function handler() {
    resultContainer.style.display = 'none'
    resultContainer.removeEventListener('animationend', handler)
  })

  StartGame()
}

function GoBackToSelect(){
  resultContainer.classList.remove('showed')
  resultContainer.classList.add('unshowed')
  
  resultContainer.addEventListener('animationend', function handler() {
    resultContainer.style.display = 'none'
    resultContainer.removeEventListener('animationend', handler)
  })
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

